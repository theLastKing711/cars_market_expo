import CarSearchFilterModal from "@/components/home/CarSearchFilterModal";
import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import BasePaperSelect from "@/components/ui/react-native-paper/BasePaperSelect";
import CustomPaperSegmentedButtonsSection from "@/components/ui/react-native-paper/CustomPaperSegmentedButtonsSection";
import CustomPaperTextInputRangeSection from "@/components/ui/react-native-paper/CustomPaperTextInputRangeSectionProps";
import { REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION } from "@/constants/libs";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import {
  getListItemFromString,
  getListItemsFromStringArray,
  getPaperSelectListItemsText,
  getStringValueFromListItems,
} from "@/libs/axios/helpers";
import { CARMANUFACTURERLIST } from "@/types/enums/CarManufacturer";
import { FUELTYPELISTSEGMENTEDBUTTONS } from "@/types/enums/FuelType";
import { SYRIANCITYlIST } from "@/types/enums/SyrianCity";
import { TRANSMISSIONSEGMENTEDBUTTONS } from "@/types/enums/TransmissionType";
import { SearchCarOfferQueryParameterData } from "@/types/home";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Searchbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

const CarSearchResult = () => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    isFetching,
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

  console.log("changing state in child component", shippable_to);

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 71,
      backgroundColor: theme.colors.surface,
      position: "relative",
    },
  });

  // const openFilterModal = () => setIsFilterModalVisible(true);

  const openFilterModal = () => {
    router.push("/car-search-filter-modal");
  };

  const closeFilterModal = () => setIsFilterModalVisible(false);

  // if (isLoading) {
  // return <Text>Loading</Text>;
  // }

  const carSearchSuggestions =
    paginatedCarSearchSuggestionData?.pages?.flatMap((item) => item.data) || [];

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

  // console.log("carSearchSuggestion", carSearchSuggestions);

  return (
    <View style={styles.container}>
      <CarSearchFilterModal isVisible={isFilterModalVisible}>
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
            label="الشركة المصنعة, مثال: تويوتا,مرسيدس."
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
            placeholder="موديل, مثال: ريو, سانتافيه 2011."
            value={model}
            onChangeText={(text) => updateCarFilterQueryParams({ model: text })}
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
            onSelection={(value) => {
              updateCarFilterQueryParams({
                car_sell_location: value.selectedList[0]
                  ? value.selectedList[0]._id
                  : "",
              });
            }}
            multiEnable={false}
            selectedArrayList={getListItemFromString(
              SYRIANCITYlIST,
              car_sell_location
            )}
          />

          <BasePaperSelect
            label="المحافظات التي يمكن شحن السيارة لها"
            selectAllText="جميع المحافظات"
            multiEnable={true}
            hideSearchBox={false}
            arrayList={SYRIANCITYlIST}
            value={getPaperSelectListItemsText(SYRIANCITYlIST, shippable_to)}
            onSelection={(value) => {
              updateCarFilterQueryParams({
                shippable_to: value.selectedList.map((item) => item._id),
              });
            }}
            selectedArrayList={getListItemsFromStringArray(
              SYRIANCITYlIST,
              shippable_to
            )}
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
      </CarSearchFilterModal>

      <Text style={{ color: "red" }}>hello world</Text>
      <Button onPress={openFilterModal}>open</Button>
      <CarSearchResultCardList
        items={carSearchSuggestions}
        renderItem={({ item }) => (
          <CarSearchResultCard item={item} onFavourite={() => {}} />
        )}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      />
    </View>
  );
};

export default CarSearchResult;
