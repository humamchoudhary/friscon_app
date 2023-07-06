import { View, Text } from "react-native";
import React from "react";
import { auth } from "./firebaseConfig";
const Auth = () => {
  console.log(auth.currentUser);
  return <View></View>;
};

export default Auth;
