import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { BookedScreen } from "../screens/BookedScreen";
import THEME from "../theme";

const BookedStack = createStackNavigator();
const MainStack = createStackNavigator();
const Stack = createStackNavigator();
const Tabs =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const StackNavigator = ({ children }) => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: Platform.OS === "android" ? "white" : THEME.MAIN_COLOR,
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "white",
      },
    }}
  >
    {children}
  </Stack.Navigator>
);

const MainStackScreen = () => (
  <StackNavigator>
    <MainStack.Screen name="Main" component={MainScreen} />
    <MainStack.Screen name="Post" component={PostScreen} />
  </StackNavigator>
);

const BookedStackScreen = () => (
  <StackNavigator>
    <BookedStack.Screen name="Booked" component={BookedScreen} />
    <BookedStack.Screen name="Post" component={PostScreen} />
  </StackNavigator>
);

// const PostNavigator = () => {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Main"
//           screenOptions={{
//             headerTintColor:
//               Platform.OS === "android" ? "white" : THEME.MAIN_COLOR,
//             headerStyle: {
//               backgroundColor:
//                 Platform.OS === "android" ? THEME.MAIN_COLOR : "white",
//             },
//           }}
//         >
//           <Stack.Screen
//             name="Main"
//             component={MainScreen}
//             //options={{ title: "Мой блог" }}
//           />
//           <Stack.Screen
//             name="Post"
//             component={PostScreen}
//             // options={{
//             //   title: "Пост номер 42",
//             //   headerStyle: { backgroundColor: "red" },
//             //   headerTintColor: "#fff",
//             // }}
//             // initialParams={{ user: 'me' }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// };

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        activeColor={"#fff"}
        barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
        shifting={true}
        tabBarOptions={{
          activeTintColor: THEME.MAIN_COLOR,
        }}
      >
        <Tabs.Screen
          name="Main"
          component={MainStackScreen}
          options={{
            tabBarLabel: "Все",
            tabBarIcon: (info) => (
              <Ionicons name="ios-albums" size={25} color={info.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Create"
          component={BookedStackScreen}
          options={{
            tabBarLabel: "Избранное",
            tabBarIcon: (info) => (
              <Ionicons name="ios-star" size={25} color={info.color} />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

// const BookedNavigator = createStackNavigator({
//   Booked: BookedScreen,
//   Post: PostScreen,
// });

// const BottomNavigator = createBottomTabNavigator({
//   Post: {
//     screen: PostNavigator,
//   },
//   Booked: {
//     screen: BookedNavigator,
//   },
// });
