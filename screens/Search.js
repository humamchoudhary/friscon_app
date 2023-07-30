import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, CTA_COLOR, BG_COLOR, DARK_COLOR } from "../styles/styles";
import { Feather } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import CustomIconInput from "../components/CustomIconInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig";
import ProductThumbnail from "../components/ProductThumbnail";
import FilterModal from "../components/filterModal";

const SearchScreen = ({ route, navigation }) => {
  const { query } = route.params;
  const [view, setView] = useState("product");
  const [products, setProducts] = useState();
  const [stores, setStores] = useState();
  const [loading, setloading] = useState();
  const [cat, setCat] = useState();
  const [searchQuery, setSeachQuery] = useState();
  const [filters, setFilters] = useState({});
  const [filterModal, setFilterModal] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [productsCopy, setProductsCopy] = useState();
  async function getProductData() {
    const querySnapshot = await getDocs(collection(db, "products"));
    var data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, data: doc.data() });
    });

    setCat(data);
  }

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    setSeachQuery(query);
  }, [query]);

  //Filter
  useEffect(() => {
    setProducts(productsCopy);
    if (!filterModal && filters && products) {
      const filteredData = products.filter((item) => {
        let matches = true;

        if (filters.category) {
          matches = item.data.category === filters.category;
        } else {
          matches = true;
        }

        if (filters.brand) {
          matches = matches && item.data.brand === filters.brand;
        } else {
          matches = matches;
        }

        if (filters.color) {
          matches = matches && item.data.colors.includes(filters.color);
        } else {
          matches = matches;
        }

        return matches;
      });

      setProducts(filteredData);
    }
  }, [filterModal, filters]);

  async function searchData() {
    setloading(true);
    setProducts();
    const data = cat.filter((item) =>
      item.data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setProducts(data);
    setProductsCopy(data);
    setloading(false);
    if (data.length === 0) {
      setEmpty(true);
    }
  }

  useEffect(() => {
    if (searchQuery && cat && view === "product") {
      searchData();
    }
  }, [searchQuery, cat]);

  return (
    <>
      {
        <SafeAreaView style={{ backgroundColor: BG_COLOR, flex: 1 }}>
          {filterModal && (
            <FilterModal
              data={products}
              filterData={filters}
              setModalShown={setFilterModal}
              setFilters={setFilters}
            />
          )}
          <View
            style={[
              styles.appBar,
              {
                paddingHorizontal: 30,
                marginBottom: 30,
                paddingTop: 10,
                alignItems: "center",
              },
            ]}
          >
            <Feather
              name="arrow-left"
              size={24}
              color={CTA_COLOR}
              onPress={() => {
                navigation.goBack();
              }}
            />

            <CustomIconInput
              text={searchQuery}
              onChangeText={setSeachQuery}
              placeholder={"Search"}
              icon={<Feather name="search" size={20} color={CTA_COLOR} />}
              style={{
                backgroundColor: "white",
                borderRadius: 6,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5.62,
                elevation: 7,
                width: "70%",
              }}
            />
            <Feather
              name="filter"
              size={24}
              color={CTA_COLOR}
              onPress={() => {
                setFilterModal(true);
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              onPress={() => {
                setView("product");
              }}
            >
              <CustomText
                style={{ color: view === "product" ? CTA_COLOR : DARK_COLOR }}
              >
                Products
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setView("store");
              }}
            >
              <CustomText
                style={{ color: view === "store" ? CTA_COLOR : DARK_COLOR }}
              >
                Stores
              </CustomText>
            </TouchableOpacity>
          </View>

          {isEmpty ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomText>No Item Found!</CustomText>
              <CustomText>Try some other keyword</CustomText>
            </View>
          ) : view === "product" && products ? (
            <FlatList
              data={products}
              numColumns={2}
              style={{ marginTop: 10 }}
              contentContainerStyle={{
                justifyContent: "space-around",
                paddingHorizontal: 10,
                alignItems: "flex-start",
                alignSelf: "center",
              }}
              columnWrapperStyle={{ flexShrink: 1 }}
              renderItem={({ item }) => {
                const prod = (
                  <ProductThumbnail
                    key={item}
                    itemid={item.id}
                    navigation={navigation}
                  />
                );
                return (
                  <View>
                    {prod ? (
                      prod
                    ) : (
                      <View
                        style={{
                          width: Dimensions.get("window").width / 2 - 30,
                          height: Dimensions.get("window").width / 2 + 30,
                          borderRadius: 6,
                          marginBottom: 20,
                          marginRight: 10,
                          backgroundColor: BG_COLOR,
                          borderColor: "gray",
                          borderWidth: 1,
                        }}
                      ></View>
                    )}
                  </View>
                );
              }}
            />
          ) : view === "store" ? (
            <View></View>
          ) : (
            <View
              style={[
                stylesLocal.container,
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <ActivityIndicator size={40} color={CTA_COLOR} visible={true} />
            </View>
          )}
        </SafeAreaView>
      }
    </>
  );
};

export default SearchScreen;

const stylesLocal = StyleSheet.create({});
