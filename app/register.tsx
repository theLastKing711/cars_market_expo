import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useRegister } from "@/hooks/api/auth/mutations/useRegister";
import useAuthStore from "@/state/useAuthStore";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Keyboard } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const theme = useTheme();

  const [numbers, setNumbers] = useState([...new Array<string>(9).fill("")]);

  const { register } = useRegister();

  const { saveToken } = useAuthStore();

  const route = useRoute();
  const registerUser = (phone_number: string) => {
    register(
      { phone_number },
      {
        onSuccess: async () => {
          router.push({
            pathname: "/create-password/[phone_number]",
            params: {
              phone_number,
            },
          });
        },
        onError: (data) => {
          router.push({
            pathname: "/verify-password/[phone_number]",
            params: {
              phone_number,
              parentPage: `/${route.name}`,
              // go back doesn't back in verify-password.tsx,
              // because we push to it on onError on register.tsx
            },
          });
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
        رقم الموبايل
      </Text>
      <SegmentedPhoneInput
        onInputFinish={registerUser}
        numbers={numbers}
        setNumbers={setNumbers}
      />
    </SafeAreaView>
  );
};

export default Register;
