import { Slider, SliderProps } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, TextInputProps, useTheme } from "react-native-paper";

export type CustomPaperTextInputRangeSectionProps = {
  title: string;
  firstInputProps: TextInputProps;
  secondInputProps: TextInputProps;
  sliderProps: SliderProps;
};

const CustomPaperTextInputRangeSection = ({
  title,
  firstInputProps,
  secondInputProps,
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
      // maxWidth: 30,
    },
    textInput: {
      flex: 1,
      // width: ,
      // flex: 1,
    },
    sliderContainer: {
      // transform: [{ scale: -1 }],
    },
  });

  return (
    <View style={styles.container}>
      <Text variant="labelMedium">{title}</Text>
      <View style={styles.textInputsRow}>
        <TextInput
          style={styles.textInputWrapper}
          contentStyle={styles.textInput}
          label={firstInputProps.label || "من"}
          // placeholder={firstInputProps.placeholder || "من"}
          {...firstInputProps}
          // right={<Text style={{ color: "blue" }}>كم</Text>}
          left={<Text style={{ color: "red" }}>كم</Text>}
        />
        <TextInput
          style={styles.textInputWrapper}
          contentStyle={styles.textInput}
          label={firstInputProps.label || "لحد"}
          // placeholder={firstInputProps.placeholder || "لحد"}
          {...secondInputProps}
        />
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
