import { Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { ITask } from "../../interfaces/tasks.interface";

interface DayProps {
  day: moment.Moment;
  isActive: boolean;
  isThisMonth: boolean;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<moment.Moment>>;
  tasks: ITask[];
}

export const Day: React.FC<DayProps> = ({
  day,
  isActive,
  isThisMonth,
  isSelected,
  setSelected,
  tasks,
}) => {
  return (
    <Flex
      onClick={isThisMonth ? () => setSelected(day) : () => {}}
      h={{ sm: "4rem", base: "3rem" }}
      w={{ sm: "75%", base: "100%" }}
      alignItems="center"
      justifyContent="space-around"
      bgColor={isThisMonth ? "blue.200" : "gray.300"}
      border={isSelected && isThisMonth ? "2px" : "none"}
      borderColor="green.500"
      borderRadius="12px"
      overflow="hidden"
      position="relative"
      direction="column"
      cursor={isThisMonth ? "pointer" : "auto"}
    >
      {!!tasks.length && (
        <Flex
          position="absolute"
          borderRadius="50%"
          top="4px"
          right="4px"
          bgColor="yellow.200"
          w="1rem"
          h="1rem"
          justifyContent="center"
          fontWeight="600"
          alignItems="center"
        >
          {tasks.length}
        </Flex>
      )}
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
