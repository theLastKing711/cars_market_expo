import HaveFeatureSection, {
  HaveFeatureSectionProps,
} from "@/components/carOfferDetails/HaveFeatureSection";
import ImagesCarouselSection from "@/components/carOfferDetails/ImagesCarouselSection";
import MainListSection, {
  MainListSectionProps,
} from "@/components/carOfferDetails/mainListSection/MainListSection";
import { MainSection } from "@/components/carOfferDetails/MainSection";
import PriceSection from "@/components/carOfferDetails/PriceSection";
import ShippableToSection from "@/components/carOfferDetails/ShippableToSection";
import { useGetCarOfferDetails } from "@/hooks/api/car/Queries/useGetCarOfferDetails";
import { FUELTYPELIST } from "@/types/enums/FuelType";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const CarOfferDetails = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const theme = useTheme();

  const { data, isLoading } = useGetCarOfferDetails(id);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
    },
  });

  const shippable_to_cites = data?.data.shippable_to || [];

  const haveFeaturesItems: HaveFeatureSectionProps["items"] = [
    {
      label: "خالية العلام",
      is_checked: data?.data.is_khalyeh,
    },
    {
      label: "قصة",
      is_checked: data?.data.is_kassah,
    },
    {
      label: "جاهزة للفراغة",
      is_checked: data?.data.is_faragha_jahzeh,
    },
  ];

  const mainListSectionItemProps: MainListSectionProps["items"] = [
    {
      icon: "road",
      label: "قاطعة",
      text: `${data?.data.miles_travelled_in_km} (km/كم)`,
    },
    {
      icon: "fuel",
      label: "الوقود",
      text: data?.data.fuel_type
        ? FUELTYPELIST.find((x) => parseInt(x._id) == data.data.fuel_type)
            ?.value
        : "-",
    },
  ];

  const title = `${data?.data.manufacturer_name_ar}${
    data?.data.is_new_car ? " جديدة" : "مستعملة"
  }`;

  const is_shippable = shippable_to_cites.length > 0;

  return (
    <ScrollView style={{ backgroundColor: theme.colors.surface }}>
      <View style={styles.container}>
        <ImagesCarouselSection
          imagesUrls={data?.data.images.map((image) => image.file_url) || []}
        />
        <MainSection title={title} location={data?.data.car_sell_location} />
        <PriceSection price={data?.data.car_price} />
        <MainListSection items={mainListSectionItemProps} />
        <HaveFeatureSection items={haveFeaturesItems} />
        {is_shippable && <ShippableToSection cities={shippable_to_cites} />}
      </View>
    </ScrollView>
  );
};

export default CarOfferDetails;
