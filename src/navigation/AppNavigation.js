import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"

import { Platform } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Ionicons } from "@expo/vector-icons"
import { MainScreen } from "../screens/MainScreen"
import { PostScreen } from "../screens/PostScreen"
import { AboutScreen } from "../screens/AboutScreen"
import { CreateScreen } from "../screens/CreateScreen"
import THEME from "../theme"

const BookedStack = createStackNavigator()
const MainStack = createStackNavigator()
const AboutStack = createStackNavigator()
const CreateStack = createStackNavigator()
const Stack = createStackNavigator()
const Tabs =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator()

const burgerButton = (navigation) => (
  <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item
      title="Toggle Drawer"
      iconName="ios-menu"
      onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
)

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
)

const MainStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation}>
    <MainStack.Screen
      name="Main"
      component={MainScreen}
      initialParams={{ booked: false }}
      options={{
        title: "Мой блог",
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <MainStack.Screen name="Post" component={PostScreen} />
  </StackNavigator>
)

const BookedStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation}>
    <BookedStack.Screen
      name="Booked"
      component={MainScreen}
      initialParams={{ booked: true }}
      options={{
        title: "Избранное",
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <BookedStack.Screen name="Post" component={PostScreen} />
  </StackNavigator>
)

const AboutStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation}>
    <AboutStack.Screen
      name="About"
      component={AboutScreen}
      options={{
        title: "О приложении",
        headerLeft: () => burgerButton(navigation),
      }}
    />
  </StackNavigator>
)

const CreateStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation}>
    <CreateStack.Screen
      name="Create"
      component={CreateScreen}
      options={{
        title: "Создать пост",
        headerLeft: () => burgerButton(navigation),
      }}
    />
  </StackNavigator>
)

const tabsScreen = () => (
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
      name="Booked"
      component={BookedStackScreen}
      options={{
        tabBarLabel: "Избранное",
        tabBarIcon: (info) => (
          <Ionicons name="ios-star" size={25} color={info.color} />
        ),
      }}
    />
  </Tabs.Navigator>
)

const Drawer = createDrawerNavigator()

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="slide"
        drawerContentOptions={{
          activeTintColor: THEME.MAIN_COLOR,
          labelStyle: {
            fontFamily: "open-bold",
          },
        }}
      >
        <Drawer.Screen
          name="Main"
          component={tabsScreen}
          options={{
            drawerLabel: "Главная",
            drawerIcon: () => (
              <Ionicons name="ios-albums" size={24} color={THEME.MAIN_COLOR} />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutStackScreen}
          options={{
            drawerLabel: "О приложении",
            drawerIcon: () => (
              <Ionicons name="md-book" size={24} color={THEME.MAIN_COLOR} />
            ),
          }}
        />
        <Drawer.Screen
          name="Create"
          component={CreateStackScreen}
          options={{
            drawerLabel: "Новый пост",
            drawerIcon: () => (
              <Ionicons
                name="ios-add-circle"
                size={24}
                color={THEME.MAIN_COLOR}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
