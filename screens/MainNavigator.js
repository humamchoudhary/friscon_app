import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import FirstScreen from "./First";
import HomeScreen from "./Home";
import LoginScreen from "./Login";
import SignupScreen from "./Signup";
import { Image, View } from "react-native";
import { CTA_COLOR, BG_COLOR, DARK_COLOR } from "../styles/styles";
import OffersScreen from "./Offers";
import ProductScreen from "./ProductScreen";
import SearchScreen from "./Search";
import SplashScreen from "./SplashScreen"
const Tab = createBottomTabNavigator();
function TabNavigator() {
  const offerIcon = require("../assets/offerIcon.png");
  return (
    <View style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <Tab.Navigator
        initialRouteName={"Home"} //Prod
        // initialRouteName={"search"} //Dev
        screenOptions={({ route }) => ({
          headerShown: false,
          // tabBarButton: ["search"].includes(route.name)
          //   ? () => {
          //       return null;
          //     }
          //   : undefined,

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
          },
        })}
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

const MainNavigator = () => {
 
  return (
    <>
   
        <NavigationContainer>
          {/* <StatusBar style="light" /> */}
          <Stack.Navigator
            // initialRouteName={autoLog === "true" ? "home" : "First"} //Production
            initialRouteName={"splash"} //Dev
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="First" component={FirstScreen} />
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="home" component={TabNavigator} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Tab.Screen name="search" component={SearchScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      
     
    </>
  );
};

export default MainNavigator;
