import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import Meta from "../components/Meta";

export type TurbineData = {
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
  let bgGreen = useColorModeValue("green.300", "green.500");
  let bgRed = useColorModeValue("red.300", "red.500");
  const bgColor = capacityUsage === 0 ? bgRed : bgGreen;
  return (
    <Box p={2} borderRadius="lg">
      <Flex alignItems="center" flexDirection="column">
        <Text mb="2" fontWeight="medium">
          Turbine {id}
        </Text>
        <Image
          src={"/images/turbine.svg"}
          alt={"Turbine icon"}
          maxWidth="80px"
          mb={3}
        />
        <Box bg={bgColor} px={4} py={2} borderRadius="lg" width="140px">
          <Text fontWeight="medium" fontSize="lg" textAlign="center">
            {capacityUsage * 100 + "%"}
            <br />
            {capacityUsage * 19.25} kWh/s
            <br />
            {capacityUsage * 17.5} m<sup>3</sup>/s
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
  }).catch((error) => {
    console.error(error);
  });

  if (!turbinesRes) {
    return {
      notFound: true,
    };
  }

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
