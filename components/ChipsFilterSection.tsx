import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { ChipItem } from "@/types/shared";
import { Text } from "react-native-paper";

export type ChipsFilterSectionProps = {
  title: string;
  data: ChipItem[];
  renderItem: ListRenderItem<ChipItem> | null | undefined;
};

const ChipsFilterSection = ({
  title,
  data,
  renderItem,
}: ChipsFilterSectionProps) => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    categoryListConatiner: {
      alignItems: "flex-start",
      paddingStart: 15,
      gap: 8,
    },
  });

  return (
    <View>
      <Text variant="labelMedium">{title}</Text>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.categoryListConatiner}
        style={{
          flexGrow: 0,
        }}
      />
    </View>
  );
};

export default ChipsFilterSection;
