import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import image from "../images/Photo-BG.jpg";
SplashScreen.preventAutoHideAsync();

export default function RegistrationScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [activeInput, setActiveInput] = useState(null);
  const [isShowPassword, setIsShowPasword] = useState(true);

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const handleClick = () => {
    setIsShowPasword(isShowPassword ? false : true);
  };

  const hendleInputActiveStyle = (value) => {
    return {
      borderColor: activeInput === value ? "#FF6C00" : "#E8E8E8",
      backgroundColor: activeInput === value ? "#FFFFFF" : "#F6F6F6",
    };
  };

  const onPressButton = () => {
    console.log(
      `Email:${email}
     Password:${password}
     Login:${login}
     `
    );
    setLogin("");
    setEmail("");
    setPassword("");
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        onLayout={onLayoutRootView}
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-150}
      >
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.mainBackground}
        >
          <View style={styles.wrapper}>
            <View style={styles.avatarBox}>
              <TouchableOpacity style={styles.iconAdd}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <Text style={styles.title}>Реєстрація</Text>
              <View>
                <TextInput
                  onFocus={() => handleInputFocus("login")}
                  onBlur={handleInputBlur}
                  style={{
                    ...styles.input,
                    ...hendleInputActiveStyle("login"),
                  }}
                  value={login}
                  onChangeText={setLogin}
                  placeholderTextColor="#BDBDBD"
                  placeholder="Логін"
                  maxLength={20}
                />
                <TextInput
                  onFocus={() => handleInputFocus("email")}
                  onBlur={handleInputBlur}
                  style={{
                    ...styles.input,
                    ...hendleInputActiveStyle("email"),
                  }}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Адреса електронної пошти"
                  keyboardType="email-address"
                  placeholderTextColor="#BDBDBD"
                  maxLength={30}
                />

                <View>
                  <TouchableOpacity
                    onPress={handleClick}
                    style={styles.wrapperShowPassword}
                  >
                    <Text style={styles.showPasswordText}>
                      {isShowPassword ? "Показати" : "Cховати"}
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                    style={{
                      ...styles.input,
                      ...hendleInputActiveStyle("password"),
                    }}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={isShowPassword}
                    placeholderTextColor="#BDBDBD"
                    autoComplete="password"
                    placeholder="Пароль"
                    maxLength={20}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.button} onPress={onPressButton}>
                <Text style={styles.textButton}>Зареєстуватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconAdd: {
    position: "absolute",
    bottom: 16,
    right: -12,
  },
  mainBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wrapper: { alignItems: "center" },
  avatarBox: {
    top: 60,
    width: 132,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#E8E8E8",
    zIndex: 1,
  },
  box: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingVertical: 32,
    paddingHorizontal: 16,
    width: "100%",
  },

  title: {
    marginTop: 60,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 16,
    textAlign: "center",
    color: "#212121",
  },
  wrapperShowPassword: {
    position: "absolute",
    right: 16,
    top: "45%",
    zIndex: 1,
  },
  showPasswordText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
  },

  input: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    textDecorationLine: "none",
  },
  button: {
    marginTop: 43,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
  },
  textButton: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  link: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 12,
  },
});
