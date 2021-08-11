import React from "react";
import { Heading, Box, Flex, VStack, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

type Props = {
  data: string;
};

const Home: React.FC = ({ data }) => {
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
          <Text>PowerPrice: {data}</Text>
        </VStack>
      </Flex>
    </>
  );
};

export const getStaticProps: GetServerSideProps = async () => {
  if (
    !process.env.API_URL ||
    !process.env.GROUP_ID ||
    !process.env.GROUP_API_KEY
  )
    return {
      props: { data: "Missing API URL and key" },
    };

  const url = process.env.API_URL + "PowerPrice";
  const res = await fetch(url);
  const data = await res.json();

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
