import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";

import Item from "./Item";
import { selectPictures } from "../redux/picturesSlice";
import { useSelector } from "react-redux";

const ListPosts = () => {
  const photos = useSelector(selectPictures);

  return (
    <SafeAreaView style={styles.container}>
      {photos && (
        <FlatList
          data={photos}
          renderItem={({ item, index }) => (
            <Item
              photoID={item.id}
              key={item.id}
              index={index}
              uri={item.image}
              likes={item.likes}
              title={item.photoName}
              location={item.location}
              comments={item.comments}
            />
          )}
          keyExtractor={(item) => item.id}
          extraData={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 32,
  },
});

export default ListPosts;
