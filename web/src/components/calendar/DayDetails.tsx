import { Box, Button, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { config } from "../../config/config";
import { useHttp } from "../../hooks/useHttp";
import { ITask } from "../../interfaces/tasks.interface";
import { TaskForm } from "../form/TaskForm";
import { CustomAlertDialog } from "../notify/AlertDialog";
import { TaskCard } from "./TaskCard";
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
  const openDialog = (id: string) => {
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
    <Box
      pb="2rem"
      borderLeft="1px solid"
      borderColor="gray.200"
      bgColor="gray.100"
      gridArea="details"
      height={{ base: "auto", md: "90vh" }}
      overflowY="scroll"
    >
      <Flex direction="column" justifyContent="center" alignItems="center">
        <CustomAlertDialog
          isOpen={alertDialogOpen}
          setIsOpen={setAlertDialogOpen}
          handleDelete={handleDelete}
        />
        {tasks.length ? (
          tasks
            .sort((task_first, task_second) => {
              return moment(task_first.date).isBefore(moment(task_second.date))
                ? -1
                : 1;
            })
            .map((task, index) => {
              if (task._id === taskToUpdate)
                return (
                  <TaskForm
                    key={task._id}
                    bgColor={index % 2 === 0 ? "gray.200" : "gray.100"}
                    hadnleClose={() => setTaskToUpdate(undefined)}
                    setTasks={setTasks}
                    date={date}
                    isUpdating={true}
                    taskId={task._id}
                    initialValues={{
                      date: task.date,
                      title: task.title,
                      description: task.description,
                    }}
                  />
                );
              else
                return (
                  <TaskCard
                    key={task._id}
                    index={index}
                    openDialog={openDialog}
                    setFormOpen={setFormOpen}
                    setTaskToUpdate={setTaskToUpdate}
                    task={task}
                  />
                );
            })
        ) : (
          <Text fontStyle="italic" textAlign="center">
            No tasks were found
          </Text>
        )}
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
          <TaskForm
            hadnleClose={() => setFormOpen(false)}
            setTasks={setTasks}
            date={date}
          />
        )}
      </Flex>
    </Box>
  );
};
