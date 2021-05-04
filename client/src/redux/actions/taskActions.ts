import { TaskActionTypes } from "../actionTypes/taskActionTypes";
import { Task } from "../types/TaskType";

export interface AddNewTask {
  type: TaskActionTypes.ADD_NEW_TASK;
  payload: Task;
}

export interface DeleteTask {
  type: TaskActionTypes.DELETE_TASK;
  payload: string;
}

export interface ChangeTaskStatus {
  type: TaskActionTypes.CHANGE_TASK_STATUS;
  payload: { newStatus: "TODO" | "IN_PROGRESS" | "IN_TEST"; id: string };
}

export type Action = AddNewTask | DeleteTask | ChangeTaskStatus;
