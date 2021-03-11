import { Heading, Text } from "@chakra-ui/layout";
import { Button, Flex } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { config } from "../../config/config";
import { useHttp } from "../../hooks/useHttp";
import { ITask } from "../../interfaces/tasks.interface";
import { TaskForm } from "../form/TaskForm";
import { AiFillDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
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
  const [taskToUpdate, setTaskToUpdate] = useState<string>();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const openDialog = async (id: string) => {
    setTaskToDelete(id);
    setAlertDialogOpen(true);
  };
  const handleDelete = async () => {
    if (!taskToDelete) return;
    const res = await request({
      url: config.server.endpoints.findById(taskToDelete),
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
          return moment(task_first.date).isBefore(moment(task_second.date))
            ? -1
            : 1;
        })
        .map((task, index) => {
          if (task._id === taskToUpdate)
            return (
              <Flex
                bgColor={index % 2 === 0 ? "gray.200" : "gray.100"}
                w="100%"
                key={task._id}
                justifyContent="center"
              >
                <TaskForm
                  hadnleClose={() => setTaskToUpdate(undefined)}
                  setTasks={setTasks}
                  date={date}
                  isUpdating={true}
                  stopUpdating={() => setTaskToUpdate(undefined)}
                  taskId={task._id}
                  initialValues={{
                    date: task.date,
                    title: task.title,
                    description: task.description,
                  }}
                />
              </Flex>
            );
          else
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
        })}
      {!formOpen && (
        <Button
          mt="3rem"
          colorScheme="blue"
          onClick={() => {
            setTaskToUpdate(undefined);
            setFormOpen(true);
          }}
        >
          ADD NEW
        </Button>
      )}
      {formOpen && (
        <Flex bgColor="blue.100" w="100%" justifyContent="center">
          <TaskForm
            hadnleClose={() => setFormOpen(false)}
            setTasks={setTasks}
            date={date}
          />
        </Flex>
      )}
    </Flex>
  );
};
