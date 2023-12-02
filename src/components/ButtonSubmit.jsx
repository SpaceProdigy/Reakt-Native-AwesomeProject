import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Loader from "../utility/Loader";
import { Text } from "react-native";

export default function ButtonSubmit({
  handleSubmit,
  onPressButton,
  buttonIsDisable = false,
  naming,
}) {
  return (
    <>
      <TouchableOpacity
        disabled={buttonIsDisable}
        title="Submit"
        style={styles.button}
        onPress={handleSubmit(onPressButton)}
      >
        {buttonIsDisable ? (
          <Loader />
        ) : (
          <Text style={styles.textButton}>{naming}</Text>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 43,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
  },
  textButton: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
});
