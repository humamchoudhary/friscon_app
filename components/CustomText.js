import { Text } from "react-native";
import { useFonts } from "expo-font";

const CustomText = ({ children, style, props }) => {
  let [fontLoaded, error] = useFonts({
    Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    SemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Light: require("../assets/fonts/Poppins-Light.ttf"),
  });
  if (!fontLoaded) {
    return null;
  } else {
    return (
      <Text style={[style]} {...props}>
        {children}
      </Text>
    );
  }
};

export default CustomText;
