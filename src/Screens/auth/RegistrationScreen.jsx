import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

import InputPassword from "../../components/InputPassword"; // Обратите внимание на правильное написание с заглавной буквы

import * as ImagePicker from "expo-image-picker";
import image from "../../images/Photo-BG.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../redux/operations";
import {
  selectData,
  selectIsError,
  selectIsLoading,
} from "../../redux/authSlice";
import InputEmail from "../../components/InputEmail";
import { schemasYupRegisteration } from "../../utility/schemasYup";
import InputLogin from "../../components/InputLogin";
import {
  rulesLogin,
  rulesEmail,
  rulesPassword,
} from "../../utility/useFormRules";
import { InputTextErrorRegistration } from "../../components/InputTextError";
import ButtonSubmit from "../../components/ButtonSubmit";
import { navigateToLogin } from "../../utility/navigateTo";
import { useNavigation } from "@react-navigation/native";
import AvatarBox from "../../components/AvatarBox";

export default function RegistrationScreen() {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [activeInput, setActiveInput] = useState(null);
  const [isShowPassword, setIsShowPasword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [textError, setTextError] = useState(null);
  const buttonIsDisable = useSelector(selectIsLoading);
  const registerError = useSelector(selectIsError);
  const registerUser = useSelector(selectData);
  const [selectedImage, setSelectedImage] = useState(
    registerUser ? registerUser?.photoURL : null
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: registerUser ? registerUser?.displayName : "",
      email: registerUser ? registerUser?.email : "",
      password: "",
    },
    resolver: yupResolver(schemasYupRegisteration),
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

  const removeImage = () => {
    setSelectedImage(null);
  };

  const pickImage = async () => {
    try {
      if (!status.granted) {
        requestPermission();
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Помилка вибору зоображення: ", error);
    }
  };

  const onPressButton = async (data) => {
    dispatch(registerUserThunk({ ...data, photoURL: selectedImage }));

    if (registerError === "auth/email-already-in-use") {
      setTextError("auth/email-already-in-use");
      return;
    }
    reset();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <AvatarBox
              selectedImage={selectedImage}
              pickImage={pickImage}
              removeImage={removeImage}
            />
            <View style={styles.box}>
              <Text style={styles.title}>Реєстрація</Text>
              <View>
                <InputTextErrorRegistration errors={errors?.login?.message} />
                <Controller
                  control={control}
                  rules={rulesLogin}
                  render={({ field: { onChange, value } }) => (
                    <InputLogin
                      handleInputBlur={handleInputBlur}
                      onChange={onChange}
                      value={value}
                      handleInputFocus={handleInputFocus}
                      hendleInputActiveStyle={hendleInputActiveStyle}
                    />
                  )}
                  name="login"
                />

                <InputTextErrorRegistration
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
                <InputTextErrorRegistration
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

              <ButtonSubmit
                handleSubmit={handleSubmit}
                onPressButton={onPressButton}
                buttonIsDisable={buttonIsDisable}
                naming="Зареєстуватися"
              />
              <TouchableOpacity
                onPress={() => {
                  setTextError(null);
                  navigateToLogin(navigation);
                }}
              >
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
  mainBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wrapper: { alignItems: "center" },

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

  link: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 12,
  },
});
