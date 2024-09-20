import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "Confirm",
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
    confirmText: "Yes",
    cancelText: "No",
  });

  const showConfirmationModal = useCallback(
    ({ title, message, onConfirm, onCancel, confirmText, cancelText }) => {
      setDialogConfig({
        title: title || "Confirm",
        message: message || "Are you sure?",
        onConfirm: onConfirm || (() => {}),
        onCancel: onCancel || (() => {}),
        confirmText: confirmText || "Yes",
        cancelText: cancelText || "No",
      });
      setIsOpen(true);
    },
    []
  );

  const closeConfirmationModal = () => {
    setIsOpen(false);
  };

  const ConfirmationModal = () => (
    <Dialog open={isOpen} onClose={closeConfirmationModal}>
      <DialogTitle>{dialogConfig.title}</DialogTitle>
      <DialogContent>{dialogConfig.message}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dialogConfig.onCancel();
            closeConfirmationModal();
          }}
          color="secondary"
        >
          {dialogConfig.cancelText}
        </Button>
        <Button
          onClick={() => {
            dialogConfig.onConfirm();
            closeConfirmationModal();
          }}
          color="primary"
        >
          {dialogConfig.confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { showConfirmationModal, closeConfirmationModal, ConfirmationModal };
};

export default useConfirmationModal;
