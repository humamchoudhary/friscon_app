import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, ScrollView } from "react-native";

import CustomText from "../components/CustomText";
import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import { Feather } from "@expo/vector-icons";
import { db, storage } from "../components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import TopBrandsButton from "../components/TopBrandsButton";

import { useAuthContext } from "../context/AuthContext";
const OffersScreen = () => {
  const { user } = useAuthContext();
  useEffect(() => {
    console.log(user);
  }, []);

  const [topBrands, setTopBrands] = useState();
  const [offersData, setOffersData] = useState();
  useEffect(() => {
    getDoc(doc(db, "market", "offers")).then(async (_) => {
      var data = _.data()["data"];
      for (let i = 0; i < data.length; i++) {
        const key = Object.keys(data[i])[0];
        const value = data[i][key];

        const url = await getDownloadURL(ref(storage, value["img"]));
        data[i][key].img = url;
      }
      setOffersData(data);
    });
    getDoc(doc(db, "market", "offers")).then((brands) => {
      setTopBrands(brands.data()["brands"]);
    });
  }, []);
  console.log(offersData);
  return (
    <SafeAreaView style={{ backgroundColor: BG_COLOR, flex: 1 }}>
      <View
        style={[
          styles.appBar,
          {
            paddingHorizontal: 30,
            marginBottom: 30,
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Feather name="arrow-left" size={24} color={CTA_COLOR} />
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 24, marginLeft: 20 }}
          >
            Offers
          </CustomText>
        </View>
        <Feather name="shopping-cart" size={24} color="black" />
      </View>

      <View style={{ marginHorizontal: 20 }}>
        {offersData ? (
          offersData.map((item, index) => {
            const key = Object.keys(item)[0];
            console.log(item[key].img);
            return (
              <View
                key={index}
                style={{ flexDirection: "column", marginBottom: 18 }}
              >
                <CustomText style={{ fontFamily: "Medium", fontSize: 18 }}>
                  {key}
                </CustomText>
                <TouchableOpacity
                  style={[stylesLocal.carouselItem, styles.shadow]}
                >
                  <Image
                    source={{ uri: item[key].img }}
                    style={{
                      flex: 1,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View
            style={[
              stylesLocal.container,
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <ActivityIndicator size={40} color={CTA_COLOR} visible={true} />
          </View>
        )}
      </View>
      {topBrands && (
        <View>
          <CustomText
            style={{
              fontFamily: "Medium",
              fontSize: 20,
              marginBottom: 10,
              marginLeft: 30,
            }}
          >
            Sales on Brands
          </CustomText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            style={{ marginRight: 0 }}
            contentInset={{ top: 0, left: 30, bottom: 0, right: 0 }}
          >
            <View style={{ flexDirection: "row", paddingLeft: 30 }}>
              {topBrands.map((item, index) => {
                return (
                  <TopBrandsButton key={index} id={item} onPress={() => {}} />
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OffersScreen;
const stylesLocal = StyleSheet.create({
  carouselItem: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CTA_COLOR,
    width: Dimensions.get("window").width - 40,
    height: 120,
    borderRadius: 9,
    overflow: "hidden",
  },
});
