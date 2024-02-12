import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import "moment/locale/uk";
import { Ionicons } from "@expo/vector-icons";

import anonymous from "../images/anonymous.jpg";
import { deleteCommentsToFirestor } from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/authSlice";
import { selectIsLoading } from "../redux/picturesSlice";
import Loader from "../utility/Loader";

export default function Comments({
  avatar,
  text,
  date,
  userId,
  commetnId,
  index,
  photoID,
  id,
}) {
  const dispatch = useDispatch();
  const uid = useSelector(selectUserId);
  const statusLoading = useSelector(selectIsLoading);
  const [pressButton, setPressButton] = useState(null);

  moment.locale("uk");
  const formatDate = new Date(date);
  const time = moment(formatDate).format("HH:mm");
  const month = moment(formatDate).format("DD MMMM, YYYY");

  const onPressTrash = async (idComment) => {
    await dispatch(deleteCommentsToFirestor({ uid, photoID, idComment }));
  };

  useEffect(() => {
    if (!statusLoading) {
      setPressButton(null);
    }
  }, [statusLoading]);

  return (
    <View
      style={{
        ...styles.wrapperComment,
        flexDirection: commetnId === userId ? "row-reverse" : "row",
        marginTop: index === 0 ? 0 : 24,
      }}
    >
      <Image
        source={avatar ? { uri: avatar } : anonymous}
        style={{
          ...styles.avatar,
          marginRight: commetnId === userId ? 0 : 16,
          marginLeft: commetnId === userId ? 16 : 0,
        }}
      />

      <View style={styles.wrapperText}>
        <Text style={styles.text}>{text}</Text>
        <Text
          style={{
            ...styles.time,
            textAlign: commetnId === userId ? "left" : "right",
          }}
        >{`${month} | ${time}`}</Text>
        {pressButton !== id ? (
          <TouchableOpacity
            style={styles.bin}
            onPress={() => {
              onPressTrash(id);
              setPressButton(id);
            }}
            disabled={statusLoading}
          >
            <Ionicons name="trash-bin-outline" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        ) : (
          <View style={styles.Loader}>
            <Loader size={15} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperComment: {
    alignItems: "flex-start",
  },

  avatar: {
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
  },
  bin: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  Loader: { position: "absolute", right: 2, bottom: 3 },
});
