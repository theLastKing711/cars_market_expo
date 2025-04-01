import { SnackBarStatus } from "@/hooks/ui/useSnackBar";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Portal, Snackbar, SnackbarProps } from "react-native-paper";

export type CustomSnackBarProps = {
  visible: SnackbarProps["visible"];
  onDismiss: SnackbarProps["onDismiss"];
  text: string;
  status?: SnackBarStatus;
  position?: "top" | "center" | "bottom";
};

const CustomSnackBar = ({
  text,
  status,
  position = "top",
  ...props
}: CustomSnackBarProps) => {
  const icon = status === "success" ? "check" : "error";

  const styles: StyleProp<ViewStyle> =
    position === "center"
      ? {
          top: "50%",
        }
      : {};

  return (
    <Portal>
      <Snackbar
        wrapperStyle={styles}
        {...props}
        action={{
          label: "إخفاء",
        }}
        icon={icon}
      >
        {text}
      </Snackbar>
    </Portal>
  );
};

export default CustomSnackBar;
