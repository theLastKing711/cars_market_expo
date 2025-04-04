import useSnackBarStore from "@/state/useSnackBarStore";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Portal, Snackbar, SnackbarProps } from "react-native-paper";

export type CustomSnackBarProps = {
  // visible: SnackbarProps["visible"];
  // // onDismiss: SnackbarProps["onDismiss"];
  // text: string;
  // status?: SnackBarStatus;
  // position?: "top" | "center" | "bottom";
};

const CustomSnackBar = () => {
  const {
    params: { isSnackBarOpen, snackBarText, status, position },
    closeSnackBar,
  } = useSnackBarStore();

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
        visible={isSnackBarOpen}
        onDismiss={closeSnackBar}
        wrapperStyle={styles}
        // {...props}
        action={{
          label: "إخفاء",
        }}
        icon={icon}
      >
        {snackBarText}
      </Snackbar>
    </Portal>
  );
};

export default CustomSnackBar;
