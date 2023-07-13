import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Feather } from "@expo/vector-icons";
import FirstScreen from "./screens/First";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { auth } from "./components/firebaseConfig";
import { ActivityIndicator, Image, View } from "react-native";
import { CTA_COLOR, styles, BG_COLOR, DARK_COLOR } from "./styles/styles";
import OffersScreen from "./screens/Offers";
import ProductScreen from "./screens/ProductScreen";

const Tab = createBottomTabNavigator();
function TabNavigator() {
  const offerIcon = require("./assets/offerIcon.png");
  return (
    <View style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarItemStyle: { marginTop: 5 },
          tabBarStyle: {
            borderTopRightRadius: 23,
            borderTopLeftRadius: 23,
            backgroundColor: BG_COLOR,
          },
          tabBarActiveTintColor: CTA_COLOR,
          tabBarInactiveTintColor: DARK_COLOR,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Regular",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="offers"
          component={OffersScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={offerIcon}
                style={{ width: 24, height: 24, tintColor: color }}
              />
              // <Feather name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
const Stack = createStackNavigator();

export default function App() {
  const [autoLog, setAutoLog] = useState();

  useEffect(() => {
    async function getUser() {
      let result = await SecureStore.getItemAsync("autolog");
      console.log(result === "true");
      if (result === "true") {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setAutoLog(true);
          } else {
            setAutoLog(false);
          }
          console.log(autoLog);
        });
      }
    }
    getUser();
  }, []);

  if (autoLog || autoLog === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={autoLog ? "home" : "First"}
          // initialRouteName={"Product"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="First" component={FirstScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="home" component={TabNavigator} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
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
    );
  }
}
