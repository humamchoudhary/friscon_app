import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/firebaseConfig";
import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import CustomText from "./CustomText";

const TopBrandsButton = ({ id, onPress }) => {
  const [name, setName] = useState();
  const [ImageUrl, setImageUrl] = useState();
  useEffect(() => {
    getDoc(doc(db, "brands", id)).then((brands) => {
      const data = brands.data();
      if (data) {
        setName(data["name"]);
        setImageUrl(data["logo"]);
      }
    });
  }, [id]);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={[styles.buttonHollow, styles.Catbutton, { marginBottom: 5 }]}
      >
        <Image
          source={{ uri: ImageUrl }}
          style={{
            flex: 1,
            width: "100%",
            resizeMode: "contain",
            height: "100%",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBrandsButton;
