import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function CommentsScreen({ route }) {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  const { uri, comments } = route.params;

  return (
    <>
      <SafeAreaView style={styles.mainWrapper}>
        <Image source={{ uri: uri }} style={styles.image} />

        <FlatList
          style={styles.list}
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.wrapperComment}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              <View style={styles.wrapperText}>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.time}>{`${item.date} | ${item.time}`}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          extraData={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    marginHorizontal: 16,
    paddingTop: 32,
  },
  list: {
    marginTop: 8,
    marginBottom: 32,
  },

  wrapperComment: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 24,
  },

  image: {
    height: 240,
    borderRadius: 8,
  },
  avatar: {
    marginRight: 16,
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
    textAlign: "right",
  },
});
