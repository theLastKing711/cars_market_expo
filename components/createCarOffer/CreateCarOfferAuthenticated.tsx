import ExpoImagesGrid from "@/components/ui/expo-image/ExpoImagesGrid";
import { REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION } from "@/constants/libs";
import { useCreateCarOffer } from "@/hooks/api/car/mutations/useCreateCarOffer";
import {
  CreateCarOfferForm,
  getCarOfferRequestFromForm,
} from "@/types/car/createCarOffer";
import { FUELTYPELISTSEGMENTEDBUTTONS } from "@/types/enums/FuelType";
import { TRANSMISSIONSEGMENTEDBUTTONS } from "@/types/enums/TransmissionType";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  HelperText,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useUploadCarImages } from "@/hooks/api/car/mutations/useUploadCarImages";
import { getFormDataFromImages } from "@/libs/axios/helpers";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { useDeleteFileApi } from "@/hooks/api/shared/mutations/useDeleteFile";
import { UploadFileResponseData } from "@/types/shared";
import FullScreenImageViewerModal from "@/components/createCarOffer/FullScreenImageViewerModal";
import CustomPaperSegmentedButtonsSection from "@/components/ui/react-native-paper/CustomPaperSegmentedButtonsSection";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDialog } from "@/hooks/ui/useDialog";
import { useGetmaxCarUpload } from "@/hooks/api/car/Queries/useGetUserMaxCarUpload";
import useSnackBarStore from "@/state/useSnackBarStore";
import useLoadingStore from "@/state/useLoadingStore";
const styles = StyleSheet.create({
  textContainer: {},
  textInput: {
    marginBottom: 16,
  },
});

const CreateCarOfferAuthenticated = () => {
  const { data: maxCarUploadData, isLoading } = useGetmaxCarUpload();

  const [images, setImages] = useState<UploadFileResponseData[]>([]);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const { openDialog, closeDialog, dialogText, isDialogOpen } = useDialog();

  const { setLoading } = useLoadingStore();

  const theme = useTheme();

  const { deleteFile } = useDeleteFileApi();

  const { uploadCarImages } = useUploadCarImages();

  const { createCarOffer, isLoading: isCreatingOffer } = useCreateCarOffer();

  const { showTransparentLoading, showLoading, hideLoading } =
    useLoadingStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<CreateCarOfferForm>({
    defaultValues: {
      name_ar: "",
      car_price: "",
      miles_travelled_in_km: "",
      // fuel_type: "",
      is_faragha_jahzeh: "",
      is_kassah: "",
      is_khalyeh: "",
      is_new_car: "",
    },
  });

  const { openSnackBarSuccess, openSnackBarError } = useSnackBarStore();

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
    // if (maxCarUploadData?.data.max_number_of_car_upload === 0) {
    //   openDialog("عدد السيارات المسموح تحميلها استنفذ, يرجى شحن الحساب.");
    //   return;
    // }

    if (images.length === 0) {
      openDialog("الرجاء تحميل صورة واحدة على اﻷقل قبل إنشاء العرض");
      return;
    }

    const createCarOfferRequestData = getCarOfferRequestFromForm(data);

    createCarOffer(createCarOfferRequestData, {
      onSuccess: () => {
        openSnackBarSuccess("تم إنشاء العرض بنجاح");
        reset();
        setImages([]);
      },
      onError: () => {
        openSnackBarError(
          "فشل عملية إنشاء العرض, يرجى التأكد من الاتصال بالشبكة, ثم المحاولة مرة اخرى."
        );
      },
    });
  };

  const pickImage = async () => {
    // if (maxCarUploadData?.data.max_number_of_car_upload === 0) {
    //   openDialog("عدد السيارات المسموح تحميلها استنفذ, يرجى شحن الحساب.");
    //   return;
    // }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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

  const isLoadingVisible = isUploadingImage || isCreatingOffer;

  const loadingButtonText = isUploadingImage
    ? "جاري تحميل الصور"
    : "جاري إنشاء العرض";

  const submitText = isLoadingVisible ? (
    <Button onPress={handleSubmit(onSubmit)}>
      <View style={{ gap: 8 }}>
        <ActivityIndicator />
        <Text>{loadingButtonText}</Text>
      </View>
    </Button>
  ) : (
    <Button onPress={handleSubmit(onSubmit)}>إنشاء العرض</Button>
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (isLoading) {
    return;
  }

  const remaining_car_uploads_count = `عدد السيارات المتبقية المسموح تحميلها ${maxCarUploadData?.data.max_number_of_car_upload}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Surface
        style={{
          padding: 16,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Text>{remaining_car_uploads_count}</Text>
      </Surface>
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
            name="name_ar"
            control={control}
            rules={{
              required: {
                value: true,
                message: "يرجى إدخال قيمة في الحقل",
              },
            }}
            render={({ field: { onChange, onBlur, value, ...props } }) => (
              <View style={styles.textContainer}>
                <TextInput
                  {...props}
                  label="اسم السيارة "
                  placeholder="مثال: هيونداي سانتافي 2011,كيا ريو."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <HelperText type="error" visible={!!errors.name_ar}>
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
            render={({ field: { onChange, onBlur, value, ...props } }) => (
              <View style={styles.textContainer}>
                <View>
                  <TextInput
                    {...props}
                    label="سعر السيارة بالدولار"
                    keyboardType="numeric"
                    placeholder="مثال: 4000,10000."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      right: 8,
                      bottom: 8,
                    }}
                  >
                    $
                  </Text>
                </View>
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
                <View>
                  <TextInput
                    label="عدد الكيلومترات المقطوعة"
                    keyboardType="numeric"
                    placeholder="مثال: 10000, 300000."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      right: 8,
                      bottom: 8,
                    }}
                  >
                    كم
                  </Text>
                </View>
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
      <Dialog visible={isDialogOpen}>
        <Dialog.Content>
          <Text>{dialogText}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeDialog}>موافق</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

export default CreateCarOfferAuthenticated;
