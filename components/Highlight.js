import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { storage } from "../components/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { Dimensions } from "react-native";
import { CTA_COLOR } from "../styles/styles";

const Highlight = ({ data, navigation }) => {
  const [carouselData, setCarouselData] = useState([]);
  const flatListRef = useRef(null);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    const fetchData = async () => {
      const updatedCarouselData = [];
      for (let i = 0; i < data.length; i++) {
        const key = data[i];
        const url = await getDownloadURL(ref(storage, key["img"]));
        const updatedItem = { ...key, img: url };
        updatedCarouselData.push(updatedItem);
      }
      setCarouselData(updatedCarouselData);
    };

    fetchData();
  }, [data]);

  return (
    <ScrollView
      snapToInterval={width + 130}
      decelerationRate={"fast"}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      {carouselData ? (
        carouselData.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.to);
              }}
              key={index}
              style={styles.carouselItem}
            >
              <Image
                source={{ uri: item.img }}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <View
          style={[
            styles.container,
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
    </ScrollView>
  );
};

const styles = {
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CTA_COLOR,
    width: Dimensions.get("window").width - 60,
    height: 120,
    borderRadius: 9,
    marginRight: 20,
    overflow: "hidden",
  },
};

export default Highlight;
