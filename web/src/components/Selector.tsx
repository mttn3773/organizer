import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import React from "react";

interface SelectorProps {
  date: moment.Moment;
  setDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

export const Selector: React.FC<SelectorProps> = ({ date, setDate }) => {
  const changeMonth = (dir: number) => {
    setDate((prev) => prev.clone().add(dir, "month"));
  };
  return (
    <Flex
      margin="auto"
      w="30%"
      justifyContent="space-between"
      alignItems="center"
      gridGap="2rem"
    >
      <Button onClick={() => changeMonth(-1)}>
        <AiOutlineArrowLeft />
      </Button>
      <Text>{date.format("MMM YYYY")}</Text>
      <Button onClick={() => changeMonth(1)}>
        <AiOutlineArrowRight />
      </Button>
    </Flex>
  );
};
