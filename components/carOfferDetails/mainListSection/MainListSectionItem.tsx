import React from "react";
import { View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

export type MainListSectionItemProps = {
  label: string | null;
  icon: string;
  text?: number | string | null;
  isLastItem?: boolean;
};

const MainListSectionItem = ({
  icon,
  label,
  text,
  isLastItem = false,
}: MainListSectionItemProps) => {
  const theme = useTheme();

  const paddingBottom = isLastItem ? 0 : 16;

  return (
    <View style={{ flex: 1, flexDirection: "row", gap: 4, paddingBottom }}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Icon size={24} source={icon} />
      </View>
      <View style={{ flexDirection: "column", gap: 4 }}>
        <Text variant="labelMedium" style={{ color: theme.colors.secondary }}>
          {label}
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default MainListSectionItem;
