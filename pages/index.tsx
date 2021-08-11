import React from "react";
import { Heading, Box, Flex, VStack, Image, Text } from "@chakra-ui/react";
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
        >
          Innafjord A/S
        </Heading>

        <VStack>
          <Box p={5}>
            <Image src={"/images/placeholder.svg"} alt={"Placeholder image"} />
          </Box>
          <Text>PowerPrice: {powerPriceData}</Text>
          <Text>Money: {groupStateData.money}</Text>
          <Text>Water level: {groupStateData.waterLevel}</Text>
          <Text>Environment cost: {groupStateData.environmentCost}</Text>
          <Text>Group name: {groupStateData.groupName}</Text>
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
