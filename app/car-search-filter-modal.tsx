import SearchCarOfferForm from "@/components/SearchCarOfferForm";
import { router } from "expo-router";
import { View } from "react-native";

const CarSearchFilterModal = () => {
  const goBack = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchCarOfferForm isModal />
    </View>
  );
};

export default CarSearchFilterModal;
