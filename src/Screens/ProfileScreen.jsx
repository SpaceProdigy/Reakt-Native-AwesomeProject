import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
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

import * as ImagePicker from "expo-image-picker";
import image from "../images/Photo-BG.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logOutUserThunk } from "../redux/operations";
import { selectData, selectIsLoading } from "../redux/authSlice";
import { navigateToLogin } from "../utility/navigateTo";
import { useNavigation } from "@react-navigation/native";
import AvatarBox from "../components/AvatarBox";
import { selectPictures } from "../redux/picturesSlice";
import Loader from "../utility/Loader";
import ListPosts from "../components/ListPosts";

export default function RegistrationScreen() {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const registerUser = useSelector(selectData);
  const [selectedImage, setSelectedImage] = useState(
    registerUser ? registerUser?.photoURL : null
  );
  const user = useSelector(selectData);
  const photos = useSelector(selectPictures);
  const statusLoading = useSelector(selectIsLoading);

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
              <TouchableOpacity
                onPress={async () => {
                  await dispatch(logOutUserThunk());
                  navigateToLogin(navigation);
                }}
              >
                <MaterialIcons
                  style={styles.iconLogout}
                  name="logout"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
              <Text style={styles.title}>
                {user ? user.displayName : "No name"}
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            {statusLoading ? (
              <Loader />
            ) : photos.length > 0 ? (
              <ListPosts />
            ) : (
              <Text style={styles.text}>У вас поки що немає фото</Text>
            )}
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
  wrapper: { alignItems: "center", marginTop: 43 },

  box: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingVertical: 32,
    width: "100%",
  },

  title: {
    marginTop: 60,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
  },
  list: { flex: 1, backgroundColor: "#fff" },
  text: {
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 16,
  },
  iconLogout: { position: "absolute", right: 16, top: -10 },
});
