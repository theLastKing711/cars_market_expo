import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, List, useTheme } from "react-native-paper";
import ListSection from "react-native-paper/lib/typescript/components/List/ListSection";

type SectionContainerProps = {
  children: React.ReactNode;
};

export const SectionContainer = ({ children }: SectionContainerProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingTop: 16,
      paddingHorizontal: 16,
    },
  });

  return (
    <View style={styles.container}>
      {children}
      <Divider style={{ marginTop: 16 }} />
    </View>
  );
};
