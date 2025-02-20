import { Slider, SliderProps } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, TextInputProps, useTheme } from "react-native-paper";

export type CustomPaperTextInputRangeSectionProps = {
  title: string;
  firstInputProps: TextInputProps;
  secondInputProps: TextInputProps;
  inputSuffix?: string;
  sliderProps: SliderProps;
};

const CustomPaperTextInputRangeSection = ({
  title,
  firstInputProps,
  secondInputProps,
  inputSuffix = "",
  sliderProps,
}: CustomPaperTextInputRangeSectionProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      gap: 8,
      marginBottom: 16,
    },
    textInputsRow: {
      flexDirection: "row",
      gap: 25,
    },
    textInputWrapper: {
      flex: 1,
    },
    textInputContainer: {
      flex: 1,
    },
    sliderContainer: {
      // transform: [{ scale: -1 }],
    },
  });

  return (
    <View style={styles.container}>
      <Text variant="labelMedium">{title}</Text>
      <View style={styles.textInputsRow}>
        <View style={styles.textInputContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.textInputWrapper}
            label={firstInputProps.label || "من"}
            {...firstInputProps}
          />
          <Text
            style={{
              position: "absolute",
              right: 8,
              bottom: 8,
            }}
          >
            {inputSuffix}
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.textInputWrapper}
            label={secondInputProps.label || "لحد"}
            {...secondInputProps}
          />
          <Text
            style={{
              position: "absolute",
              right: 8,
              bottom: 8,
            }}
          >
            {inputSuffix}
          </Text>
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          {...sliderProps}
          // maximumTrackTintColor={theme.colors.primary}
          minimumTrackTintColor={theme.colors.primary}
          // thumbTouchSize={{
          //   width: 44,
          //   height: 44,
          // }}
          // trackMarks={[0, 0]}
          // renderTrackMarkComponent={(index) => (
          //   <Slider
          //     {...startSliderProps}
          //     // maximumTrackTintColor={theme.colors.primary}
          //     minimumTrackTintColor={theme.colors.primary}
          //     thumbTouchSize={{
          //       width: 44,
          //       height: 44,
          //     }}
          //   />
          // )}
        />
        {/* <Text>{sliderProps.value}</Text> */}
      </View>
    </View>
  );
};

export default CustomPaperTextInputRangeSection;
