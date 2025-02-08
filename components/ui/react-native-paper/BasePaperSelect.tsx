import React from "react";
import { useTheme } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import { PaperSelectProps } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";

export type BasePaperSelectProps = PaperSelectProps;

const BasePaperSelect = ({ ...props }: BasePaperSelectProps) => {
  const theme = useTheme();

  return (
    <PaperSelect
      containerStyle={{
        marginVertical: 0,
        paddingVertical: 0,
        marginBottom: 16,
        backgroundColor: theme.colors.secondaryContainer, // is the invisible gap between form items, if we don't color it
      }}
      dialogCloseButtonText="إغلاق"
      dialogDoneButtonText="تم"
      {...props}
    />
  );
};

export default BasePaperSelect;
