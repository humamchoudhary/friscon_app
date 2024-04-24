import { SafeAreaView, View } from "react-native";
import React from "react";
import { BG_COLOR, CTA_COLOR, DARK_COLOR, styles } from "../styles/styles";
import { Feather } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import { ScrollView } from "react-native-gesture-handler";

const Privacy = ({ navigation }) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: BG_COLOR,
          paddingTop: 30,
          paddingHorizontal: 20,
        },
      ]}
    >
      <View
        style={[
          styles.appBar,
          {
            marginBottom: 30,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather
            name="arrow-left"
            size={24}
            color={CTA_COLOR}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 24, marginLeft: 20 }}
          >
            Privacy Policy
          </CustomText>
        </View>
      </View>

      <ScrollView>
        <CustomText
          style={{ fontFamily: "Medium", fontSize: 20, color: CTA_COLOR }}
        >
          Privacy Policy
        </CustomText>
        <CustomText
          style={{ fontFamily: "Medium", fontSize: 14, color: DARK_COLOR }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industrys standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </CustomText>
        <CustomText
          style={{ fontFamily: "Medium", fontSize: 14, color: DARK_COLOR }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industrys standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;
