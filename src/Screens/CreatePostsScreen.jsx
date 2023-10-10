import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import SvgTrashIcon from "../images/svg/SvgTreshIcon";
import SvgMapLocation from "../images/svg/SvgMapLocation";
import { useNavigation } from "@react-navigation/native";

export default function PostsScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const navigation = useNavigation();
  const [photoName, setPhotoName] = useState("");
  const [map, setMap] = useState("");

  if (!fontsLoaded) {
    return null;
  }
  const onPressButton = () => {
    console.log(
      `PhotoName:${photoName}
     Geolocation:${map}
     `
    );
    setMap("");
    setPhotoName("");

    navigation.reset({
      index: 0,
      routes: [{ name: "PostsScreen" }],
    });
  };

  const onPressTrash = () => {
    setMap("");
    setPhotoName("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={40}
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TouchableOpacity>
              <View style={styles.box}>
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color="rgba(189, 189, 189, 1)"
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Завантажте фото</Text>
          <View style={styles.geolocationBox}>
            <TextInput
              style={{
                ...styles.input,
                fontFamily: photoName
                  ? "Roboto_500Medium"
                  : "Roboto_400Regular",
              }}
              value={photoName}
              onChangeText={setPhotoName}
              placeholderTextColor="#BDBDBD"
              placeholder="Назва..."
              maxLength={30}
            />
          </View>

          <View style={styles.geolocationBox}>
            <View style={styles.iconMap}>
              <SvgMapLocation width={24} height={24} />
            </View>

            <TextInput
              value={map}
              onChangeText={setMap}
              style={styles.input}
              placeholder="Місцевість..."
              keyboardType="email-address"
              placeholderTextColor="#BDBDBD"
              maxLength={100}
            />
          </View>
          <TouchableOpacity
            onPress={onPressButton}
            style={{
              ...styles.button,
              backgroundColor: map && photoName ? "#FF6C00" : "#F6F6F6",
            }}
            disabled={!map || !photoName}
          >
            <Text
              style={{
                ...styles.textButton,
                color: map && photoName ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressTrash} style={styles.trashWrapper}>
            <View style={styles.trashBox}>
              <SvgTrashIcon width={24} height={24} />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    height: 240,
    marginTop: 32,
    backgroundColor: "rgba(232, 232, 232, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    height: 50,
  },

  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 16,
  },
  textButton: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
    color: "#BDBDBD",
  },
  button: {
    marginTop: 32,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
  },
  geolocationBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
  },
  iconMap: { marginRight: 4 },
  trashBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  trashWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 32,
  },
});
