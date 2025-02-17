import { UploadFileResponseData } from "@/types/shared";
import { Image } from "expo-image";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";

export type FullScreenCarouselProps = {
  images: UploadFileResponseData[];
  onCloseButtonClicked: () => void;
  onDeleteButtonClicked: (image: UploadFileResponseData) => void;
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

  const dummyArray = [...new Array(6).keys()];

  const dummyArrayLength = dummyArray.length;

  const getDummyArrayIndex = (index: number) => {
    return `${(index + 1).toString()} / ${images.length}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        style={{ flex: 1 }}
        loop
        width={width}
        height={height}
        // autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        // modeConfig={}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                paddingBottom: 0,
                backgroundColor: theme.colors.surface,
                justifyContent: "center",
                alignItems: "center",
                // paddingHorizontal: 20,
                // paddingVertical: 30,
                paddingHorizontal: 20,
              }}
            >
              <Image
                source={{
                  //width 700 with 'crop' => 'pad'
                  //   uri: "https://res.cloudinary.com/dkmsfsa7c/image/upload/c_pad,h_700,w_700/v1730122453/msiejguluyejm9xnlbwj.jpg",
                  uri: item.url,
                  // 700 width
                  // uri: "http://res.cloudinary.com/dkmsfsa7c/image/upload/w_700/v1730034763/luszz0nouyp1hev6iczs.jpg",
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
              <View
                style={{
                  position: "absolute",
                  top: 20,
                  left: 0,
                  right: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  //   backgroundColor: theme.colors.surface,
                }}
              >
                <IconButton
                  size={48}
                  icon={{ source: "close", direction: "rtl" }}
                  onPress={onCloseButtonClicked}
                />
                <IconButton
                  size={48}
                  icon={{ source: "trash-can", direction: "rtl" }}
                  onPress={() => onDeleteButtonClicked(item)}
                />
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                right: 8,
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
    </View>
  );
};

export default FullScreenCarousel;
