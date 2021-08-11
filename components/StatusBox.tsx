import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export type Status = "error" | "warning" | "success";

type StatusBoxProps = {
  status: Status;
};

export const StatusBox: React.FC<StatusBoxProps> = ({ status }) => {
  let bg = useColorModeValue("green.300", "green.500");
  let message = "Relax, everything is fine";
  if (status === "error") {
    bg = "red.500";
    message = "Uh no, something is wrong!";
  }
  if (status === "warning") {
    bg = "yellow.500";
    message = "One of the turbines need some looking after";
  }

  return (
    <Box bg={bg} borderRadius="lg" w="100%" p={8} mb="4">
      <Text fontWeight="medium" textAlign="center" fontSize="xl">
        {message}
      </Text>
    </Box>
  );
};

export default StatusBox;
