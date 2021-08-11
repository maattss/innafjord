import React from "react";
import { Box, Text } from "@chakra-ui/react";

export type Status = "error" | "warning" | "success";

type StatusBoxProps = {
  status: Status;
};

export const StatusBox: React.FC<StatusBoxProps> = ({ status }) => {
  let bg = "green.500";
  if (status === "error") bg = "red.500";
  if (status === "warning") bg = "yellow.500";

  return (
    <Box bg={bg} borderRadius="lg" w="100%" p={8} color="white" mb="4">
      <Text fontWeight="medium" textAlign="center" fontSize="xl">
        Everything ok
      </Text>
    </Box>
  );
};

export default StatusBox;
