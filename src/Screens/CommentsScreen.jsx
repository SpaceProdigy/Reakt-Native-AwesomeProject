import React, { useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import { AntDesign } from "@expo/vector-icons";

import users from "../data/usersData/users.json";
import Comments from "../components/Comments";
import { TouchableWithoutFeedback } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

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
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  const [comment, setComment] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [emptyComment, setEmptyComment] = useState(null);
  const [numExample, setNumExample] = useState(0);

  const { uri, comments } = route.params;

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

  const onPressButton = () => {
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
    console.log(
      `Comment:${comment.trim()}
    
     `
    );
    setEmptyComment(null);
    setComment(null);
    setActiveInput(null);
    Keyboard.dismiss();
  };

  if (!fontsLoaded) {
    return null;
  }

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
            <FlatList
              data={comments}
              renderItem={({ item, index }) => {
                return (
                  <Comments
                    index={index}
                    userId={users[0].id}
                    commetnId={item.user.id}
                    avatar={item.user.avatar}
                    text={item.text}
                    date={item.date}
                    time={item.time}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
              extraData={(item) => item.id}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="interactive"
            />
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
              placeholderTextColor={emptyComment ? "#ff5454" : "#BDBDBD"}
              maxLength={100}
            />
            <TouchableOpacity
              onPress={onPressButton}
              style={styles.iconButtonWrapper}
            >
              <View>
                <AntDesign name="arrowup" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
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
});
