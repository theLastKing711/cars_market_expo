import React from "react";
import { Button, useTheme } from "react-native-paper";
import ConfirmationDialog from "./react-native-paper/ConfirmationDialog";
import { useDialog } from "@/hooks/ui/useDialog";
import { useSellCarOffer } from "@/hooks/api/car/mutations/useSellCarOffer";
export type SoldButtonProps = {
  onSuccess?: () => void;
  id: number;
  onPress?: () => void;
};

const SoldButton = ({ id, onSuccess, onPress }: SoldButtonProps) => {
  const { sellCarOffer } = useSellCarOffer(id, () => {
    closeDialog();
    onSuccess?.();
  });

  const { isOpen, closeDialog, openDialog } = useDialog();

  const theme = useTheme();

  return (
    <>
      <Button
        onPress={openDialog}
        style={{ flex: 1 }}
        buttonColor={theme.colors.primary}
        textColor={theme.colors.onPrimary}
      >
        تم البيع
      </Button>
      <ConfirmationDialog
        message="سيتم حذف السيارة من قائمة بحث المستخدمين, هل أنت متأكد أنك تريد بيع السيارة؟"
        isOpen={isOpen}
        onClose={closeDialog}
        onConfirm={() => {
          onPress?.();
          sellCarOffer();
        }}
      />
    </>
  );
};

export default SoldButton;
