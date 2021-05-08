import { Task } from "../../types/TaskType";

export const setLoading = (
  taskList: Task[],
  id: string,
  isLoading: boolean
) => {
  return taskList.map((task) => {
    if (task.id === id) {
      task.isLoading = isLoading;
    }
    return task;
  });
};
