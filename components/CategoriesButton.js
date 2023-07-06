import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import CustomText from "./CustomText";

const CategoriesButton = ({ icon, active, text, name, setActive }) => {
  function ActiveSelf() {
    setActive(name);
  }
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          ActiveSelf();
        }}
        style={[
          active === name ? styles.buttonFilled : styles.buttonHollow,
          styles.Catbutton,
          { marginBottom: 5 },
        ]}
      >
        <Image
          source={icon}
          style={{ tintColor: active === name ? BG_COLOR : CTA_COLOR }}
        />
      </TouchableOpacity>
      <CustomText style={{ fontFamily: "Medium", fontSize: 14 }}>
        {text}
      </CustomText>
    </View>
  );
};

export default CategoriesButton;
