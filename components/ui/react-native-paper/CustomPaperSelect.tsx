import { getSelectListItemStringValue } from "@/libs/axios/helpers";
import React from "react";
import { useTheme } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import {
  ListItem,
  PaperSelectProps,
} from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import BasePaperSelect from "./BasePaperSelect";

export type CustomPaperSelectProps = {
  arrayList: ListItem[];
  label: string;
  value: ListItem[];
  onChange: (...event: any[]) => void;
  hideSearchBar?: boolean;
  paperSelectProps?: Partial<PaperSelectProps>;
};

const CustomPaperSelect = ({
  label,
  value,
  arrayList,
  hideSearchBar = true,
  onChange,
  paperSelectProps,
}: CustomPaperSelectProps) => {
  const theme = useTheme();

  return (
    <BasePaperSelect
      // inputRef={singleSelectRef}
      // searchStyle={{
      //   backgroundColor: "red",
      // }}
      // dialogStyle={{
      //   backgroundColor: "red",
      // }}
      // textInputStyle={{
      //   backgroundColor: theme.colors.secondaryContainer,
      // }}
      label={label}
      value={getSelectListItemStringValue(value)}
      onSelection={(value) => {
        onChange([value.selectedList[0]]);
      }}
      arrayList={arrayList}
      selectedArrayList={value}
      // errorText={gender.error}
      multiEnable={false}
      hideSearchBox={hideSearchBar}
      // textInputMode="outlined"
      {...paperSelectProps}
    />
  );
};

export default CustomPaperSelect;
