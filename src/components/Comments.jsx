import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function Comments({
  avatar,
  text,
  date,
  time,
  userId,
  commetnId,
  index,
}) {
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
    <View
      style={{
        ...styles.wrapperComment,
        flexDirection: commetnId === userId ? "row-reverse" : "row",
        marginTop: index === 0 ? 0 : 24,
      }}
    >
      <Image
        source={{ uri: avatar }}
        style={{
          ...styles.avatar,
          marginRight: commetnId === userId ? 0 : 16,
          marginLeft: commetnId === userId ? 16 : 0,
        }}
      />
      <View style={styles.wrapperText}>
        <Text style={styles.text}>{text}</Text>
        <Text
          style={{
            ...styles.time,
            textAlign: commetnId === userId ? "left" : "right",
          }}
        >{`${date} | ${time}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperComment: {
    alignItems: "flex-start",
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },

  wrapperText: {
    backgroundColor: "#00000008",
    flex: 1,
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
  },
  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  time: {
    marginTop: 8,
    fontFamily: "Roboto_400Regular",
    fontSize: 10,
    lineHeight: 11.72,
    color: "#BDBDBD",
  },
});
