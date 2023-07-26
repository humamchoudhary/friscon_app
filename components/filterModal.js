import { StyleSheet, Text, View, Dimensions, Touchable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomText from "./CustomText";
import { CTA_COLOR, styles } from "../styles/styles";
import CustomIconInput from "./CustomIconInput";
import { TouchableOpacity } from "react-native-gesture-handler";

const FilterModal = ({ setModalShown, setFilters }) => {
  const [filter, setFilter] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setbrand] = useState(false);
  const [color, setColor] = useState(false);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    if (index < 0) {
      setModalShown(false);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // tintColor: CTA_COLOR,
        padding: 24,
        // backgroundColor: "grey",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 30,
      }}
    >
      <BottomSheet
        index={0}
        enablePanDownToClose={true}
        snapPoints={["62%", "65%"]}
        backgroundStyle={{
          borderWidth: 1,
          borderColor: "gray",
          marginTop: 10,
          //   backgroundColor: "transparent",
        }}
        onChange={handleSheetChanges}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          paddingTop: 10,
          elevation: 8,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flex: 1, marginTop: 10, marginHorizontal: 15 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomText style={{ fontFamily: "Regular", fontSize: 18 }}>
              Filters
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setModalShown(false);
              }}
            >
              <CustomText
                style={{
                  fontFamily: "Regular",
                  fontSize: 18,
                  color: CTA_COLOR,
                }}
              >
                Close
              </CustomText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 0.5,
              width: Dimensions.get("window").width,
              backgroundColor: CTA_COLOR,
              marginTop: 20,
            }}
          />
          {/* Category */}
          <TouchableOpacity
            onPress={() => {
              setCategory(true);
              setColor(false);
              setbrand(false);
            }}
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <CustomText style={{ fontFamily: "Bold", fontSize: 16 }}>
              Category
            </CustomText>
            <CustomText style={{ fontFamily: "Light", fontSize: 16 }}>
              Any
            </CustomText>
          </TouchableOpacity>

          <View
            style={{
              height: 0.5,
              width: Dimensions.get("window").width,
              backgroundColor: CTA_COLOR,
            }}
          />
          {/* Brands */}
          <TouchableOpacity
            onPress={() => {
              setCategory(false);
              setColor(false);
              setbrand(!brand);
            }}
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <CustomText style={{ fontFamily: "Bold", fontSize: 16 }}>
              Brands
            </CustomText>
            <CustomText style={{ fontFamily: "Light", fontSize: 16 }}>
              Any
            </CustomText>
          </TouchableOpacity>
          <View
            style={{
              height: 0.5,
              width: Dimensions.get("window").width,
              backgroundColor: CTA_COLOR,
            }}
          />
          {/* Color */}
          <TouchableOpacity
            onPress={() => {
              setCategory(false);
              setColor(!color);
              setbrand(false);
            }}
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <CustomText style={{ fontFamily: "Bold", fontSize: 16 }}>
              Color
            </CustomText>
            <CustomText style={{ fontFamily: "Light", fontSize: 16 }}>
              Any
            </CustomText>
            {color && (
              <View>
                <CustomText>asda</CustomText>
              </View>
            )}
          </TouchableOpacity>
          <View
            style={{
              height: 0.5,
              width: Dimensions.get("window").width,
              backgroundColor: CTA_COLOR,
            }}
          />
          <View
            style={{
              height: 0.5,
              width: Dimensions.get("window").width,
              backgroundColor: CTA_COLOR,
            }}
          />
          {/* Price */}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <CustomText style={{ fontFamily: "Bold", fontSize: 16 }}>
              Price Range
            </CustomText>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomIconInput
                placeholder={"$0"}
                style={{ flex: 0.3 }}
                icon={<CustomText>From</CustomText>}
              />
              <CustomIconInput
                placeholder={"$0"}
                style={{ flex: 0.3 }}
                icon={<CustomText>To</CustomText>}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={[styles.button, styles.buttonFilled]}>
              <CustomText style={styles.buttonFilledText}>
                Apply Filter
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default FilterModal;
