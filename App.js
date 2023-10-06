import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./src/Screens/RegistrationScreen";

import LoginScreen from "./src/Screens/LoginScreen";
import Home from "./src/Screens/Home";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
