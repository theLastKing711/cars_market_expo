import { SnackBarStatus } from "@/hooks/ui/useSnackBar";
import React from "react";
import { Portal, Snackbar, SnackbarProps } from "react-native-paper";

export type CustomSnackBarProps = {
  visible: SnackbarProps["visible"];
  onDismiss: SnackbarProps["onDismiss"];
  text: string;
  status?: SnackBarStatus;
};

const CustomSnackBar = ({ text, status, ...props }: CustomSnackBarProps) => {
  const icon = status === "success" ? "check" : "error";

  return (
    <Portal>
      <Snackbar
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
