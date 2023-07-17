import { TextInput, StyleSheet, View } from "react-native";
import React from "react";
import { CTA_COLOR } from "../styles/styles";

const CustomInput = ({ text, onChangeText, style, placeholder }) => {
  return (
    <View style={style}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={text}
        // {...props}
        multiline
        numberOfLines={8}
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
    borderColor: CTA_COLOR,
  },
});
export default CustomInput;
