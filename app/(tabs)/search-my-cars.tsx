import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import DeleteButton from "@/components/ui/DeleteButton";
import FullScreenLoading from "@/components/ui/react-native-paper/FullScreenLoading";
import SoldButton from "@/components/ui/SoldButton";
import { useGetSearchMyCars } from "@/hooks/api/car/Queries/useGetSearchMyCars";
import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";

const searchMyCars = () => {
  const navigation = useNavigation();

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

  React.useEffect(() => {
    navigation.setOptions({
      title: paginatedSearchMyCarsData?.pages[0].total.toString() + " نتائج",
    });
  }, [navigation, paginatedSearchMyCarsData?.pages[0].total.toString()]);

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

export default searchMyCars;
