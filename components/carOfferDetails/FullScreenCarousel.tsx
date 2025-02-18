import { UploadFileResponseData } from "@/types/shared";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { SafeAreaView, useWindowDimensions, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import ImageViewer from "react-native-image-zoom-viewer";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";

export type FullScreenCarouselProps = {
  images: UploadFileResponseData[];
  onCloseButtonClicked: () => void;
  onDeleteButtonClicked: (imageIndex: number) => void;
};

const FullScreenCarousel = ({
  images,
  onCloseButtonClicked,
  onDeleteButtonClicked,
}: FullScreenCarouselProps) => {
  const theme = useTheme();

  // const width = Dimensions.get("window").width;

  // change width and height when orientation change as opposed to Demensoins which dont
  const { width, height } = useWindowDimensions();

  const imageHeight = height;

  const imageWidth = width;

  const x: IImageInfo[] | undefined = images.map((x, index) => ({
    url: x.url,
    props: {
      index,
    },
  }));

  const imagesRef = useRef<ImageViewer>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ImageViewer
        ref={imagesRef}
        imageUrls={x}
        renderHeader={(currentIndex) => (
          <View
            key={currentIndex! + 1}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              zIndex: 30000,
              //   backgroundColor: theme.colors.surface,
            }}
          >
            <IconButton
              size={52}
              icon={{ source: "close", direction: "rtl" }}
              onPress={onCloseButtonClicked}
            />
            <IconButton
              size={52}
              icon={{ source: "trash-can", direction: "rtl" }}
              onPress={() => {
                // const selectedIMage = x.find(
                //   (item, index) => index == currentIndex
                // )!;
                // const state = imagesRef.current?.state;

                if (currentIndex !== 0) {
                  imagesRef.current?.goBack();
                }
                onDeleteButtonClicked(currentIndex!);
              }}
            />
          </View>
        )}
        renderImage={(props) => {
          return (
            <Image
              key={props.source.uri}
              source={{
                //width 700 with 'crop' => 'pad'
                //   uri: "https://res.cloudinary.com/dkmsfsa7c/image/upload/c_pad,h_700,w_700/v1730122453/msiejguluyejm9xnlbwj.jpg",
                uri: props.source.uri,
                // 700 width
              }}
              style={{
                width: "100%",
                height: "100%",
                maxWidth: 800, // width of the image, can be disorted if we set it greater than this value which is the uploaded image width in cloudinary
                //   aspectRatio: "4/3", // or use paddingVertical 50%(in web we can use paddingTop 100%)
                resizeMode: "contain",
                backgroundColor: theme.colors.surface,
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FullScreenCarousel;
