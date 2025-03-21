import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useRegister } from "@/hooks/api/auth/mutations/useRegister";
import useAuthStore from "@/state/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Keyboard, TextInput } from "react-native";
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
        رقم الموبايل
      </Text>
      <SegmentedPhoneInput onInputFinish={registerUser} />
    </SafeAreaView>
  );
};

export default Register;
