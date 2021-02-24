import { ITask } from "./../interfaces/task.interface";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const getTasks = async () => {
    db.collection("tasks").onSnapshot((snap) => {
      let documents: any[] = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setTasks(documents);
    });
  };

  const addTask = async (task: ITask) => {
    try {
      db.collection("tasks").doc().set(task);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  return { tasks, addTask };
};
