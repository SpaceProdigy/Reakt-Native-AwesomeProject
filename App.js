import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/routes/MainNavigator";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Loader from "./src/utility/Loader";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <Loader />;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <Provider store={store.store}>
      <PersistGate loading={<Loader />} persistor={store.persistor}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
