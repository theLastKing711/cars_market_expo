import { Image } from "expo-image";
import React, { useState } from "react";
import { Dimensions, useWindowDimensions, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";

const ImagesCarouselSection = () => {
  const theme = useTheme();

  // const width = Dimensions.get("window").width;

  // change width and height when orientation change as opposed to Demensoins which dont
  const { width, height } = useWindowDimensions();

  const imageHeight = height;

  const imageWidth = width;

  const dummyArray = [...new Array(6).keys()];

  const dummyArrayLength = dummyArray.length;

  const getDummyArrayIndex = (index: number) => {
    return `${(index + 1).toString()} / ${dummyArrayLength.toString()}`;
  };

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width}
        // autoPlay={true}
        data={dummyArray}
        scrollAnimationDuration={1000}
        // modeConfig={}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View>
            <View
              style={{
                // padding: 20,
                paddingBottom: 0,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
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
                  maxWidth: 300, // width of the image, can be disorted if we set it greater than this value which is the uploaded image width in cloudinary
                  aspectRatio: "1/1", // or use paddingVertical 50%(in web we can use paddingTop 100%)
                  resizeMode: "contain",
                  backgroundColor: "white",
                }}
              />
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

export default ImagesCarouselSection;
