import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import image from "../../images/Photo-BG.jpg";
import { useDispatch, useSelector } from "react-redux";
import { selectIsError, selectIsLoading } from "../../redux/authSlice";
import { loginUserThunk } from "../../redux/operations";
import { schemasYupLoginisation } from "../../utility/schemasYup";
import InputPassword from "../../components/InputPassword";
import InputEmail from "../../components/InputEmail";
import { rulesEmail, rulesPassword } from "../../utility/useFormRules";
import ButtonSubmit from "../../components/ButtonSubmit";
import { navigateToRegistration } from "../../utility/navigateTo";
import { InputTextErrorAuthentication } from "../../components/InputTextError";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [activeInput, setActiveInput] = useState(null);
  const [isShowPassword, setIsShowPasword] = useState(true);
  const dispatch = useDispatch();
  const buttonIsDisable = useSelector(selectIsLoading);
  const registerError = useSelector(selectIsError);
  const [textError, setTextError] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemasYupLoginisation),
  });

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
    if (textError) {
      setTextError(null);
    }
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

  const onPressButton = async (data) => {
    dispatch(loginUserThunk(data));
    if (registerError === "auth/invalid-credential") {
      setTextError("auth/invalid-credential");
      return;
    }

    reset();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-220}
      >
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.mainBackground}
        >
          <View style={styles.box}>
            <Text style={styles.title}>Увійти</Text>
            <View>
              <View>
                <InputTextErrorAuthentication
                  errors={errors?.email?.message}
                  textError={textError}
                />
                <Controller
                  control={control}
                  rules={rulesEmail}
                  render={({ field: { onChange, value } }) => (
                    <InputEmail
                      handleInputBlur={handleInputBlur}
                      onChange={onChange}
                      value={value}
                      handleInputFocus={handleInputFocus}
                      hendleInputActiveStyle={hendleInputActiveStyle}
                    />
                  )}
                  name="email"
                />
                <InputTextErrorAuthentication
                  errors={errors?.password?.message}
                />
                <Controller
                  control={control}
                  rules={rulesPassword}
                  render={({ field: { onChange, value } }) => (
                    <InputPassword
                      handleInputBlur={handleInputBlur}
                      onChange={onChange}
                      value={value}
                      handleClick={handleClick}
                      isShowPassword={isShowPassword}
                      handleInputFocus={handleInputFocus}
                      hendleInputActiveStyle={hendleInputActiveStyle}
                    />
                  )}
                  name="password"
                />
              </View>
            </View>

            <ButtonSubmit
              handleSubmit={handleSubmit}
              onPressButton={onPressButton}
              buttonIsDisable={buttonIsDisable}
              naming="Увійти"
            />
            <TouchableOpacity
              onPress={() => {
                setTextError(null);
                navigateToRegistration(navigation);
              }}
            >
              <Text style={styles.link}>
                Немає акаунту?
                <Text style={styles.linkAcent}>Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
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

  link: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 79,
  },
  linkAcent: { textDecorationLine: "underline" },
});
