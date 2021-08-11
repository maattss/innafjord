import React from "react";
import { Heading, Box, Flex, VStack, Image } from "@chakra-ui/react";

type Props = {
  data: string;
};

const Home: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <Heading
          fontSize="5xl"
          w="100%"
          textAlign="center"
          justifyContent="center"
        >
          Innafjord 2.0
        </Heading>

        <VStack>
          <Box p={5}>
            <Image src={"/images/placeholder.svg"} alt={"Placeholder image"} />
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default Home;
