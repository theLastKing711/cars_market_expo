import SearchCarOfferForm from "@/components/SearchCarOfferForm";
import { router } from "expo-router";
import { View } from "react-native";
import React from "react";

const CarSearchFilterModal = () => {
  const goBack = () => {
    router.back();
  };

  return <SearchCarOfferForm isModal />;
};

export default CarSearchFilterModal;
