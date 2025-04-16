import ChipsFilterSection from "@/components/carSearchResult/ChipsFilterSection";
import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import { getCarFilterChipList } from "@/constants/variables";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { FUELTYPELOOKUP } from "@/types/enums/FuelType";
import { SYRIANCITYLOOKUP } from "@/types/enums/SyrianCity";
import { TRANSMISSIONLOOKUP } from "@/types/enums/TransmissionType";

import { router, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const CarSearchResult = () => {
  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    isFetching,
    hasNextPage,
    car_sell_location,
    is_faragha_jahzeh,
    is_kassah,
    is_new_car,
    is_khalyeh,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    price_from,
    price_to,
    search,
    transmission,
    fuel_type,
    import_type,
    updateCarSearchParam,
    fetchNextPage,
  } = useGetHomeData();

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      title:
        "عدد نتائج البحث " +
        paginatedCarSearchSuggestionData?.pages[0].total.toString(),
    });
  }, [navigation, paginatedCarSearchSuggestionData?.pages[0].total.toString()]);

  const theme = useTheme();

  const openFilterModal = () => {
    router.push({
      pathname: "/car-search-filter-modal",
    });
  };

  const carSearchSuggestions =
    paginatedCarSearchSuggestionData?.pages?.flatMap((item) => item.data) || [];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 90,
      backgroundColor: theme.colors.surface,
    },
  });

  const filterItems = getCarFilterChipList([
    {
      key: "search",
      text: search,
      onClose: () => updateCarSearchParam({ search: "" }),
    },
    {
      key: "car_sell_location",
      text: SYRIANCITYLOOKUP(car_sell_location),
      onClose: () => updateCarSearchParam({ car_sell_location: "" }),
    },
    {
      key: "fuel_type",
      text: FUELTYPELOOKUP(fuel_type),
      onClose: () => updateCarSearchParam({ fuel_type: "" }),
    },
    {
      key: "import_type",
      text: import_type,
      onClose: () => updateCarSearchParam({ import_type: "" }),
    },
    {
      key: "is_faragha_jahzeh",
      text: !!is_faragha_jahzeh,
      onClose: () => updateCarSearchParam({ is_faragha_jahzeh: "" }),
    },
    {
      key: "is_kassah",
      text: !!is_kassah,
      onClose: () => updateCarSearchParam({ is_kassah: "" }),
    },
    {
      key: "is_khalyeh",
      text: !!is_khalyeh,
      onClose: () => updateCarSearchParam({ is_khalyeh: "" }),
    },
    {
      key: "is_new_car",
      text: !!is_new_car,
      onClose: () => updateCarSearchParam({ is_new_car: "" }),
    },
    {
      key: "miles_travelled_in_km_from",
      text: miles_travelled_in_km_from,
      onClose: () => updateCarSearchParam({ miles_travelled_in_km_from: "" }),
      suffix: "كم",
    },
    {
      key: "miles_travelled_in_km_to",
      text: miles_travelled_in_km_to,
      onClose: () => updateCarSearchParam({ miles_travelled_in_km_to: "" }),
      suffix: "كم",
    },
    {
      key: "price_from",
      text: price_from,
      onClose: () => updateCarSearchParam({ price_from: "" }),
      suffix: "$",
    },
    {
      key: "price_to",
      text: price_to,
      onClose: () => updateCarSearchParam({ price_to: "" }),
      suffix: "$",
    },
    {
      key: "transmission",
      text: TRANSMISSIONLOOKUP(transmission),
      onClose: () => updateCarSearchParam({ transmission: "" }),
    },
  ]);

  return (
    <View style={styles.container}>
      <ChipsFilterSection data={filterItems} />
      <CarSearchResultCardList
        items={carSearchSuggestions}
        renderItem={({ item }) => (
          <CarSearchResultCard key={item.id} item={item} />
        )}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      />
    </View>
  );
};

export default CarSearchResult;
