import { Box, Grid, useMediaQuery } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar } from "../components/calendar/Calendar";
import { DayDetails } from "../components/calendar/DayDetails";
import { Selector } from "../components/calendar/Selector";
import { CustomAlertDialog } from "../components/notify/AlertDialog";
import { config } from "../config/config";
import { useHttp } from "../hooks/useHttp";
import { ITask } from "../interfaces/tasks.interface";

interface ProfileProps {}

export const ProfilePage: React.FC<ProfileProps> = ({}) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [selected, setSelected] = useState<moment.Moment>(moment());
  const [tasks, setTasks] = useState<ITask[]>([]);
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
    <Grid
      gridAutoColumns="2fr 1fr 1fr"
      templateAreas={{
        sm: '"selector selector selector" "calendar calendar details"',
        base:
          '"selector selector selector" "calendar calendar calendar" "details details details"',
      }}
    >
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

      <Box gridArea="calendar">
        <Calendar
          date={date}
          setSelected={setSelected}
          selected={selected}
          tasks={tasks}
        />
      </Box>
      <Box
        pl="1rem"
        borderLeft="1px solid"
        borderColor="gray.200"
        gridArea="details"
      >
        <DayDetails
          setTasks={setTasks}
          date={selected}
          tasks={
            tasks
              ? tasks.filter((task) => moment(task.date).isSame(selected, "D"))
              : []
          }
        />
      </Box>
    </Grid>
  );
};
