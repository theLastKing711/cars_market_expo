import React from "react";
import { View } from "react-native";
import {
  SegmentedButtons,
  SegmentedButtonsProps,
  Text,
} from "react-native-paper";

export type CustomPaperSegmentedButtonsSectionProps = {
  title: string;
} & SegmentedButtonsProps;

const CustomPaperSegmentedButtonsSection = ({
  title,
  ...props
}: CustomPaperSegmentedButtonsSectionProps) => {
  return (
    <View style={{ gap: 8 }}>
      <Text variant="labelMedium">{title}</Text>

      <SegmentedButtons {...props} />
    </View>
  );
};

export default CustomPaperSegmentedButtonsSection;
