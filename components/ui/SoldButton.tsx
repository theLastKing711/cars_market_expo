import React, { useState } from "react";
import { Button, useTheme } from "react-native-paper";
import ConfirmationDialog from "./react-native-paper/ConfirmationDialog";
import { useDialog } from "@/hooks/ui/useDialog";
import { useSellCarOffer } from "@/hooks/api/car/mutations/useSellCarOffer";
import CustomFormButton from "./react-native-paper/CustomFormButton";
export type SoldButtonProps = {
  onSuccess?: () => void;
  id: number;
  onPress?: () => void;
};

const SoldButton = ({ id, onSuccess, onPress }: SoldButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { sellCarOffer } = useSellCarOffer(id, () => {
    closeDialog();
    setIsLoading(false);
    onSuccess?.();
  });

  const { isDialogOpen, closeDialog, openDialog } = useDialog();

  const theme = useTheme();

  return (
    <>
      <CustomFormButton
        onPress={() => openDialog()}
        style={{ flex: 1 }}
        buttonColor={theme.colors.secondary}
        textColor={theme.colors.onSecondary}
      >
        تم البيع
      </CustomFormButton>
      <ConfirmationDialog
        message="سيتم حذف السيارة من قائمة بحث المستخدمين, هل أنت متأكد أنك تريد بيع السيارة؟"
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={() => {
          setIsLoading(true);
          onPress?.();
          sellCarOffer();
        }}
      />
    </>
  );
};

export default SoldButton;
