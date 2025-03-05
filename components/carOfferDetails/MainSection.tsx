import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, IconButton, Text, Tooltip } from "react-native-paper";
import { SectionContainer } from "./SectionContainer";
import { useFavouriteCar } from "@/hooks/api/car/mutations/useFavouriteCar";

export type MainSectionProps = {
  id: number;
  title?: string | null;
  location?: string | number | null;
  is_favourite: boolean;
};

export const MainSection = ({
  id,
  title,
  location,
  is_favourite,
}: MainSectionProps) => {
  const { favouriteCar } = useFavouriteCar(id);

  const location_city_text = `تواجد ${location}`;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
  const heartIcon = is_favourite ? "heart" : "heart-outline";

  console.log("is favourite", is_favourite);

  return (
    <SectionContainer>
      {/* <View style={{ paddingTop: 16, gap: 16 }}> */}
      <View style={styles.container}>
        <View>
          <Text variant="headlineMedium" style={{ marginBottom: 8 }}>
            {title}
          </Text>
          {location && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Icon source={{ source: "map", direction: "rtl" }} size={24} />
              <Text variant="bodyMedium">{location_city_text}</Text>
            </View>
          )}
        </View>
        <Tooltip title="أضف إلى قائمة المفضلة">
          <IconButton
            icon={{ source: heartIcon, direction: "rtl" }}
            onPress={(e) => favouriteCar()}
          />
        </Tooltip>
      </View>
      {/* </View> */}
    </SectionContainer>
  );
};
