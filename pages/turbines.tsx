import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import Meta from "../components/Meta";

type TurbineData = {
  id: string;
  capacityUsage: number;
};

type Props = {
  turbinesData: [TurbineData];
};

const Turbines: React.FC<Props> = ({ turbinesData }) => {
  let counter = 0;
  return (
    <>
      <Meta title="Turbine Status" />
      <Heading mb="5">Turbines</Heading>
      <Flex flexWrap={"wrap"} justifyContent="center">
        {turbinesData.map((turbine, key) => {
          counter++;
          return (
            <TurbineBox
              key={key}
              id={counter.toString()}
              capacityUsage={turbine.capacityUsage}
            />
          );
        })}
      </Flex>
      <Box w="100%" mt="2">
        <Text fontStyle="italic" textAlign="right" pr={2}>
          Updated at {new Date().toLocaleTimeString()}
        </Text>
      </Box>
    </>
  );
};

const TurbineBox: React.FC<TurbineData> = ({ id, capacityUsage }) => {
  const bgColor =
    capacityUsage > 0.8
      ? capacityUsage > 0.9
        ? "red.500"
        : "yellow.500"
      : "green.500";
  return (
    <Box p={4}>
      <Flex alignItems="center" flexDirection="column">
        <Text mb="2">Turbine {id}</Text>
        <Image
          src={"/images/turbine.svg"}
          alt={"Turbine icon"}
          maxWidth="60px"
          mb="2"
        />
        <Box bg={bgColor} p="1" borderRadius="lg">
          <Text fontWeight="medium" fontSize="lg">
            Capacity: {capacityUsage * 100 + "%"}
          </Text>
        </Box>
      </Flex>
    </Box>
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

  // eslint-disable-next-line no-undef
  const groupHeaders: HeadersInit = new Headers();
  groupHeaders.append("GroupId", process.env.GROUP_ID);
  groupHeaders.append("GroupKey", process.env.GROUP_API_KEY);

  const turbinesRes = await fetch(apiUrl + "Turbines", {
    method: "GET",
    headers: groupHeaders,
    redirect: "follow",
  });
  const turbinesData = await turbinesRes.json();

  if (!turbinesData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      turbinesData,
    },
  };
};

export default Turbines;
