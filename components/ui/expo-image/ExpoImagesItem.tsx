import React from "react";
import { StyleSheet, View } from "react-native";
export type ExpoImagesItemProps = {
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ExpoImagesItem = ({ children }: ExpoImagesItemProps) => {
  return <View style={styles.container}></View>;
};

export default ExpoImagesItem;
