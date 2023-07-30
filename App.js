import { useEffect } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import MainNavigator from "./screens/MainNavigator";

import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
  Regular: require("./assets/fonts/Poppins-Regular.ttf"),
  Medium: require("./assets/fonts/Poppins-Medium.ttf"),
  SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  Bold: require("./assets/fonts/Poppins-Bold.ttf"),
  Light: require("./assets/fonts/Poppins-Light.ttf"),
  }); 
}
export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);
  
  return (
    <AuthContextProvider>
      <MainNavigator />
    </AuthContextProvider>
  );
}
