import { useEffect } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import MainNavigator from "./screens/MainNavigator";
import * as Font from "expo-font";
import { StripeProvider } from "@stripe/stripe-react-native";

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
    <StripeProvider publishableKey="pk_test_51NZzZSA3OkimDdmQF6wEI6eTNe5uhEnI53L4H0woL00OhkCH7cbLS7YYYpmsK0V7yUXhHp5QhWVAe3rTWNUAmKjR00kY8Pt28u">
      <AuthContextProvider>
        <MainNavigator />
      </AuthContextProvider>
    </StripeProvider>
  );
}
