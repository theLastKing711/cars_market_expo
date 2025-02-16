import SearchCarOfferForm from "@/components/SearchCarOfferForm";
import PaperFabSearchButton from "@/components/ui/react-native-paper/PaperFabSearchButton";
import { SearchCarOfferQueryParameterData } from "@/types/home";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Portal } from "react-native-paper";

const CarSearchFilterModal = () => {
  const goBack = () => {
    router.back();
    router.setParams({
      shippable_to: "[1, 2]",
    });
  };

  const { shippable_to = [] } =
    useLocalSearchParams<SearchCarOfferQueryParameterData>();

  console.log("search filter modal page", shippable_to);

  return (
    <View style={{ flex: 1 }}>
      <SearchCarOfferForm isModal />
    </View>
  );
};

export default CarSearchFilterModal;
