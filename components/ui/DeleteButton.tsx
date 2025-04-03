import { useDeleteCarOffer } from "@/hooks/api/car/mutations/useDeleteCarOffer";
import React from "react";
import { Button, useTheme } from "react-native-paper";
import ConfirmationDialog from "./react-native-paper/ConfirmationDialog";
import { useDialog } from "@/hooks/ui/useDialog";
import useSnackBarStore from "@/state/useSnackBarStore";
import useLoadingStore from "@/state/useLoadingStore";

export type DeleteButtonProps = {
  onSuccess?: () => void;
  onPress?: () => void;
  id: number;
};

const DeleteButton = ({ id, onSuccess, onPress }: DeleteButtonProps) => {
  const { isDialogOpen, closeDialog, openDialog } = useDialog();

  const { showLoading, hideLoading } = useLoadingStore();

  const { openSnackBarSuccess, openSnackBarError } = useSnackBarStore();

  const { DeleteCarOffer, isLoading, setIsLoading } = useDeleteCarOffer(
    id,
    () => {
      openSnackBarSuccess("تم حذف السيارة بنجاح");
      closeDialog();
      onSuccess?.();
    },
    () => {
      openSnackBarError("فشل عملية الحذف, يرجى التأكد  من وجود اتصال بالشبكة");
      hideLoading();
    }
  );

  const theme = useTheme();

  return (
    <>
      <Button
        onPress={() => openDialog()}
        style={{ flex: 1 }}
        buttonColor={theme.colors.error}
        textColor={theme.colors.onError}
      >
        حذف
      </Button>
      <ConfirmationDialog
        message="سيتم حذف السيارة من قائمة بحث المستخدمين, هل أنت متأكد أنك تريد حذف السيارة؟"
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={() => {
          showLoading();
          onPress?.();
          DeleteCarOffer();
        }}
      />
    </>
  );
};

export default DeleteButton;
