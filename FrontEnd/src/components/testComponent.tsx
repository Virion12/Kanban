import { useEffect, useState } from "react";
import { TaskService } from "../services/TaskService";
import type { TaskItem } from "../services/TaskService";

export default function TaskList() {
  const [task, setTask] = useState<TaskItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    TaskService.getOne()
      .then(setTask)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>Task</h2>
      <p>
        {task.name} {task.isDone ? "(Done)" : ""}
      </p>
    </div>
  );
}