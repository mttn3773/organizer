import { Box, Flex } from "@chakra-ui/react";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Calendar } from "../components/calendar/Calendar";
import { DayDetails } from "../components/calendar/DayDetails";
import { Selector } from "../components/calendar/Selector";
import { config } from "../config/config";
import { useHttp } from "../hooks/useHttp";
import { ITask } from "../interfaces/tasks.interface";

interface ProfileProps {}

export const ProfilePage: React.FC<ProfileProps> = ({}) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [selected, setSelected] = useState<moment.Moment>(moment());
  const [tasks, setTasks] = useState<ITask[]>();
  const { request } = useHttp();
  const handleLogout = () => {
    request({ url: config.server.endpoints.logout, method: "POST" }).then(
      () => {
        window.location.reload();
      }
    );
  };
  useEffect(() => {
    request({
      url: config.server.endpoints.tasks,
    }).then((res) => setTasks(res.tasks));
  }, []);
  return (
    <Flex direction="column">
      <button onClick={handleLogout}> LOGOUT </button>
      <Selector
        numberOfTasks={
          tasks
            ? tasks.filter(
                (task) => moment(task.date).month() === date.clone().month()
              ).length
            : 0
        }
        date={date}
        setDate={setDate}
      />
      <Flex>
        <Box w="80%">
          <Calendar
            date={date}
            setSelected={setSelected}
            selected={selected}
            tasks={tasks ? tasks : []}
          />
        </Box>
        <Box w="20%">
          <DayDetails
            date={selected}
            tasks={
              tasks
                ? tasks.filter((task) =>
                    moment(task.date).isSame(selected, "D")
                  )
                : []
            }
          />
        </Box>
      </Flex>
    </Flex>
  );
};
