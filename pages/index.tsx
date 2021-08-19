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
  Button,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import StatusBox, { Status } from "../components/StatusBox";
import Meta from "../components/Meta";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { TurbineData } from "./turbines";
import {
  getDummyGroupStateData,
  getDummyPowerPrice,
  getDummyTurbinesData,
} from "../helpers/getDummyAPIData";
import Weather from "../components/Weather.tsx";

type Props = {
  powerPriceData: string;
  groupStateData: GroupStateData;
  turbinesData: [TurbineData];
};

export type GroupStateData = {
  groupName: string;
  money: number;
  waterLevel: number;
  environmentCost: number;
};

const Home: React.FC<Props> = ({
  powerPriceData,
  groupStateData,
  turbinesData,
}) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const bgHover = useColorModeValue("gray.200", "gray.600");

  let status: Status = "success";
  let statusText = "Water level normal.";

  if (groupStateData.waterLevel <= 25) {
    status = "error";
    statusText = "Warning! Water level too low.";
  }
  if (groupStateData.waterLevel > 25 && groupStateData.waterLevel <= 30) {
    status = "warning";
    statusText = "Water level low.";
  }
  if (groupStateData.waterLevel > 30 && groupStateData.waterLevel <= 35) {
    status = "warning";
    statusText = "Water level high.";
  }
  if (groupStateData.waterLevel > 40) {
    status = "error";
    statusText = "Warning! Water level too high.";
  }

  // Count number of active turbines and calculate current production
  let turbineCount = 0;
  let totalProduction = 0;
  turbinesData.forEach((t) => {
    if (t.capacityUsage > 0) {
      turbineCount++;
      totalProduction += t.capacityUsage * 19.25;
    }
  });

  return (
    <>
      <Meta title="Dashboard" />
      <Heading
        fontSize="5xl"
        w="100%"
        textAlign="center"
        justifyContent="center"
      >
        Dashboard
      </Heading>
      <Text fontWeight="medium" fontSize="xl" mb={2}>
        Status
      </Text>
      <StatusBox status={status} message={statusText} />
      <Flex flexWrap="wrap">
        <VStack w={["100%", null, "48%"]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Water level
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
                mr={6}
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
        <VStack w={["100%", null, "48%"]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Power price
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
                mr={6}
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

        <VStack w={["100%", null, "48%"]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Turbine status
          </Text>
          <Link
            w="100%"
            borderRadius="lg"
            bg={bg}
            _hover={{
              background: bgHover,
            }}
            href="./turbines"
          >
            <Flex
              borderRadius="lg"
              w="100%"
              p={6}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="./images/turbine.svg"
                alt="Trubine Icon"
                height="50px"
                mr={6}
              />
              <Text
                fontWeight="medium"
                textAlign="left"
                fontSize="2xl"
                width="200px"
              >
                {turbineCount}/14 running
              </Text>
            </Flex>
          </Link>
        </VStack>
        <Spacer />
        <VStack w={["100%", null, "48%"]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Production
          </Text>
          <Link
            w="100%"
            borderRadius="lg"
            bg={bg}
            _hover={{
              background: bgHover,
            }}
            href="./production"
          >
            <Flex
              borderRadius="lg"
              w="100%"
              p={6}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="./images/production.svg"
                alt="Factory Emoji"
                height="50px"
                mr={6}
              />
              <Text
                fontWeight="medium"
                textAlign="left"
                fontSize="2xl"
                width="200px"
              >
                {Math.round(+totalProduction)} kWh/s
              </Text>
            </Flex>
          </Link>
        </VStack>

        <VStack w={["100%", null, "48%"]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Earnings (this year)
          </Text>
          <Link
            w="100%"
            borderRadius="lg"
            bg={bg}
            _hover={{
              background: bgHover,
            }}
            href="./earnings"
          >
            <Flex
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
                mr={6}
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
          </Link>
        </VStack>

        <Spacer />
        <VStack w={["100%", null, "48%"]} mb="4">
          <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
            Environmental cost (this year)
          </Text>
          <Link
            w="100%"
            borderRadius="lg"
            bg={bg}
            _hover={{
              background: bgHover,
            }}
            href="./environmentalCost"
          >
            <Flex
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
                mr={6}
              />
              <Text
                fontWeight="medium"
                textAlign="left"
                fontSize="2xl"
                width="200px"
              >
                {Math.round(groupStateData.environmentCost / 1_000_000)} MNOK
              </Text>
            </Flex>
          </Link>
        </VStack>
        <Text fontWeight="medium" fontSize="xl" textAlign="left" w="100%">
          Weather
        </Text>
        <Box bg={bg} borderRadius="lg" w="100%" p={6} mt="2" mb="2">
          <Flex
            bg={bg}
            borderRadius="lg"
            w="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Weather />
          </Flex>
        </Box>
        <Flex
          w="100%"
          mt="2"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href="https://github.com/maattss/innafjord/issues"
            style={{ textDecoration: "none" }}
            isExternal
          >
            <Button leftIcon={<ExternalLinkIcon />} variant={"outline"}>
              Report issue
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      powerPriceData: getDummyPowerPrice(),
      groupStateData: getDummyGroupStateData(),
      turbinesData: getDummyTurbinesData(),
    },
  };
};
export default Home;
