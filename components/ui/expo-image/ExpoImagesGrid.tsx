import React from "react";
import { ExpoImagesItemProps } from "./ExpoImagesItem";
import { rowPartition } from "@/libs/axios/helpers";
import { FlatList, StyleSheet, View } from "react-native";
import ExpoImagesRow from "./ExpoImagesRow";
import { Image } from "expo-image";
import ExpoImagePicker, { ExpoImagePickerProps } from "./ExpoImagePicker";
import { Button, useTheme } from "react-native-paper";
import ImagesCarouselSection from "@/components/carOfferDetails/ImagesCarouselSection";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

export type ExpoImagesGridProps = {
  imagesUris: string[];
  onImageClicked: (imageUri: string) => void;
  onAddImageClicked: ExpoImagePickerProps["onAddImageClicked"];
};

const ExpoImagesGrid = ({
  imagesUris,
  onImageClicked,
  onAddImageClicked,
}: ExpoImagesGridProps) => {
  const theme = useTheme();

  const { rowPartitionedItems, isLastRow } = rowPartition(imagesUris, 3);

  const styles = StyleSheet.create({
    gridContainer: {
      //   flexDirection: "row",
      backgroundColor: theme.colors.surface,
      gap: 8,
    },
  });

  console.log("images", rowPartitionedItems);

  return (
    <View style={styles.gridContainer}>
      {rowPartitionedItems.map((row, rowIndex) => (
        <ExpoImagesRow key={rowIndex}>
          {row.map((imageUri, itemIndex) => (
            <View
              key={itemIndex}
              style={{ flex: 1 }}
              onTouchStart={() => onImageClicked(imageUri)}
            >
              <Image
                source={{
                  uri: imageUri,
                }}
                style={{
                  width: "100%",
                  // maxWidth: 300, // width of the image, can be disorted if we set it greater than this value which is the uploaded image width in cloudinary
                  aspectRatio: "4/3", // or use paddingVertical 50%(in web we can use paddingTop 100%)
                  resizeMode: "contain",
                  backgroundColor: "white",
                }}
              />
            </View>
          ))}
        </ExpoImagesRow>
      ))}
      <ExpoImagePicker onAddImageClicked={onAddImageClicked} />
    </View>
  );
};

export default ExpoImagesGrid;
