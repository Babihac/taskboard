import { Task } from "../../types/TaskType";

export const changeStatus = (
  taskList: Task[],
  id: string,
  newStatus: string
) => {
  return taskList.map((task) => {
    if (task.id === id) {
      task.status = newStatus;
    }

    return task;
  });
};
