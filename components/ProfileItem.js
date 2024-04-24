import { View, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { CTA_COLOR } from "../styles/styles";

const ProfileItem = ({ icon, name, navigation, destination }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(destination);
      }}
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {icon}
      <CustomText style={{ fontFamily: "Medium", fontSize: 18, marginLeft: 5 }}>
        {name}
      </CustomText>
    </TouchableOpacity>
  );
};

export default ProfileItem;
