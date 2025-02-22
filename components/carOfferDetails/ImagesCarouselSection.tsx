import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import FullScreenImageViewerModal from "../createCarOffer/FullScreenImageViewerModal";

export type ImagesCarouselSectionProps = {
  imagesUrls: string[];
};

const ImagesCarouselSection = ({ imagesUrls }: ImagesCarouselSectionProps) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const openImageViewer = () => {
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
  };

  const theme = useTheme();

  // const width = Dimensions.get("window").width;

  // change width and height when orientation change as opposed to Demensoins which dont
  const { width, height } = useWindowDimensions();

  const imageHeight = height;

  const imageWidth = width;

  const imagesUrlsLength = imagesUrls.length;

  const getDummyArrayIndex = (index: number) => {
    return `${(
      imagesUrlsLength - index
    ).toString()} / ${imagesUrlsLength.toString()}`;

    // return `${(index + 1).toString()} / ${imagesUrlsLength.toString()}`;
  };

  const memoizedImagesUrls = useMemo(() => {
    const newImages = [...imagesUrls];

    return newImages.reverse();
  }, [imagesUrls]);

  const firstImageIndex = memoizedImagesUrls.length - 1;

  const shouldAutoPlay = memoizedImagesUrls.length != 1;

  return (
    <View>
      <Carousel
        defaultIndex={firstImageIndex}
        // loop
        width={width}
        height={width}
        autoPlay={shouldAutoPlay}
        autoPlayReverse={shouldAutoPlay}
        data={memoizedImagesUrls}
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <View key={item}>
            <Pressable onPress={openImageViewer}>
              <View
                style={{
                  paddingBottom: 0,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    //width 700 with 'crop' => 'pad'
                    uri: item,
                    // 700 width
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: 500, // width of the image, can be disorted if we set it greater than this value which is the uploaded image width in cloudinary
                    // aspectRatio: "1/1", // or use paddingVertical 50%(in web we can use paddingTop 100%)
                    resizeMode: "contain",
                  }}
                />
              </View>
            </Pressable>
            <View
              style={{
                position: "absolute",
                left: 8,
                bottom: 8,
                width: 44,
                height: 28,
                borderRadius: 4,
                backgroundColor: theme.colors.surface,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 2,
                borderTopWidth: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
                {getDummyArrayIndex(index)}
              </Text>
            </View>
          </View>
        )}
      />
      {isImageViewerOpen && (
        <FullScreenImageViewerModal
          images={imagesUrls.map((item) => ({
            url: item,
            public_id: item,
          }))}
          onCloseButtonClicked={closeImageViewer}
          onModalClose={closeImageViewer}
          isVisible={isImageViewerOpen}
          withDelete={false}
        />
      )}
    </View>
  );
};

export default ImagesCarouselSection;
