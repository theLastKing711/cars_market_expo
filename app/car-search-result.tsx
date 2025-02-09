import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { SearchCarOfferQueryParameterData } from "@/types/home";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Searchbar, Text, useTheme } from "react-native-paper";

const CarSearchResult = () => {
  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    hasNextPage,
    search,
    page,
    car_label_origin,
    car_sell_location,
    fuel_type,
    import_type,
    manufacturer_id,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    price_from,
    price_to,
    shippable_to,
    user_current_syrian_city,
    user_has_legal_car_papers,
    year_manufactured,
    model,
    transmission,
    is_new_car,
    is_faragha_jahzeh,
    is_khalyeh,
    is_kassah,
    updateCarFilterQueryParams,
    fetchNextPage,
    onSearchFocus,
    onSearchBlur,
    onSearchValueUpdate,
    onPageValueUpdate,
  } = useGetHomeData();

  // alert("child component" + manufacturer_id);

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // height: "100%", // fill the whole screen height
      // justifyContent: "center",
      // alignItems: "center",
      //   height: 600,
      paddingTop: 71,
      backgroundColor: theme.colors.surface,
      position: "relative",
    },
  });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const carSearchSuggestions =
    paginatedCarSearchSuggestionData?.pages?.flatMap((item) => item.data) || [];

  console.log("carSearchSuggestion", carSearchSuggestions);

  return (
    <View style={styles.container}>
      <CarSearchResultCardList
        items={carSearchSuggestions}
        renderItem={({ item }) => (
          <CarSearchResultCard item={item} onFavourite={() => {}} />
        )}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      />
    </View>
  );
};

export default CarSearchResult;
