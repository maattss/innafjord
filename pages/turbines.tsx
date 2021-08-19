import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React from "react";
import Meta from "../components/Meta";
import { getDummyTurbinesData } from "../helpers/getDummyAPIData";

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
            {Math.round(capacityUsage * 10000) / 100 + " %"}
            <br />
            {Math.round(capacityUsage * 1925) / 100} kWh/s
            <br />
            {Math.round(capacityUsage * 1750) / 100} m<sup>3</sup>/s
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      turbinesData: getDummyTurbinesData(),
    },
  };
};

export default Turbines;
