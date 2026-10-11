import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../Screens/HomeScreen";
import PokemonList from "../Screens/PokemonList";
import PokenmonDetails from "../Screens/PokenmonDetails";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#18181b",
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonDetails" component={PokenmonDetails} />
    </Stack.Navigator>
  );
};

const ListStackDisplay = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#18181b",
        },
      }}
    >
      <Stack.Screen name="PokemonList" component={PokemonList} />
      <Stack.Screen name="PokemonDetails" component={PokenmonDetails} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#27272a",
          borderTopColor: "#3f3f46",
          paddingTop: 5,
          paddingBottom: Math.max(insets.bottom, 5),
          height: 60 + insets.bottom,
        },
        tabBarActiveTintColor: "#34d399",
        tabBarInactiveTintColor: "#a1a1a1",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"] = "home";

          if (route.name === "Explore") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Pokedex") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Explore" component={HomeStack} />
      <Tab.Screen name="Pokedex" component={ListStackDisplay} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
