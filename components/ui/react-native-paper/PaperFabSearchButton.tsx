import React from "react";
import { FAB } from "react-native-paper";

export type PaperFabSearchButtonProps = {
  label: string;
  onSearch?: () => void;
};

const PaperFabSearchButton = ({
  label,
  onSearch,
}: PaperFabSearchButtonProps) => {
  return (
    <FAB
      style={{
        position: "absolute",
        bottom: 70,
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
