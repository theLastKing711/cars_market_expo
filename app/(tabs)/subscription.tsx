import SubscriptionCard, {
  SubscriptionCardProps,
} from "@/components/subscription/SubscriptionCard";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const subscriptionsCards: SubscriptionCardProps[] = [
  {
    price: "100",
    title: "بلس",
    content: {
      featurers: [
        "عرض 100 سيارة للبيع لمدة سنة",
        "إمكانية تلقي مكالمات من ضمن التطبيق ,عند الدخول على صفحة السيارة التي عرضتها للبيع",
        "البجث,التعديل أو حذف للسيارت التي عرضتها للبيع",
        "ميزة تم البيغ, التي تزيل السيارة من قائمة البحث لمستخدمي التطبيق",
      ],
    },
  },
  {
    price: "150",
    title: "اكسترا",
    content: {
      featurers: [
        "عرض 200 سيارة للبيع لمدة سنة,قابلة للتجديد.",
        "إمكانية تلقي مكالمات من ضمن التطبيق عند الدخول على صفحة السيارة التي عرضتها للبيع",
        "البجث,التعديل أو حذف للسيارت التي عرضتها للبيع",
        "ميزة تم البيغ, التي تزيل السيارة من قائمة البحث لمستخدمي التطبيق",
      ],
    },
    is_popular: true,
  },
  {
    price: "200",
    title: "دبل اكسترا",
    content: {
      featurers: [
        "عرض 300 سيارة للبيع لمدة سنة",
        "إمكانية تلقي مكالمات من ضمن التطبيق عند الدخول على صفحة السيارة التي عرضتها للبيع",
        "البجث,التعديل أو حذف للسيارت التي عرضتها للبيع",
        "ميزة تم البيغ, التي تزيل السيارة من قائمة البحث لمستخدمي التطبيق",
      ],
    },
  },
];

const Subscription = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 71,
    },
    sectionContainer: {
      gap: 16,
    },
    subscriptionsContainer: {
      gap: 28,
    },
  });

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text variant="titleLarge">العروض المتوفرة:</Text>
          <View style={styles.subscriptionsContainer}>
            {subscriptionsCards.map((item, index) => (
              <SubscriptionCard key={index} {...item} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Subscription;
