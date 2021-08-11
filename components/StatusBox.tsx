import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export type Status = "error" | "warning" | "success";

type StatusBoxProps = {
  status: Status;
  message?: string;
};

export const StatusBox: React.FC<StatusBoxProps> = ({ status, message }) => {
  let bg = useColorModeValue("green.300", "green.500");
  let text = "Relax, everything is fine";
  if (status === "error") {
    bg = "red.500";

    text = "Uh no, something is wrong!";
  }
  if (status === "warning") {
    bg = "yellow.500";
    text = "One of the turbines need some looking after";
  }
  if (message && message !== "") text = message;

  return (
    <Box bg={bg} borderRadius="lg" w="100%" p={8} mb="4">
      <Text fontWeight="medium" textAlign="center" fontSize="xl">
        {text}
      </Text>
    </Box>
  );
};

export default StatusBox;
