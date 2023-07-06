import { View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { Image } from "react-native";
import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import CustomText from "../components/CustomText";

export default function FirstScreen({ navigation }) {
  const localImage = require("../assets/logo_named.png");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        paddingTop: 30,
        backgroundColor: BG_COLOR,
        padding: 8,
      }}
    >
      <View style={[styles.container, { justifyContent: "space-evenly" }]}>
        {/* <Auth /> */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={localImage} style={{ marginBottom: 65 }} />
          <CustomText
            style={{
              fontFamily: "Bold",
              fontSize: 27,
              marginHorizontal: 67,
              textAlign: "center",
            }}
          >
            The right place to shop anyday
          </CustomText>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.buttonHollow, styles.button]}
            onPress={() => navigation.navigate("Login")}
          >
            <CustomText style={[styles.buttonHollowText]}>Login</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonFilled, styles.button]}
            onPress={() => navigation.navigate("Signup")}
          >
            <CustomText style={[styles.buttonFilledText]}>Signup</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
