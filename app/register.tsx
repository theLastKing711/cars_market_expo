import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useRegister } from "@/hooks/api/auth/mutations/useRegister";
import useAuthStore from "@/state/useAuthStore";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const theme = useTheme();

  const { register } = useRegister();

  const { saveToken } = useAuthStore();

  const registerUser = (phone_number: string) => {
    register(
      { phone_number },
      {
        onSuccess: ({ data: { token } }) => {
          saveToken(token);
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
    >
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        رقم الموبايل
      </Text>
      <SegmentedPhoneInput onInputFinish={registerUser} />
    </SafeAreaView>
  );
};

export default Register;
