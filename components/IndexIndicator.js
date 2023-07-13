import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CTA_COLOR } from "../styles/styles";

const IndexIndicator = ({ data, currentIndex }) => {
  if (data && currentIndex) {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 20,
          zIndex: 10,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                backgroundColor: CTA_COLOR,
                opacity: index === parseInt(currentIndex) ? 1 : 0.5,
                borderRadius: 6,
                marginHorizontal: 3,
              }}
            />
          );
        })}
      </View>
    );
  }
};

export default IndexIndicator;
