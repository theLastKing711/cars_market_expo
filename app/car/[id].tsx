import HaveFeatureSection, {
  HaveFeatureSectionProps,
} from "@/components/carOfferDetails/HaveFeatureSection";
import ImagesCarouselSection from "@/components/carOfferDetails/ImagesCarouselSection";
import MainListSection, {
  MainListSectionProps,
} from "@/components/carOfferDetails/mainListSection/MainListSection";
import MainListSectionItem, {
  MainListSectionItemProps,
} from "@/components/carOfferDetails/mainListSection/MainListSectionItem";
import MainListSectionRow from "@/components/carOfferDetails/mainListSection/MainListSectionRow";
import { MainSection } from "@/components/carOfferDetails/MainSection";
import PriceSection from "@/components/carOfferDetails/PriceSection";
import { SectionContainer } from "@/components/carOfferDetails/SectionContainer";
import ShippableToSection from "@/components/carOfferDetails/ShippableToSection";
import { useGetCarOfferDetails } from "@/hooks/api/car/Queries/useGetCarOfferDetails";
import { FUELTYPELIST } from "@/types/enums/FuelType";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Icon, List, Text, useTheme } from "react-native-paper";

const CarOfferDetails = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      position: "relative",
    },
  });

  const { data, isLoading } = useGetCarOfferDetails(id);

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
      icon: "car",
      label: "الشركة المصنعة",
      text: data?.data.manufacturer_name_en,
    },
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
      // text: data?.data.fuel_type ? FUELTYPELOOKUP[data?.data.fuel_type] : "-",
    },
    {
      icon: "car",
      label: "الاستعمال",
      text: data?.data.is_new_car ? "جديدة" : "مستعملة",
      isLastItem: true,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImagesCarouselSection />
        <MainSection
          title={data?.data.manufacturer_name_en}
          location={data?.data.car_label_origin}
        />
        <PriceSection price={data?.data.car_price} />
        <MainListSection items={mainListSectionItemProps} />
        <HaveFeatureSection items={haveFeaturesItems} />
        <ShippableToSection cities={shippable_to_cites} />
      </View>
    </ScrollView>
  );
};

export default CarOfferDetails;
