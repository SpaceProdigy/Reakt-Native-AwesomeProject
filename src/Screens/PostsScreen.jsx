import React from "react";

import { View, StyleSheet } from "react-native";

import User from "../components/User";
import ListPosts from "../components/ListPosts";
import { useSelector } from "react-redux";
import { selectData } from "../redux/authSlice";

export default function PostsScreen() {
  const user = useSelector(selectData);

  return (
    <>
      <View style={styles.screen}>
        <View style={styles.user}>
          <User
            photo={user?.photoURL}
            email={user?.email}
            name={user?.displayName}
          />
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
  user: { marginLeft: 16, marginTop: 32, marginBottom: 32 },
  list: { flex: 1 },
});
