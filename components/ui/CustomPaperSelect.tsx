import { getSelectListItemValue } from "@/libs/axios/helpers";
import React from "react";
import { useTheme } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";

export type CustomPaperSelectProps = {
  arrayList: ListItem[];
  label: string;
  value: ListItem[];
  onChange: (...event: any[]) => void;
};

const CustomPaperSelect = ({
  label,
  value,
  arrayList,
  onChange,
}: CustomPaperSelectProps) => {
  const theme = useTheme();

  return (
    <PaperSelect
      // inputRef={singleSelectRef}
      containerStyle={{
        // backgroundColor: "red",
        marginVertical: 0,
        paddingVertical: 0,
        marginBottom: 16,
      }}
      // searchStyle={{
      //   backgroundColor: "red",
      // }}
      // dialogStyle={{
      //   backgroundColor: "red",
      // }}
      textInputStyle={{
        backgroundColor: theme.colors.secondaryContainer,
      }}
      label={label}
      value={getSelectListItemValue(value)}
      onSelection={(value: any) => {
        onChange([value.selectedList[0]]);
      }}
      arrayList={arrayList}
      selectedArrayList={value}
      // errorText={gender.error}
      multiEnable={false}
      hideSearchBox={true}
      textInputMode="outlined"
    />
  );
};

export default CustomPaperSelect;
