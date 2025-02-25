import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import SubscriptionFeatureListSection, {
  SubscriptionFeatureListSectionProps,
} from "./SubscriptionFeatureListSection";

export type SubscriptionCardProps = {
  is_popular?: boolean;
  title: string;
  price: string;
  content: SubscriptionFeatureListSectionProps;
};

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 20,
  },
  title: {
    paddingTop: 8,
    paddingBottom: 16,
    fontWeight: 700,
  },
  subtitle: {
    paddingBottom: 16,
    fontWeight: 700,
  },
  contentContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  contentColumn: {
    flex: 1,
    gap: 12,
  },
});

const SubscriptionCard = ({
  title,
  price,
  content,
  is_popular,
}: SubscriptionCardProps) => {
  const theme = useTheme();

  const isPopularStyles = is_popular
    ? StyleSheet.create({
        container: {
          borderColor: theme.colors.primary,
          borderWidth: 2,
          borderRadius: theme.roundness,
        },
      })
    : StyleSheet.create({ container: {} });

  return (
    <Card style={isPopularStyles.container}>
      <Card.Title
        title={title}
        titleVariant="titleMedium"
        subtitleVariant="headlineMedium"
        style={styles.titleContainer}
        titleStyle={styles.title}
        // titleNumberOfLines={2}
      />
      <Card.Content style={styles.contentContainer}>
        <View style={{ gap: 20 }}>
          <View>
            <Text variant="headlineMedium" style={{ textAlign: "left" }}>
              {price}${/* <Text>hell world</Text> */}
            </Text>
            <Text variant="titleMedium">بالسنة</Text>
          </View>
          <SubscriptionFeatureListSection {...content} />
        </View>
      </Card.Content>
      <Card.Actions>
        <Button style={{ flex: 1 }}>اختر العرض</Button>
      </Card.Actions>
      {is_popular && (
        <View
          style={{
            position: "absolute",
            top: -20,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button style={{ backgroundColor: theme.colors.primary }} disabled>
            <Text style={{ color: "white" }}>اﻷكثر مبيعاً</Text>
          </Button>
        </View>
      )}
    </Card>
  );
};

export default SubscriptionCard;
