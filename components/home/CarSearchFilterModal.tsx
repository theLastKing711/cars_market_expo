import {
  RequiredSearchCarOfferQueryParameterData,
  SearchCarOfferQueryParameterData,
  SearchState,
} from "@/types/home";
import React from "react";
import { Modal, SafeAreaView, View } from "react-native";
import {
  Button,
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

const CarSearchFilterModal = ({
  isVisible,
  children,
}: // onFilter,
// searchData,
// querySearchData,
// updateCarFilterQueryParameter,
// updateSearchData,
// onSearchButtonClicked,
{
  isVisible: boolean;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView>
      <Modal // is position absolute at root with top,left,right and bottom set at 0
        animationType="slide"
        transparent={true}
        visible={isVisible}
        // onRequestClose={onModalClose}
        style={{
          backgroundColor: "red",
          zIndex: -1,
          opacity: 0,
          pointerEvents: "none",
          // isolation: "isolate",
        }}
        collapsable
      >
        {/* <SafeAreaView style={{ backgroundColor: theme.colors.surface, flex: 1 }}> */}
        {children}
        {/* </SafeAreaView> */}
      </Modal>
    </SafeAreaView>
  );
};

export default CarSearchFilterModal;
