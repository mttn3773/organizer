import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "@chakra-ui/react";
import { Selector } from "./components/Selector";
import { Calendar } from "./components/Calendar";
import { useTasks } from "./hooks/useTasks";
function App() {
  const [date, setDate] = useState<moment.Moment>(moment());
  const { tasks, addTask } = useTasks();
  return (
    <div className="App">
      {/* <Button
        onClick={() => {
          addTask({ title: "Test", date: moment().toString() });
        }}
      ></Button> */}
      {JSON.stringify(tasks)}
      <Selector date={date} setDate={setDate} />
      <Calendar date={date} />
    </div>
  );
}

export default App;
