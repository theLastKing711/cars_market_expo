import React, { useEffect } from "react";
import { ActivityIndicator, Portal, useTheme } from "react-native-paper";
import { useGetUpdateCarOffer } from "@/hooks/api/car/Queries/useGetUpdateCarOffer";
import { useLocalSearchParams } from "expo-router";
import useLoadingStore from "@/state/useLoadingStore";
import { UpdateCarDetailsForm } from "@/components/updateCarOffer/UpdateCarDetailsForm";
import FullScreenLoading from "@/components/ui/react-native-paper/FullScreenLoading";
import { View } from "react-native";

const UpdateCarOffer = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: oldCarDetailsData, isLoading } = useGetUpdateCarOffer(id);

  const { setLoading } = useLoadingStore();

  const theme = useTheme();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (!oldCarDetailsData) {
    return;
  }

  return <UpdateCarDetailsForm oldCarDetailsData={oldCarDetailsData.data} />;
};

export default UpdateCarOffer;
