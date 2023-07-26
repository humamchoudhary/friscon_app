import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, CTA_COLOR, styles } from "../styles/styles";
import { db, storage } from "../components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import CustomText from "./CustomText";
import { FontAwesome } from "@expo/vector-icons";
import { async } from "@firebase/util";

const ProductThumbnail = ({ itemid, navigation }) => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    async function getData() {
      getDoc(doc(db, "products", itemid)).then(async (_) => {
        var data = _.data();
        for (let index = 0; index < data.imgs.length; index++) {
          data.imgs[index] = await getDownloadURL(
            ref(storage, data.imgs[index])
          );
        }
        setItem(data);
      });
    }
    if (itemid) {
      getData();
    }
  }, [itemid]);
  useEffect(() => {
    if (item) {
      setLoading(false);
    }
  }, [item]);

  return (
    <View>
      {!loading ? (
        item && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Product", { itemid: itemid });
            }}
            style={[stylesLocal.content, styles.shadow]}
          >
            <Image
              source={{ uri: item.imgs[0] }}
              style={stylesLocal.image}
              resizeMode="cover"
            />
            <View style={stylesLocal.prodText}>
              <CustomText style={{ fontFamily: "Medium", fontSize: 14 }}>
                {item.name}
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
                    fontFamily: "SemiBold",
                    fontSize: 16,
                    color: CTA_COLOR,
                  }}
                >
                  ${item.price}
                </CustomText>
                <View
                  style={{
                    backgroundColor: CTA_COLOR,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    borderRadius: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome name="star" size={10} color={BG_COLOR} />
                  <CustomText
                    style={{
                      fontFamily: "Medium",
                      fontSize: 10,
                      marginLeft: 5,
                      color: BG_COLOR,
                      marginTop: 2,
                    }}
                  >
                    {(item.rating / item.reviews.length).toFixed(1)}
                  </CustomText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      ) : (
        <View
          style={[
            stylesLocal.content,
            styles.shadow,
            { justifyContent: "center" },
          ]}
        >
          <ActivityIndicator size={40} color={CTA_COLOR} visible={true} />
        </View>
      )}
    </View>
  );
};

export default ProductThumbnail;

const stylesLocal = StyleSheet.create({
  content: {
    width: Dimensions.get("window").width / 2 - 30,
    height: Dimensions.get("window").width / 2 + 30,
    borderRadius: 6,
    marginBottom: 20,
    marginRight: 10,
    backgroundColor: BG_COLOR,
  },
  image: {
    flex: 0.75,
    width: Dimensions.get("window").width / 2 - 30,
    marginBottom: 8,
    borderRadius: 6,
  },
  prodText: {
    flex: 0.2,
    paddingHorizontal: 8,
  },
});
