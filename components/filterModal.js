import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomText from "./CustomText";
import { CTA_COLOR, styles } from "../styles/styles";
import CustomIconInput from "./CustomIconInput";

const FilterModal = ({ setModalShown, setFilters, data, filterData }) => {
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const [color, setColor] = useState(false);
  const [availcategory, setAvailCategory] = useState([null]);
  const [availbrand, setAvailBrand] = useState([null]);
  const [availcolor, setAvailColor] = useState([null]);

  const handleSheetChanges = useCallback((index) => {
    if (index < 0) {
      setModalShown(false);
    }
  }, []);

  useEffect(() => {
    if (data) {
      data.forEach((item) => {
        if (!availcategory.includes(item.data.category)) {
          availcategory.push(item.data.category);
        }

        item.data.colors.forEach((color) => {
          if (!availcolor.includes(color)) {
            availcolor.push(color);
          }
        });

        if (!availbrand.includes(item.data.brand)) {
          availbrand.push(item.data.brand);
        }
      });
      setAvailBrand(availbrand);
      setAvailCategory(availcategory);
      setAvailColor(availcolor);
    }
  }, [data]);

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
              setCategory(!category);
              setColor(false);
              setBrand(false);
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
              {filterData && filterData.category ? filterData.category : "Any"}
            </CustomText>
            {category && (
              <View style={{ maxHeight: 50 }}>
                <ScrollView>
                  {availcategory.map((item, index) => {
                    return item ? (
                      <TouchableOpacity
                        onPress={() => {
                          filterData.category = item;
                          setFilters(filterData);
                        }}
                        key={index}
                      >
                        <CustomText
                          style={{
                            color: "#A3A3A3",
                            fontFamily: "Medium",
                            fontSize: 14,
                          }}
                        >
                          {item}
                        </CustomText>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          filterData.category = null;
                          setFilters(filterData);
                        }}
                        key={index}
                      >
                        <CustomText
                          style={{
                            color: "#A3A3A3",
                            fontFamily: "Medium",
                            fontSize: 14,
                          }}
                        >
                          Any
                        </CustomText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
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
          {/* Brands */}
          <TouchableOpacity
            onPress={() => {
              setCategory(false);
              setColor(false);
              setBrand(!brand);
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
              {filterData && filterData.brand ? filterData.brand : "Any"}
            </CustomText>
            {brand && (
              <View style={{ maxHeight: 50 }}>
                <ScrollView>
                  {availbrand.map((item, index) => {
                    return item ? (
                      <TouchableOpacity
                        onPress={() => {
                          filterData.brand = item;
                          setFilters(filterData);
                        }}
                        key={index}
                      >
                        <CustomText
                          style={{
                            color: "#A3A3A3",
                            fontFamily: "Medium",
                            fontSize: 14,
                          }}
                        >
                          {item}
                        </CustomText>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          filterData.brand = null;
                          setFilters(filterData);
                        }}
                        key={index}
                      >
                        <CustomText
                          style={{
                            color: "#A3A3A3",
                            fontFamily: "Medium",
                            fontSize: 14,
                          }}
                        >
                          Any
                        </CustomText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
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
          {/* Color */}
          <TouchableOpacity
            onPress={() => {
              setCategory(false);
              setColor(!color);
              setBrand(false);
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
            <CustomText
              style={{ fontFamily: "Light", fontSize: 16, marginBottom: 5 }}
            >
              {filterData && filterData.color ? (
                <View
                  style={{
                    backgroundColor: filterData.color,
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                  }}
                />
              ) : (
                "Any"
              )}
            </CustomText>
            {color && (
              <View style={{ maxHeight: 50 }}>
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {availcolor.map((item, index) => {
                    return item ? (
                      <TouchableOpacity
                        style={{ marginRight: 5 }}
                        onPress={() => {
                          filterData.color = item;
                          setFilters(filterData);
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            backgroundColor: item,
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          filterData.color = null;
                          setFilters(filterData);
                        }}
                        style={{ marginRight: 5 }}
                        key={index}
                      >
                        <CustomText
                          style={{
                            color: "#A3A3A3",
                            fontFamily: "Medium",
                            fontSize: 14,
                          }}
                        >
                          Any
                        </CustomText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
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
            <TouchableOpacity
              onPress={() => {
                setModalShown(false);
              }}
              style={[styles.button, styles.buttonFilled]}
            >
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
