import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useCreatePassword } from "@/hooks/api/auth/mutations/useCreatePassword";
import { useSegmentedPasswordInput } from "@/hooks/components/useSegmentedPhoneInput";
import useAuthStore from "@/state/useAuthStore";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Keyboard } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePassword = () => {
  const theme = useTheme();

  const {
    firstInputRef,
    isFirstInputFocused,
    numbers,
    setNumbers,
    emptyNumbers,
    toggleIsFirstInputFocused,
  } = useSegmentedPasswordInput();

  const { phone_number } = useLocalSearchParams();

  const { createPassword: createPasswordApi } = useCreatePassword();

  const { saveToken } = useAuthStore();

  const createPassword = (password: string) => {
    createPasswordApi(
      { password, phone_number: phone_number as string },
      {
        onSuccess: ({ data: { token } }) => {
          router.back();
          saveToken(token);
        },
        onError: (data) => {},
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
        أنشأ كلمة مرور لحسابك
      </Text>
      <SegmentedPhoneInput
        numbers={numbers}
        setNumbers={setNumbers}
        onInputFinish={createPassword}
        ref={firstInputRef}
        isReset={isFirstInputFocused}
      />
    </SafeAreaView>
  );
};

export default CreatePassword;
