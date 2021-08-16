import { CloseIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const GenerateReport: React.FC<Props> = ({ isOpen, onClose }) => {
  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="medium">
            <Flex justifyContent="space-between" alignItems="center">
              <Text>Report is generated successfully!</Text>
              <Button onClick={onClose}>
                <CloseIcon />
              </Button>
            </Flex>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Text fontSize="lg" mr={4} fontWeight="medium">
              Download as{" "}
            </Text>
            <Button ref={cancelRef} onClick={onClose} mr={2}>
              . CSV
            </Button>
            <Button ref={cancelRef} onClick={onClose} mr={2}>
              . PDF
            </Button>
            <Button ref={cancelRef} onClick={onClose}>
              . JSON
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default GenerateReport;
