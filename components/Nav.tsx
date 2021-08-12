import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Links: { name: string; path: string }[] = [
  { name: "Dashboard", path: "/" },
  { name: "Turbines", path: "/turbines" },
  { name: "Production", path: "/production" },
  { name: "Water level", path: "/waterLevel" },
  { name: "Power price", path: "/powerPrice" },
];

const Nav: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const linkColor = useColorModeValue("gray.200", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [language, setLanguage] = useState<"EN" | "NO">("EN");

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <Box
                key={link.path}
                p={2}
                fontWeight="semibold"
                _hover={{
                  bg: linkColor,
                  borderRadius: "md",
                }}
                onClick={isOpen ? onClose : onOpen}
              >
                <Link href={link.path}>{link.name}</Link>
              </Box>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <IconButton
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            size="md"
          />
          <Button
            ml={2}
            onClick={() => setLanguage(language === "NO" ? "EN" : "NO")}
          >
            {language === "NO" ? "NO" : "EN"}
          </Button>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <Link href={link.path} key={link.path} passHref={true}>
                <Box
                  p={2}
                  fontWeight="semibold"
                  _hover={{
                    bg: linkColor,
                    borderRadius: "md",
                  }}
                  onClick={isOpen ? onClose : onOpen}
                >
                  {link.name}
                </Box>
              </Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Nav;
