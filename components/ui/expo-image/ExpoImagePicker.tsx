import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, useTheme } from "react-native-paper";
import { getFormDataFromImages } from "@/libs/axios/helpers";
import { useUploadCarImages } from "@/hooks/api/car/mutations/useUploadCarImages";

export type ExpoImagePickerProps = {
  onAddImageClicked: () => Promise<void>;
};

export default function ExpoImagePicker({
  onAddImageClicked,
}: ExpoImagePickerProps) {
  const theme = useTheme();

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ["images", "videos"],
  //     allowsMultipleSelection: true,
  //     //   allowsEditing: true,
  //     //   aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     // setImage(result.assets[0].uri);
  //     const imagesFormData = getFormDataFromImages(result);

  //     uploadCarImages(imagesFormData);
  //   }
  // };

  return (
    <View style={styles.container}>
      <IconButton
        icon="plus"
        size={48}
        iconColor={theme.colors.primary}
        onPress={onAddImageClicked}
      />
      <Button title="حمل صور لسيارتك." onPress={onAddImageClicked} />
      {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
