import { TaskActionTypes } from "../actionTypes/taskActionTypes";
import { Task } from "../types/TaskType";
import {
  AddNewTask,
  DeleteTask,
  ChangeTaskStatus,
} from "../actions/taskActions";
import { StatusType } from "../types/statusType";

export const addTask = (task: Task): AddNewTask => {
  return {
    type: TaskActionTypes.ADD_NEW_TASK,
    payload: task,
  };
};

export const deleteTask = (taskId: string): DeleteTask => {
  return {
    type: TaskActionTypes.DELETE_TASK,
    payload: taskId,
  };
};

export const changeTaskStatus = (
  taskId: string,
  newStatus: StatusType
): ChangeTaskStatus => {
  return {
    type: TaskActionTypes.CHANGE_TASK_STATUS,
    payload: { newStatus, id: taskId },
  };
};
