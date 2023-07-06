import { ScrollView, View, Image } from "react-native";
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

export default function HomeScreen() {
  const men = require("../assets/men.png");
  const baby = require("../assets/baby.png");
  const women = require("../assets/women.png");
  const cloth = require("../assets/cloth.png");
  const sports = require("../assets/sports.png");
  const elec = require("../assets/elec.png");
  const [active_cat, setActiveCat] = useState();
  const [testImg, setTestimg] = useState();
  const [highlights, setHighlights] = useState();

  useEffect(() => {
    getDoc(doc(db, "market", "highlights")).then((_) => {
      setHighlights(_.data());
      // getDownloadURL(ref(storage, _.data()["img"])).then((url) => {
      //   setTestimg(url);
      // });
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: BG_COLOR, minHeight: "100%" }}>
      <View>
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
            paddingHorizontal: 40,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5.62,
            elevation: 7,
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
              style={{
                position: "absolute",
                top: 10,
                right: -10,
              }}
            />
          </View>

          <CustomIconInput
            placeholder={"Search any product or Store"}
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
          />
        </View>
        {highlights && (
          <View style={{ paddingLeft: 30 }}>
            <CustomText
              style={{ fontFamily: "Medium", fontSize: 20, marginBottom: 10 }}
            >
              Highlights
            </CustomText>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              style={{ marginRight: 0 }}
              contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
            >
              <View style={{ flexDirection: "row" }}>
                <Highlight data={highlights["data"]} />
              </View>
            </ScrollView>
          </View>
        )}

        <View style={{ paddingLeft: 30 }}>
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 20, marginBottom: 10 }}
          >
            Categories
          </CustomText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            style={{ marginRight: 0 }}
            contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
          >
            <View style={{ flexDirection: "row" }}>
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
      </View>
    </SafeAreaView>
  );
}
