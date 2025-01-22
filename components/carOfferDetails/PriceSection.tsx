import React from "react";
import { SectionContainer } from "./SectionContainer";
import { Text } from "react-native-paper";

export type PriceSectionProps = {
  price?: number | null;
};

const PriceSection = ({ price }: PriceSectionProps) => {
  return (
    <SectionContainer>
      <Text variant="headlineMedium" style={{ fontWeight: 700 }}>
        {price} $
      </Text>
    </SectionContainer>
  );
};

export default PriceSection;
