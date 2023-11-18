import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Loader from "../utility/Loader";

export default function ProfileScreen() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>ProfileScreen!</Text>
        {/* <Loader /> */}
      </View>
    </>
  );
}
