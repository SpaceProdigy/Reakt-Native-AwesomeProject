import React from "react";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { View, Text, StyleSheet, Image } from "react-native";
import users from "../data/usersData/users.json";

export default function User() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const { firstName, lastName, email, avatar } = users[0];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: avatar }} style={styles.img} />
      <View>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
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
