import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function InputPassword({
  handleClick,
  isShowPassword,
  handleInputFocus,
  hendleInputActiveStyle,
  handleInputBlur,
  onChange,
  value,
}) {
  return (
    <>
      <View>
        <TouchableOpacity
          onPress={handleClick}
          style={styles.wrapperShowPassword}
        >
          <Text style={styles.showPasswordText}>
            {isShowPassword ? "Показати" : "Cховати"}
          </Text>
        </TouchableOpacity>
        <TextInput
          onFocus={() => handleInputFocus("password")}
          onBlur={handleInputBlur}
          style={{
            ...styles.input,
            ...hendleInputActiveStyle("password"),
          }}
          value={value}
          onChangeText={onChange}
          secureTextEntry={isShowPassword}
          placeholderTextColor="#BDBDBD"
          autoComplete="password"
          placeholder="Пароль"
          maxLength={50}
          autoCapitalize="none"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapperShowPassword: {
    position: "absolute",
    right: 16,
    top: "30%",
    zIndex: 1,
  },
  showPasswordText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
  },

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
