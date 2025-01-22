import React from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { SectionContainer } from "./SectionContainer";

export type MainSectionProps = {
  title?: string | null;
  location?: string | number | null;
};

export const MainSection = ({ title, location }: MainSectionProps) => {
  return (
    <SectionContainer>
      {/* <View style={{ paddingTop: 16, gap: 16 }}> */}
      <Text variant="headlineMedium">{title}</Text>
      <Text variant="headlineMedium">asd</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Icon source={{ source: "location", direction: "rtl" }} size={24} />
        <Text variant="bodyMedium">حلب</Text>
      </View>
      {/* </View> */}
    </SectionContainer>
  );
};
