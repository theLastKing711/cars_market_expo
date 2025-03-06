import { useDialog } from "@/hooks/ui/useDialog";
import React, { useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export type ConfirmationDialogProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;

  onConfirm: () => void;
};

const ConfirmationDialog = ({
  isOpen,
  onClose,
  message,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={onClose}>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onConfirm}>نعم</Button>
          <Button onPress={onClose}>لا</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;
