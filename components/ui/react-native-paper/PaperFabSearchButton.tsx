import React from "react";
import { FAB } from "react-native-paper";

export type PaperFabSearchButtonProps = {
  label: string;
  onSearch?: () => void;
};

export const FLOATING_BUTTON_BOTTOM = 32;

const PaperFabSearchButton = ({
  label,
  onSearch,
}: PaperFabSearchButtonProps) => {
  return (
    <FAB
      style={{
        position: "absolute",
        bottom: FLOATING_BUTTON_BOTTOM,
        left: 0,
        right: 0,
        zIndex: 30000000,
        marginHorizontal: 16,
      }}
      label={label}
      onPress={onSearch}
    />
  );
};

export default PaperFabSearchButton;
