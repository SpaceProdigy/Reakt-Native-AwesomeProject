import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import Home from "../Screens/Home";

const MainStack = createStackNavigator();

export default function MainNavigator() {
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
    </MainStack.Navigator>
  );
}
