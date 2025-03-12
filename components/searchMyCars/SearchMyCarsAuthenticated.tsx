import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import DeleteButton from "@/components/ui/DeleteButton";
import FullScreenLoading from "@/components/ui/react-native-paper/FullScreenLoading";
import SoldButton from "@/components/ui/SoldButton";
import { useGetSearchMyCars } from "@/hooks/api/car/Queries/useGetSearchMyCars";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, Surface, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";

const SearchMyCarsAuthenticated = () => {
  const {
    data: paginatedSearchMyCarsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    search,
    setSearch,
  } = useGetSearchMyCars();

  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

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

  const totalText = paginatedSearchMyCarsData?.pages[0].total.toString()
    ? paginatedSearchMyCarsData?.pages[0].total.toString() + " نتائج بحث"
    : "نتائج بحث";

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ gap: 16 }}>
        <Surface
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text>{totalText}</Text>
        </Surface>
        <Searchbar
          placeholder="ابحث عن سيارة"
          value={search}
          onChangeText={setSearch}
        ></Searchbar>
      </View>
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
                <DeleteButton
                  id={item.id}
                  onPress={() => setIsLoadingVisible(true)}
                  onSuccess={() => setIsLoadingVisible(false)}
                />
                <SoldButton
                  id={item.id}
                  onPress={() => setIsLoadingVisible(true)}
                  onSuccess={() => setIsLoadingVisible(false)}
                />
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
      <FullScreenLoading visible={isLoadingVisible} />
    </SafeAreaView>
  );
};

export default SearchMyCarsAuthenticated;
