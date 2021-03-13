import { Grid } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar } from "../components/calendar/Calendar";
import { DayDetails } from "../components/calendar/DayDetails";
import { Selector } from "../components/calendar/Selector";
import { config } from "../config/config";
import { useHttp } from "../hooks/useHttp";
import { ITask } from "../interfaces/tasks.interface";

interface ProfileProps {}

export const ProfilePage: React.FC<ProfileProps> = () => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [selected, setSelected] = useState<moment.Moment>(moment());
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { request } = useHttp();

  useEffect(() => {
    request({
      url: config.server.endpoints.tasks,
    }).then((res) => setTasks(res.tasks));
  }, []);
  return (
    <Grid
      gridAutoColumns="2fr 1fr 1fr"
      gridTemplateRows="auto"
      templateAreas={{
        md: `
        "selector selector selector" 
        "calendar calendar details"
        `,

        base: `
          "selector selector selector"
          "calendar calendar calendar"
          "details details details"`,
      }}
    >
      <Selector
        numberOfTasks={
          tasks.filter(
            (task) => moment(task.date).month() === date.clone().month()
          ).length
        }
        date={date}
        setDate={setDate}
      />

      <Calendar
        date={date}
        setSelected={setSelected}
        selected={selected}
        tasks={tasks}
      />

      <DayDetails
        setTasks={setTasks}
        date={selected}
        tasks={tasks.filter((task) => moment(task.date).isSame(selected, "D"))}
      />
    </Grid>
  );
};
