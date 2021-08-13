import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export type Status = "error" | "warning" | "success";

type StatusBoxProps = {
  status: Status;
  message?: string;
};

export const StatusBox: React.FC<StatusBoxProps> = ({ status, message }) => {
  let bg = useColorModeValue("green.300", "green.500");
  let bgRed = useColorModeValue("red.300", "red.500");
  let bgYellow = useColorModeValue("yellow.300", "yellow.500");

  let text = "";
  if (status === "error") bg = bgRed;
  if (status === "warning") bg = bgYellow;
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
