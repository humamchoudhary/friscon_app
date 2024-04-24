import { SafeAreaView, View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { BG_COLOR, CTA_COLOR, DARK_COLOR, styles } from "../styles/styles";
import CustomText from "../components/CustomText";
import { Feather } from "@expo/vector-icons";
import { useAuthContext } from "../context/AuthContext";
import _updateProfile from "../firebase/auth/updateProfile";
import ProfileItem from "../components/ProfileItem";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ProfileScreen = ({ navigation }) => {
  const { user } = useAuthContext();
  useEffect(() => {
    // _updateProfile({
    //   displayName: "Muhammad Humam",
    // }).then((_) => {
    //   console.log(user);
    // });
  }, []);

  return (
    user && (
      <SafeAreaView
        style={[
          {
            backgroundColor: BG_COLOR,
            flex: 1,
            paddingHorizontal: 20,
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            backgroundColor: CTA_COLOR,
            width: Dimensions.get("screen").width,
            height: "40%",
            paddingTop: 130,
            paddingHorizontal: 20,
            position: "absolute",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              marginBottom: 20,
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            <Feather
              name="arrow-left"
              size={24}
              color={BG_COLOR}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <CustomText
              style={{
                color: BG_COLOR,
                fontFamily: "Medium",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              Profile
            </CustomText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: DARK_COLOR,
              }}
            />
            <View>
              <CustomText
                style={{
                  color: BG_COLOR,
                  fontFamily: "Medium",
                  fontSize: 14,
                  marginLeft: 10,
                }}
              >
                {user.displayName}
              </CustomText>
              <CustomText
                style={{
                  color: BG_COLOR,
                  fontFamily: "Light",
                  fontSize: 14,
                  marginLeft: 10,
                }}
              >
                {user.email}
              </CustomText>
            </View>
          </View>
        </View>
        <View
          style={[
            {
              marginTop: "70%",
              backgroundColor: BG_COLOR,
              width: "100%",
              paddingHorizontal: 20,
              borderRadius: 20,
              paddingVertical: 10,
            },
            styles.shadow,
          ]}
        >
          <ProfileItem
            navigation={navigation}
            icon={
              <Ionicons
                name="ios-location-outline"
                size={20}
                color={CTA_COLOR}
              />
            }
            name={"Shipping Address"}
            destination={"address"}
          />
          <View
            style={{
              width: "100%",
              height: 1,
              opacity: 0.25,

              backgroundColor: CTA_COLOR,
            }}
          />
          <ProfileItem
            navigation={navigation}
            icon={<Feather name="list" size={20} color={CTA_COLOR} />}
            name={"Order History"}
            destination={"orderHistoryList"}
          />
          <View
            style={{
              width: "100%",
              height: 1,
              opacity: 0.25,

              backgroundColor: CTA_COLOR,
            }}
          />

          <ProfileItem
            navigation={navigation}
            icon={<Feather name="lock" size={20} color={CTA_COLOR} />}
            name={"Privacy Policy"}
            destination={"privacy"}
          />
          <View
            style={{
              width: "100%",
              height: 1,
              opacity: 0.25,

              backgroundColor: CTA_COLOR,
            }}
          />
          <ProfileItem
            navigation={navigation}
            icon={<Feather name="info" size={20} color={CTA_COLOR} />}
            name={"About Friscon"}
            destination={"about"}
          />
          <View
            style={{
              width: "100%",
              height: 1,
              opacity: 0.25,

              backgroundColor: CTA_COLOR,
            }}
          />
          <ProfileItem
            navigation={navigation}
            icon={<Feather name="log-out" size={20} color={CTA_COLOR} />}
            name={"Logout"}
            destination={"logout"}
          />
        </View>
      </SafeAreaView>
    )
  );
};

export default ProfileScreen;
