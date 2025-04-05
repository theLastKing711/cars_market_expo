import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useVerifyPassword } from "@/hooks/api/auth/mutations/useVerifyPassword";
import { useSegmentedPasswordInput } from "@/hooks/components/useSegmentedPhoneInput";
import useAuthStore from "@/state/useAuthStore";
import useLoadingStore from "@/state/useLoadingStore";
import useSnackBarStore from "@/state/useSnackBarStore";
import { useRoute } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Keyboard } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyPassword = () => {
  const theme = useTheme();

  const route = useRoute();

  const {
    firstInputRef,
    isFirstInputFocused,
    numbers,
    setNumbers,
    emptyNumbers,
    toggleIsFirstInputFocused,
  } = useSegmentedPasswordInput();

  const { phone_number, parentPage } = useLocalSearchParams();

  const { openSnackBarError } = useSnackBarStore();

  const { showTransparentLoading, hideLoading } = useLoadingStore();

  const { verifyPassword: verifyPasswordApi } = useVerifyPassword();

  const { saveToken } = useAuthStore();

  const verifyPassword = (password: string) => {
    showTransparentLoading();
    verifyPasswordApi(
      { password, phone_number: phone_number as string },
      {
        onSuccess: async ({ data: { token } }) => {
          router.push(parentPage as string);
          saveToken(token);
        },
        onError: (data) => {
          emptyNumbers();
          toggleIsFirstInputFocused((prev) => !prev);
          openSnackBarError(
            "كلمة المرور غير صحيحة للرقم المدخل, يرجى المحاولة مرة أخرى.",
            "center"
          );
        },
        onSettled: () => {
          hideLoading();
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
      <SegmentedPhoneInput
        numbers={numbers}
        setNumbers={setNumbers}
        onInputFinish={verifyPassword}
        ref={firstInputRef}
        isReset={isFirstInputFocused}
      />
    </SafeAreaView>
  );
};

export default VerifyPassword;
