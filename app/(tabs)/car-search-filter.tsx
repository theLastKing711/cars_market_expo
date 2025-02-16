import SearchCarOfferForm from "@/components/SearchCarOfferForm";
import { SearchCarOfferQueryParameterData } from "@/types/home";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const CarSearchFilter = () => {
  const { shippable_to = [] } =
    useGlobalSearchParams<SearchCarOfferQueryParameterData>();

  console.log("car serach filter page", shippable_to);

  return (
    // <View style={{ flex: 1 }}>
    <SearchCarOfferForm />
    // </View>
  );
};

export default CarSearchFilter;
