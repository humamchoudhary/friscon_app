import { StyleSheet, View, Dimensions } from "react-native";
import React, { useState, useCallback } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { CTA_COLOR, styles } from "../styles/styles";
import StarRating from "react-native-star-rating-widget";
import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";

const ProductReviewModal = ({ setModalShown }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState();
  function ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }
  // variables
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    if (index < 0) {
      setModalShown(false);
    }
  }, []);

  return (
    <View style={[stylesLocal.container]}>
      <BottomSheet
        index={0}
        enablePanDownToClose={true}
        snapPoints={["50%"]}
        backgroundStyle={{
          borderWidth: 1,
          borderColor: "gray",
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

          elevation: 15,
        }}
      >
        <View style={stylesLocal.contentContainer}>
          <CustomText style={{ fontFamily: "Medium", fontSize: 16 }}>
            Rate Us
          </CustomText>
          <StarRating rating={rating} onChange={setRating} color={CTA_COLOR} />
          <View
            style={{
              height: 0.5,
              width: Dimensions.get("window").width,
              backgroundColor: CTA_COLOR,
              marginTop: 20,
            }}
          />
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 16, marginTop: 20 }}
          >
            Please share your opinion
          </CustomText>
          <CustomInput
            placeholder={"Your Review"}
            onChangeText={setRating}
            text={review}
            style={{ flex: 0.3, flexDirection: "row", marginHorizontal: 20 }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default ProductReviewModal;
const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    // tintColor: CTA_COLOR,
    padding: 24,
    // backgroundColor: "grey",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 30,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
