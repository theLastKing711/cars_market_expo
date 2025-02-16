import { useGenericChipFilter } from "@/hooks/components/useGenericChipFilter";
import { ChipItem } from "@/types/shared";
import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";

export type CustomPaperChipsListProps = {
  title: string;
  items: ChipItem[];
  selectedItems: string[] | string;
  onChipSelected: (id: string) => void;
  onEmptyList: () => void;
};

const CustomPaperChipsList = ({
  title,
  items,
  selectedItems,
  onChipSelected,
  onEmptyList,
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
              selectChipItem(item.id, onChipSelected, onEmptyList);
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
