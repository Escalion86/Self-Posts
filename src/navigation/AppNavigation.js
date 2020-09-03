import React from "react";
import {
  createAppContainer,
  NavigationContainer,
} from "@react-navigation/native";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { THEME } from "../theme";

const Stack = createStackNavigator();

const PostNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerTintColor:
            Platform.OS === "android" ? "white" : THEME.MAIN_COLOR,
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? THEME.MAIN_COLOR : "white",
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          //options={{ title: "Мой блог" }}
        />
        <Stack.Screen
          name="Post"
          component={PostScreen}
          // options={{
          //   title: "Пост номер 42",
          //   headerStyle: { backgroundColor: "red" },
          //   headerTintColor: "#fff",
          // }}
          // initialParams={{ user: 'me' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const PostNavigator = createStackNavigator(
//   {
//     Main: MainScreen,
//     Post: {
//       screen: PostScreen,
//     },
//   },
//   {
//     initialRouteName: "Main",
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: THEME.MAIN_COLOR,
//       },
//     },
//   }
// );

export const AppNavigation = PostNavigator;
