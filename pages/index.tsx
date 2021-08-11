import React from "react";
import {
  Heading,
  Box,
  Flex,
  VStack,
  Image,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";

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
  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <Heading
          fontSize="5xl"
          w="100%"
          textAlign="center"
          justifyContent="center"
          mb="4"
        >
          Innafjord A/S
        </Heading>
        <Box
          bg="green.500"
          borderRadius="lg"
          w="100%"
          p={4}
          color="white"
          mb="4"
        >
          <Text fontWeight="medium" textAlign="center">
            Everything ok!
          </Text>
        </Box>
        <Flex flexWrap="wrap">
          <VStack w="45%">
            <Text fontWeight="medium">PowerPrice</Text>
            <Box bg="gray.500" borderRadius="lg" w="100%" p={4} color="white">
              <Text fontWeight="medium" textAlign="center">
                {powerPriceData}
              </Text>
            </Box>
          </VStack>
          <Spacer />
          <VStack w="45%">
            <Text fontWeight="medium">Money</Text>
            <Box bg="gray.500" borderRadius="lg" w="100%" p={4} color="white">
              <Text fontWeight="medium" textAlign="center">
                {groupStateData.money}
              </Text>
            </Box>
          </VStack>
          <VStack w="45%" mt="2">
            <Text fontWeight="medium">Water level</Text>
            <Box bg="gray.500" borderRadius="lg" w="100%" p={4} color="white">
              <Text fontWeight="medium" textAlign="center">
                {groupStateData.waterLevel}
              </Text>
            </Box>
          </VStack>
          <Spacer />
          <VStack w="45%" mt="2">
            <Text fontWeight="medium">Environment cost</Text>
            <Box bg="gray.500" borderRadius="lg" w="100%" p={4} color="white">
              <Text fontWeight="medium" textAlign="center">
                {groupStateData.environmentCost}
              </Text>
            </Box>
          </VStack>
        </Flex>
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
