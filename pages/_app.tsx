import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const config: ThemeConfig = {
    initialColorMode: "dark",
  };
  const theme = extendTheme({ config });

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};
export default MyApp;
