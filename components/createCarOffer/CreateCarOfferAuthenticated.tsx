import ExpoImagesGrid from "@/components/ui/expo-image/ExpoImagesGrid";
import { REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION } from "@/constants/libs";
import { useCreateCarOffer } from "@/hooks/api/car/mutations/useCreateCarOffer";
import {
  CreateCarOfferForm,
  getCarOfferRequestFromForm,
} from "@/types/car/createCarOffer";
import { FUELTYPELISTSEGMENTEDBUTTONS } from "@/types/enums/FuelType";
import { TRANSMISSIONSEGMENTEDBUTTONS } from "@/types/enums/TransmissionType";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useUploadCarImages } from "@/hooks/api/car/mutations/useUploadCarImages";
import { getFormDataFromImages } from "@/libs/axios/helpers";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { useDeleteFileApi } from "@/hooks/api/shared/mutations/useDeleteFile";
import { UploadFileResponseData } from "@/types/shared";
import FullScreenImageViewerModal from "@/components/createCarOffer/FullScreenImageViewerModal";
import CustomPaperSegmentedButtonsSection from "@/components/ui/react-native-paper/CustomPaperSegmentedButtonsSection";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/state/useAuthStore";
const styles = StyleSheet.create({
  textContainer: {},
  textInput: {
    marginBottom: 16,
  },
});

