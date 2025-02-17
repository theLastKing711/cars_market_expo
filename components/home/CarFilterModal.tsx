import {
  RequiredSearchCarOfferQueryParameterData,
  SearchCarOfferQueryParameterData,
  SearchState,
} from "@/types/home";
import React from "react";
import { Modal, View } from "react-native";
import {
  Button,
  FAB,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { CARMANUFACTURERLIST } from "@/types/enums/CarManufacturer";
import { PaperSelect } from "react-native-paper-select";
import { FUELTYPELIST } from "@/types/enums/FuelType";
import { TRANSMISSIONLIST } from "@/types/enums/TransmissionType";
import { REACTPAPERBOOLLIST } from "@/constants/libs";
import { router } from "expo-router";
import { getListItemFromString } from "@/libs/axios/helpers";
import { ScrollView } from "react-native-gesture-handler";
import SearchCarOfferForm from "../SearchCarOfferForm";
import { SafeAreaView } from "react-native-safe-area-context";

export type CarSearchFilterModalProps = {
  isVisible: boolean;
  onFilter: () => void;
  searchData: SearchState;
  querySearchData: RequiredSearchCarOfferQueryParameterData;
  updateCarFilterQueryParameter: (
    data: Partial<RequiredSearchCarOfferQueryParameterData>
  ) => void;
  updateSearchData: (searchStateItem: Partial<SearchState>) => void;
  onSearchButtonClicked: () => void;
  children: React.ReactNode;
};

const CarFilterModal = ({
  isVisible,
  searchButtonLabel,
  onClose,
  children,
}: // onFilter,
// searchData,
// querySearchData,
// updateCarFilterQueryParameter,
// updateSearchData,
// onSearchButtonClicked,
{
  isVisible: boolean;
  searchButtonLabel: string;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView>
      <Modal // is position absolute at root with top,left,right and bottom set at 0
        animationType="slide"
        visible={isVisible}
        // onRequestClose={onModalClose}
        collapsable
        transparent
      >
        <ScrollView
          style={{ backgroundColor: theme.colors.surface, marginTop: 200 }}
        >
          {/* {children} */}
          <SearchCarOfferForm />
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
          {/* <FAB label={searchButtonLabel} onPress={onClose} /> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CarFilterModal;
