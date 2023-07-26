import {
  ScrollView,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, CTA_COLOR, BG_COLOR } from "../styles/styles";
import CustomIconInput from "../components/CustomIconInput";
import { Feather } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import CategoriesButton from "../components/CategoriesButton";
import { useState, useEffect } from "react";
import { db } from "../components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Highlight from "../components/Highlight";
import TopBrandsButton from "../components/TopBrandsButton";
import ProductThumbnail from "../components/ProductThumbnail";

export default function HomeScreen({ navigation }) {
  const men = require("../assets/men.png");
  const baby = require("../assets/baby.png");
  const women = require("../assets/women.png");
  const cloth = require("../assets/cloth.png");
  const sports = require("../assets/sports.png");
  const elec = require("../assets/elec.png");
  const [active_cat, setActiveCat] = useState();
  const [highlights, setHighlights] = useState();
  const [topBrands, setTopBrands] = useState();
  const [deals, setDeals] = useState();
  const [searchValue, setSearchValue] = useState();
  useEffect(() => {
    getDoc(doc(db, "market", "highlights")).then((_) => {
      setHighlights(_.data());
    });
    getDoc(doc(db, "market", "topBrands")).then((brands) => {
      setTopBrands(brands.data()["id"]);
    });
    getDoc(doc(db, "market", "deals")).then((brands) => {
      setDeals(brands.data()["id"]);
    });
  }, []);

  const debounce = (callback, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };
  const handleInputFinished = () => {
    // Perform your desired action here
    console.log("Input finished:", searchValue);
    navigation.navigate("search", { query: searchValue });
  };
  const handleInputFinishedDebounced = debounce(handleInputFinished, 200);

  return (
    <SafeAreaView style={{ backgroundColor: BG_COLOR, minHeight: "100%" }}>
      {highlights && topBrands ? (
        <ScrollView bounces={false} style={{ paddingBottom: 8 }}>
          <View
            style={{
              backgroundColor: CTA_COLOR,
              width: "100%",
              height: 190,
              borderBottomLeftRadius: 22,
              borderBottomRightRadius: 22,
              marginBottom: 30,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.2,
              shadowRadius: 5.62,
              elevation: 7,
              overflow: "hidden",
            }}
          >
            <ImageBackground
              source={require("../assets/Searchbarimage.jpg")}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                resizeMode: "cover",
              }}
            >
              <View
                style={{
                  paddingHorizontal: 40,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    marginBottom: 80,
                  }}
                >
                  <Feather
                    name="bell"
                    size={24}
                    color="white"
                    onPress={() => {
                      navigation.navigate("search");
                    }}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: -10,
                    }}
                  />
                </View>

                <CustomIconInput
                  placeholder={"Search any product or Store"}
                  value={searchValue}
                  onChangeText={setSearchValue}
                  icon={<Feather name="search" size={20} color={CTA_COLOR} />}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 6,
                    marginBottom: 40,
                    shadowColor: "#000000",
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 5.62,
                    elevation: 7,
                  }}
                  onBlur={() => handleInputFinishedDebounced()}
                />
              </View>
            </ImageBackground>
          </View>
          {highlights && (
            <View style={{ paddingLeft: 30, marginBottom: 10 }}>
              <CustomText
                style={{ fontFamily: "Medium", fontSize: 20, marginBottom: 10 }}
              >
                Highlights
              </CustomText>

              <View style={{ flexDirection: "row" }}>
                <Highlight navigation={navigation} data={highlights["data"]} />
              </View>
            </View>
          )}

          <View>
            <CustomText
              style={{
                fontFamily: "Medium",
                fontSize: 20,
                marginBottom: 10,
                marginLeft: 30,
              }}
            >
              Categories
            </CustomText>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              style={{ marginRight: 0 }}
              contentInset={{ top: 0, left: 30, bottom: 0, right: 0 }}
            >
              <View style={{ flexDirection: "row", paddingLeft: 30 }}>
                <CategoriesButton
                  name="Men"
                  icon={men}
                  active={active_cat}
                  setActive={setActiveCat}
                  text={"Men"}
                />
                <CategoriesButton
                  name="Women"
                  icon={women}
                  active={active_cat}
                  setActive={setActiveCat}
                  text={"Women"}
                />
                <CategoriesButton
                  name="Baby"
                  icon={baby}
                  active={active_cat}
                  setActive={setActiveCat}
                  text={"Baby"}
                />
                <CategoriesButton
                  name="Apparel"
                  icon={cloth}
                  active={active_cat}
                  setActive={setActiveCat}
                  text={"Apparel"}
                />
                <CategoriesButton
                  name="Sports"
                  icon={sports}
                  active={active_cat}
                  setActive={setActiveCat}
                  text={"Sports"}
                />
                <CategoriesButton
                  name="Electronics"
                  icon={elec}
                  active={active_cat}
                  setActive={setActiveCat}
                  text={"Electronics"}
                />
              </View>
            </ScrollView>
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
                Top Brands
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
                      <TopBrandsButton
                        key={index}
                        id={item}
                        onPress={() => {}}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          )}

          {deals && (
            <View style={{}}>
              <CustomText
                style={{
                  marginLeft: 30,
                  fontFamily: "Medium",
                  fontSize: 20,
                  marginTop: 20,
                }}
              >
                Exclusive deals
              </CustomText>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
                style={{ marginRight: 0 }}
                contentInset={{ top: 0, left: 30, bottom: 0, right: 0 }}
              >
                <View style={{ flexDirection: "row", paddingLeft: 30 }}>
                  {deals.map((item, index) => {
                    return (
                      <ProductThumbnail
                        key={index}
                        itemid={item}
                        navigation={navigation}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.container,
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
    </SafeAreaView>
  );
}
