import React, { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync();

const Home = () => {
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
      onLayout={onLayoutRootView}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let color = focused ? "white" : "black";

          if (route.name === "PostsScreen") {
            iconName = "ios-grid-outline";
          }
          if (route.name === "CreatePostsScreen") {
            iconName = "add";
          }
          if (route.name === "ProfileScreen") {
            iconName = "person-outline";
          }

          return (
            <Ionicons
              style={focused && styles.isActive}
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
        tabBarStyle: { height: 83 },
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  header: { height: 88 },
});

export default Home;
