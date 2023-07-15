import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
const ProductReviewModal = () => {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();
  return (
    <View>
      <Text>ProductReviewModal</Text>
    </View>
  );
};

export default ProductReviewModal;

const styles = StyleSheet.create({});
