import CarFilterModal from "@/components/home/CarFilterModal";
import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";

import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

const CarSearchResult = () => {
  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    isFetching,
    hasNextPage,
    search,
    car_label_origin,
    car_sell_location,
    fuel_type,
    is_faragha_jahzeh,
    is_kassah,
    is_khalyeh,
    is_new_car,
    import_type,
    price_from,
    price_to,
    transmission,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    user_current_syrian_city,
    user_has_legal_car_papers,
    year_manufactured,
    shippable_to,
    fetchNextPage,
  } = useGetHomeData();

  console.log("car search result page", shippable_to);

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 71,
      backgroundColor: theme.colors.surface,
      position: "relative",
    },
  });

  const openFilterModal = () => {
    router.push({
      pathname: "/car-search-filter-modal",
      params: {
        search,
        car_label_origin,
        car_sell_location,
        fuel_type,
        import_type,
        miles_travelled_in_km_from,
        miles_travelled_in_km_to,
        price_from,
        price_to,
        user_current_syrian_city,
        user_has_legal_car_papers,
        year_manufactured,
        is_faragha_jahzeh,
        is_khalyeh,
        is_new_car,
        transmission,
        shippable_to: JSON.stringify(shippable_to),
        // so we can make it in a form that is parsable to array on other page value="[1, 2]" instead of value=1,2
        // both of which get passed as string to next page
      },
    });
  };

  const carSearchSuggestions =
    paginatedCarSearchSuggestionData?.pages?.flatMap((item) => item.data) || [];

  return (
    <View style={styles.container}>
      <Button onPress={openFilterModal}>open</Button>
      <CarSearchResultCardList
        items={carSearchSuggestions}
        renderItem={({ item }) => (
          <CarSearchResultCard item={item} onFavourite={() => {}} />
        )}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      />
      <CarFilterModal
        isVisible={false}
        searchButtonLabel="alskdj"
        onClose={() => {}}
      >
        <View></View>
      </CarFilterModal>
    </View>
  );
};

export default CarSearchResult;
