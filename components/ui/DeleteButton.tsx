import { useDeleteCarOffer } from "@/hooks/api/car/mutations/useDeleteCarOffer";
import React from "react";
import { Button, useTheme } from "react-native-paper";
import ConfirmationDialog from "./react-native-paper/ConfirmationDialog";
import { useDialog } from "@/hooks/ui/useDialog";

export type DeleteButtonProps = {
  onSuccess?: () => void;
  id: number;
};

const DeleteButton = ({ id, onSuccess }: DeleteButtonProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  const { DeleteCarOffer } = useDeleteCarOffer(id, onSuccess);

  const theme = useTheme();

  return (
    <>
      <Button
        onPress={openDialog}
        style={{ flex: 1 }}
        buttonColor={theme.colors.error}
        textColor={theme.colors.onError}
      >
        حذف
      </Button>
      <ConfirmationDialog
        message="سيتم حذف السيارة من قائمة بحث المستخدمين, هل أنت متأكد أنك تريد حذف السيارة؟"
        isOpen={isOpen}
        onClose={closeDialog}
        onConfirm={DeleteCarOffer}
      />
    </>
  );
};

export default DeleteButton;
