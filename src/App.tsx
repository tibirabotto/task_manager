import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import Task from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await JSON.parse(localStorage.getItem("tasks") || "[]");
      setTasks(data);
    };
    getData();
  }, [tasks]);
  return (
    <div className="px-4 py-4">
      <TaskForm />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
