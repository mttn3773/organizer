import {
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent background="rgba(0, 0, 0, 0.5)">
        <ModalBody
          display="flex"
          textAlign="center"
          justifyItems="center"
          padding="5rem 5rem"
        >
          <CircularProgress
            isIndeterminate
            margin="auto"
            size="60px"
            color="green.300"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
