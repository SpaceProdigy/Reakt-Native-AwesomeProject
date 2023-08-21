import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AppLoading from "expo-app-loading";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import image from "../images/Photo-BG.jpg";

export default function RegistrationScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAvoidingView
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
                  borderColor: activeInput === "login" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholderTextColor="#BDBDBD"
                placeholder="Логін"
                maxLength={20}
              />
              <TextInput
                onFocus={() => handleInputFocus("email")}
                onBlur={handleInputBlur}
                style={{
                  ...styles.input,
                  borderColor: activeInput === "email" ? "#FF6C00" : "#E8E8E8",
                }}
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
                    borderColor:
                      activeInput === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                  secureTextEntry={isShowPassword}
                  placeholderTextColor="#BDBDBD"
                  autoComplete="password"
                  placeholder="Пароль"
                  maxLength={20}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Зареєстуватися</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.link}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
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
    top: "50%",
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
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
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
