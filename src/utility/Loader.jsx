import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = ({ size = "large", horisontal = true }) => {
  return (
    <View style={[styles.container, horisontal && styles.horizontal]}>
      <ActivityIndicator size={size} color="#111" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    padding: 10,
  },
});

export default Loader;
