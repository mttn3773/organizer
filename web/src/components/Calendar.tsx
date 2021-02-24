import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Day } from "./Day";

interface CalendarProps {
  date: moment.Moment;
}

export const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const startDay = date.clone().startOf("month").startOf("week");
  const endDay = date.clone().endOf("month").endOf("week");
  const days: moment.Moment[] = [];
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const indexDay = startDay.clone();
  while (indexDay.isBefore(endDay)) {
    days.push(indexDay.add(1, "day").clone());
  }
  const checkIsActive = (day: moment.Moment) => {
    return !!(
      moment().format("DD MMM YYYY") === day.clone().format("DD MMM YYYY")
    );
  };
  const checkIsThisMonth = (day: moment.Moment) => {
    return !!(date.format("MMM") === day.clone().format("MMM"));
  };
  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      margin="auto"
      w="75%"
      rowGap="2rem"
      columnGap="2rem"
      mt="3rem"
    >
      {daysOfWeek.map((day, index) => {
        return (
          <Flex
            h="4rem"
            w="75%"
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
