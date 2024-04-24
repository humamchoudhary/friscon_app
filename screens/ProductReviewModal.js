import { StyleSheet, View, Dimensions } from "react-native";
import React, { useState, useCallback } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { CTA_COLOR, styles } from "../styles/styles";
import StarRating from "react-native-star-rating-widget";
import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  increment,
} from "firebase/firestore";
import { db, auth } from "../components/firebaseConfig";

const ProductReviewModal = ({ setModalShown, item }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState();
  const [error, setError] = useState();

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    if (index < 0) {
      setModalShown(false);
    }
  }, []);
  const submitReview = async () => {
    console.log(review);
    console.log(rating);
    if (review && rating) {
      setError();
      console.log(item);
      await updateDoc(doc(db, "products", item), {
        rating: increment(rating),
        reviews: arrayUnion({
          rating: rating,
          text: review,
          time: Timestamp.now(),
          userId: auth.currentUser.uid,
        }),
      })
        .then((_) => {
          setModalShown(false);
        })
        .catch((_) => {
          console.log(_);
          setError("Error");
        });
    } else {
      setError("Please fill all feilds!");
    }
  };

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
            onChangeText={setReview}
            text={review}
            error={error}
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              height: 180,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              submitReview();
            }}
            style={[styles.button, styles.buttonFilled, { marginBottom: 20 }]}
          >
            <CustomText style={[styles.buttonFilledText]}>
              Submit Review
            </CustomText>
          </TouchableOpacity>
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
