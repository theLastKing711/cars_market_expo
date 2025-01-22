import { SyrianCity, SYRIANCITYLOOKUP } from "@/types/enums/SyrianCity";
import React from "react";
import { SectionContainer } from "./SectionContainer";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { ShippableToCityData } from "@/types/home";

export type ShippableToSectionProps = {
  cities: ShippableToCityData[];
};

const ShippableToSection = ({ cities }: ShippableToSectionProps) => {
  return (
    <SectionContainer>
      <Text variant="titleMedium">يمكن شحنها للمحافظات التالية: </Text>
      <View style={{ flexDirection: "row" }}>
        {cities.map((item, index) => (
          <View key={item.city}>
            <Text variant="bodyMedium">
              {SYRIANCITYLOOKUP[item.city]}
              {index == cities.length - 1 ? "" : "-"}
            </Text>
          </View>
        ))}
      </View>
    </SectionContainer>
  );
};

export default ShippableToSection;
