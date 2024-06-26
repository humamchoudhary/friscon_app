import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, CTA_COLOR, BG_COLOR, DARK_COLOR } from "../styles/styles";
import { Feather } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import { db, storage } from "../components/firebaseConfig";
import { arrayUnion, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import IndexIndicator from "../components/IndexIndicator";
import ProdReviewTile from "../components/ProdReviewTile";
import ProductReviewModal from "../screens/ProductReviewModal";
import updateData from "../firebase/firestore/updateData";
import { useAuthContext } from "../context/AuthContext";
import Toast from "react-native-root-toast";

const ProductScreen = ({ route, navigation }) => {
  const { itemid } = route.params;
  const [product, setProduct] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [activeView, setActiveView] = useState("product");
  const [activeColor, setActiveColor] = useState(0);
  const [activeColorName, setActiveColorName] = useState();
  const [activeVarient, setActiveVarient] = useState(0);
  const [activeVarientName, setActiveVarientName] = useState();
  const [modalShown, setModalShown] = useState(false);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    getDoc(doc(db, "products", itemid)).then(async (_) => {
      var data = _.data();
      for (let index = 0; index < data.imgs.length; index++) {
        data.imgs[index] = await getDownloadURL(ref(storage, data.imgs[index]));
      }
      setProduct(data);
      setActiveVarientName(data.varients[activeVarient]);
      setActiveColorName(data.colors[activeColor]);
    });
  }, [modalShown]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setCurrentItem(viewableItems[0]["key"]);
  }, []);

  useEffect(() => {
    if (product) {
      setActiveVarientName(product.varients[activeVarient]);
      setActiveColorName(product.colors[activeColor]);
    }
  }, [activeColor, activeVarient]);

  async function AddToCart() {
    setLoadingAddToCart(true);

    const { error } = await updateData("users", user.uid, {
      cart: arrayUnion({
        color: activeColorName,
        varient: activeVarientName,
        id: itemid,
        quantity: 1,
        basePrice: product.price,
      }),
    });
    if (!error) {
      Toast.show("Item added to cart!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
    setLoadingAddToCart(false);
  }

  return (
    <SafeAreaView style={{ backgroundColor: BG_COLOR, flex: 1 }}>
      <View
        style={[
          styles.appBar,
          {
            paddingHorizontal: 30,
            marginBottom: 30,
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Feather
            name="arrow-left"
            size={24}
            color={CTA_COLOR}
            onPress={() => {
              navigation.goBack(null);
            }}
          />
          <CustomText
            style={{ fontFamily: "Medium", fontSize: 24, marginLeft: 20 }}
          >
            Product
          </CustomText>
        </View>
        <Feather
          name="shopping-cart"
          size={24}
          color={CTA_COLOR}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </View>
      {product ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              paddingHorizontal: 20,
            }}
          >
            <View style={{ position: "relative" }}>
              <FlatList
                data={product.imgs}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{ height: Dimensions.get("window").width - 40 }}
                    >
                      <Image
                        source={{ uri: product.imgs[0] }}
                        style={stylesLocal.image}
                        resizeMode="cover"
                      />
                    </View>
                  );
                }}
                horizontal
                pagingEnabled
                snapToAlignment="start"
                bounces={false}
                showsHorizontalScrollIndicator={false}
                // onViewableItemsChanged={onViewableItemsChanged}
              />
              <IndexIndicator currentIndex={currentItem} data={product.imgs} />
            </View>

            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CustomText
                style={{
                  flex: 0.5,
                  fontSize: 18,
                  fontFamily: "SemiBold",
                  color: CTA_COLOR,
                }}
              >
                ${product.price}
              </CustomText>
              <View style={{}}>
                <CustomText
                  style={{
                    flex: 0.5,
                    fontSize: 14,
                    fontFamily: "Medium",
                    color: CTA_COLOR,
                  }}
                >
                  {(product.rating / product.reviews.length).toFixed(1)}
                </CustomText>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomText
                style={{
                  flex: 0.8,
                  fontSize: 18,
                  fontFamily: "SemiBold",
                  color: DARK_COLOR,
                }}
              >
                {product.name}
              </CustomText>
              <View>
                <CustomText
                  style={{
                    flex: 0.2,
                    fontSize: 14,
                    fontFamily: "Medium",
                    color: DARK_COLOR,
                  }}
                >
                  {product.sold} sold |{" "}
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </CustomText>
              </View>
            </View>

            <View
              style={{
                height: 0.5,
                width: Dimensions.get("window").width,
                backgroundColor: CTA_COLOR,
                marginTop: 20,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setActiveView("product");
                }}
              >
                <CustomText
                  style={{
                    fontSize: 18,
                    fontFamily: "Medium",
                    color: activeView === "product" ? CTA_COLOR : DARK_COLOR,
                    marginHorizontal: 15,
                  }}
                >
                  Product
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActiveView("details");
                }}
              >
                <CustomText
                  style={{
                    fontSize: 18,
                    fontFamily: "Medium",
                    color: activeView === "details" ? CTA_COLOR : DARK_COLOR,

                    marginHorizontal: 15,
                  }}
                >
                  Details
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActiveView("review");
                }}
              >
                <CustomText
                  style={{
                    fontSize: 18,
                    fontFamily: "Medium",
                    color: activeView === "review" ? CTA_COLOR : DARK_COLOR,

                    marginHorizontal: 15,
                  }}
                >
                  Reviews
                </CustomText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 0.5,
                width: Dimensions.get("window").width,
                backgroundColor: CTA_COLOR,
                marginBottom: 20,
              }}
            />
            {activeView === "product" ? (
              <View style={{ marginBottom: 80 }}>
                <View>
                  <CustomText
                    style={{
                      fontSize: 16,
                      fontFamily: "Medium",
                      color: DARK_COLOR,
                    }}
                  >
                    Select Color
                  </CustomText>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {product.colors.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setActiveColor(index);
                          }}
                          style={{
                            backgroundColor: item,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginHorizontal: 6,
                            borderWidth: index === activeColor ? 4 : 1,

                            borderColor:
                              index === activeColor ? CTA_COLOR : DARK_COLOR,
                          }}
                        />
                      );
                    })}
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      fontFamily: "Medium",
                      color: DARK_COLOR,
                    }}
                  >
                    Select Varient
                  </CustomText>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {product.varients.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setActiveVarient(index);
                          }}
                          style={{
                            backgroundColor:
                              index === activeVarient ? CTA_COLOR : BG_COLOR,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginHorizontal: 6,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: CTA_COLOR,
                          }}
                        >
                          <CustomText
                            style={{
                              fontSize: 16,
                              fontFamily: "Medium",
                              color:
                                index === activeVarient ? BG_COLOR : CTA_COLOR,
                            }}
                          >
                            {item}
                          </CustomText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            ) : activeView === "details" ? (
              <View style={{ marginBottom: 80 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 0.5 }}>
                    <CustomText
                      style={{
                        fontSize: 16,
                        fontFamily: "Bold",
                        color: DARK_COLOR,
                      }}
                    >
                      Product Details
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: 16,
                        fontFamily: "Light",
                        color: DARK_COLOR,
                      }}
                    >
                      {product.details}
                    </CustomText>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <CustomText
                      style={{
                        fontSize: 16,
                        fontFamily: "Bold",
                        color: DARK_COLOR,
                      }}
                    >
                      SKU
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: 16,
                        fontFamily: "Light",
                        color: DARK_COLOR,
                      }}
                    >
                      {product.code}
                    </CustomText>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                  }}
                >
                  <View style={{ flex: 0.5 }}>
                    <CustomText
                      style={{
                        fontSize: 16,
                        fontFamily: "Bold",
                        color: DARK_COLOR,
                      }}
                    >
                      Category
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: 16,
                        fontFamily: "Light",
                        color: DARK_COLOR,
                      }}
                    >
                      {product.category}
                    </CustomText>
                  </View>
                  {product.material && (
                    <View style={{ flex: 0.5 }}>
                      <CustomText
                        style={{
                          fontSize: 16,
                          fontFamily: "Bold",
                          color: DARK_COLOR,
                        }}
                      >
                        Material
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: 16,
                          fontFamily: "Light",
                          color: DARK_COLOR,
                        }}
                      >
                        {product.material}
                      </CustomText>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <CustomText
                      style={{
                        fontSize: 16,
                        fontFamily: "Bold",
                        color: DARK_COLOR,
                      }}
                    >
                      Description
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: 16,
                        fontFamily: "Light",
                        color: DARK_COLOR,
                      }}
                    >
                      {product.description}
                    </CustomText>
                  </View>
                </View>
              </View>
            ) : activeView === "review" ? (
              <View style={{ marginBottom: 80 }}>
                <ScrollView>
                  {product.reviews.map((item, index) => {
                    return (
                      <ProdReviewTile
                        key={index}
                        item={item}
                        setModalShown={setModalShown}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            ) : null}
          </ScrollView>
          {activeView === "review" ? (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: BG_COLOR,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                zIndex: 10,
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalShown(true);
                }}
                style={[styles.buttonFilled, styles.button, { flex: 0.9 }]}
              >
                <CustomText style={[styles.buttonFilledText]}>
                  Write Review
                </CustomText>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: BG_COLOR,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                zIndex: 10,
                paddingBottom: 10,
              }}
            >
              {loadingAddToCart ? (
                <View
                  style={[styles.buttonHollow, styles.button, { flex: 0.4 }]}
                >
                  <ActivityIndicator
                    visible={true}
                    color={CTA_COLOR}
                    size={20}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={AddToCart}
                  style={[styles.buttonHollow, styles.button, { flex: 0.4 }]}
                >
                  <CustomText style={[styles.buttonHollowText]}>
                    Add To Cart
                  </CustomText>
                </TouchableOpacity>
              )}

              <View style={[styles.buttonFilled, styles.button, { flex: 0.4 }]}>
                <CustomText style={[styles.buttonFilledText]}>
                  Buy Now
                </CustomText>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View
          style={[
            {
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator size={40} color={CTA_COLOR} visible={true} />
        </View>
      )}
      {modalShown && (
        <ProductReviewModal
          setModalShown={setModalShown}
          item={itemid}
          // item={itemId}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;

const stylesLocal = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width - 40,
    // width: "100%",
    flex: 1,
    marginRight: 20,
    borderRadius: 20,
  },
});
