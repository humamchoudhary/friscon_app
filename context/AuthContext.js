import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../firebase/config";
const auth = getAuth(firebase_app);
import { BG_COLOR } from "../styles/styles";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const AuthContext = React.createContext({});
export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const localImage = require("../assets/logo_named.png");

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <SafeAreaView
          style={[
            {
              backgroundColor: BG_COLOR,
              minHeight: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Image source={localImage} style={{ marginBottom: 65 }} />
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
