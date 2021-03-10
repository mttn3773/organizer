import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { config } from "../../config/config";
import { useHttp } from "../../hooks/useHttp";
import { ITask } from "../../interfaces/tasks.interface";
import { CreateTaskForm } from "../form/CreateTaskForm";
import { AiFillDelete } from "react-icons/ai";
import { CustomAlertDialog } from "../notify/AlertDialog";
interface DayDetailsProps {
  tasks: ITask[];
  date: moment.Moment;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const DayDetails: React.FC<DayDetailsProps> = ({
  tasks,
  date,
  setTasks,
}) => {
  const { request } = useHttp();
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string>();
  const hadnleDelete = async (id: string) => {
    setTaskToDelete(id);
    setAlertDialogOpen(true);
  };
  const handleDelete = async () => {
    if (!taskToDelete) return;
    const res = await request({
      url: config.server.endpoints.deleteTask(taskToDelete),
      method: "DELETE",
    });
    if (res.success && res.task) {
      setTasks((prev) => prev.filter((task) => task._id !== res.task._id));
    }
  };
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      position="sticky"
    >
      <CustomAlertDialog
        isOpen={alertDialogOpen}
        setIsOpen={setAlertDialogOpen}
        handleDelete={handleDelete}
      />
      {tasks
        .sort((task_first, task_second) => {
          if (moment(task_first.date).isBefore(moment(task_second.date)))
            return -1;
          else return 1;
        })
        .map((task, index) => {
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
                color="red.500"
              >
                <AiFillDelete onClick={() => hadnleDelete(task._id)} />
              </Flex>
              <Heading size="md">{task.title}</Heading>
              <Text>{moment(task.date).format("HH:mm")} </Text>
              <Text fontStyle={!task.description ? "italic" : "normal"}>
                {task.description || "No description"}
              </Text>
            </Flex>
          );
        })}
      <CreateTaskForm setTasks={setTasks} date={date} />
    </Flex>
  );
};
