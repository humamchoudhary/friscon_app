import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import FirstScreen from "./screens/First";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { auth } from "./components/firebaseConfig";
import { ActivityIndicator, View } from "react-native";
import { CTA_COLOR, styles, BG_COLOR } from "./styles/styles";
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();

export default function App() {
  const [autoLog, setAutoLog] = useState();

  useEffect(() => {
    async function getUser() {
      setAutoLog(false);
      let result = await SecureStore.getItemAsync("autolog");
      console.log(result === "true");
      if (result === "true") {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setAutoLog(true);
          }
        });
      }
    }
    getUser();
  }, []);

  if (autoLog) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={autoLog ? "Home" : "First"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="First" component={FirstScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="Signup" component={SignupScreen} />
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
