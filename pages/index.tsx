import React from "react";
import {
  Heading,
  Box,
  Flex,
  VStack,
  Text,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import StatusBox, { Status } from "../components/StatusBox";

type Props = {
  powerPriceData: string;
  groupStateData: GroupStateData;
};

type GroupStateData = {
  groupName: string;
  money: number;
  waterLevel: number;
  environmentCost: number;
};

const Home: React.FC<Props> = ({ powerPriceData, groupStateData }) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  let status: Status = "success";
  let statusText = "";
  if (groupStateData.waterLevel < 30 || groupStateData.waterLevel > 35) {
    status = "warning";
    statusText = "Please check the water level.";
  }
  if (groupStateData.waterLevel < 25 || groupStateData.waterLevel > 40) {
    status = "error";
    statusText = "Please check the water level immediately!";
  }

  return (
    <>
      <Heading
        fontSize="5xl"
        w="100%"
        textAlign="center"
        justifyContent="center"
        mb="5"
      >
        Status
      </Heading>
      <StatusBox status={status} message={statusText} />
      <Heading
        fontSize="5xl"
        w="100%"
        textAlign="center"
        justifyContent="center"
        mb="5"
        mt="5"
      >
        Realtime data
      </Heading>
      <Flex flexWrap="wrap">
        <VStack w={["100%", null, 360]} mb="4">
          <Text fontWeight="medium" fontSize="xl">
            Power price
          </Text>
          <Box bg={bg} borderRadius="lg" w="100%" p={6}>
            <Text fontWeight="medium" textAlign="center" fontSize="lg">
              {powerPriceData} NOK/MWh
            </Text>
          </Box>
        </VStack>
        <Spacer />
        <VStack w={["100%", null, 360]} mb="4">
          <Text fontWeight="medium" fontSize="xl">
            Earnings
          </Text>
          <Box bg={bg} borderRadius="lg" w="100%" p={6}>
            <Text fontWeight="medium" textAlign="center" fontSize="lg">
              {groupStateData.money} NOK
            </Text>
          </Box>
        </VStack>
        <VStack w={["100%", null, 360]} mb="4">
          <Text fontWeight="medium" fontSize="xl">
            Water level
          </Text>
          <Box bg={bg} borderRadius="lg" w="100%" p={6}>
            <Text fontWeight="medium" textAlign="center" fontSize="lg">
              {groupStateData.waterLevel} m
            </Text>
          </Box>
        </VStack>
        <Spacer />
        <VStack w={["100%", null, 360]} mb="4">
          <Text fontWeight="medium" fontSize="xl">
            Environment cost
          </Text>
          <Box bg={bg} borderRadius="lg" w="100%" p={6}>
            <Text fontWeight="medium" textAlign="center" fontSize="lg">
              {groupStateData.environmentCost} NOK
            </Text>
          </Box>
        </VStack>
        <Box w="100%" mt="2">
          <Text fontStyle="italic" textAlign="right" pr={2}>
            Updated at {new Date().toLocaleTimeString()}
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  if (
    !process.env.API_URL ||
    !process.env.GROUP_ID ||
    !process.env.GROUP_API_KEY
  )
    return {
      props: { data: "Missing API URL and key" },
    };

  const apiUrl = process.env.API_URL;
  const powerPriceRes = await fetch(apiUrl + "PowerPrice");
  const powerPriceData = await powerPriceRes.json();

  // eslint-disable-next-line no-undef
  const groupHeaders: HeadersInit = new Headers();
  groupHeaders.append("GroupId", process.env.GROUP_ID);
  groupHeaders.append("GroupKey", process.env.GROUP_API_KEY);

  const groupStateRes = await fetch(apiUrl + "GroupState", {
    method: "GET",
    headers: groupHeaders,
    redirect: "follow",
  });
  const groupStateData = await groupStateRes.json();

  if (!powerPriceData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      powerPriceData,
      groupStateData,
    },
  };
};
export default Home;
