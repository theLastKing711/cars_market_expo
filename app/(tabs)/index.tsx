import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { FAB, Searchbar, useTheme } from "react-native-paper";
import React from "react";
import SearchCarOfferForm from "@/components/SearchCarOfferForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return <SearchCarOfferForm />;
};

export default Index;
