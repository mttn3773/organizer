import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { UserForm } from "../components/form/UserForm";
import { config } from "../config/config";
interface LoginProps {}

export const LoginPage: React.FC<LoginProps> = () => {
  return (
    <Box margin="0 auto" w="60%">
      <Heading mb="3rem" fontWeight="600" fontSize="2xl" textAlign="center">
        SIGN IN
      </Heading>
      <UserForm url={config.server.endpoints.login} />
    </Box>
  );
};
