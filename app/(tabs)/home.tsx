import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import CarSearchSuggestionList from "@/components/home/CarSearchSuggestionList";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { router } from "expo-router";
import { useState } from "react";
import { ListRenderItem, ScrollView, StyleSheet, View } from "react-native";
import { Chip, Searchbar, useTheme } from "react-native-paper";

const Home = () => {
  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    isFetching,
    hasNextPage,
    search,
    fetchNextPage,
  } = useGetHomeData();

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 71,
      backgroundColor: theme.colors.surface,
      position: "relative",
    },
  });

  const carSearchSuggestions =
    paginatedCarSearchSuggestionData?.pages?.flatMap((item) => item.data) || [];

  if (isLoading) {
    return;
  }

  const goToCarSearchFilterPage = () => {
    router.push({ pathname: "/car-search-filter" });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16 }}>
        <Searchbar
          placeholder="ابحث عن سيارة"
          value={search}
          onPress={goToCarSearchFilterPage}
        />
      </View>
      {/* <CarSearchResultCardList
        items={carSearchSuggestions}
        isFetching={isFetching}
        renderItem={({ item }) => (
          <CarSearchResultCard item={item} onFavourite={() => {}} />
        )}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      /> */}
    </View>
  );
};

export default Home;
