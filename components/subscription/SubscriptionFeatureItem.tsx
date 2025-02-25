import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

export type SubscriptionFeatureItemProps = {
  text: string;
};

const SubscriptionFeatureItem = ({ text }: SubscriptionFeatureItemProps) => {
  const styles = StyleSheet.create({
    contaienr: {
      flexDirection: "row",
      gap: 8,
    },
  });

  return (
    <View style={styles.contaienr}>
      <Icon source="checkbox-marked" size={24} />
      <Text variant="titleMedium">{text}</Text>
    </View>
  );
};

export default SubscriptionFeatureItem;
