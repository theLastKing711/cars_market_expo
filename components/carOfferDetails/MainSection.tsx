import React from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { SectionContainer } from "./SectionContainer";

export type MainSectionProps = {
  title?: string | null;
  location?: string | number | null;
};

export const MainSection = ({ title, location }: MainSectionProps) => {
  const location_city_text = `تواجد ${location}`;

  return (
    <SectionContainer>
      {/* <View style={{ paddingTop: 16, gap: 16 }}> */}
      <Text variant="headlineMedium" style={{ marginBottom: 8 }}>
        {title}
      </Text>
      {location && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Icon source={{ source: "map", direction: "rtl" }} size={24} />
          <Text variant="bodyMedium">{location_city_text}</Text>
        </View>
      )}

      {/* </View> */}
    </SectionContainer>
  );
};
