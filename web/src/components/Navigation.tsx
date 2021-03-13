import { Flex, Text, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import { config } from "../config/config";
import { useHttp } from "../hooks/useHttp";
import { GlobalState } from "../store/globalStore";

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const { state } = useContext(GlobalState);
  const { request } = useHttp();
  const handleLogout = () => {
    request({ url: config.server.endpoints.logout, method: "POST" }).then(
      () => {
        window.location.reload();
      }
    );
  };
  let links = null;
  if (state.auth) {
    links = (
      <Flex justifyContent="center" alignItems="center">
        <Link onClick={handleLogout} fontSize="xl" color="whiteAlpha.800">
          LOG OUT
        </Link>
      </Flex>
    );
  } else {
    links = (
      <Flex justifyContent="space-between" alignItems="center" gridGap="3rem">
        <Link href="/login" fontSize="xl" color="whiteAlpha.800">
          SIGN IN
        </Link>
        <Link href="/register" fontSize="xl" color="whiteAlpha.800">
          REGISTER
        </Link>
      </Flex>
    );
  }
  return (
    <Flex
      w="100%"
      h="60px"
      bgColor="blackAlpha.800"
      mb="1rem"
      position="sticky"
      justifyContent="space-between"
      px="5rem"
    >
      <Flex justifyContent="center" alignItems="center">
        <Text
          letterSpacing="wider"
          fontWeight="600"
          fontSize="2xl"
          color="whiteAlpha.800"
        >
          ORG
        </Text>
      </Flex>
      {links}
    </Flex>
  );
};
