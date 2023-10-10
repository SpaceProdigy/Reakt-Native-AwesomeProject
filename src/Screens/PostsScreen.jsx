import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";

import User from "../components/User";
import ListPosts from "../components/ListPosts";

export default function PostsScreen() {
  return (
    <>
      <View style={styles.screen}>
        <View style={styles.user}>
          <User />
        </View>
        <View style={styles.list}>
          <ListPosts />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  user: { marginLeft: 16, marginTop: 32 },
  list: { flex: 1 },
});
