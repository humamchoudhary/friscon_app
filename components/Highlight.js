import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { storage } from "../components/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import Carousel from "react-native-snap-carousel";

const Highlight = ({ data }) => {
  const [carouselData, setData] = useState([]);
  useEffect(() => {
    data.map((key, index) => {
      carouselData.push(key);
      getDownloadURL(ref(storage, key["img"])).then((url) => {
        // console.log(url);
        carouselData[index]["img"] = url;
      });
    });
    console.log(carouselData);
  }, []);

  return (
    <Carousel
      data={carouselData}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={200}
    />
  );
};

export default Highlight;
