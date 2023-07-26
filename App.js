import { AuthContextProvider } from "./context/AuthContext";
import MainNavigator from "./screens/MainNavigator";

export default function App() {
  return (
    <AuthContextProvider>
      <MainNavigator />
    </AuthContextProvider>
  );
}
