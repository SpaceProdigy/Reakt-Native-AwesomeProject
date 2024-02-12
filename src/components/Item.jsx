import React, { createRef, useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import SvgMassage from "../images/svg/SvgMassage";
import SvgMapLocation from "../images/svg/SvgMapLocation";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import SvgLike from "../images/svg/SvgLikeIcon";
import { addLikeToFirestor } from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/authSlice";
import { selectIsLoading } from "../redux/picturesSlice";
import Loader from "../utility/Loader";

const Item = ({ photoID, uri, title, location, comments, index, likes }) => {
  const navigation = useNavigation();
  const uid = useSelector(selectUserId);
  const route = useRoute();
  const dispatch = useDispatch();
  const statusLoading = useSelector(selectIsLoading);
  const [isLike, setIsLike] = useState(false);
  const { width } = useWindowDimensions();
  const [pressButton, setPressButton] = useState(null);

  useEffect(() => {
    if (!statusLoading) {
      setPressButton(null);
    }
  }, [statusLoading]);

  useEffect(() => {
    if (likes.length > 0) {
      const result = likes.findIndex((item) => item[uid]);
      if ((result) => 0) {
        setIsLike(true);
      }
    } else {
      setIsLike(false);
    }
  }, [likes]);

  const onPressComments = () => {
    navigation.navigate("CommentsScreen", { uri, comments, photoID });
  };

  const onPressLocation = () => {
    navigation.navigate("MapScreen", { location });
  };

  const onPressLike = () => {
    setPressButton("like");

    dispatch(addLikeToFirestor({ photoID, uid }));
  };

  return (
    <View style={{ ...styles.item, paddingTop: index === 0 ? 0 : 32 }}>
      <Image source={{ uri: uri }} style={styles.image} />
      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.wrapper}>
        <View style={styles.boxWrapper}>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={onPressComments}
              disabled={statusLoading}
            >
              <SvgMassage
                stroke={
                  route.name === "ProfileScreen" && comments > 0 && "#FF6C00"
                }
                fill={
                  route.name === "ProfileScreen" && comments > 0 && "#FF6C00"
                }
                width={24}
                height={24}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.countComments,
                route.name === "ProfileScreen" && styles.countAccent,
              ]}
            >
              {comments ? comments : 0}
            </Text>
          </View>
          {route.name === "ProfileScreen" && (
            <View style={styles.boxLike}>
              <TouchableOpacity onPress={onPressLike} disabled={statusLoading}>
                {pressButton === "like" && (
                  <View style={{ ...styles.loaderLike }}>
                    <Loader size={15} />
                  </View>
                )}
                <SvgLike
                  width={24}
                  height={24}
                  fill={route.name === "ProfileScreen" && isLike && "#FF6C00"}
                />
              </TouchableOpacity>
              <Text style={styles.countAccent}>{likes ? likes.length : 0}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={onPressLocation} disabled={statusLoading}>
          <View style={{ ...styles.boxLocation, width: width / 2 }}>
            <SvgMapLocation width={24} height={24} />

            <Text
              style={{ ...styles.mapText }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {location}
            </Text>
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
  boxLocation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  boxLike: { flexDirection: "row", alignItems: "center", marginLeft: 24 },
  boxWrapper: { flexDirection: "row" },
  countComments: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginLeft: 6,
  },
  countAccent: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    marginLeft: 6,
  },

  mapText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
    marginLeft: 4,
    textDecorationLine: "underline",
  },
  textTitle: {
    marginTop: 8,
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  loader: { position: "absolute", left: -25 },
  loaderLike: { position: "absolute", top: -17, right: -17 },
});

export default Item;
