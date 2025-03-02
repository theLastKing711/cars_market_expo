import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const UpdateCarOffer = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
    },
  });

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}></SafeAreaView>
    </ScrollView>
  );
};

export default UpdateCarOffer;
