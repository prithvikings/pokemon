import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  PokemonList: undefined;
  PokemonDetails: { pokemon: any };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;
export type PokemonListNavigationProp = RouteProp<
  RootStackParamList,
  "PokemonList"
>;
