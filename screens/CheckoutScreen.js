import { Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_COLOR, CTA_COLOR, DARK_COLOR, styles } from "../styles/styles";
import { Feather } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import fetchCheckoutSession from "../firebase/functions/stripePayment";
import { usePaymentSheet } from "@stripe/stripe-react-native";
import CartItemTile from "../components/CartItemTile";
import addData from "../firebase/firestore/addData";
import uuid from "react-native-uuid";
import updateData from "../firebase/firestore/updateData";
import { useAuthContext } from "../context/AuthContext";
import getData from "../firebase/firestore/getData";
import { arrayUnion } from "firebase/firestore";

export default CheckoutScreen = ({ route, navigation }) => {
  const [key, setKey] = useState();
  const { data, amount, cart } = route.params;
  const { user } = useAuthContext();

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  useEffect(() => {
    console.log(user.uid);
    // console.log(route.params);
    // console.log(data);
    // console.log(amount);
    initializePaymentsheet();
  }, []);
  function initializePaymentsheet() {
    fetchCheckoutSession(data, amount).then(
      async ({ clientSecret, error: e }) => {
        console.log(clientSecret);
        setKey(clientSecret);
        if (!e) {
          const { error } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: "Friscon Inc.",
          });
          console.log(error);
        } else {
          Alert.alert(`Error! ${error}`, error.message);
        }
      }
    );
  }

  async function buy() {
    const { error } = await presentPaymentSheet({ clientSecret: key });
    console.log("as");
    if (error) {
      Alert.alert(`Payment Unsuccessful `, `${error.message} [${error.code}]`);
    } else {
      await getData("users", user.uid).then(async ({ result }) => {
        result.address;
        await addData("orders", {
          orderData: cart,
          address: result.address,
          status: "In Processing",
        }).then(({ result, error }) => {
          if (!error) {
            updateData("users", user.uid, {
              cart: [],
              orders: arrayUnion(result.id),
            });
          }
        });
      });

      navigation.navigate("paymentSuccess");
    }
  }
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: BG_COLOR,
          minHeight: "100%",

          flex: 1,
        },
      ]}
    >
      <View
        style={[
          styles.appBar,
          {
            paddingHorizontal: 30,
            marginBottom: 30,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name="arrow-left"
            size={24}
            color={CTA_COLOR}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 24, marginLeft: 20 }}
          >
            Checkout
          </CustomText>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30 }}>
        <CustomText style={{ fontFamily: "Medium", fontSize: 18 }}>
          Shipping Address
        </CustomText>
        <CustomText
          style={{ fontFamily: "Medium", fontSize: 14, color: CTA_COLOR }}
        >
          Muhammad Humam Choudhary
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText
            style={{
              fontFamily: "Medium",
              fontSize: 14,
              color: "#A3A3A3",
              flex: 0.6,
            }}
          >
            123, Sub Street, Main road, City Name, Province, Country
          </CustomText>
          <View
            style={{
              backgroundColor: CTA_COLOR,
              width: 40,
              height: 40,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="edit-2" size={24} color={BG_COLOR} />
          </View>
        </View>
        {/* <CustomText
          style={{ fontFamily: "Medium", fontSize: 18, marginTop: 20 }}
        >
          Payment Method
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText
            style={{
              fontFamily: "Medium",
              fontSize: 14,
              color: "#A3A3A3",
              flex: 0.6,
            }}
          >
            123, Sub Street, Main road, City Name, Province, Country
          </CustomText>
          <View
            style={{
              backgroundColor: CTA_COLOR,
              width: 40,
              height: 40,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="edit-2" size={24} color={BG_COLOR} />
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <CustomText style={{ fontFamily: "Medium", fontSize: 18 }}>
            Items{" "}
          </CustomText>
          <View
            style={{
              backgroundColor: CTA_COLOR,
              width: 30,
              height: 30,
              borderRadius: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomText
              style={{ fontFamily: "Medium", fontSize: 16, color: BG_COLOR }}
            >
              1
            </CustomText>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10,
          }}
        >
          {cart &&
            cart.map((item, index) => {
              return (
                <CartItemTile
                  canEdit={false}
                  itemId={item}
                  index={index}
                  key={item.id}
                  cartData={cart}
                />
              );
            })}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: BG_COLOR,
          paddingHorizontal: 30,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 14, color: "#A3A3A3" }}
          >
            Total amount
          </CustomText>
          <CustomText
            style={{
              fontFamily: "SemiBold",
              fontSize: 26,
              color: DARK_COLOR,
            }}
          >
            $ {amount}
          </CustomText>
        </View>

        {loading && !amount ? (
          <View style={[styles.button, styles.buttonFilled, { width: 150 }]}>
            <ActivityIndicator visible={true} color={BG_COLOR} size={20} />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.buttonFilled, { width: 150 }]}
            onPress={buy}
          >
            <CustomText style={[styles.buttonFilledText]}>Checkout</CustomText>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const stylesLocal = StyleSheet.create({});
