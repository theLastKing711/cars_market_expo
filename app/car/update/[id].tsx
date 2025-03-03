import ExpoImagesGrid from "@/components/ui/expo-image/ExpoImagesGrid";
import { REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION } from "@/constants/libs";
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
import {
  getFormDataFromImages,
  getStringFromBooleanForForm,
} from "@/libs/axios/helpers";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { useDeleteFileApi } from "@/hooks/api/shared/mutations/useDeleteFile";
import { DeletableMediaData } from "@/types/shared";
import FullScreenImageViewerModal from "@/components/createCarOffer/FullScreenImageViewerModal";
import CustomPaperSegmentedButtonsSection from "@/components/ui/react-native-paper/CustomPaperSegmentedButtonsSection";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getUpdateCarOfferRequestFromForm,
  UpdateCarOfferForm,
} from "@/types/car/updateCarOffer";
import { useUpdateCarOffer } from "@/hooks/api/car/mutations/useUpdateCar";
import { useGetUpdateCarOffer } from "@/hooks/api/car/Queries/useGetUpdateCarOffer";
import { router } from "expo-router";
import { useUpdateCarImages } from "@/hooks/api/car/mutations/useUpdateCarImages";
const styles = StyleSheet.create({
  textContainer: {},
  textInput: {
    marginBottom: 16,
  },
});

const UpdateCarOffer = () => {
  const { id, updateCarOffer } = useUpdateCarOffer();

  const { data: oldCarDetailsData, isLoading } = useGetUpdateCarOffer(id);

  const [images, setImages] = useState<DeletableMediaData[]>([]);

  const theme = useTheme();

  const { deleteFile } = useDeleteFileApi();

  const { UpdateCarImages } = useUpdateCarImages(id);

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [isErrorDialogVisible, setIsErrorDialogVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCarOfferForm>({
    values: {
      car_price: oldCarDetailsData?.data.car_price?.toString() || "",
      fuel_type: oldCarDetailsData?.data.fuel_type?.toString() || "",
      is_faragha_jahzeh: getStringFromBooleanForForm(
        oldCarDetailsData?.data.is_faragha_jahzeh
      ),
      is_kassah: getStringFromBooleanForForm(oldCarDetailsData?.data.is_kassah),
      is_khalyeh: getStringFromBooleanForForm(
        oldCarDetailsData?.data.is_khalyeh
      ),
      is_new_car: getStringFromBooleanForForm(
        oldCarDetailsData?.data.is_new_car
      ),
      name_ar: oldCarDetailsData?.data.name_ar || "",
      miles_travelled_in_km:
        oldCarDetailsData?.data.miles_travelled_in_km?.toString() || "",
      transmission: oldCarDetailsData?.data.transmission?.toString() || "",
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
      (image) => image.file_url !== fileToDelete.file_url
    );

    setImages(updatedImagesList);

    deleteFile(fileToDelete, {
      onSuccess: (data) => {},
      onError: () => {},
    });
  };

  const getImages =
    oldCarDetailsData?.data.images.map((image) => ({
      public_id: image.public_id,
      file_url: image.file_url,
    })) || [];

  const imagesUris = getImages.map((image) => image.file_url);

  const onSubmit: SubmitHandler<UpdateCarOfferForm> = (data) => {
    if (getImages.length === 0) {
      setIsErrorDialogVisible(true);
      return;
    }

    const updateCarOfferRequestData = getUpdateCarOfferRequestFromForm(data);

    updateCarOffer(updateCarOfferRequestData, {
      onSuccess: () => router.back(),
      onError: () => alert("error"),
    });
  };

  const userHasUploadedImages = getImages.length > 0;

  const submitText = !isUploadingImage ? (
    <Button onPress={handleSubmit(onSubmit)}>تعديل العرض</Button>
  ) : (
    <Button onPress={handleSubmit(onSubmit)}>
      <View style={{ gap: 8 }}>
        <ActivityIndicator />
        <Text>جاري تحميل الصور</Text>
      </View>
    </Button>
  );

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

      UpdateCarImages(imagesFormData, {
        onSuccess: (data) => {
          const newImages = [...data.data];
          // openImageViewr();
          setImages(newImages);
          setIsUploadingImage(false);
        },
        onError: (data) => alert("faileds"),
        onSettled: (data) => setIsUploadingImage(false),
      });

      // uploadCarImages(imagesFormData, {
      //   onSuccess: (data) => {
      //     const newImages = [...data.data];
      //     // openImageViewr();
      //     // setImages(newImages);
      //     setIsUploadingImage(false);
      //   },
      //   onError: (data) => alert("failed"),
      //   onSettled: (data) => setIsUploadingImage(false),
      // });
    }
  };

  const onImageGridItemClicked = (selectedImage: string) => {
    openImageViewr();
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <ExpoImagesGrid
          isUploadingImages={isUploadingImage}
          imagesUris={imagesUris}
          onAddImageClicked={pickImage}
          onImageClicked={onImageGridItemClicked}
        />
        {userHasUploadedImages && (
          <FullScreenImageViewerModal
            isVisible={isImageViewerOpen}
            images={getImages.map((item) => ({
              public_id: item.public_id,
              url: item.file_url,
            }))}
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
            name="name_ar"
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
                  visible={!!errors.name_ar}
                  style={{ paddingBottom: 0 }}
                >
                  {errors.name_ar?.message}
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
      </SafeAreaView>
      <Dialog visible={isErrorDialogVisible}>
        <Dialog.Content>
          <Text>الرجاء تحميل صورة واحدة على اﻷقل قبل إنشاء العرض</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setIsErrorDialogVisible(false)}>موافق</Button>
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  );
};

export default UpdateCarOffer;
