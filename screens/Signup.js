import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "react-native";
import React, { useState } from "react";
import { styles, CTA_COLOR, BG_COLOR } from "../styles/styles";
import CustomText from "../components/CustomText";
import CustomIconInput from "../components/CustomIconInput";
import { Feather } from "@expo/vector-icons";
import signUp from "../firebase/auth/signup";
import { useAuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  // Local variables
  const { user } = useAuthContext();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [confpassword, setConfPassword] = useState();
  const localImage = require("../assets/logo_min.png");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function SignupWithEmail() {
    setLoading(true);
    setError();
    console.log(loading);
    if (username && password && email && confpassword) {
      if (password === confpassword) {
        const { error } = await signUp(email, password, username);

        if (error) {
          setError(error.message);
        } else {
          
          navigation.navigate("Login");
        }
      } else {
        setError("Password and Confirm password should be same");
      }
    } else {
      setError("Please fill all feilds");
    }
    setLoading(false);
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: 100,
          paddingHorizontal: 64,
          justifyContent: "space-evenly",
        },
      ]}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0,
        }}
      >
        <Image source={localImage} style={{ marginBottom: 25 }} />

        <CustomText style={{ fontFamily: "Medium", fontSize: 24 }}>
          Signup for a account
        </CustomText>
        <CustomText
          style={{
            fontFamily: "Regular",
            fontSize: 16,
            textAlign: "center",
            lineHeight: 21,
          }}
        >
          Signup with your active email and new password
        </CustomText>
      </View>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <CustomText
          style={{ color: "#D00000", marginBottom: 10, textAlign: "center" }}
        >
          {error}
        </CustomText>
        <CustomIconInput
          icon={<Feather name="user" size={24} color="#00AEFF" />}
          text={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={{ marginBottom: 20 }}
        />

        <CustomIconInput
          icon={<Feather name="mail" size={24} color="#00AEFF" />}
          text={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={{ marginBottom: 20 }}
        />
        <CustomIconInput
          icon={<Feather name="lock" size={24} color="#00AEFF" />}
          text={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={{ marginBottom: 20 }}
          ispassword={true}
        />
        <CustomIconInput
          icon={<Feather name="lock" size={24} color="#00AEFF" />}
          text={confpassword}
          onChangeText={setConfPassword}
          placeholder="Confirm Password"
          style={{ marginBottom: 20 }}
          ispassword={true}
        />

        {loading ? (
          <View style={[styles.buttonFilled, styles.button]}>
            <ActivityIndicator visible={loading} color={BG_COLOR} size={20} />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.buttonFilled, styles.button]}
            onPress={() => SignupWithEmail()}
          >
            <CustomText style={[styles.buttonFilledText]}>Signup</CustomText>
          </TouchableOpacity>
        )}

        <View
          style={{
            marginBottom: 30,
            marginTop: 5,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <CustomText
            style={{
              fontFamily: "Regular",
              fontSize: 16,
            }}
          >
            Already have an account?{" "}
          </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <CustomText
              style={{
                fontFamily: "Medium",
                fontSize: 16,
                color: CTA_COLOR,
              }}
            >
              login
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
{
  /* <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{ width: "40%", height: 1, backgroundColor: "lightgray" }}
          />
          <CustomText style={{ fontFamily: "Regular", marginHorizontal: 10 }}>
            OR
          </CustomText>
          <View
            style={{ width: "40%", height: 1, backgroundColor: "lightgray" }}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { borderWidth: 1, borderColor: "lightgray" }]}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png",
            }}
            style={{
              width: 20,
              height: 20,
              marginRight: 20,
            }}
          />
          <CustomText style={[styles.buttonHollowText]}>
            Continue with Google
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            // styles.button,
            { backgroundColor: "black" },
          ]}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <AntDesign
            name="apple1"
            size={20}
            color={"white"}
            style={{ marginRight: 10 }}
          />
          <CustomText style={[styles.buttonHollowText, { color: "white" }]}>
            Continue with Apple
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonHollow,
            // styles.button,
          ]}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Feather
            name="smartphone"
            size={20}
            color={CTA_COLOR}
            style={[{ marginRight: 10 }]}
          />
          <CustomText style={[styles.buttonHollowText]}>
            Continue with Phone number
          </CustomText>
        </TouchableOpacity>
      </View> */
}
