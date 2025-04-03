import { useGetUserPhoneNumber } from "@/hooks/api/auth/Queries/useGetUserPhoneNumber";
import useLoadingStore from "@/state/useLoadingStore";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Divider, List, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const MyProfileAuthenticated = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetUserPhoneNumber();
  const { setLoading, hideLoading } = useLoadingStore();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (isLoading) {
    return;
  }

  const phone_number_text = `رقم هاتف حسابي : ${data?.data.phone_number}`;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 16,
      }}
    >
      <List.Section>
        <List.Subheader>{phone_number_text} </List.Subheader>
        <List.Item
          title="تغيير رقم الهاتف"
          onPress={() => {
            router.push({
              pathname: "/change-phone-number",
            });
          }}
        ></List.Item>
        <Divider style={{ height: 0.5 }} />
        <List.Item
          title="تغيير كلمة المرور"
          onPress={() => {
            router.push({
              pathname: "/change-password",
            });
          }}
        ></List.Item>
      </List.Section>
    </SafeAreaView>
  );
};

export default MyProfileAuthenticated;
