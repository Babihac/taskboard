import { Task } from "../../types/TaskType";

export const updateTask = (
  taskList: Task[],
  id: string,
  data: { title?: string; body?: string; status?: string }
) => {
  return taskList.map((task) => {
    if (task.id === id) {
      task = { ...task, ...data };
    }

    return task;
  });
};
