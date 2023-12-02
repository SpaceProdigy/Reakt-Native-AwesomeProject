import { StyleSheet, TextInput } from "react-native";

export default function InputEmail({
  handleInputFocus,
  hendleInputActiveStyle,
  handleInputBlur,
  onChange,
  value,
}) {
  return (
    <>
      <TextInput
        onFocus={() => handleInputFocus("email")}
        onBlur={handleInputBlur}
        style={{
          ...styles.input,
          ...hendleInputActiveStyle("email"),
        }}
        value={value}
        onChangeText={onChange}
        placeholder="Адреса електронної пошти"
        keyboardType="email-address"
        placeholderTextColor="#BDBDBD"
        maxLength={50}
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
