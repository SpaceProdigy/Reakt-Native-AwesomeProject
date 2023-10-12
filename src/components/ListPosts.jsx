import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import SvgMassage from "../images/svg/SvgMassage";
import SvgMapLocation from "../images/svg/SvgMapLocation";
import DATA from "../data/usersData/photos.json";

const Item = ({ uri, title, location, comments }) => {
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
    <View style={styles.item}>
      <Image source={{ uri: uri }} style={styles.image} />
      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.wrapper}>
        <View style={styles.box}>
          <SvgMassage width={24} height={24} />
          <Text style={styles.countComments}>{comments}</Text>
        </View>
        <View style={styles.box}>
          <SvgMapLocation width={24} height={24} />
          <Text style={styles.mapText}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

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
  item: {
    marginHorizontal: 16,
    paddingTop: 32,
  },
  image: {
    height: 240,
    borderRadius: 8,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  box: { flexDirection: "row", alignItems: "center" },
  countComments: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginLeft: 6,
  },
  mapText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    marginLeft: 4,
  },
  textTitle: {
    marginTop: 8,
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
});

export default ListPosts;
