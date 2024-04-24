import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import { Feather } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import { ScrollView } from "react-native-gesture-handler";
import getAllData from "../firebase/firestore/getAllData";

const OrderHistoryList = ({ navigation }) => {
  const [orderHistory, setOrderHistory] = useState();

  useEffect(() => {
    function getOrderdata() {
      getAllData("orders").then(({ result, error }) => {
        console.log(result);
        setOrderHistory(result);
      });
    }
    getOrderdata();
  }, []);
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: BG_COLOR,
          flex: 1,
          paddingHorizontal: 20,
        },
      ]}
    >
      <View
        style={[
          styles.appBar,
          {
            marginTop: 50,
            marginBottom: 10,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            Order Histroy
          </CustomText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomText
          style={{
            color: CTA_COLOR,
            fontFamily: "Medium",
            fontSize: 15,
          }}
        >
          Order id
        </CustomText>
        <CustomText
          style={{
            color: CTA_COLOR,
            fontFamily: "Medium",
            fontSize: 15,
          }}
        >
          Status
        </CustomText>
      </View>
      <ScrollView>
        {orderHistory &&
          orderHistory.map((item) => {
            console.log(item);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("orderHistory", { orderId: item.id });
                }}
                key={item}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <CustomText
                    style={{
                      fontFamily: "Medium",
                      fontSize: 15,
                    }}
                  >
                    {item.id}
                  </CustomText>
                  <CustomText
                    style={{
                      fontFamily: "Medium",
                      fontSize: 15,
                    }}
                  >
                    {item.data.status}
                  </CustomText>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    opacity: 0.5,

                    backgroundColor: CTA_COLOR,
                  }}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistoryList;
