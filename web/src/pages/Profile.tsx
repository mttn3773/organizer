import { Flex } from "@chakra-ui/react";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Calendar } from "../components/Calendar";
import { Selector } from "../components/Selector";
import { config } from "../config/config";
import { useHttp } from "../hooks/useHttp";
import { GlobalState } from "../store/globalStore";

interface ProfileProps {}

export const ProfilePage: React.FC<ProfileProps> = ({}) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [selected, setSelected] = useState<moment.Moment>(moment());
  const { request } = useHttp();
  const handleClick = async () => {
    const res = await request({ url: config.server.endpoints.me });
    console.log(res);
  };
  return (
    <Flex direction="column">
      {JSON.stringify(moment().toDate())}
      <button onClick={handleClick}> + </button>
      <Selector date={date} setDate={setDate} />
      <Calendar date={date} setSelected={setSelected} selected={selected} />
    </Flex>
  );
};
