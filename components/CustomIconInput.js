import { View, TextInput } from "react-native";
import React from "react";
import { styles } from "../styles/styles";

const CustomIconInput = ({
  text,
  onChangeText,
  style,
  placeholder,
  icon,
  ispassword = false,
  onBlur = () => {},
}) => {
  return (
    <View style={[styles.CompleteInput, style]}>
      {icon}
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={text}
        secureTextEntry={ispassword}
        onBlur={onBlur}
      />
    </View>
  );
};

export default CustomIconInput;
