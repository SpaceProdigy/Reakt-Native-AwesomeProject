import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import Home from "../Screens/Home";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import { useDispatch, useSelector } from "react-redux";
import { actualAuth } from "../redux/operations";
import { useEffect } from "react";
import { selectIsAuthentificated } from "../redux/authSlice";

const MainStack = createStackNavigator();

export default function MainNavigator() {
  const navigation = useNavigation();
  const authenticated = useSelector(selectIsAuthentificated);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actualAuth());
    if (authenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
    if (!authenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }, [authenticated]);
  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <MainStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ title: null }}
      />
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: null }}
      />
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ title: null }}
      />
      <MainStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
          headerStyle: styles.header,
          headerTransparent: false,
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
      <MainStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Локація публикації",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
          headerStyle: styles.header,
          headerTransparent: false,
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
    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.41,
    marginBottom: 10,
  },
  iconBack: { marginLeft: 16, marginBottom: 10 },
  header: {
    height: 88,
    borderWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
  },
});
