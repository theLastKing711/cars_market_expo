import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useChangePassword } from "@/hooks/api/auth/mutations/useChangePassword";
import {
  useSegmentedPasswordInput,
  useSegmentedPhoneInput,
} from "@/hooks/components/useSegmentedPhoneInput";
import useLoadingStore from "@/state/useLoadingStore";
import useSnackBarStore from "@/state/useSnackBarStore";
import { router } from "expo-router";
import React from "react";
import { Keyboard } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {
  const theme = useTheme();

  const { changePassword: changePasswordApi } = useChangePassword();

  const {
    firstInputRef,
    isFirstInputFocused,
    numbers,
    setNumbers,
    emptyNumbers,
    toggleIsFirstInputFocused,
  } = useSegmentedPasswordInput();

  const { openSnackBarError, openSnackBarSuccess } = useSnackBarStore();

  const { showTransparentLoading, hideLoading } = useLoadingStore();

  const changePassword = (password: string) => {
    showTransparentLoading();
    changePasswordApi(
      { password },
      {
        onSuccess: async ({ data: { token } }) => {
          //   router.push(parentPage as string);
          //   saveToken(token);

          openSnackBarSuccess("تم تغيير كلمة المرور بنجاج");
          router.push({
            pathname: "/my-profile",
          });
        },
        onError: (data) => {
          emptyNumbers();
          toggleIsFirstInputFocused((prev) => !prev);
          openSnackBarError(
            "كلمة المرور غير صحيحة للرقم المدخل, يرجى المحاولة مرة أخرى."
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
        كلمة المرور الجديدة
      </Text>
      <SegmentedPhoneInput
        numbers={numbers}
        setNumbers={setNumbers}
        onInputFinish={changePassword}
        ref={firstInputRef}
        isReset={isFirstInputFocused}
      />
    </SafeAreaView>
  );
};

export default ChangePassword;
