import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Link } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Meta from "./Meta";
import Nav from "./Nav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box h="100%">
      <Meta />
      <Nav />
      <Container my={5} maxWidth="4xl">
        {children}
      </Container>
    </Box>
  );
};
export default Layout;
