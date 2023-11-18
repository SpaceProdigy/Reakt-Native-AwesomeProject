import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { useNavigation } from "@react-navigation/native";
import SvgMassage from "../images/svg/SvgMassage";
import SvgMapLocation from "../images/svg/SvgMapLocation";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Item = ({ uri, title, location, comments, index }) => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  const onPressComments = () => {
    navigation.navigate("CommentsScreen", { uri, comments });
  };

  const onPressLocation = () => {
    navigation.navigate("MapScreen", { location });
  };

  return (
    <View style={{ ...styles.item, paddingTop: index === 0 ? 0 : 32 }}>
      <Image source={{ uri: uri }} style={styles.image} />
      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.wrapper}>
        <View style={styles.box}>
          <TouchableOpacity onPress={onPressComments}>
            <SvgMassage width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.countComments}>{comments.length}</Text>
        </View>
        <TouchableOpacity onPress={onPressLocation}>
          <View style={styles.box}>
            <SvgMapLocation width={24} height={24} />
            <Text style={styles.mapText}>{location}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 16,
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

export default Item;
