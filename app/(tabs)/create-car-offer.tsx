import ExpoImagesGrid from "@/components/ui/expo-image/ExpoImagesGrid";
import { REACTPAPERBOOLLIST } from "@/constants/libs";
import { useCreateCarOffer } from "@/hooks/api/car/mutations/useCreateCarOffer";
import {
  CreateCarOfferForm,
  getCarOfferRequestFromForm,
} from "@/types/car/createCarOffer";
import { FUELTYPELIST } from "@/types/enums/FuelType";
import { TRANSMISSIONLIST } from "@/types/enums/TransmissionType";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import * as ImagePicker from "expo-image-picker";
import { useUploadCarImages } from "@/hooks/api/car/mutations/useUploadCarImages";
import { getFormDataFromImages } from "@/libs/axios/helpers";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ImageManipulator } from "expo-image-manipulator";
import { useDeleteFileApi } from "@/hooks/api/shared/mutations/useDeleteFile";
import { UploadFileResponseData } from "@/types/shared";
import FullScreenImageViewerModal from "@/components/createCarOffer/FullScreenImageViewerModal";
import { CARMANUFACTURERLIST } from "@/types/enums/CarManufacturer";
import CustomPaperSelect from "@/components/ui/react-native-paper/CustomPaperSelect";
const styles = StyleSheet.create({
  textInput: {
    marginBottom: 16,
  },
});

const CreateCarOffer = () => {
  const [images, setImages] = useState<UploadFileResponseData[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [viewingImageIndex, setViewingImageIndex] = useState(1);

  const theme = useTheme();

  const { deleteFile } = useDeleteFileApi();

  const { uploadCarImages } = useUploadCarImages();

  const { createCarOffer } = useCreateCarOffer();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCarOfferForm>({
    // defaultValues: {
    //   car_price: null,
    //   fuel_type: null,
    //   is_faragha_jahzeh: null,
    //   is_kassah: null,
    //   is_khalyeh: null,
    //   is_new_car: null,
    //   manufacturer_id: null,
    //   manufacturer_name_ar: null,
    //   manufacturere_name_en: null,
    //   miles_travelled_in_km: null,
    //   model: null,
    //   transmission_type: null,
    // },
  });

  const openImageViewr = () => {
    setIsImageViewerOpen(true);
  };

  const closeImageViewr = () => {
    setIsImageViewerOpen(false);
  };

  const onFileDelete = (file: UploadFileResponseData) => {
    deleteFile(file, {
      onSuccess: (data) => {
        const updatedImagesList = images.filter(
          (image) => image.url !== file.url
        );
        setImages(updatedImagesList);
      },
      onError: () => {
        alert("error happened");
      },
    });
  };

  const onSubmit: SubmitHandler<CreateCarOfferForm> = (data) => {
    const createCarOfferRequestData = getCarOfferRequestFromForm(data);

    console.log("form data", createCarOfferRequestData);

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

    setIsUploadingImage(true);

    if (!result.canceled) {
      const manipulatedImagesUris = await Promise.all(
        result.assets.map<Promise<ImagePicker.ImagePickerAsset>>(
          async (asset, index) => {
            const imageWidth = Math.min(asset.width, 800);
            const manipResult = await ImageManipulator.manipulate(asset.uri)
              .resize({ width: imageWidth })
              .renderAsync();

            const { width, height, uri } = await manipResult.saveAsync();

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
        },
        onError: (data) => alert("failed"),
        onSettled: (data) => setIsUploadingImage(false),
      });
    }
  };

  const onImageGridItemClicked = (selectedImage: string) => {
    const selectedImageIndex = images.findIndex(
      (imageUri) => imageUri.url === selectedImage
    );
    openImageViewr();
    setViewingImageIndex(selectedImageIndex);
  };

  const imagesUris = images.map((image) => image.url);

  const userHasUploadedImages = images.length > 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ExpoImagesGrid
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
            // gap: 16,
            paddingHorizontal: 16,
            backgroundColor: theme.colors.surface,
            paddingTop: 16,
            paddingBottom: 90,
          }}
        >
          {/* <Controller
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
              <TextInput
                style={styles.textInput}
                placeholder="الشركة المصنعة)عربي("
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="manufacturer_name_ar"
          />
          <Controller
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
              <TextInput
                style={styles.textInput}
                placeholder="الشركة المصنعة)انكليزي("
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="manufacturere_name_en"
          /> */}
          <Controller
            name="manufacturer_id"
            control={control}
            render={({
              field: { onChange, onBlur, value = [] as ListItem[] },
            }) => (
              <CustomPaperSelect
                label="الشركة المصنعة"
                value={value}
                arrayList={CARMANUFACTURERLIST}
                hideSearchBar={false}
                onChange={onChange}
              />
            )}
          />
          <Controller
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
              <TextInput
                style={styles.textInput}
                placeholder="موديل"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value?.toString()}
              />
            )}
            name="model"
          />

          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value = [] as ListItem[] },
            }) => (
              <CustomPaperSelect
                label="هل السيارة جديدة(غير مستعملة)؟"
                value={value}
                arrayList={REACTPAPERBOOLLIST}
                onChange={onChange}
              />
            )}
            name="is_new_car"
          />
          <Controller
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
              <TextInput
                style={styles.textInput}
                placeholder="سعر السيارة"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value?.toString()}
              />
            )}
            name="car_price"
          />
          <Controller
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
            render={({
              field: { onChange, onBlur, value = [] as ListItem[] },
            }) => (
              <CustomPaperSelect
                label="نوع الوقود"
                value={value}
                arrayList={FUELTYPELIST}
                onChange={onChange}
              />
            )}
            name="fuel_type"
          />
          <Controller
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
            render={({
              field: { onChange, onBlur, value = [] as ListItem[] },
            }) => (
              <CustomPaperSelect
                label="نوع الناقل"
                value={value}
                arrayList={TRANSMISSIONLIST}
                onChange={onChange}
              />
            )}
            name="transmission"
          />
          <Controller
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
              <TextInput
                style={styles.textInput}
                placeholder="كم كيلو متر قاطعة السيارة (العداد)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="miles_travelled_in_km"
          />
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value = [] as ListItem[] },
            }) => (
              <CustomPaperSelect
                label="هل السيارة جاهزة للفراغة؟"
                value={value}
                arrayList={REACTPAPERBOOLLIST}
                onChange={onChange}
              />
            )}
            name="is_faragha_jahzeh"
          />
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value = [] as ListItem[] },
            }) => (
              <CustomPaperSelect
                label="هل السيارة مقصوصة؟"
                value={value}
                arrayList={REACTPAPERBOOLLIST}
                onChange={onChange}
              />
            )}
            name="is_kassah"
          />
          <Controller
            name="is_khalyeh"
            control={control}
            render={({
              field: { onChange, onBlur, value = [] as ListItem[] },
            }) => (
              <CustomPaperSelect
                label="هل السيارة خالية العلام؟"
                value={value}
                arrayList={REACTPAPERBOOLLIST}
                onChange={onChange}
              />
            )}
          />
          <Button onPress={handleSubmit(onSubmit)}>إنشاء العرض</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCarOffer;
