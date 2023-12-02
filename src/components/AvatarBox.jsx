import { TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function AvatarBox({ selectedImage, pickImage, removeImage }) {
  return (
    <>
      <View style={styles.avatarBox}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}
        <TouchableOpacity
          style={[
            styles.iconAdd,
            selectedImage && {
              backgroundColor: "#fff",
              transform: [{ rotate: "50deg" }],
            },
          ]}
          onPress={!selectedImage ? pickImage : removeImage}
        >
          <AntDesign
            name="pluscircleo"
            size={25}
            color={!selectedImage ? "#FF6C00" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  avatarBox: {
    top: 60,
    width: 132,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#E8E8E8",
    zIndex: 1,
  },
  box: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingVertical: 32,
    paddingHorizontal: 16,
    width: "100%",
  },
  image: { flex: 1, borderRadius: 16 },
  iconAdd: {
    position: "absolute",
    bottom: 16,
    right: -12,
    borderRadius: 50,
  },
});
