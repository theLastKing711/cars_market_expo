import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import SubscriptionFeatureItem from "./SubscriptionFeatureItem";

export type SubscriptionFeatureListSectionProps = {
  //   title: string;
  featurers: string[];
};

const SubscriptionFeatureListSection = ({
  //   title,
  featurers,
}: SubscriptionFeatureListSectionProps) => {
  const styles = StyleSheet.create({
    contaienr: {
      gap: 12,
    },
    featuresContainer: {
      gap: 8,
    },
    title: {
      fontWeight: 700,
    },
  });

  return (
    <View style={styles.contaienr}>
      <Text style={styles.title} variant="titleMedium">
        {/* {title} */}
        يتضمن:
      </Text>
      <View>
        {featurers.map((item, index) => (
          <SubscriptionFeatureItem key={item} text={item} />
        ))}
      </View>
    </View>
  );
};

export default SubscriptionFeatureListSection;
