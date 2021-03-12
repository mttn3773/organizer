import { Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { ITask } from "../../interfaces/tasks.interface";

interface TaskCardProps {
  task: ITask;
  index: number;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskToUpdate: React.Dispatch<React.SetStateAction<string | undefined>>;
  openDialog: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  setFormOpen,
  openDialog,
  setTaskToUpdate,
}) => {
  return (
    <Flex
      key={task._id}
      direction="column"
      textAlign="center"
      position="relative"
      gridGap="1rem"
      w="100%"
      pt="2rem"
      pb="2rem"
      bgColor={index % 2 === 0 ? "gray.200" : "gray.100"}
    >
      <Flex
        position="absolute"
        justifyItems="center"
        alignItems="center"
        left="20px"
        top="15px"
        cursor="pointer"
        gridGap="1rem"
      >
        <AiFillDelete
          size="1.4rem"
          color="#ec5c5c"
          onClick={() => openDialog(task._id)}
        />

        <FaPencilAlt
          size="1.1rem"
          onClick={() => {
            setFormOpen(false);
            setTaskToUpdate(task._id);
          }}
        />
      </Flex>
      <Heading size="md">{task.title}</Heading>
      <Text>{moment(task.date).format("HH:mm")} </Text>
      <Text fontStyle={!task.description ? "italic" : "normal"}>
        {task.description || "No description"}
      </Text>
    </Flex>
  );
};
