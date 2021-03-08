import { Box } from "@chakra-ui/react";
import React from "react";
import { UserForm } from "../components/form/UserForm";
import { config } from "../config/config";
interface registerProps {}

export const RegisterPage: React.FC<registerProps> = ({}) => {
  return (
    <Box margin="0 auto" w="60%">
      <UserForm url={config.server.endpoints.register} />
    </Box>
  );
};
