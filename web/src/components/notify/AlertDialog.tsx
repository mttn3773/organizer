import {
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialog,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { GlobalState } from "../../store/globalStore";

interface AlertDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => Promise<any>;
}

export const CustomAlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  setIsOpen,
  handleDelete,
}) => {
  const { state } = useContext(GlobalState);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Task
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={state.loading}
              colorScheme="red"
              onClick={() => handleDelete().then(() => onClose())}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
