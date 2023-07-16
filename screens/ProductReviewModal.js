import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState, useMemo, useRef, useCallback } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

const ProductReviewModal = ({ setModalShown }) => {
  // variables
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    if (index < 0) {
      setModalShown(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        index={0}
        enablePanDownToClose={true}
        snapPoints={["50%"]}
        onChange={handleSheetChanges}
        // style={{ backgroundColor: "#005" }}
        // backgroundStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ProductReviewModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
