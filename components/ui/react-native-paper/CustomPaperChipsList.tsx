import ChipsFilterSection from "@/components/ChipsFilterSection";
import {
  useChipFilter,
  useChipFilterProps,
} from "@/hooks/components/useChipFilter";
import { useGenericChipFilter } from "@/hooks/components/useGenericChipFilter";
import { ChipItem } from "@/types/shared";
import { ListRenderItem, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Chip, Text, useTheme } from "react-native-paper";

export type CustomPaperChipsListProps = {
  title: string;
  items: ChipItem[];
  selectedItems: string[] | string;
  onChipSelected: (id: string) => void;
};

const CustomPaperChipsList = ({
  title,
  items,
  selectedItems,
  onChipSelected,
}: CustomPaperChipsListProps) => {
  const {
    theme,
    getChipBackgroundColor,
    getChipColor,
    selectChipItem,
    isChipItemSelected,
  } = useGenericChipFilter(selectedItems);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 8,
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
      position: "relative",
    },
    categoryListConatiner: {
      alignItems: "flex-start",
      paddingStart: 15,
      gap: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text variant="labelMedium">{title}</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {items.map((item, index) => (
          <Chip
            key={item.id}
            style={{
              backgroundColor: getChipBackgroundColor(item.id),
            }}
            onPress={(e) => {
              selectChipItem(item.id, onChipSelected);
            }}
            selected={isChipItemSelected(item.id)}
            selectedColor={getChipColor(item.id)}
          >
            {item.name}
          </Chip>
        ))}
      </View>
    </View>
  );
};

export default CustomPaperChipsList;
