import React from "react";
import {
  Heading,
  Box,
  Flex,
  VStack,
  Text,
  Spacer,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import StatusBox, { Status } from "../components/StatusBox";
import Meta from "../components/Meta";

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
  const bgHover = useColorModeValue("gray.200", "gray.600");
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
      <Meta title="Dashboard" />
      <Heading
        fontSize="5xl"
        w="100%"
        textAlign="center"
        justifyContent="center"
        mb="5"
      >
        Dashboard
      </Heading>
      <Text fontWeight="medium" fontSize="xl" mb={2}>
        Status
      </Text>
      <StatusBox status={status} message={statusText} />
      <Flex flexWrap="wrap">
        <VStack w={["100%", null, 370]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Current water level
          </Text>
          <Link
            w="100%"
            borderRadius="lg"
            bg={bg}
            _hover={{
              background: bgHover,
            }}
            href="./waterLevel"
          >
            <Flex
              borderRadius="lg"
              w="100%"
              p={6}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="./images/water.svg"
                alt="Water Emoji"
                height="50px"
                mr={4}
                ml={4}
              />
              <Text
                fontWeight="medium"
                textAlign="left"
                fontSize="2xl"
                width="200px"
              >
                {Math.round(groupStateData.waterLevel * 100) / 100} m
              </Text>
            </Flex>
          </Link>
        </VStack>

        <Spacer />
        <VStack w={["100%", null, 370]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Current power price
          </Text>
          <Link
            w="100%"
            borderRadius="lg"
            bg={bg}
            _hover={{
              background: bgHover,
            }}
            href="./powerPrice"
          >
            <Flex
              borderRadius="lg"
              w="100%"
              p={6}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="./images/power.svg"
                alt="High Voltage Emoji"
                height="50px"
                mr={4}
                ml={4}
              />
              <Text
                fontWeight="medium"
                textAlign="left"
                fontSize="2xl"
                width="200px"
              >
                {Math.round(+powerPriceData)} NOK/MWh
              </Text>
            </Flex>
          </Link>
        </VStack>

        <VStack w={["100%", null, 370]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Earnings (this year)
          </Text>
          <Flex
            bg={bg}
            borderRadius="lg"
            w="100%"
            p={6}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="./images/earnings.svg"
              alt="Money Bag Emoji"
              height="50px"
              mr={4}
              ml={4}
            />
            <Text
              fontWeight="medium"
              textAlign="left"
              fontSize="2xl"
              width="200px"
            >
              {Math.round(groupStateData.money / 1_000_000)} MNOK
            </Text>
          </Flex>
        </VStack>
        <Spacer />
        <VStack w={["100%", null, 370]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Environment cost (this year)
          </Text>
          <Flex
            bg={bg}
            borderRadius="lg"
            w="100%"
            p={6}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="./images/environment.svg"
              alt="Recycle Emoji"
              height="50px"
              mr={4}
              ml={4}
            />
            <Text
              fontWeight="medium"
              textAlign="center"
              fontSize="2xl"
              width="200px"
            >
              {Math.round(groupStateData.environmentCost / 1_000_000)} MNOK
            </Text>
          </Flex>
        </VStack>
        <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
          Weather
        </Text>
        <Box bg={bg} borderRadius="lg" w="100%" p={8} mb="4">
          <Flex
            bg={bg}
            borderRadius="lg"
            w="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="./images/sunny.svg"
              alt="Recycle Emoji"
              height="50px"
              mr={4}
              ml={4}
            />
            <Text
              fontWeight="medium"
              textAlign="center"
              fontSize="2xl"
              width="400px"
            >
              Currently 18 °C and clear skyes.
            </Text>
          </Flex>
        </Box>
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
