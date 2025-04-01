import CustomSnackBar from "@/components/ui/react-native-paper/CustomSnackBar";
import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useVerifyPassword } from "@/hooks/api/auth/mutations/useVerifyPassword";
import { useSnackBar } from "@/hooks/ui/useSnackBar";
import useAuthStore from "@/state/useAuthStore";
import { useRoute } from "@react-navigation/native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import { Keyboard } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const emtpyNumbers = [...new Array<string>(4).fill("")];

const VerifyPassword = () => {
  const theme = useTheme();

  const route = useRoute();

  const [numbers, setNumbers] = useState(emtpyNumbers);

  const { phone_number, parentPage } = useLocalSearchParams();

  const {
    isSnackBarOpen,
    closeSnackBar,
    openSnackBarSuccess,
    openSnackBarError,
    snackBarText,
    snackBarStatus,
  } = useSnackBar();

  const { verifyPassword: verifyPasswordApi } = useVerifyPassword();

  const { saveToken } = useAuthStore();

  const firstInputRef = useRef<any[]>(null);

  const [isFirstInputFocused, toggleIsFirstInputFocused] = useState(false);

  const verifyPassword = (password: string) => {
    verifyPasswordApi(
      { password, phone_number: phone_number as string },
      {
        onSuccess: async ({ data: { token } }) => {
          router.push(parentPage as string);
          saveToken(token);
        },
        onError: (data) => {
          setNumbers(emtpyNumbers);
          toggleIsFirstInputFocused((prev) => !prev);
          openSnackBarError(
            "كلمة المرور غير صحيحة للرقم المدخل, يرجى المحاولة مرة أخرى."
          );
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
        length={4}
        ref={firstInputRef}
        isReset={isFirstInputFocused}
      />
      <CustomSnackBar
        visible={isSnackBarOpen}
        onDismiss={closeSnackBar}
        text={snackBarText}
        status={snackBarStatus}
        position="center"
      />
    </SafeAreaView>
  );
};

export default VerifyPassword;
