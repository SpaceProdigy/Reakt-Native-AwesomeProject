import React, { useEffect, useState } from "react";
import { Keyboard, Text, TouchableOpacity } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import Comments from "../components/Comments";
import { TouchableWithoutFeedback } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import {
  addCommentsToFirestor,
  fetchCommentsToFirestor,
} from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../redux/authSlice";
import { selectComments, selectIsLoading } from "../redux/picturesSlice";
import Loader from "../utility/Loader";

const phrases = [
  "Гарне фото...",
  "Прекрасний кадр!",
  "Вражаюча фотографія!",
  "Чудовий момент!",
  "Справжнє мистецтво!",
  "Фантастичний знімок!",
  "Бездоганно!",
  "Прекрасний вибір ракурсу!",
  "Чарівна атмосфера!",
  "Дуже гарне світло!",
];

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [emptyComment, setEmptyComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [numExample, setNumExample] = useState(0);
  const statusLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const user = useSelector(selectData);
  const comments = useSelector(selectComments);
  const [pressButton, setPressButton] = useState(null);

  const { uri, photoID } = route.params;

  const fatchData = { id: user.uid, photoId: photoID };

  useEffect(() => {
    if (!statusLoading) {
      setPressButton(null);
    }
  }, [statusLoading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCommentsToFirestor(fatchData));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };
  const hendleInputActiveStyle = (value) => {
    return {
      borderColor: activeInput === value ? "#FF6C00" : "#E8E8E8",
      backgroundColor: activeInput === value ? "#FFFFFF" : "#E8E8E8",
    };
  };

  const onPressButton = async () => {
    if (!comment || comment.trim() === "") {
      setEmptyComment(true);
      setComment(null);
      if (numExample === phrases.length - 1) {
        setNumExample(0);
        return;
      }
      setNumExample((prevNum) => prevNum + 1);
      return;
    }
    setPressButton("sendBtn");
    const currentDate = new Date().toISOString();
    await dispatch(
      addCommentsToFirestor({
        photoId: photoID,
        uid: user.uid,
        addcomment: {
          text: comment.trim(),
          user: {
            login: user.displayName,
            id: user.uid,
            avatar: user.photoURL,
          },
          date: currentDate,
        },
      })
    );

    setEmptyComment(null);
    setComment(null);
    setActiveInput(null);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainWrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Image source={{ uri: uri }} style={styles.image} />
          </TouchableWithoutFeedback>

          <SafeAreaView style={styles.listWrapper}>
            {isLoading ? (
              <Loader />
            ) : comments.length > 0 ? (
              <FlatList
                data={comments}
                renderItem={({ item, index }) => {
                  return (
                    <Comments
                      index={index}
                      userId={user.uid}
                      commetnId={item.user.id}
                      avatar={item.user.avatar}
                      text={item.text}
                      date={item.date}
                      photoID={photoID}
                      id={item.id}
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
                extraData={(item) => item.id}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="interactive"
              />
            ) : (
              <Text style={styles.text}>Коментарі відсутні</Text>
            )}
          </SafeAreaView>
          <View style={styles.inputWrapper}>
            <TextInput
              onFocus={() => handleInputFocus("comment")}
              onBlur={handleInputBlur}
              style={{
                ...styles.input,
                ...hendleInputActiveStyle("comment"),
              }}
              value={comment}
              onChangeText={setComment}
              placeholder={
                emptyComment
                  ? `Приклад: ${phrases[numExample]} `
                  : "Коментувати..."
              }
              placeholderTextColor={emptyComment ? "#f97c7c9c" : "#BDBDBD"}
              maxLength={100}
            />
            {pressButton === "sendBtn" && !isLoading ? (
              <View style={styles.loader}>
                <Loader size={34} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={onPressButton}
                style={{
                  ...styles.iconButtonWrapper,
                  opacity: statusLoading ? 0.5 : 1,
                }}
                disabled={statusLoading}
              >
                <View>
                  <AntDesign name="arrowup" size={18} color="#fff" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  image: {
    height: 240,
    borderRadius: 8,
  },

  listWrapper: {
    flex: 1,
    paddingTop: 32,
    marginBottom: 32,
  },
  inputWrapper: {
    position: "relative",
  },

  input: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    lineHeight: 19.36,
    height: 50,
    borderWidth: 1,
    borderRadius: 40,
    padding: 16,
    textDecorationLine: "none",
  },

  iconButtonWrapper: {
    position: "absolute",
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 16,
  },
  loader: {
    position: "absolute",
    right: 8,
  },
});
