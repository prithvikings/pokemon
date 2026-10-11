import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation-app/Navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
