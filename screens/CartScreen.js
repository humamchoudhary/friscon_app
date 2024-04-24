import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_COLOR, CTA_COLOR, DARK_COLOR, styles } from "../styles/styles";
import { Feather } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import getData from "../firebase/firestore/getData";
import { useAuthContext } from "../context/AuthContext";
import CartItemTile from "../components/CartItemTile";
import { TouchableOpacity } from "react-native-gesture-handler";
import updateData from "../firebase/firestore/updateData";
import { useIsFocused } from "@react-navigation/native";
const CartScreen = ({ navigation }) => {
  const [cartData, setCartData] = useState();
  const { user } = useAuthContext();
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [recipt, setRecipt] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function updateCart() {
      setLoading(true);
      await updateData("users", user.uid, { cart: cartData });
      setPrice(0);
      cartData.map((item) => {
        setPrice((prevPrice) => prevPrice + item.basePrice * item.quantity);
      });
      setLoading(false);
    }
    if (cartData) {
      updateCart();
    }
  }, [cartData]);

  useEffect(() => {
    if (user) {
      async function getUserData() {
        setLoading(true);
        const { result, error } = await getData("users", user.uid);
        if (result) {
          setCartData(result.cart);
        }
        setLoading(false);
      }
      getUserData();
    }
  }, [isFocused]);

  useEffect(() => {}, []);

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
            Cart
          </CustomText>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30 }}>
        {cartData &&
          cartData.map((item, index) => {
            return (
              <CartItemTile
                canEdit={true}
                itemId={item}
                index={index}
                key={index}
                setCartData={setCartData}
                setPrice={setPrice}
                setLoading={setLoading}
                cartData={cartData}
                setRecipt={setRecipt}
                onRemove={() => {
                  setCartData(cartData.filter((i) => i.id !== item.id));
                }}
              />
            );
          })}
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
            style={{ fontFamily: "SemiBold", fontSize: 26, color: DARK_COLOR }}
          >
            $ {price.toFixed(2)}
          </CustomText>
        </View>

        {loading ? (
          <View style={[styles.button, styles.buttonFilled, { width: 150 }]}>
            <ActivityIndicator visible={true} color={BG_COLOR} size={20} />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.buttonFilled, { width: 150 }]}
            onPress={() => {
              navigation.navigate("checkout", {
                data: recipt,
                amount: price.toFixed(2),
                cart: cartData,
              });
            }}
          >
            <CustomText style={[styles.buttonFilledText]}>Checkout</CustomText>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const stylesLocal = StyleSheet.create({});
