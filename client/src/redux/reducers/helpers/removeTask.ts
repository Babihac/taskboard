import { Task } from "../../types/TaskType";

export const removeTask = (taskList: Task[], id: string) => {
  return taskList.filter((task) => task.id !== id);
};
