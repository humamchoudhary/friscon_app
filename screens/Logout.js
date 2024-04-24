import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { BG_COLOR, CTA_COLOR } from "../styles/styles";
import signout from "../firebase/auth/logout";

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    async function handleSignout() {
      await signout().then(() => {
        navigation.navigate("splash ");
      });
    }
    handleSignout();
  }, []);

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: BG_COLOR,
          flex: 1,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <ActivityIndicator
        visible={true}
        color={CTA_COLOR}
        size={40}
        style={{
          marginBottom: 20,
        }}
      />
      <Text>Logging Out ... </Text>
    </SafeAreaView>
  );
};

export default LogoutScreen;
