import { StyleSheet, Text } from "react-native";

export function InputTextErrorRegistration({ errors, textError }) {
  return errors ? (
    <Text style={styles.error}>{errors}</Text>
  ) : (
    <Text style={styles.error}>
      {textError === "auth/email-already-in-use" &&
        "Така пошта вже зареєстрована"}
    </Text>
  );
}

export function InputTextErrorAuthentication({ errors, textError }) {
  return errors ? (
    <Text style={styles.error}>{errors}</Text>
  ) : (
    <Text style={styles.error}>
      {textError === "auth/invalid-credential" && "Невірна пошта або пароль"}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    height: 16,
    fontFamily: "Roboto_400Regular",
    fontSize: 11,
    color: "#ff5454",
    marginTop: 2,
    marginLeft: 3,
  },
});
