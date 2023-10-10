import React, { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import PostsScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Tabs = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync();

const BottomNavigator = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      onLayout={onLayoutRootView}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = "black";
          let iconStyle;

          if (route.name === "PostsScreen") {
            iconName = "ios-grid-outline";
          }
          if (route.name === "CreatePostsScreen") {
            iconName = "add";
            iconStyle = styles.isActive;
            iconColor = "white";
          }
          if (route.name === "ProfileScreen") {
            iconName = "person-outline";
          }

          return (
            <Ionicons
              style={iconStyle}
              name={iconName}
              size={24}
              color={iconColor}
            />
          );
        },
        tabBarStyle: {
          ...styles.bottom,
        },
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTintColor: "#212121",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
          headerStyle: styles.header,
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              }
            >
              <MaterialIcons
                style={styles.iconLogout}
                name="logout"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTintColor: "#212121",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
          headerStyle: styles.header,
          tabBarStyle: {
            display: "none",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                style={styles.iconBack}
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Публікації",
          headerTintColor: "#212121",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
          headerStyle: styles.header,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  isActive: {
    backgroundColor: "#FF6C00",
    paddingTop: 13.5,
    paddingBottom: 13.5,
    paddingLeft: 28.5,
    paddingRight: 28.5,
    borderRadius: 25,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.41,
    marginTop: 30,
  },
  iconLogout: {
    marginRight: 16,
    marginTop: 30,
  },
  iconBack: { marginLeft: 16, marginTop: 30 },
  header: {
    height: 88,
    borderWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
  },
  bottom: {
    height: 83,
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
  },
});

export default BottomNavigator;
