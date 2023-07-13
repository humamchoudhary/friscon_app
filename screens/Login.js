import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "react-native";
import React, { useEffect, useState } from "react";
import { styles, CTA_COLOR, BG_COLOR } from "../styles/styles";
import CustomText from "../components/CustomText";
import CustomIconInput from "../components/CustomIconInput";
import { Feather } from "@expo/vector-icons";
import { CheckBox } from "@aziz_kizgin/react-native-checkbox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebaseConfig";
import * as SecureStore from "expo-secure-store";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const localImage = require("../assets/logo_min.png");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function setInit() {
      await SecureStore.setItemAsync("autolog", true);
    }
    setInit();
  }, []);

  async function LoginWithEmail() {
    setLoading(true);
    setError();
    setEmail(email.replace(" ", ""));
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          if (isChecked) {
            await SecureStore.setItemAsync("autolog", "true");
          }
          navigation.navigate("home");
        })
        .catch((e) => {
          console.log(e);
          if (e.code === "auth/invalid-email") {
            setError("Account does not exists");
          } else {
            setError("Network Error occured try again later");
            console.log("Signup failed", e.code);
          }
        });
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
          paddingTop: 140,
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
        }}
      >
        <Image source={localImage} style={{ marginBottom: 25 }} />

        <CustomText style={{ fontFamily: "Medium", fontSize: 24 }}>
          Login to your account
        </CustomText>
        <CustomText
          style={{
            fontFamily: "Regular",
            fontSize: 16,
            textAlign: "center",
            lineHeight: 21,
          }}
        >
          Login with your registered email and password
        </CustomText>
      </View>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        <CustomText
          style={{ color: "#D00000", marginBottom: 10, textAlign: "center" }}
        >
          {error}
        </CustomText>
        <CustomIconInput
          icon={<Feather name="user" size={24} color="#00AEFF" />}
          text={email}
          onChangeText={setEmail}
          placeholder="Email or Phone number"
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
          }}
        >
          <View style={{ marginRight: 10 }}>
            <CheckBox
              isChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              customColor="#00AEFF"
              size={16}
              iconColor="#ffffff"
              // colorScheme={CTA_COLOR}
            />
          </View>
          <CustomText
            style={{
              fontFamily: "Regular",
              fontSize: 14,

              lineHeight: 21,
            }}
          >
            Remember me
          </CustomText>
        </View>
        {loading ? (
          <View style={[styles.buttonFilled, styles.button]}>
            <ActivityIndicator visible={loading} color={BG_COLOR} size={20} />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.buttonFilled, styles.button]}
            onPress={() => LoginWithEmail()}
          >
            <CustomText style={[styles.buttonFilledText]}>Login</CustomText>
          </TouchableOpacity>
        )}

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            display: "flex",
          }}
        >
          <TouchableOpacity>
            <CustomText
              style={[
                styles.underLinedPrimText,
                {
                  marginVertical: 20,
                  fontFamily: "Medium",
                  fontSize: 16,
                },
              ]}
            >
              Forgot Password
            </CustomText>
          </TouchableOpacity>
          <View
            style={{
              marginBottom: 0,
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
              Don't have an account?{" "}
            </CustomText>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <CustomText
                style={{
                  fontFamily: "Medium",
                  fontSize: 16,
                  color: CTA_COLOR,
                }}
              >
                Signup
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
</View> */
}
