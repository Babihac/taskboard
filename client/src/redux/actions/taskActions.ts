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

export interface FetchTasksStart {
  type: TaskActionTypes.FETCH_TASKS_START;
}

export interface FetchTasksSuccess {
  type: TaskActionTypes.FETCH_TASKS_SUCCESS;
  payload: Task[];
}

export interface FetchTasksError {
  type: TaskActionTypes.FETCH_TASKS_ERROR;
  payload: string;
}

export interface DeleteTaskStart {
  type: TaskActionTypes.DELETE_TASK_START;
  payload: string;
}

export interface DeleteTaskSuccess {
  type: TaskActionTypes.DELETE_TASK_SUCCESS;
  payload: string;
}
export interface DeleteTaskError {
  type: TaskActionTypes.DELETE_TASK_ERROR;
  payload: string;
}
export interface CreateTaskStart {
  type: TaskActionTypes.CREATE_TASK_START;
}

export interface CreateTaskSuccess {
  type: TaskActionTypes.CREATE_TASK_SUCCESS;
  payload: Task;
}

export interface CreateTaskError {
  type: TaskActionTypes.CREATE_TASK_ERROR;
  payload: string;
}

export interface UpdateTaskStart {
  type: TaskActionTypes.UPDATE_TASK_START;
}

export interface UpdateTaskSuccess {
  type: TaskActionTypes.UPDATE_TASK_SUCCESS;
  payload: {
    id: string;
    data: { title?: string; body?: string; status?: string };
  };
}

export interface UpdateTaskError {
  type: TaskActionTypes.UPDATE_TASK_ERRORR;
  payload: string;
}

export type TaskAction =
  | AddNewTask
  | DeleteTaskStart
  | DeleteTaskSuccess
  | DeleteTaskError
  | ChangeTaskStatus
  | FetchTasksError
  | FetchTasksStart
  | FetchTasksSuccess
  | CreateTaskStart
  | CreateTaskSuccess
  | CreateTaskError
  | UpdateTaskStart
  | UpdateTaskSuccess
  | UpdateTaskError;
