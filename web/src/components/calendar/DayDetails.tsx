import moment from "moment";
import React from "react";
import { ITask } from "../../interfaces/tasks.interface";

interface DayDetailsProps {
  tasks: ITask[];
  date: moment.Moment;
}

export const DayDetails: React.FC<DayDetailsProps> = ({ tasks }) => {
  return <>{JSON.stringify(tasks)}</>;
};
