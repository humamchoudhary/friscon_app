import {  TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({ text, onChangeText, style, placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={text}
      
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    fontFamily: "Regular",
  },
});
export default CustomInput;
