import { Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {BG_COLOR} from "../styles/styles"

import { useAuthContext } from '../context/AuthContext';
import * as SecureStore from "expo-secure-store";


 const SplashScreen = ({navigation }) => {
  const localImage = require("../assets/logo_named.png");

  const { user } = useAuthContext();
  useEffect(() => {
    async function getUser() {
      console.log(user);
      let result = await SecureStore.getItemAsync("autolog");
      console.log(result === "true");
      if (result === "true") {
        if (user) {
          navigation.navigate("home")
          console.log("asd")
        } else {
            navigation.navigate("First")
          console.log("d")
        }
 
      }else {
        navigation.navigate("First")
    }
    }
    getUser();
  }, [user]);
  return (
    <SafeAreaView style={[{ backgroundColor: BG_COLOR, minHeight: "100%" ,flex:1,justifyContent:"center",alignItems:"center"}]}>
          <Image source={localImage} style={{ marginBottom: 65 }} />
    </SafeAreaView>
  )
}

export default SplashScreen
