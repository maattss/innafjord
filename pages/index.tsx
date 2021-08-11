import React from "react";
import { Heading, Box, Flex, VStack, Image, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";

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
          Hello there, welcome to my website
          <Image
            src="/emojis/waving_hand.svg"
            alt=""
            width="1.2em"
            display="inline"
            ml="6"
            mb="2"
          />
        </Heading>

        <VStack>
          <Box p={5}>
            <Image src={"/images/memoji.png"} alt={"Memoji"} />
          </Box>
          <Box p={5}>
            <Text>API result {data}</Text>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  if (!process.env.API_URL || !process.env.TEST_FUNCTION_STRING_URL)
    return {
      props: { data: "Result undefined" },
    };

  const url = process.env.API_URL + process.env.TEST_FUNCTION_STRING_URL;
  const res = await fetch(url);
  const data = await res.text();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

export default Home;
