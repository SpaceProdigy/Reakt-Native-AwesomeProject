import React from "react";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import anonymous from "../images/anonymous.jpg";
import { View, Text, StyleSheet, Image } from "react-native";

export default function User({ photo, email = "", name = "" }) {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Image source={photo ? { uri: photo } : anonymous} style={styles.img} />
      <View>
        <Text style={styles.name}>{`${name}`}</Text>
        <Text style={styles.email}>{`${email}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: "row", alignItems: "center", gap: 8 },
  img: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  name: {
    fontFamily: "Roboto_700Bold",
    fontSize: 13,
    lineHeight: 15.23,
    color: "rgba(33, 33, 33, 1)",
  },
  email: {
    fontFamily: "Roboto_400Regular",
    fontSize: 11,
    lineHeight: 12.89,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
