import { Box, Button, Flex, Text, Circle } from "@chakra-ui/react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import React from "react";

interface SelectorProps {
  date: moment.Moment;
  setDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  numberOfTasks: number;
}

export const Selector: React.FC<SelectorProps> = ({
  date,
  setDate,
  numberOfTasks,
}) => {
  const changeMonth = (dir: number) => {
    setDate((prev) => prev.clone().add(dir, "month"));
  };
  return (
    <Flex
      gridArea="selector"
      margin="auto"
      w="40%"
      justifyContent="space-around"
      alignItems="center"
    >
      <Button onClick={() => changeMonth(-1)}>
        <AiOutlineArrowLeft />
      </Button>
      <Flex
        borderRadius="50%"
        bgColor="red.300"
        w="2rem"
        h="2rem"
        fontWeight="600"
        justifyContent="center"
        alignItems="center"
      >
        {numberOfTasks}
      </Flex>
      <Text>{date.format("MMM YYYY")}</Text>
      <Button onClick={() => changeMonth(1)}>
        <AiOutlineArrowRight />
      </Button>
    </Flex>
  );
};
