import React from "react";
import { SectionContainer } from "./SectionContainer";
import { Icon, Text } from "react-native-paper";
import { View } from "react-native";

export type HaveFeatureSectionProps = {
  items: {
    is_checked?: boolean | null;
    label: string;
  }[];
};

const HaveFeatureSection = ({ items }: HaveFeatureSectionProps) => {
  return (
    <SectionContainer>
      <View style={{ gap: 16 }}>
        {items.map((item, index) => (
          <View style={{ flexDirection: "row", gap: 4 }} key={item.label}>
            <Icon source="checkbox-marked" size={24} />
            <Text>{item.label}</Text>
          </View>
        ))}
      </View>
    </SectionContainer>
  );
};

export default HaveFeatureSection;
