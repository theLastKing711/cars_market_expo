import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useChangePhoneNumber } from "@/hooks/api/auth/mutations/useChangePhoneNumber";
import { useSegmentedPhoneInput } from "@/hooks/components/useSegmentedPhoneInput";
import useLoadingStore from "@/state/useLoadingStore";
import useSnackBarStore from "@/state/useSnackBarStore";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";
import { router } from "expo-router";
import React from "react";
import { Keyboard } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePhoneNumber = () => {
  const theme = useTheme();

  const { changePhoneNumber: changePhoneNumberApi } = useChangePhoneNumber();

  const queryClient = useQueryClient();

  const {
    firstInputRef,
    isFirstInputFocused,
    numbers,
    setNumbers,
    emptyNumbers,
    toggleIsFirstInputFocused,
  } = useSegmentedPhoneInput();

  const { openSnackBarError, openSnackBarSuccess } = useSnackBarStore();

  const { showTransparentLoading, hideLoading } = useLoadingStore();

  const changePhoneNumber = (phone_number: string) => {
    showTransparentLoading();
    changePhoneNumberApi(
      { phone_number },
      {
        onSuccess: async ({ data: { token } }) => {
          //   router.push(parentPage as string);
          //   saveToken(token);
          queryClient.invalidateQueries({ queryKey: ["getUserPhoneNumber"] });
          openSnackBarSuccess("تم تغيير رقم الهاتف بنجاج.");
          router.push({
            pathname: "/my-profile",
          });
        },
        onError: (err) => {
          const error = err as AxiosError;

          emptyNumbers();
          toggleIsFirstInputFocused((prev) => !prev);

          if (error.status === HttpStatusCode.Conflict) {
            openSnackBarError(
              "رقم الهاتف مستخدم, يرجى إدخال رقم آخر.",
              "center"
            );
          }
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
        رقم الهاتف الجديد
      </Text>
      <SegmentedPhoneInput
        numbers={numbers}
        setNumbers={setNumbers}
        onInputFinish={changePhoneNumber}
        ref={firstInputRef}
        isReset={isFirstInputFocused}
      />
    </SafeAreaView>
  );
};

export default ChangePhoneNumber;
