import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import { useGetSearchMyFavouriteCars } from "@/hooks/api/car/Queries/useGetSearchMyFavouriteCars";
import { router, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";

const SearchMyFavouriteCars = () => {
  const navigation = useNavigation();

  const {
    data: paginatedSearchMyCarsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    search,
    setSearch,
  } = useGetSearchMyFavouriteCars();

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      flex: 1,
    },
  });

  const SearchMyCarsData =
    paginatedSearchMyCarsData?.pages?.flatMap((item) => item.data) || [];

  const searchResultTotal = paginatedSearchMyCarsData?.pages.length
    ? paginatedSearchMyCarsData?.pages[0].total
    : "0";

  React.useEffect(() => {
    navigation.setOptions({
      title: paginatedSearchMyCarsData?.pages[0].total.toString() + " نتائج",
    });
  }, [navigation, paginatedSearchMyCarsData?.pages[0].total.toString()]);

  const navigateToDetailsPage = (id: number) => {
    router.push({
      pathname: "/car/[id]",
      params: {
        id,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="ابحث عن سيارة  مفضلة"
        value={search}
        onChangeText={setSearch}
      ></Searchbar>
      <CarSearchResultCardList
        items={SearchMyCarsData}
        renderItem={({ item }) => (
          <CarSearchResultCard item={item} onPress={navigateToDetailsPage} />
        )}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        stickyHeaderComponent={SearchBar}
      />
    </SafeAreaView>
  );
};

export default SearchMyFavouriteCars;
