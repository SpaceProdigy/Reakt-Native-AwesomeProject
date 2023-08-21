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
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import image from "../images/Photo-BG.jpg";

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [isShowPassword, setIsShowPasword] = useState(true);

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
      keyboardVerticalOffset={-210}
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.mainBackground}
      >
        <View style={styles.wrapper}>
          <View style={styles.box}>
            <Text style={styles.title}>Увійти</Text>
            <View>
              <TextInput
                style={styles.input}
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
                  secureTextEntry={isShowPassword}
                  style={styles.input}
                  placeholderTextColor="#BDBDBD"
                  autoComplete="password"
                  placeholder="Пароль"
                  maxLength={20}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.link}>
                Немає акаунту?
                <Text style={styles.linkAcent}>Зареєструватися</Text>
              </Text>
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
  mainBackground: {
    flex: 1,
    justifyContent: "flex-end",
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
    marginBottom: 79,
  },
  linkAcent: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
  },
});
