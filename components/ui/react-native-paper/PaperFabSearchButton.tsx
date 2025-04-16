import React from "react";
import { ActivityIndicator, FAB } from "react-native-paper";

export type PaperFabSearchButtonProps = {
  label: string;
  onSearch?: () => void;
  isLoading?: boolean;
};

export const FLOATING_BUTTON_BOTTOM = 32;

const PaperFabSearchButton = ({
  label,
  onSearch,
  isLoading = false,
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
        display: "flex",
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
      label={isLoading ? "" : label}
      // label={label}
      onPress={onSearch}
      icon={isLoading ? ActivityIndicator : ""}
    />
  );
};

export default PaperFabSearchButton;
