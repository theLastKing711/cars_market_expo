import VariantSection from "@/components/product/VariantSection";
import VariantValueImage from "@/components/product/VariantValueImage";
import { useGetProductDetails } from "@/hooks/api/products/Queries/useGetProductDetails";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

const ProductDetails = () => {
  const { id, firstVariantValueId, secondVariantValueId, thirdVariantValueId } =
    useLocalSearchParams<{
      id: string;
      firstVariantValueId?: string;
      secondVariantValueId?: string;
      thirdVariantValueId?: string;
    }>();

  const { data, isLoading } = useGetProductDetails(id);

  //   console.log("data", data);

  const variants = data?.data.variants || [];

  const isVariantValueSelected = (id: number) => {
    if (firstVariantValueId != null) {
      return firstVariantValueId == id.toString();
    }
    if (secondVariantValueId != null) {
      return secondVariantValueId == id.toString();
    }
    if (thirdVariantValueId != null) {
      return thirdVariantValueId == id.toString();
    }
    return false;
  };

  const selectVariantValue = (id: number, variantId: number) => {};

  const variant_sections = variants.map((variant, variantIndex) => (
    <VariantSection
      key={variant.id}
      variant={variant}
      renderItem={(variantValue) => (
        <VariantValueImage
          key={variantValue.id}
          variantValue={variantValue}
          isSelected={isVariantValueSelected(variantValue.id)}
          onSelection={(id) => selectVariantValue(id, variant.id)}
        />
      )}
    />
  ));

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Image
          source={{
            //width 700 with 'crop' => 'pad'
            uri: "https://res.cloudinary.com/dkmsfsa7c/image/upload/c_pad,h_700,w_700/v1730122453/msiejguluyejm9xnlbwj.jpg",
            // 700 width
            // uri: "http://res.cloudinary.com/dkmsfsa7c/image/upload/w_700/v1730034763/luszz0nouyp1hev6iczs.jpg",
          }}
          style={{
            width: "100%",
            maxWidth: 700, // width of the image, can be disorted if we set it greater than this value which is the image width
            aspectRatio: "1/1", // or use paddingVertical 50%(in web we can use paddingTop 100%)
            resizeMode: "contain",
            backgroundColor: "white",
          }}
        />
      </View>
      {variant_sections}
    </View>
  );
};

export default ProductDetails;
