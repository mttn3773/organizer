import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface DayProps {
  day: moment.Moment;
  isActive: boolean;
  isThisMonth: boolean;
}

export const Day: React.FC<DayProps> = ({ day, isActive, isThisMonth }) => {
  return (
    <Flex
      h="4rem"
      w="75%"
      alignItems="center"
      justifyContent="space-around"
      bgColor={isThisMonth ? "blue.200" : "gray.300"}
      border={isActive ? "2px" : "none"}
      borderColor="green.500"
      borderRadius="12px"
      overflow="hidden"
      direction="column"
    >
      <Text color="blackAlpha.800" as="b" w="100%" h="50%" textAlign="center">
        {day.format("DD")}
      </Text>
    </Flex>
  );
};
