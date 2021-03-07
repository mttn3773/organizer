import { Button, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";

interface DayProps {
  day: moment.Moment;
  isActive: boolean;
  isThisMonth: boolean;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

export const Day: React.FC<DayProps> = ({
  day,
  isActive,
  isThisMonth,
  isSelected,
  setSelected,
}) => {
  return (
    <Flex
      onClick={isThisMonth ? () => setSelected(day) : () => {}}
      h="4rem"
      w="75%"
      alignItems="center"
      justifyContent="space-around"
      bgColor={isThisMonth ? "blue.200" : "gray.300"}
      border={isSelected ? "2px" : "none"}
      borderColor="green.500"
      borderRadius="12px"
      overflow="hidden"
      direction="column"
      cursor={isThisMonth ? "pointer" : "auto"}
    >
      <Text
        color="blackAlpha.800"
        fontWeight={isActive ? 800 : 500}
        w="100%"
        h="50%"
        textAlign="center"
      >
        {day.format("DD")}
      </Text>
    </Flex>
  );
};
