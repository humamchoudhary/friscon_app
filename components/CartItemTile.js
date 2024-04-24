import {
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import getData from "../firebase/firestore/getData";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../components/firebaseConfig";
import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import CustomText from "./CustomText";
import { Feather } from "@expo/vector-icons";

export default CartItemTile = ({
  canEdit,
  itemId,
  setCartData = () => {},
  index,

  setLoading = () => {},
  cartData,
  onRemove = () => {},
  setRecipt = () => {},
}) => {
  const [itemData, setItemData] = useState();
  const [count, setCount] = useState(itemId.quantity);

  useEffect(() => {
    function UpdateCount() {
      setLoading(true);

      setCartData((initData) => {
        initData[index].quantity = count;
        return initData;
      });
      getItemDetails();
      setLoading(false);
    }
    UpdateCount();
  }, [count]);

  function getItemDetails() {
    setLoading(true);
    getData("products", itemId.id).then(async ({ result }) => {
      for (let index = 0; index < result.imgs.length; index++) {
        result.imgs[index] = await getDownloadURL(
          ref(storage, result.imgs[index])
        );
      }
      setItemData(result);
      setRecipt((prevData) => {
        prevData.push({
          amount: result.price * cartData[index].quantity,
          currency: "usd",
          quantity: cartData[index].quantity,
          name: result.name,
        });
        return prevData;
      });
      setCartData((prevData) => {
        return [
          ...prevData.slice(0, index),
          itemId,
          ...prevData.slice(index + 1),
        ];
      });

      setLoading(false);
    });
  }

  return (
    <View
      style={[
        styles.shadow,
        {
          height: 120,
          flexDirection: "row",
          backgroundColor: BG_COLOR,
          borderRadius: 10,
          marginBottom: 10,
        },
      ]}
    >
      {itemData && (
        <>
          <Image
            resizeMode="cover"
            source={{ uri: itemData.imgs[0] }}
            style={{
              flex: 0.4,
              height: 120,
              backgroundColor: "#005",
              marginBottom: 8,
              borderRadius: 6,
            }}
          />
          <View
            style={{
              marginHorizontal: 10,
              flex: 0.6,
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CustomText style={{ fontFamily: "Medium", fontSize: 16 }}>
                {itemData.name}
              </CustomText>
              <View>
                <CustomText
                  style={{
                    fontFamily: "SemiBold",
                    fontSize: 16,
                    color: CTA_COLOR,
                  }}
                >
                  $ {itemData.price}
                </CustomText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomText
                    style={{
                      fontFamily: "Medium",
                      fontSize: 14,
                      color: "#A3A3A3",
                    }}
                  >
                    {itemId.varient} ,
                  </CustomText>
                  <View
                    style={{
                      backgroundColor: itemId.color,
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      marginHorizontal: 5,
                    }}
                  />
                  <CustomText
                    style={{
                      fontFamily: "Medium",
                      fontSize: 14,
                      color: "#A3A3A3",
                    }}
                  >
                    x {count}
                  </CustomText>
                </View>
              </View>
            </View>
            {canEdit && (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {/* <CustomText>as</CustomText> */}
                <Feather
                  name="trash-2"
                  size={24}
                  color={CTA_COLOR}
                  onPress={() => {
                    onRemove();
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      // setCartData((prevData) => prevData[index].quantity + 1);
                      setCount((prevCount) => prevCount + 1);
                    }}
                  >
                    <Feather name="plus" size={20} color="black" />
                  </TouchableOpacity>
                  {/* <CustomInput text={count.toString()}   /> */}

                  <TextInput
                    value={count.toString()}
                    keyboardType="numeric"
                    style={{
                      borderColor: CTA_COLOR,
                      borderWidth: 1,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 15,
                      width: 40,
                      height: 40,
                      marginHorizontal: 5,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      // setCartData((prevData) => prevData[index].quantity - 1);
                      setCount((prevCount) => prevCount - 1);
                    }}
                    //   style={{  }}
                  >
                    <Feather name="minus" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const stylesLocal = StyleSheet.create({});
