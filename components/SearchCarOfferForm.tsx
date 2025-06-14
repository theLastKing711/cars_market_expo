import CustomPaperSegmentedButtonsSection from "@/components/ui/react-native-paper/CustomPaperSegmentedButtonsSection";
import CustomPaperTextInputRangeSection from "@/components/ui/react-native-paper/CustomPaperTextInputRangeSectionProps";
import { REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION } from "@/constants/libs";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { FUELTYPELISTSEGMENTEDBUTTONS } from "@/types/enums/FuelType";
import { TRANSMISSIONSEGMENTEDBUTTONS } from "@/types/enums/TransmissionType";
import { router } from "expo-router";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SegmentedButtons, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  maximum_price_to,
  maximumm_miles_travelled_in_km_to,
  minimum_miles_travelled_in_km_from,
  minimum_price_from,
} from "@/constants/variables";
import PaperFabSearchButton from "./ui/react-native-paper/PaperFabSearchButton";
import { getEnglishNumbers } from "@/libs/axios/helpers";
import { View } from "react-native";

export type SearchCarOfferFormProps = {
  onSearch?: () => void;
  isModal?: boolean;
};

const SearchCarOfferForm = ({ onSearch, isModal }: SearchCarOfferFormProps) => {
  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    search,
    fuel_type,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    price_from,
    price_to,
    transmission,
    is_new_car,
    is_faragha_jahzeh,
    is_khalyeh,
    is_kassah,
    fetchNextPage,
    updateCarSearchParam,
    emptyCarSellLocationQueryParam,
    emptyShippableToQueryParam,
    updateCarSellLocationQueryParam,
    updateShippableToQueryParam,
  } = useGetHomeData();

  const theme = useTheme();

  const getSliderValues = (
    from: string,
    to: string,
    min: number,
    max: number
  ) => {
    if (from === "" && to === "") {
      return undefined;
    }

    if (from && !to) {
      return [getEnglishNumbers(from), getEnglishNumbers(max.toString())];
    }

    if (to && !from) {
      return [getEnglishNumbers(min.toString()), getEnglishNumbers(to)];
    }

    return [getEnglishNumbers(from), getEnglishNumbers(to)];
  };

  const slider_miles_travelled_in_km = getSliderValues(
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    minimum_miles_travelled_in_km_from,
    maximumm_miles_travelled_in_km_to
  );

  const onSliderMilesTravelledInKmChange = (value: number[]) => {
    //component returns undefined for second array item, first item is the end value
    const isFirstSlide = value.length === 1;

    // if (isFirstSlide) {
    //   updateCarSearchParam({
    //     miles_travelled_in_km_from: "0",
    //     miles_travelled_in_km_to: value[0].toString(),===============
    //   });

    //   return;
    // }

    const [slider_miles_from, slider_miles_to] = value;

    updateCarSearchParam({
      miles_travelled_in_km_from: slider_miles_from.toString(),
      miles_travelled_in_km_to: slider_miles_to.toString(),
    });
  };

  const slider_prices = getSliderValues(
    price_from,
    price_to,
    minimum_price_from,
    maximum_price_to
  );

  const onSliderPriceChange = (value: number[]) => {
    const isFirstSlide = value.length === 1;

    // if (isFirstSlide) {
    //   updateCarSearchParam({
    //     price_from: "0",
    //     price_to: value[0].toString(),
    //   });

    //   return;
    // }

    const [slider_price_from, slider_price_to] = value;

    updateCarSearchParam({
      price_from: slider_price_from.toString(),
      price_to: slider_price_to.toString(),
    });
  };

  const searchResultTotal = paginatedCarSearchSuggestionData?.pages.length
    ? paginatedCarSearchSuggestionData?.pages[0].total
    : "0";

  const searchButtonText = `${searchResultTotal} نتائج بحث, اظهر النتائج`;

  const navigateToSearchResultPage = () => {
    if (isModal) {
      router.back();
      return;
    }

    router.push({
      pathname: "/car-search-result",
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.surface,
        // paddingTop: !isModal ? 32 : 0,
        paddingTop: 16,
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingBottom: 88,
          }}
        >
          <TextInput
            style={{
              marginBottom: 16,
              textAlign: "right",
            }}
            label="اسم السيارة"
            placeholder=" مثال: كيا فورتي, هونداي سانتافي 2011."
            value={search}
            onChangeText={(text) => updateCarSearchParam({ search: text })}
          />

          {/* <CustomPaperChipsList
              title="نواجد"
              items={SYRIANCITYCHIPLIST}
              selectedItems={car_sell_location}
              onChipSelected={updateCarSellLocationQueryParam}
              onEmptyList={emptyCarSellLocationQueryParam}
              key={1}
            />

            <CustomPaperChipsList
              title="المحافظات التي يمكن شحن السيارة لها"
              items={SYRIANCITYCHIPLIST}
              selectedItems={shippable_to}
              onChipSelected={updateShippableToQueryParam}
              onEmptyList={emptyShippableToQueryParam}
              key={2}
            /> */}

          <CustomPaperTextInputRangeSection
            title="السعر بالدولار"
            inputSuffix="$"
            firstInputProps={{
              value: price_from,
              onChangeText: (text) =>
                updateCarSearchParam({ price_from: text }),
            }}
            secondInputProps={{
              value: price_to,
              onChangeText: (text) => updateCarSearchParam({ price_to: text }),
            }}
            sliderProps={{
              value: slider_prices || [minimum_price_from, maximum_price_to],
              onValueChange: onSliderPriceChange,
              step: 500,
              minimumValue: minimum_price_from,
              maximumValue: maximum_price_to,
              animationType: "spring",
            }}
          />

          <CustomPaperTextInputRangeSection
            title="كيلو متر قاطعة"
            inputSuffix="كم"
            firstInputProps={{
              value: miles_travelled_in_km_from,
              onChangeText: (text) =>
                updateCarSearchParam({
                  miles_travelled_in_km_from: text,
                }),
            }}
            secondInputProps={{
              value: miles_travelled_in_km_to,
              onChangeText: (text) =>
                updateCarSearchParam({
                  miles_travelled_in_km_to: text,
                }),
            }}
            sliderProps={{
              value: slider_miles_travelled_in_km || [
                minimum_miles_travelled_in_km_from,
                maximumm_miles_travelled_in_km_to,
              ],
              onValueChange: onSliderMilesTravelledInKmChange,
              step: 5000,
              minimumValue: minimum_miles_travelled_in_km_from,
              maximumValue: maximumm_miles_travelled_in_km_to,
              animationType: "spring",
            }}
          />
          <CustomPaperSegmentedButtonsSection
            title="السيارة جديدة(غير مستعملة)؟"
            value={is_new_car}
            onValueChange={(value) =>
              updateCarSearchParam({
                is_new_car: value,
              })
            }
            buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
          />
          <CustomPaperSegmentedButtonsSection
            title="السيارة مقصوصة(قصة)؟"
            value={is_kassah}
            onValueChange={(value) =>
              updateCarSearchParam({
                is_kassah: value,
              })
            }
            buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
          />

          <CustomPaperSegmentedButtonsSection
            title="السيارة جاهزة للفراغة؟"
            value={is_faragha_jahzeh}
            onValueChange={(value) =>
              updateCarSearchParam({
                is_faragha_jahzeh: value,
              })
            }
            buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
          />

          <CustomPaperSegmentedButtonsSection
            title="السيارة خالية العلام؟"
            value={is_khalyeh}
            onValueChange={(value) =>
              updateCarSearchParam({
                is_khalyeh: value,
              })
            }
            buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
          />

          {/* <SegmentedButtons fix problem in production android(fixed by row reverse and reverse array), waiting for ios version to ppaly
            value="walk"
            onValueChange={() => console.log("asldkj")}
            // theme={{ roundness: 0, borderRadius: 0 }}
            theme={{ roundness: 2 }}
            buttons={[
              {
                style: {
                  borderLeftWidth: 0,
                },
                value: "walk",
                label: "Walking",
              },
              {
                value: "train",
                label: "Transit",
              },
              { value: "drive", label: "Driving" },
            ]}
            style={{
              flexDirection: "row-reverse",
              // borderRadius: 0,
              // backgroundColor: "red",
              borderWidth: 0,
              borderTopWidth: 0,
              borderRadius: 0,
              padding: 0,
              borderEndWidth: 0,
              borderEndEndRadius: 0,
              borderStartWidth: 0,
              borderEndColor: "red",
            }}
          /> */}
          <CustomPaperSegmentedButtonsSection
            title="نوغ الوقود"
            value={fuel_type}
            onValueChange={(value) => {
              updateCarSearchParam({
                fuel_type: value,
              });
            }}
            buttons={FUELTYPELISTSEGMENTEDBUTTONS}
          />
          <CustomPaperSegmentedButtonsSection
            title="نوع الناقل"
            value={transmission}
            onValueChange={(value) => {
              updateCarSearchParam({
                transmission: value,
              });
            }}
            buttons={TRANSMISSIONSEGMENTEDBUTTONS}
          />
        </View>
      </ScrollView>
      <PaperFabSearchButton
        label={searchButtonText}
        onSearch={navigateToSearchResultPage}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

export default SearchCarOfferForm;
