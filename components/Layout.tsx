import { Container } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Meta from "./Meta";
import Nav from "./Nav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Meta />
      <Nav />
      <Container my={5} maxWidth="4xl">
        {children}
      </Container>
    </>
  );
};
export default Layout;
