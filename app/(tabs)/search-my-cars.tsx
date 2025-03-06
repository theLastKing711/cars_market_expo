import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import DeleteButton from "@/components/ui/DeleteButton";
import SoldButton from "@/components/ui/SoldButton";
import { useGetSearchMyCars } from "@/hooks/api/car/Queries/useGetSearchMyCars";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";

const searchMyCars = () => {
  const {
    data: paginatedSearchMyCarsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    search,
    setSearch,
  } = useGetSearchMyCars();

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      flex: 1,
    },
  });

  const searchResultTotal = paginatedSearchMyCarsData?.pages.length
    ? paginatedSearchMyCarsData?.pages[0].total
    : "0";

  const SearchMyCarsData =
    paginatedSearchMyCarsData?.pages?.flatMap((item) => item.data) || [];

  const navigateToDetailsPage = (id: number) => {
    router.push({
      pathname: "/car/update/[id]",
      params: {
        id,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="ابحث عن سيارة"
        value={search}
        onChangeText={setSearch}
      ></Searchbar>
      <CarSearchResultCardList
        items={SearchMyCarsData}
        renderItem={({ item }) => (
          <CarSearchResultCard
            item={item}
            onPress={navigateToDetailsPage}
            actions={
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <DeleteButton id={item.id} />
                <SoldButton id={item.id} />
              </View>
            }
          />
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

export default searchMyCars;
