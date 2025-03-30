import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useCreatePassword } from "@/hooks/api/auth/mutations/useCreatePassword";
import { useRegister } from "@/hooks/api/auth/mutations/useRegister";
import { useVerifyPassword } from "@/hooks/api/auth/mutations/useVerifyPassword";
import useAuthStore from "@/state/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Keyboard, TextInput } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyPassword = () => {
  const theme = useTheme();

  const { phone_number } = useLocalSearchParams();

  alert(phone_number);

  const { verifyPassword: verifyPasswordApi } = useVerifyPassword();

  const { saveToken } = useAuthStore();

  const verifyPassword = (password: string) => {
    verifyPasswordApi(
      { password, phone_number: phone_number as string },
      {
        onSuccess: ({ data: { token } }) => {
          saveToken(token);
          router.back();
          // router.push({pathname: "/"})
        },
        onError: (data) => {
          console.log("message", data.message);
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
        أنشأ كلمة مرور لحسابك)يرجى حفظها في مكان آمن)
      </Text>
      <SegmentedPhoneInput onInputFinish={verifyPassword} length={4} />
    </SafeAreaView>
  );
};

export default VerifyPassword;
