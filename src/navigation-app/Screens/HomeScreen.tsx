import {
  getPokemonByType,
  getPokemonList,
  PokemonDetail,
  PokemonRef,
} from "@/api/pokemon";
import FilterChips from "@/components/filter-cihps";
import SearchInput from "@/components/search-input";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import AppHeader from "../../components/app-header";
import PokemonCard from "../../components/pokemon-card";
import { COLORS } from "../../constant/colors";
import { HomeScreenNavigationProp } from "../Navigation/types";

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [masterList, setMasterList] = useState<PokemonRef[]>([]);
  const [searchedText, setSearchedText] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const fetchData = async () => {
    setLoading(true);
    setPage(1);
    try {
      if (selectedType) {
        const list = await getPokemonByType(selectedType);
        setMasterList(list);
      } else {
        const data = await getPokemonList(1000, 0);
        setMasterList(data.results);
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (displayList.length < filteredList.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredList = useMemo(() => {
    if (!searchedText) return masterList;
    return masterList.filter((p) =>
      p.name.includes(searchedText.toLowerCase()),
    );
  }, [masterList, searchedText]);

  const displayList = useMemo(() => {
    return filteredList.slice(0, page * PAGE_SIZE);
  }, [filteredList, page]);

  const handlecardPress = (pokemon: PokemonDetail) => {
    navigation.navigate("PokemonDetails", { pokemon });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AppHeader title="Pokedex" showlogo />

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchedText}
            onChangeText={setSearchedText}
            placeholder="Search Pokémon"
            onClear={() => setSearchedText("")}
          />
        </View>
        <View style={styles.filterContainer}>
          <FilterChips
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </View>

        {loading && page === 1 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={displayList}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PokemonCard
                name={item.name}
                url={item.url}
                onPress={handlecardPress}
              />
            )}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 0,
  },
  filterContainer: {
    marginTop: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
