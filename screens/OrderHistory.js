import {
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, CTA_COLOR, DARK_COLOR, styles } from "../styles/styles";
import { Feather } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import { FlatList } from "react-native-gesture-handler";
import getData from "../firebase/firestore/getData";
import { storage } from "../components/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

const OrderHistory = ({ navigation, route }) => {
  const { orderId } = route.params;
  console.log(orderId);
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    function getOrderdata() {
      getData("orders", orderId).then(({ result, error }) => {
        console.log(error);
        setOrderData(result);
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
          paddingHorizontal: 30,
          paddingTop: 30,
        },
      ]}
    >
      <View
        style={[
          styles.appBar,
          {
            marginBottom: 30,
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
            props={{ numberOfLines: 1 }}
            style={{
              flexShrink: 1,
              fontFamily: "Medium",
              fontSize: 24,
              marginLeft: 20,
              width: "80%",
            }}
          >
            Order ID {orderId}
          </CustomText>
        </View>
      </View>

      {orderData ? (
        <View style={{ flexDirection: "column" }}>
          <CustomText
            style={{
              fontFamily: "Medium",
              fontSize: 16,
              color: CTA_COLOR,
            }}
          >
            Shipping Details
          </CustomText>
          <CustomText
            style={{
              marginBottom: 10,
              fontFamily: "Medium",
              fontSize: 13,
            }}
          >
            {orderData.address}
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomText
              style={{
                fontFamily: "Medium",
                fontSize: 16,
                color: CTA_COLOR,
              }}
            >
              Order Details
            </CustomText>
            <CustomText
              style={{
                fontFamily: "Medium",
                fontSize: 12,
                color: CTA_COLOR,
              }}
            >
              {orderData.status}
            </CustomText>
          </View>

          <FlatList
            data={orderData.orderData}
            renderItem={({ item }) => <OrderItem key={item.id} data={item} />}
          />

          {/* <Status
          name="Test"
          status={true}
          right={{ status: true, dotted: false }}
          left={{ status: false, dotted: false }}
        /> */}
        </View>
      ) : (
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <ActivityIndicator visible={true} color={CTA_COLOR} size={40} />
        </View>
      )}
    </SafeAreaView>
  );
};

function Status({ name, status, left, right }) {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
      }}
    >
      <CustomText
        style={{ marginBottom: 10, fontFamily: "Medium", fontSize: 16 }}
      >
        {name}
      </CustomText>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {left.status && <Line status={left.dotted} />}
        <View
          style={{
            padding: 5,
            borderColor: status ? BG_COLOR : CTA_COLOR,
            borderWidth: 1,
            borderRadius: 50,
            marginHorizontal: 5,
            backgroundColor: status ? "#5cb85c" : BG_COLOR,
          }}
        >
          <Feather
            name="check"
            size={24}
            color={status ? BG_COLOR : CTA_COLOR}
          />
        </View>
        {right.status && <Line status={right.dotted} />}
      </View>
    </View>
  );
}

function Line({ status }) {
  return (
    <View
      style={{
        width: 15,
        height: 3,
        backgroundColor: status ? "#5cb85c" : CTA_COLOR,
      }}
    />
  );
}

function OrderItem({ data }) {
  const [itemData, setItemData] = useState();
  useEffect(() => {
    async function getOrderItem() {
      await getData("products", data.id).then(async ({ result, error }) => {
        result.imgs = await getDownloadURL(ref(storage, result.imgs[0]));
        setItemData(result);
      });
    }
    getOrderItem();
  }, []);

  return (
    itemData && (
      <View
        style={[
          {
            alignItems: "center",
            width: "100%",
            // backgroundColor: "#005",
            height: 140,
            marginBottom: 5,

            padding: 5,
          },
        ]}
      >
        <View
          style={[
            styles.shadow,
            {
              backgroundColor: BG_COLOR,
              borderColor: "#00000010",
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              width: "100%",
              height: "100%",
            },
          ]}
        >
          <Image
            source={{ uri: itemData.imgs }}
            style={{
              height: 130,
              width: 120,
              backgroundColor: "#005",
              borderRadius: 6,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent: "space-between",
              marginLeft: 10,
              marginVertical: 10,
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
                $ {data.basePrice}
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
                  {data.varient} ,
                </CustomText>
                <View
                  style={{
                    backgroundColor: data.color,
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
                  x {data.quantity}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  );
}

export default OrderHistory;
