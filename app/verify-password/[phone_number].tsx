import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useVerifyPassword } from "@/hooks/api/auth/mutations/useVerifyPassword";
import useAuthStore from "@/state/useAuthStore";
import { useRoute } from "@react-navigation/native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { Keyboard } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyPassword = () => {
  const theme = useTheme();

  const route = useRoute();

  const { phone_number, parentPage } = useLocalSearchParams();

  const { verifyPassword: verifyPasswordApi } = useVerifyPassword();

  const { saveToken } = useAuthStore();

  const verifyPassword = (password: string) => {
    verifyPasswordApi(
      { password, phone_number: phone_number as string },
      {
        onSuccess: async ({ data: { token } }) => {
          await saveToken(token);
          // router.dismissAll();
          router.push(parentPage as string);
          // saveToken(token);
          // navigation.goBack();
          // router.back();
        },
        onError: (data) => {
          console.log("message", data);
        },
      }
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.surface,
        justifyContent: "center",
        alignItems: "center",
      }}
      onTouchStart={Keyboard.dismiss}
    >
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        كلمة المرور للرقم
      </Text>
      <SegmentedPhoneInput onInputFinish={verifyPassword} length={4} />
    </SafeAreaView>
  );
};

export default VerifyPassword;
