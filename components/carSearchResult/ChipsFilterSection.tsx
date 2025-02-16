import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { CarSearchFilterChipItem, ChipItem } from "@/types/shared";
import { Chip, Text } from "react-native-paper";
import { router } from "expo-router";

export type ChipsFilterSectionProps = {
  data: CarSearchFilterChipItem[];
};

const ChipsFilterSection = ({ data }: ChipsFilterSectionProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 8,
    },
    categoryListConatiner: {
      alignItems: "flex-start",
      paddingStart: 8,
      gap: 8,
    },
  });

  const openFilterModal = () => {
    router.push("/car-search-filter-modal");
  };

  return (
    <View style={styles.container}>
      <Chip onPress={openFilterModal} icon="filter">
        <Text variant="titleMedium">الفلاتر</Text>
      </Chip>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item: { id, onClose, text } }) => (
          <Chip key={id} onPress={onClose} icon="close">
            {text}
          </Chip>
        )}
        contentContainerStyle={styles.categoryListConatiner}
        style={{
          padding: 16,
        }}
      />
    </View>
  );
};

export default ChipsFilterSection;
