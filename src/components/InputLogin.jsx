import { StyleSheet, TextInput } from "react-native";

export default function InputLogin({
  handleInputFocus,
  hendleInputActiveStyle,
  handleInputBlur,
  onChange,
  value,
}) {
  return (
    <>
      <TextInput
        onFocus={() => handleInputFocus("login")}
        onBlur={handleInputBlur}
        style={{
          ...styles.input,
          ...hendleInputActiveStyle("login"),
        }}
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#BDBDBD"
        placeholder="Логін"
        maxLength={30}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    textDecorationLine: "none",
  },
});
