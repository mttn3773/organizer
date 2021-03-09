import { Box, Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { ITask } from "../../interfaces/tasks.interface";
import { CreateTaskForm } from "../form/CreateTaskForm";

interface DayDetailsProps {
  tasks: ITask[];
  date: moment.Moment;
}

export const DayDetails: React.FC<DayDetailsProps> = ({ tasks }) => {
  return (
    <Flex
      direction="column"
      gridGap="2rem"
      justifyContent="center"
      alignItems="center"
    >
      {tasks.map((task, index) => {
        return (
          <Flex
            key={index}
            direction="column"
            textAlign="center"
            position="sticky"
            gridGap="1rem"
          >
            <Heading size="md">{task.title}</Heading>
            <Text>{moment(task.date).format("HH:MM")} </Text>
            <Text fontStyle={task.description ? "italic" : "normal"}>
              {task.description ?? "No description"}
            </Text>
            <CreateTaskForm />
          </Flex>
        );
      })}
    </Flex>
  );
};
