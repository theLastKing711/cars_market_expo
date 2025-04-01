import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useCreatePassword } from "@/hooks/api/auth/mutations/useCreatePassword";
import { useRegister } from "@/hooks/api/auth/mutations/useRegister";
import useAuthStore from "@/state/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePassword = () => {
  const theme = useTheme();

  const [numbers, setNumbers] = useState([...new Array<string>(4).fill("")]);

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
        أنشأ كلمة مرور لحسابك
      </Text>
      <SegmentedPhoneInput
        onInputFinish={createPassword}
        length={4}
        numbers={numbers}
        setNumbers={setNumbers}
      />
    </SafeAreaView>
  );
};

export default CreatePassword;
