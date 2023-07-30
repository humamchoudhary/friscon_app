import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import CustomText from "../components/CustomText";
import CustomIconInput from "../components/CustomIconInput";
import { Feather } from "@expo/vector-icons";
import resetPassword from "../firebase/auth/resetPass";

const ForgotPass = ({ navigation }) => {
  const logomini = require("../assets/logo_min.png");
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState();
  const [errorlocal, setError] = useState();
  const [loading, setLoading] = useState(false);
  async function handleReset() {
    if (email) {
      setLoading(true);
      const { error } = await resetPassword(email);
      if (error) {
        setError(error.code);
      } else {
        setStage(1);
      }
    } else {
      setError("Please input your Email");
    }
    setLoading(false);
  }

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: BG_COLOR,
          minHeight: "100%",
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingHorizontal: 50,
        },
      ]}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={logomini} />
        <CustomText
          style={{ fontFamily: "Medium", fontSize: 24, marginTop: 20 }}
        >
          Forgot Password
        </CustomText>
        {stage === 0 ? (
          <CustomText
            style={{ textAlign: "center", fontSize: 14, fontFamily: "Regular" }}
          >
            Enter your email address. A link will be sent to the address
            containaing the reset process
          </CustomText>
        ) : (
          <CustomText
            style={{ textAlign: "center", fontSize: 14, fontFamily: "Regular" }}
          >
            A code has been sent to your email and phone number, Please enter
            the code here.
          </CustomText>
        )}
      </View>
      {stage === 0 ? (
        <View>
          {errorlocal && (
            <CustomText
              style={{
                color: "#D00000",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {errorlocal}
            </CustomText>
          )}
          <CustomIconInput
            text={email}
            onChangeText={setEmail}
            icon={<Feather name="user" size={24} color="#00AEFF" />}
            placeholder={"Email"}
          />
        </View>
      ) : null}
      <View>
        {stage === 0 && loading ? (
          <View style={[styles.buttonFilled, styles.button]}>
            <ActivityIndicator visible={loading} color={BG_COLOR} size={20} />
          </View>
        ) : (
          stage === 0 && (
            <TouchableOpacity
              onPress={() => {
                handleReset();
              }}
              style={[styles.button, styles.buttonFilled]}
            >
              <CustomText style={[styles.buttonFilledText]}>
                Send Email
              </CustomText>
            </TouchableOpacity>
          )
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={[styles.button, stage === 1 && styles.buttonFilled]}
        >
          <CustomText
            style={[
              stage === 1 && styles.buttonFilledText,
              { color: stage === 0 ? CTA_COLOR : BG_COLOR },
            ]}
          >
            Login
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPass;

const stylesLocal = StyleSheet.create({});
