import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import DeleteButton from "@/components/ui/DeleteButton";
import SoldButton from "@/components/ui/SoldButton";
import { useGetSearchMyCars } from "@/hooks/api/car/Queries/useGetSearchMyCars";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Searchbar, Surface, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";
import useLoadingStore from "@/state/useLoadingStore";

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

  const { setLoading } = useLoadingStore();

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      flex: 1,
      paddingBottom: 71,
    },
  });

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
    ? "عدد نتائج البحث " + paginatedSearchMyCarsData?.pages[0].total.toString()
    : "عدد نتائج البحث 0";

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
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 16,
                    gap: 8,
                  }}
                >
                  <Icon size={24} source="eye" />
                  <Text variant="titleMedium">
                    {/* {" "}
                    عدد المشاهدات: {item.views} */}
                    {item.views}
                  </Text>
                </View>
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

export default SearchMyCarsAuthenticated;
