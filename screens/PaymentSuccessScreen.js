import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import CustomText from "../components/CustomText";
const PaymentSuccessScreen = ({ navigation }) => {
  const image = require("../assets/confirmationSuccess.jpg");
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: CTA_COLOR,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
      }}
    >
      <Image
        source={image}
        style={{ width: "70%", height: "35%" }}
        resizeMode="contain"
      />
      <CustomText
        style={{ fontFamily: "Medium", fontSize: 24, color: BG_COLOR }}
      >
        Order Placed!
      </CustomText>
      <CustomText
        style={{
          fontFamily: "Light",
          fontSize: 14,
          color: BG_COLOR,
          textAlign: "center",
        }}
      >
        Your order has been placed successfully, For more details go to track
        orders.
      </CustomText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.5,
            paddingVertical: 7,
            borderColor: BG_COLOR,
            borderRadius: 5,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 16, color: BG_COLOR }}
          >
            Track Order
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.5,
            paddingVertical: 7,
            backgroundColor: BG_COLOR,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate("home");
          }}
        >
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 16, color: CTA_COLOR }}
          >
            Shop More
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;
