import { TextInput, StyleSheet, View } from "react-native";
import React from "react";
import { CTA_COLOR } from "../styles/styles";

const CustomInput = ({ text, onChangeText, style, placeholder, error }) => {
  return (
    <View style={style}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? "red" : CTA_COLOR,
            color: error ? "red" : CTA_COLOR,
          },
        ]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={text}
        // {...props}
        multiline
        numberOfLines={14}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    fontFamily: "Regular",

    borderRadius: 10,
  },
});
export default CustomInput;