const CreateCarOfferAuthenticated = () => {
  const {
    getToken,
    params: { phone_number, token },
    saveToken,
  } = useAuthStore();

  const [images, setImages] = useState<UploadFileResponseData[]>([]);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [isErrorDialogVisible, setIsErrorDialogVisible] = useState(false);

  const theme = useTheme();

  const { deleteFile } = useDeleteFileApi();

  const { uploadCarImages } = useUploadCarImages();

  const { createCarOffer } = useCreateCarOffer();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCarOfferForm>({
    defaultValues: {
      //   car_price: null,
      // fuel_type: "",
      is_faragha_jahzeh: "",
      is_kassah: "",
      is_khalyeh: "",
      is_new_car: "",
      //   manufacturer_id: null,
      //   manufacturer_name_ar: null,
      //   manufacturere_name_en: null,
      //   miles_travelled_in_km: null,
      //   model: null,
      // transmission_type: "",
    },
  });

  const openImageViewr = () => {
    setIsImageViewerOpen(true);
  };

  const closeImageViewr = () => {
    setIsImageViewerOpen(false);
  };

  const onFileDelete = (fileIndex: number) => {
    const fileToDelete = images.find((item, index) => index === fileIndex)!;

    const updatedImagesList = images.filter(
      (image) => image.url !== fileToDelete.url
    );

    setImages(updatedImagesList);

    deleteFile(fileToDelete, {
      onSuccess: (data) => {},
      onError: () => {},
    });
  };

  const onSubmit: SubmitHandler<CreateCarOfferForm> = (data) => {
    if (images.length === 0) {
      setIsErrorDialogVisible(true);
      return;
    }

    const createCarOfferRequestData = getCarOfferRequestFromForm(data);

    createCarOffer(createCarOfferRequestData, {
      onSuccess: () => alert("success"),
      onError: () => alert("error"),
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      // allowsEditing: true, // doesn't work with allowsMultipleSelection on
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsUploadingImage(true);

      const manipulatedImagesUris = await Promise.all(
        result.assets.map<Promise<ImagePicker.ImagePickerAsset>>(
          async (asset, index) => {
            const imageWidth = Math.min(asset.width, 500);
            const manipResult = await ImageManipulator.manipulate(asset.uri)
              .resize({ width: imageWidth }) // height is calculated automatically based on aspect ratio
              .renderAsync();

            const { width, height, uri } = await manipResult.saveAsync({
              format: SaveFormat.WEBP,
            });

            return {
              ...asset,
              width,
              height,
              uri,
            };
          }
        )
      );
      const imagesFormData = getFormDataFromImages(manipulatedImagesUris);

      uploadCarImages(imagesFormData, {
        onSuccess: (data) => {
          const newImages = [...data.data];
          // openImageViewr();
          setImages(newImages);
          setIsUploadingImage(false);
        },
        onError: (data) => alert("failed"),
        onSettled: (data) => setIsUploadingImage(false),
      });
    }
  };

  const onImageGridItemClicked = (selectedImage: string) => {
    openImageViewr();
  };

  const imagesUris = images.map((image) => image.url);

  const userHasUploadedImages = images.length > 0;
  const submitText = !isUploadingImage ? (
    <Button onPress={handleSubmit(onSubmit)}>إنشاء العرض</Button>
  ) : (
    <Button onPress={handleSubmit(onSubmit)}>
      <View style={{ gap: 8 }}>
        <ActivityIndicator />
        <Text>جاري تحميل الصور</Text>
      </View>
    </Button>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <ScrollView>
        <ExpoImagesGrid
          isUploadingImages={isUploadingImage}
          imagesUris={imagesUris}
          onAddImageClicked={pickImage}
          onImageClicked={onImageGridItemClicked}
        />
        {userHasUploadedImages && (
          <FullScreenImageViewerModal
            isVisible={isImageViewerOpen}
            images={images}
            onCloseButtonClicked={closeImageViewr}
            onDeleteButtonClicked={onFileDelete}
            onModalClose={closeImageViewr}
          />
        )}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: theme.colors.surface,
            paddingTop: 16,
            paddingBottom: 90,
          }}
        >
          <Controller
            name="manufacturer_name_ar"
            control={control}
            rules={{
              required: {
                value: true,
                message: "يرجى إدخال قيمة في الحقل",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.textContainer}>
                <TextInput
                  placeholder="اسم السيارة. مثال: هيونداي سانتافي 2011,كيا ريو."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <HelperText
                  type="error"
                  visible={!!errors.manufacturer_name_ar}
                  style={{ paddingBottom: 0 }}
                >
                  {errors.manufacturer_name_ar?.message}
                </HelperText>
              </View>
            )}
          />
          <Controller
            name="car_price"
            control={control}
            rules={{
              required: {
                value: true,
                message: "يرجى إدخال قيمة في الحقل",
              },
              min: {
                value: 0,
                message: "يرجى إدخال قيمة موجبة",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.textContainer}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="سعر السيارة"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value?.toString()}
                />
                <HelperText type="error" visible={!!errors.car_price}>
                  {errors.car_price?.message}
                </HelperText>
              </View>
            )}
          />
          <Controller
            name="miles_travelled_in_km"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.textContainer}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="كم كيلو متر قاطعة السيارة (العداد)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <HelperText
                  type="error"
                  visible={!!errors.miles_travelled_in_km}
                >
                  {errors.miles_travelled_in_km?.message}
                </HelperText>
              </View>
            )}
          />

          <Controller
            name="is_new_car"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomPaperSegmentedButtonsSection
                title="هل السيارة جديدة(غير مستعملة)؟"
                value={value}
                buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
                onValueChange={onChange}
              />
            )}
          />

          <Controller
            name="fuel_type"
            control={control}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <CustomPaperSegmentedButtonsSection
                // multiSelect add it if can multi select
                title="نوع الوقود"
                buttons={FUELTYPELISTSEGMENTEDBUTTONS}
                value={value}
                onValueChange={onChange}
              />
            )}
          />

          <Controller
            name="transmission"
            control={control}
            rules={{
              min: {
                value: 0,
                message: "يرجى إدخال قيمة موجبة",
              },
            }}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <CustomPaperSegmentedButtonsSection
                title="نوع الناقل"
                value={value}
                buttons={TRANSMISSIONSEGMENTEDBUTTONS}
                onValueChange={onChange}
              />
            )}
          />

          <Controller
            name="is_faragha_jahzeh"
            control={control}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <CustomPaperSegmentedButtonsSection
                title="هل السيارة جاهزة للفراغة؟"
                value={value}
                buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
                onValueChange={onChange}
              />
            )}
          />

          <Controller
            name="is_kassah"
            control={control}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <CustomPaperSegmentedButtonsSection
                title="هل السيارة مقصوصة؟"
                buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
                value={value}
                onValueChange={onChange}
              />
            )}
          />

          <Controller
            name="is_khalyeh"
            control={control}
            render={({ field: { onChange, onBlur, value = "" } }) => (
              <CustomPaperSegmentedButtonsSection
                title="هل السيارة خالية العلام؟"
                buttons={REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION}
                value={value}
                onValueChange={onChange}
              />
            )}
          />
          {submitText}
        </View>
      </ScrollView>
      <Dialog visible={isErrorDialogVisible}>
        <Dialog.Content>
          <Text>الرجاء تحميل صورة واحدة على اﻷقل قبل إنشاء العرض</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setIsErrorDialogVisible(false)}>موافق</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

export default CreateCarOfferAuthenticated;
