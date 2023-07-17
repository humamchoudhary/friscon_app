import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { CTA_COLOR } from "../styles/styles";
const RatingStars = ({ rating }) => {
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);
  useEffect(() => {
    for (let index = 0; index < rating; index++) {
      console.log();
      if (rating - index >= 1) {
        stars[index] = 1;
      } else {
        stars[index] = 0.5;
      }
      setStars(stars);
    }
    console.log(stars);
  }, [rating]);

  return (
    <View style={{ flexDirection: "row" }}>
      {rating &&
        stars.map((item, index) => {
          return item === 1 ? (
            <FontAwesome name="star" size={14} key={index} color={CTA_COLOR} />
          ) : item === 0.5 ? (
            <FontAwesome
              name="star-half-full"
              key={index}
              size={14}
              color={CTA_COLOR}
            />
          ) : (
            <FontAwesome
              name="star-o"
              size={14}
              key={index}
              color={CTA_COLOR}
            />
          );
        })}
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({});
