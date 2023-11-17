import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";

import DATA from "../data/usersData/photos.json";
import Item from "./Item";

const ListPosts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA.images}
        renderItem={({ item }) => (
          <Item
            uri={item.url}
            title={item.title}
            location={item.location}
            comments={item.comments}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ListPosts;
