import { SearchOfferQueryParameterData, SearchState } from "@/types/home";
import React from "react";
import { Modal, View } from "react-native";
import { SegmentedButtons, Text, TextInput } from "react-native-paper";
import { CARMANUFACTURERLIST } from "@/types/enums/CarManufacturer";
import { PaperSelect } from "react-native-paper-select";
import { FUELTYPELIST } from "@/types/enums/FuelType";
import { TRANSMISSIONLIST } from "@/types/enums/TransmissionType";
import { REACTPAPERBOOLLIST } from "@/constants/libs";
import { router } from "expo-router";
import { getListItemFromString } from "@/libs/axios/helpers";

export type CarSearchFilterModalProps = {
  isVisible: boolean;
  onFilter: () => void;
  searchData: SearchState;
  querySearchData: SearchOfferQueryParameterData;
  updateCarFilterQueryParameter: (
    data: Partial<SearchOfferQueryParameterData>
  ) => void;
  updateSearchData: (searchStateItem: Partial<SearchState>) => void;
  onSearchButtonClicked: () => void;
};

const CarSearchFilterModal = ({
  isVisible,
  onFilter,
  searchData,
  querySearchData,
  updateCarFilterQueryParameter,
  updateSearchData,
  onSearchButtonClicked,
}: CarSearchFilterModalProps) => {
  return (
    <Modal // is position absolute at root with top,left,right and bottom set at 0
      animationType="slide"
      transparent={true}
      visible={isVisible}
      // onRequestClose={onModalClose}
      style={{ backgroundColor: "red", zIndex: 10, isolation: "isolate" }}
    >
      <PaperSelect
        label="الشركة المصنعة"
        arrayList={CARMANUFACTURERLIST}
        hideSearchBox={false}
        value={querySearchData.manufacturer_id}
        onSelection={(value) =>
          //   updateSearchData({ manufacturer_id: value.selectedList })
          updateCarFilterQueryParameter({
            manufacturer_id: value.selectedList[0]._id,
          })
        }
        multiEnable={false}
        selectedArrayList={getListItemFromString(
          CARMANUFACTURERLIST,
          querySearchData.manufacturer_id
        )}
      />

      <TextInput
        // style={styles.textInput}
        placeholder="موديل"
        value={querySearchData.model}
        onChangeText={(text) => updateCarFilterQueryParameter({ model: text })}
        // onChangeText={(text) => updateSearchData({ model: text })}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          // style={styles.textInput}
          placeholder="السعر يبدأ من"
          value={querySearchData.miles_travelled_in_km_from}
          onChangeText={(text) =>
            updateCarFilterQueryParameter({ miles_travelled_in_km_from: text })
          }
        />
        <TextInput
          // style={styles.textInput}
          placeholder="إلى"
          value={querySearchData.price_to}
          onChangeText={(text) =>
            updateCarFilterQueryParameter({ price_to: text })
          }
        />
      </View>

      <PaperSelect
        label="نوغ الوقود"
        arrayList={FUELTYPELIST}
        hideSearchBox={false}
        value={"asldj"}
        multiEnable
        onSelection={(value) =>
          //   updateSearchData({ manufacturer_id: value.selectedList })
          updateCarFilterQueryParameter({
            fuel_type: value.selectedList[0]._id,
          })
        }
        selectedArrayList={getListItemFromString(
          FUELTYPELIST,
          querySearchData.fuel_type
        )}
      />

      <View style={{ gap: 8 }}>
        <Text variant="labelMedium">نوع الوقود</Text>

        <SegmentedButtons
          value={querySearchData.fuel_type}
          onValueChange={(value) =>
            updateCarFilterQueryParameter({
              fuel_type: value,
            })
          }
          buttons={[
            {
              value: "1",
              label: "نعم",
            },
            {
              value: "0",
              label: "لا",
            },
            { value: "-1", label: "غير مخدد" },
          ]}
        />
      </View>

      <PaperSelect
        label="نوغ الناقل"
        arrayList={TRANSMISSIONLIST}
        value={"asldj"}
        multiEnable
        onSelection={(value) =>
          //   updateSearchData({ manufacturer_id: value.selectedList })
          updateCarFilterQueryParameter({
            transmission: value.selectedList[0]._id,
          })
        }
        selectedArrayList={getListItemFromString(
          TRANSMISSIONLIST,
          querySearchData.transmission
        )}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          // style={styles.textInput}
          placeholder="السيارة قاطعة كيلومتر من"
          value={querySearchData.miles_travelled_in_km_from}
          onChangeText={(text) =>
            updateCarFilterQueryParameter({ miles_travelled_in_km_from: text })
          }
        />
        <TextInput
          // style={styles.textInput}
          placeholder="إلى"
          value={querySearchData.miles_travelled_in_km_to}
          onChangeText={(text) =>
            updateSearchData({ miles_travelled_in_km_to: text })
          }
        />
      </View>

      <PaperSelect
        label="هل السيارة جاهزة للفراغة؟"
        arrayList={REACTPAPERBOOLLIST}
        value={"asldj"}
        multiEnable={false}
        onSelection={(value) =>
          //   updateSearchData({ manufacturer_id: value.selectedList })
          updateCarFilterQueryParameter({
            is_faragha_jahzeh: value.selectedList[0]._id,
          })
        }
        selectedArrayList={getListItemFromString(
          REACTPAPERBOOLLIST,
          querySearchData.is_faragha_jahzeh
        )}
      />

      <PaperSelect
        label="هل السيارة خالية العلام ؟"
        arrayList={REACTPAPERBOOLLIST}
        value={"asldj"}
        multiEnable={false}
        onSelection={(value) =>
          updateCarFilterQueryParameter({
            is_khalyeh: value.selectedList[0]._id,
          })
        }
        selectedArrayList={getListItemFromString(
          REACTPAPERBOOLLIST,
          querySearchData.is_khalyeh
        )}
      />
    </Modal>
  );
};

export default CarSearchFilterModal;
