import { Flex, Grid, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { ITask } from "../../interfaces/tasks.interface";
import { Day } from "./Day";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarProps {
  date: moment.Moment;
  selected: moment.Moment;
  setSelected: React.Dispatch<React.SetStateAction<moment.Moment>>;
  tasks: ITask[];
}

export const Calendar: React.FC<CalendarProps> = ({
  date,
  tasks,
  setSelected,
  selected,
}) => {
  const startDay = date.clone().startOf("month").startOf("week");
  const endDay = date.clone().endOf("month").endOf("week");
  const days: moment.Moment[] = [];
  const indexDay = startDay.clone();
  while (indexDay.isBefore(endDay)) {
    days.push(indexDay.add(1, "day").clone());
  }
  const checkIsActive = (day: moment.Moment) => {
    return moment().isSame(day, "D");
  };
  const checkIsSelected = (day: moment.Moment) => {
    return selected.isSame(day, "D");
  };
  const checkIsThisMonth = (day: moment.Moment) => {
    return date.isSame(day, "M");
  };

  const checkIsThisDay = (day: moment.Moment) => {
    return tasks.filter((task) => moment(task.date).isSame(day, "D"));
  };
  return (
    <Grid
      gridArea="calendar"
      templateColumns="repeat(7, 1fr)"
      margin="auto"
      w={{ sm: "85%", base: "100%" }}
      rowGap="2rem"
      columnGap={{ sm: "2rem", base: "1rem" }}
      mt="3rem"
      justifyItems="center"
    >
      {DAYS_OF_WEEK.map((day, index) => {
        return (
          <Flex
            h={{ sm: "4rem", base: "3rem" }}
            w={{ sm: "75%", base: "100%" }}
            alignItems="center"
            justifyContent="space-around"
            key={index}
            bgColor="blue.200"
            borderColor="green.500"
            borderRadius="12px"
            overflow="hidden"
            direction="column"
          >
            <Text
              color="blackAlpha.800"
              as="b"
              w="100%"
              h="50%"
              textAlign="center"
            >
              {day}
            </Text>
          </Flex>
        );
      })}
      {days.map((day) => {
        return (
          <Day
            tasks={checkIsThisDay(day)}
            isSelected={checkIsSelected(day)}
            setSelected={setSelected}
            day={day}
            key={day.clone().toString()}
            isActive={checkIsActive(day)}
            isThisMonth={checkIsThisMonth(day)}
          />
        );
      })}
    </Grid>
  );
};
