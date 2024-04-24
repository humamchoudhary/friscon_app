import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import SplashScreen from "./SplashScreen";
import ForgotPass from "./ForgotPass";
import CartScreen from "./CartScreen";
import CheckoutScreen from "./CheckoutScreen";
import PaymentSuccessScreen from "./PaymentSuccessScreen";
import ProfileScreen from "./ProfileScreen";
import LogoutScreen from "./Logout";
import Privacy from "./Privacy";
import OrderHistory from "./OrderHistory";
import OrderHistoryList from "./OrderHistoryList";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const offerIcon = require("../assets/offerIcon.png");
  return (
    <View style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <Tab.Navigator
        initialRouteName={"Home"} //Prod
        // initialRouteName={"Profile"} //Dev
        screenOptions={({ route }) => ({
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
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-cart" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={24} color={color} />
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
          initialRouteName={"splash"} //Production
          // initialRouteName={"orderHistoryList"} //Dev
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="First" component={FirstScreen} />
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="home" component={TabNavigator} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Tab.Screen name="search" component={SearchScreen} />
          <Tab.Screen name="forgotpass" component={ForgotPass} />
          <Tab.Screen name="checkout" component={CheckoutScreen} />
          <Tab.Screen name="paymentSuccess" component={PaymentSuccessScreen} />
          <Tab.Screen name="logout" component={LogoutScreen} />
          <Tab.Screen name="privacy" component={Privacy} />
          <Tab.Screen name="orderHistory" component={OrderHistory} />
          <Tab.Screen name="orderHistoryList" component={OrderHistoryList} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigator;
