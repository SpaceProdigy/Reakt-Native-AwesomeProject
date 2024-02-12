import React, { useEffect, useState } from "react";

import { View, StyleSheet } from "react-native";

import User from "../components/User";
import ListPosts from "../components/ListPosts";
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectUserId } from "../redux/authSlice";
import { selectIsLoading, selectPictures } from "../redux/picturesSlice";

import { fetchPhotosToFirestor } from "../redux/operations";
import Loader from "../utility/Loader";
import { Text } from "react-native";

export default function PostsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const user = useSelector(selectData);
  const statusLoading = useSelector(selectIsLoading);
  const photos = useSelector(selectPictures);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          await dispatch(fetchPhotosToFirestor(userId));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <View style={styles.screen}>
        <View style={styles.user}>
          {user && (
            <User
              photo={user.photoURL}
              email={user.email}
              name={user.displayName}
            />
          )}
        </View>
        <View style={styles.list}>
          {statusLoading && isLoading ? (
            <Loader />
          ) : photos.length > 0 ? (
            <ListPosts />
          ) : (
            <Text style={styles.text}>У вас поки що немає фото</Text>
          )}
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
  text: {
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 16,
  },
});
