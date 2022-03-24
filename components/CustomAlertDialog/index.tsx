import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

type CustomAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function CustomAlertDialog({
  isOpen,
  onClose,
  title,
  body,
  onConfirm,
  confirmText,
  cancelText,
}: CustomAlertDialogProps) {
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
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <span>{body}</span>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
