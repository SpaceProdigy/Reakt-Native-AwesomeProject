import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from "react-native";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import * as Location from "expo-location";

import SvgTrashIcon from "../images/svg/SvgTreshIcon";
import SvgMapLocation from "../images/svg/SvgMapLocation";
import { useNavigation } from "@react-navigation/native";
import addressGeocoded from "../utility/addressGeocoded/addressGeocoded";

export default function PostsScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const navigation = useNavigation();
  const [photoName, setPhotoName] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [fotoUri, setFotoUri] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [mapInput, setMapInput] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission();
      if (!granted) {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!fontsLoaded) {
    return null;
  }
  const onPressButton = () => {
    console.log(
      `PhotoName:${photoName}
     Geolocation:${mapInput}
     `
    );
    setMapInput("");
    setPhotoName("");
    setFotoUri(null);
    navigation.reset({
      index: 0,
      routes: [{ name: "PostsScreen" }],
    });
  };

  const onPressTrash = async () => {
    setMapInput("");
    setPhotoName("");
    setFotoUri(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const toggleCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const takePicture = async () => {
    try {
      if (fotoUri) {
        setImageLoaded(false);
        setRefreshKey((prevKey) => prevKey + 1);
        setFotoUri(null);
        setMapInput("");
        setImageLoaded(true);
        return;
      }
      if (cameraRef) {
        setImageLoaded(false);
        const photo = await cameraRef.takePictureAsync();
        await MediaLibrary.createAssetAsync(photo.uri);
        setFotoUri(photo.uri);
        setImageLoaded(true);
        let { coords } = await Location.getCurrentPositionAsync();
        console.log(coords);
        const { latitude, longitude } = coords;
        const address = await addressGeocoded(latitude, longitude);
        const { region, country } = address;
        setMapInput(address ? `${region} Region, ${country}` : "");
      }
    } catch (error) {
      console.error("Помилка при спробі зробити снімок:", error.message);
    }
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
            <Camera
              key={refreshKey}
              style={styles.camera}
              type={type}
              ref={setCameraRef}
              ratio="4:3"
            >
              {!hasPermission && (
                <Text style={styles.textNoAccess}> No access to camera </Text>
              )}
              {!fotoUri && (
                <TouchableOpacity style={styles.flip} onPress={toggleCamera}>
                  <MaterialCommunityIcons
                    name="camera-flip-outline"
                    size={30}
                    color="rgba(189, 189, 189, 1)"
                  />
                </TouchableOpacity>
              )}

              {fotoUri && (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: fotoUri }} style={styles.image} />
                </View>
              )}
              {imageLoaded && (
                <TouchableOpacity
                  style={styles.buttonCamera}
                  onPress={takePicture}
                >
                  <View
                    style={{
                      ...styles.box,
                      backgroundColor: fotoUri
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(255, 255, 255, 1)",
                    }}
                  >
                    <MaterialIcons
                      name="photo-camera"
                      size={24}
                      color={
                        !fotoUri
                          ? "rgba(189, 189, 189, 1)"
                          : "rgba(255, 255, 255, 1)"
                      }
                    />
                  </View>
                </TouchableOpacity>
              )}
            </Camera>
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
              value={mapInput}
              onChangeText={setMapInput}
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
              backgroundColor:
                mapInput && photoName && fotoUri ? "#FF6C00" : "#F6F6F6",
            }}
            disabled={!mapInput || !photoName || !fotoUri}
          >
            <Text
              style={{
                ...styles.textButton,
                color: mapInput && photoName && fotoUri ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
          <View style={styles.trashWrapper}>
            <TouchableOpacity
              disabled={!mapInput && !photoName && !fotoUri}
              onPress={onPressTrash}
            >
              <View style={styles.trashBox}>
                <SvgTrashIcon width={24} height={24} />
              </View>
            </TouchableOpacity>
          </View>
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
    position: "relative",
    height: 240,
    width: "100%",
    marginTop: 32,
    backgroundColor: "rgba(232, 232, 232, 1)",
    borderRadius: 8,
  },
  camera: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCamera: {},

  box: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  imageWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "white",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },

  flip: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  input: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    height: 50,
  },
  textNoAccess: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 10,
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
  trashWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 32,
  },
  trashBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
