import React from "react";
import { Box, Text } from "@chakra-ui/react";

export type Status = "error" | "warning" | "success";

type StatusBoxProps = {
  status: Status;
};

export const StatusBox: React.FC<StatusBoxProps> = ({ status }) => {
  console.log(status);
  if (status === "error")
    return (
      <Box bg="red.500" borderRadius="lg" w="100%" p={4} color="white" mb="4">
        <Text fontWeight="medium" textAlign="center">
          Warning
        </Text>
      </Box>
    );
  if (status === "warning")
    return (
      <Box
        bg="yellow.500"
        borderRadius="lg"
        w="100%"
        p={4}
        color="white"
        mb="4"
      >
        <Text fontWeight="medium" textAlign="center">
          Warning
        </Text>
      </Box>
    );
  return (
    <Box bg="green.500" borderRadius="lg" w="100%" p={4} color="white" mb="4">
      <Text fontWeight="medium" textAlign="center">
        Everything ok!
      </Text>
    </Box>
  );
};

export default StatusBox;
