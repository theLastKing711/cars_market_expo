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
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import call from "react-native-phone-call";
import useLoadingStore from "@/state/useLoadingStore";

const CarOfferDetails = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { showLoading, hideLoading, setLoading } = useLoadingStore();

  const theme = useTheme();

  const { data, isLoading } = useGetCarOfferDetails(id);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
      paddingBottom: 100,
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

  const is_shippable = shippable_to_cites.length > 0;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (isLoading) {
    return;
  }

  const title = `${data?.data.name_ar}${
    data?.data.is_new_car ? " جديدة" : " مستعملة"
  }`;

  const phoneCallArgs = {
    number: data?.data.phone_number, // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: false, // Skip the canOpenURL check
  };

  return (
    <View style={{ backgroundColor: theme.colors.surface }}>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <ImagesCarouselSection
              imagesUrls={
                data?.data.images.map((image) => image.file_url) || []
              }
            />
            <MainSection
              id={data!.data.id}
              title={title}
              location={data?.data.car_sell_location}
              is_favourite={data!.data.is_favourite}
            />
            <PriceSection price={data?.data.car_price} />
            <MainListSection items={mainListSectionItemProps} />
            <HaveFeatureSection items={haveFeaturesItems} />
            {is_shippable && <ShippableToSection cities={shippable_to_cites} />}
          </View>
        </SafeAreaView>
      </ScrollView>
      <View
        style={{
          position: "fixed",
          bottom: 100,
          left: 0,
          right: 0,
          zIndex: 30000000,
          marginHorizontal: 16,
          flexDirection: "row",
          gap: 16,
          backgroundColor: theme.colors.surface,
        }}
      >
        <FAB
          label="اتصل بالبائع"
          onPress={() => call(phoneCallArgs).catch(console.error)}
          icon="phone"
          style={{ flex: 1 }}
        />
        <FAB
          label="اتصل واتس بالبائع"
          onPress={() => {}}
          icon="whatsapp"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default CarOfferDetails;
