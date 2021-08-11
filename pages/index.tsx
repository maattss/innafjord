import React from "react";
import { Heading, Box, Flex, VStack, Text, Spacer } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import StatusBox from "../components/StatusBox";

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
      <Heading
        fontSize="5xl"
        w="100%"
        textAlign="center"
        justifyContent="center"
        mb="5"
      >
        Current status
      </Heading>
      <StatusBox status="success" />
      <Flex flexWrap="wrap">
        <VStack w={["100%", null, 400]}>
          <Text fontWeight="medium" fontSize="xl">
            PowerPrice
          </Text>
          <Box bg="gray.500" borderRadius="lg" w="100%" p={4} color="white">
            <Text fontWeight="medium" textAlign="center">
              {powerPriceData}
            </Text>
          </Box>
        </VStack>
        <Spacer />
        <VStack w="400px">
          <Text fontWeight="medium" fontSize="xl">
            Money
          </Text>
          <Box bg="gray.500" borderRadius="lg" w="100%" p={4} color="white">
            <Text fontWeight="medium" textAlign="center">
              {groupStateData.money}
            </Text>
          </Box>
        </VStack>
        <VStack w="400px" mt="2">
          <Text fontWeight="medium" fontSize="xl">
            Water level
          </Text>
          <Box bg="gray.500" borderRadius="lg" w="100%" p={4} color="white">
            <Text fontWeight="medium" textAlign="center">
              {groupStateData.waterLevel}
            </Text>
          </Box>
        </VStack>
        <Spacer />
        <VStack w="400px" mt="2">
          <Text fontWeight="medium" fontSize="xl">
            Environment cost
          </Text>
          <Box bg="gray.500" borderRadius="lg" w="100%" p={4} color="white">
            <Text fontWeight="medium" textAlign="center">
              {groupStateData.environmentCost}
            </Text>
          </Box>
        </VStack>
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
