import React from "react";
import { StyleSheet, View } from "react-native";

export type ExpoImagesRowProps = {
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
});

const ExpoImagesRow = ({ children }: ExpoImagesRowProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default ExpoImagesRow;
