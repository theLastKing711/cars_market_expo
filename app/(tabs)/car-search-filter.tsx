import BasePaperSelect from "@/components/ui/react-native-paper/BasePaperSelect";
import CustomPaperSegmentedButtonsSection from "@/components/ui/react-native-paper/CustomPaperSegmentedButtonsSection";
import CustomPaperTextInputRangeSection from "@/components/ui/react-native-paper/CustomPaperTextInputRangeSectionProps";
import { REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION } from "@/constants/libs";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import {
  buildQueryParamsString,
  getListItemFromString,
  getListItemsFromStringArray,
  getPaperSelectListItemsText,
  getStringValueFromListItems,
} from "@/libs/axios/helpers";
import { CARMANUFACTURERLIST } from "@/types/enums/CarManufacturer";
import { FUELTYPELISTSEGMENTEDBUTTONS } from "@/types/enums/FuelType";
import { SYRIANCITYlIST } from "@/types/enums/SyrianCity";
import { TRANSMISSIONSEGMENTEDBUTTONS } from "@/types/enums/TransmissionType";
import { RequiredSearchCarOfferQueryParameterData } from "@/types/home";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FAB, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const CarSearchFilter = () => {
  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    hasNextPage,
    search,
    page,
    car_label_origin,
    car_sell_location,
    fuel_type,
    import_type,
    manufacturer_id,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    price_from,
    price_to,
    shippable_to,
    user_current_syrian_city,
    user_has_legal_car_papers,
    year_manufactured,
    model,
    transmission,
    is_new_car,
    is_faragha_jahzeh,
    is_khalyeh,
    is_kassah,
    updateCarFilterQueryParams,
    fetchNextPage,
    onSearchFocus,
    onSearchBlur,
    onSearchValueUpdate,
    onPageValueUpdate,
  } = useGetHomeData();

  const theme = useTheme();

  const slider_miles_travelled_in_km =
    miles_travelled_in_km_from || miles_travelled_in_km_to
      ? [
          parseInt(miles_travelled_in_km_from) || 0,
          parseInt(miles_travelled_in_km_to) || 0,
        ]
      : undefined;

  const onSliderMilesTravelledInKmChange = (value: number[]) => {
    //component returns undefined for second array item, first item is the end value
    const isFirstSlide = value.length === 1;

    if (isFirstSlide) {
      updateCarFilterQueryParams({
        miles_travelled_in_km_from: "0",
        miles_travelled_in_km_to: value[0].toString(),
      });

      return;
    }

    const [slider_miles_from, slider_miles_to] = value;

    updateCarFilterQueryParams({
      miles_travelled_in_km_from: slider_miles_from.toString(),
      miles_travelled_in_km_to: slider_miles_to.toString(),
    });
  };

  const slider_prices =
    price_from || price_to
      ? [parseInt(price_from) || 0, parseInt(price_to) || 0]
      : undefined;

  const onSliderPriceChange = (value: number[]) => {
    const isFirstSlide = value.length === 1;

    if (isFirstSlide) {
      updateCarFilterQueryParams({
        price_from: "0",
        price_to: value[0].toString(),
      });

      return;
    }

    const [slider_price_from, slider_price_to] = value;

    updateCarFilterQueryParams({
      price_from: slider_price_from.toString(),
      price_to: slider_price_to.toString(),
    });
  };

  const navigateToSearchResultPage = () => {
    // const queryString =
    //   buildQueryParamsString<RequiredSearchCarOfferQueryParameterData>([
    //     { key: "search", value: search },
    //     { key: "page", value: page || "" },
    //     { key: "car_label_origin", value: car_label_origin },
    //     { key: "car_sell_location", value: car_sell_location },
    //     { key: "fuel_type", value: fuel_type },
    //     { key: "import_type", value: import_type },
    //     { key: "manufacturer_id", value: manufacturer_id },
    //     {
    //       key: "miles_travelled_in_km_from",
    //       value: miles_travelled_in_km_from,
    //     },
    //     { key: "miles_travelled_in_km_to", value: miles_travelled_in_km_to },
    //     { key: "price_from", value: price_from },
    //     { key: "price_to", value: price_to },
    //     { key: "user_current_syrian_city", value: user_current_syrian_city },
    //     { key: "user_has_legal_car_papers", value: user_has_legal_car_papers },
    //     { key: "year_manufactured", value: year_manufactured },
    //     { key: "shippable_to", value: shippable_to },
    //     { key: "is_faragha_jahzeh", value: is_faragha_jahzeh },
    //     { key: "is_khalyeh", value: is_khalyeh },
    //     { key: "is_kassah", value: is_kassah },
    //     { key: "is_new_car", value: is_new_car },
    //     { key: "model", value: model },
    //     { key: "transmission", value: transmission },
    //   ]);

    router.push({
      pathname: "/car-search-result",
      params: {
        manufacturer_id,
        model,
        car_label_origin,
        car_sell_location,
        fuel_type,
        import_type,
        miles_travelled_in_km_from,
        miles_travelled_in_km_to,
        price_from,
        user_current_syrian_city,
        user_has_legal_car_papers,
        year_manufactured,
        is_faragha_jahzeh,
        is_khalyeh,
        is_new_car,
        transmission,
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.colors.surface,
          }}
        >
          <View
            style={{
              flex: 1,
              //   gap: 24,
              paddingHorizontal: 16,
              paddingTop: 32,
              paddingBottom: 100,
            }}
          >
            <BasePaperSelect
              label="الشركة المصنعة"
              arrayList={CARMANUFACTURERLIST}
              hideSearchBox={false}
              value={getStringValueFromListItems(
                CARMANUFACTURERLIST,
                manufacturer_id
              )}
              onSelection={(value) =>
                updateCarFilterQueryParams({
                  manufacturer_id: value.selectedList[0]._id,
                })
              }
              multiEnable={false}
              selectedArrayList={getListItemFromString(
                CARMANUFACTURERLIST,
                manufacturer_id
              )}
            />

            <TextInput
              style={{
                marginBottom: 16,
              }}
              placeholder="موديل"
              value={model}
              onChangeText={(text) =>
                updateCarFilterQueryParams({ model: text })
              }
            />

            <CustomPaperTextInputRangeSection
              title="كيلو متر قاطعة"
              firstInputProps={{
                value: miles_travelled_in_km_from,
                onChangeText: (text) =>
                  updateCarFilterQueryParams({
                    miles_travelled_in_km_from: text,
                  }),
              }}
              secondInputProps={{
                value: miles_travelled_in_km_to,
                onChangeText: (text) =>
                  updateCarFilterQueryParams({
                    miles_travelled_in_km_to: text,
                  }),
              }}
              sliderProps={{
                value: slider_miles_travelled_in_km,
                onValueChange: onSliderMilesTravelledInKmChange,
                step: 5000,
                minimumValue: 0,
                maximumValue: 1000000,
                animationType: "spring",
              }}
            />

            <CustomPaperTextInputRangeSection
              title="السعر"
              firstInputProps={{
                value: price_from,
                onChangeText: (text) =>
                  updateCarFilterQueryParams({ price_from: text }),
              }}
              secondInputProps={{
                value: price_to,
                onChangeText: (text) =>
                  updateCarFilterQueryParams({ price_to: text }),
              }}
              sliderProps={{
                value: slider_prices,
                onValueChange: onSliderPriceChange,
                step: 500,
                minimumValue: 0,
                maximumValue: 100000,
                animationType: "spring",
              }}
            />

            <BasePaperSelect
              label="تواجد(المدينة المتواجدة فيها السيارة المعروضة للبيع)؟"
              arrayList={SYRIANCITYlIST}
              hideSearchBox={false}
              value={getStringValueFromListItems(
                SYRIANCITYlIST,
                car_sell_location
              )}
              onSelection={(value) =>
                updateCarFilterQueryParams({
                  car_sell_location: value.selectedList[0]._id,
                })
              }
              multiEnable={false}
              selectedArrayList={getListItemFromString(
                CARMANUFACTURERLIST,
                car_sell_location
              )}
            />

            <BasePaperSelect
              label="المحافظات التي يمكن شحن السيارة لها"
              arrayList={SYRIANCITYlIST}
              hideSearchBox={false}
              value={getPaperSelectListItemsText(SYRIANCITYlIST, shippable_to)}
              onSelection={(value) =>
                updateCarFilterQueryParams({
                  shippable_to: value.selectedList.map((item) => item._id),
                })
              }
              multiEnable={true}
              selectedArrayList={getListItemsFromStringArray(
                CARMANUFACTURERLIST,
                shippable_to
              )}
              selectAllText="جميع المحافظات"
            />

            <CustomPaperSegmentedButtonsSection
              title="نوغ الوقود"
              value={fuel_type}
              onValueChange={(value) =>
                updateCarFilterQueryParams({
                  fuel_type: value,
                })
              }
              buttons={FUELTYPELISTSEGMENTEDBUTTONS}
            />
            <CustomPaperSegmentedButtonsSection
              title="نوع الناقل"
              value={transmission}
              onValueChange={(value) =>
                updateCarFilterQueryParams({
                  transmission: value,
                })
              }
              buttons={TRANSMISSIONSEGMENTEDBUTTONS}
            />

            <CustomPaperSegmentedButtonsSection
              title="السيارة جديدة(غير مستعملة)؟"
              value={is_new_car}
              onValueChange={(value) =>
                updateCarFilterQueryParams({
                  is_new_car: value,
                })
              }
              buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
            />

            <CustomPaperSegmentedButtonsSection
              title="السيارة مقصوصة(قصة)؟"
              value={is_kassah}
              onValueChange={(value) =>
                updateCarFilterQueryParams({
                  is_kassah: value,
                })
              }
              buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
            />

            <CustomPaperSegmentedButtonsSection
              title="السيارة جاهزة للفراغة؟"
              value={is_faragha_jahzeh}
              onValueChange={(value) =>
                updateCarFilterQueryParams({
                  is_faragha_jahzeh: value,
                })
              }
              buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
            />

            <CustomPaperSegmentedButtonsSection
              title="السيارة خالية العلام؟"
              value={is_khalyeh}
              onValueChange={(value) =>
                updateCarFilterQueryParams({
                  is_khalyeh: value,
                })
              }
              buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
      <View
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 100,
          paddingHorizontal: 16,
        }}
      >
        <FAB label="ابحث" onPress={navigateToSearchResultPage} />
      </View>
    </View>
  );
};

export default CarSearchFilter;
