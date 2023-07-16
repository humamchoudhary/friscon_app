import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CustomText from "../components/CustomText";
import { DARK_COLOR } from "../styles/styles";
import RatingStars from "./RatingStars";

const ProdReviewTile = ({ item, setModalShown }) => {
  const [time, setTime] = useState();
  const [name, setName] = useState();
  useEffect(() => {
    console.log(item.time);
    const milliseconds =
      item.time.seconds * 1000 + item.time.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    setTime(date.toDateString());
    getDoc(doc(db, "users", item.userId)).then((_) => {
      setName(_.data()["username"]);
    });
  }, [item]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("prodreviewmodal");
          setModalShown(true);
        }}
        style={{ flexDirection: "row" }}
      >
        <View
          style={{
            flex: 0.7,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <CustomText
            style={{
              fontSize: 16,
              fontFamily: "Medium",
              color: DARK_COLOR,
            }}
          >
            {name}
          </CustomText>
          <CustomText
            style={{
              fontSize: 16,
              fontFamily: "Light",
              color: DARK_COLOR,
            }}
          >
            {item.text}
          </CustomText>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <CustomText
            style={{
              fontSize: 12,
              fontFamily: "Medium",
              color: "#A3A3A3",
            }}
          >
            {time}
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RatingStars rating={item.rating} />
            <CustomText
              style={{
                fontSize: 16,
                fontFamily: "Light",
                color: DARK_COLOR,
                marginLeft: 7,
              }}
            >
              {item.rating}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ProdReviewTile;

const styles = StyleSheet.create({});
