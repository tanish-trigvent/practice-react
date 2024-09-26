import React, { useState, createContext, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AnimateButton from "ui-component/extended/AnimateButton";
import FormContainer from "./FormContainer";

// Context to provide the modal control functions
const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

// Provider component
export const ModalProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    content: "",
    onConfirm: () => {},
    confirmText: "Confirm",
    cancelText: "Cancel",
    onSubmit: () => {},
    defaultValue: {},
    isLoading: false,
    validation: {},
    maxWidth: "sm",
  });
  const [isOpen, setIsOpen] = useState(false);

  const showModal = ({
    title,
    content,
    onConfirm,
    confirmText,
    cancelText,
    onSubmit,
    defaultValue,
    isLoading,
    validation,
    maxWidth,
  }) => {
    setDialogConfig({
      title,
      content,
      onConfirm,
      onSubmit,
      confirmText: confirmText || "Confirm",
      cancelText: cancelText || "Cancel",
      defaultValue,
      isLoading,
      validation,
      maxWidth,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModalComponent = () => (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      maxWidth={dialogConfig.maxWidth}
      fullWidth
    >
      <DialogTitle>
        <Stack direction={"row"} justifyContent={"space-between"}>
          {dialogConfig.title}
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <FormContainer
        onSuccess={dialogConfig.onSubmit}
        defaultValues={dialogConfig.defaultValue}
        validation={dialogConfig.validation}
      >
        <DialogContent>{dialogConfig.content}</DialogContent>
        <Divider />
        <DialogActions>
          <AnimateButton>
            {" "}
            <Button onClick={closeModal} color="error" variant="contained">
              {dialogConfig.cancelText}
            </Button>
          </AnimateButton>
          <AnimateButton>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={dialogConfig.isLoading}
            >
              {dialogConfig.confirmText}
            </Button>
          </AnimateButton>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      <ModalComponent />
    </ModalContext.Provider>
  );
};
