import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import { getPokemonList, PokemonDetail, PokemonRef } from "../../api/pokemon";
import AppHeader from "../../components/app-header";
import PokemonCard from "../../components/pokemon-card";
import { COLORS } from "../../constant/colors";
import { HomeScreenNavigationProp } from "../Navigation/types";

const PAGE_SIZE = 20;

const PokemonListScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [list, setList] = useState<PokemonRef[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Refs prevent multiple pagination requests before React updates state.
  const loadingRef = useRef(false);
  const offsetRef = useRef(0);
  const hasMoreRef = useRef(true);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      const data = await getPokemonList(PAGE_SIZE, offsetRef.current);

      // Advance using the actual number of results received.
      offsetRef.current += data.results.length;

      setList((previousList) => {
        const existingNames = new Set(
          previousList.map((pokemon) => pokemon.name),
        );

        const uniqueResults = data.results.filter((pokemon) => {
          if (existingNames.has(pokemon.name)) {
            return false;
          }

          existingNames.add(pokemon.name);
          return true;
        });

        return [...previousList, ...uniqueResults];
      });

      const moreAvailable = Boolean(data.next);
      hasMoreRef.current = moreAvailable;
      setHasMore(moreAvailable);
    } catch (error) {
      console.error("Failed to load Pokémon:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMore();
  }, [loadMore]);

  const handlePress = (pokemon: PokemonDetail) => {
    navigation.navigate("PokemonDetails", { pokemon });
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Full List" />

      <FlatList
        data={list}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} url={item.url} onPress={handlePress} />
        )}
        onEndReached={() => {
          void loadMore();
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.content}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              style={styles.loader}
              color={COLORS.accentEmerald}
            />
          ) : null
        }
      />
    </View>
  );
};

export default PokemonListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  loader: {
    paddingVertical: 16,
  },
});
