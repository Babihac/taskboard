import { TaskActionTypes } from "../actionTypes/taskActionTypes";
import { Task } from "../types/TaskType";
import { Dispatch } from "redux";
import {
  AddNewTask,
  DeleteTask,
  ChangeTaskStatus,
  TaskAction,
} from "../actions/taskActions";
import { StatusType } from "../types/statusType";
import axios from "axios";
import { rootState } from "../reducers/rootReducer";

export const addTask = (task: Task): AddNewTask => {
  return {
    type: TaskActionTypes.ADD_NEW_TASK,
    payload: task,
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

export const fetchTasks = () => async (
  dispatch: Dispatch<TaskAction>,
  getState: () => rootState
) => {
  dispatch({
    type: TaskActionTypes.FETCH_TASKS_START,
  });

  try {
    const { user } = getState();
    if (user.user && user.user.id) {
      const data = await (
        await axios.get(`http://localhost:4001/api/task/user/${user.user.id}`)
      ).data;
      console.log(data);
      dispatch({
        type: TaskActionTypes.FETCH_TASKS_SUCCESS,
        payload: data.tasks,
      });
    } else {
      dispatch({
        type: TaskActionTypes.FETCH_TASKS_ERROR,
        payload: "User is not logged in",
      });
    }
  } catch (err) {
    dispatch({
      type: TaskActionTypes.FETCH_TASKS_ERROR,
      payload: err.message,
    });
  }
};

export const deleteTask = (id: string) => async (
  dispatch: Dispatch<TaskAction>
) => {
  dispatch({
    type: TaskActionTypes.DELETE_TASK_START,
    payload: id,
  });
  try {
    const message = await axios.delete(`/api/task/${id}`);
    console.log(message);
    dispatch({
      type: TaskActionTypes.DELETE_TASK_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TaskActionTypes.DELETE_TASK_ERROR,
      payload: err.message,
    });
  }
};

export const createNewTask = (task: Task) => async (
  dispatch: Dispatch<TaskAction>
) => {
  dispatch({
    type: TaskActionTypes.CREATE_TASK_START,
  });

  try {
    const newTask = await axios.post("/api/task", {
      ...task,
    });
    console.log(newTask.data);
    if (newTask.data.task) {
      dispatch({
        type: TaskActionTypes.CREATE_TASK_SUCCESS,
        payload: { ...task, id: newTask.data.task.id },
      });
    } else {
      dispatch({
        type: TaskActionTypes.CREATE_TASK_ERROR,
        payload: "some error",
      });
    }
  } catch (err) {
    dispatch({
      type: TaskActionTypes.CREATE_TASK_ERROR,
      payload: err.message,
    });
  }
};

export const updateTaskStart = (
  id: string,
  data: {
    title?: string;
    body?: string;
    status?: string;
  }
) => async (dispatch: Dispatch<TaskAction>) => {
  dispatch({
    type: TaskActionTypes.UPDATE_TASK_START,
  });

  try {
    const updateResult = await (await axios.put(`/api/task/${id}`, data)).data;
    if (updateResult.updatedTask) {
      dispatch({
        type: TaskActionTypes.UPDATE_TASK_SUCCESS,
        payload: { id, data },
      });
    } else {
      dispatch({
        type: TaskActionTypes.UPDATE_TASK_ERRORR,
        payload: updateResult.error,
      });
    }
  } catch (err) {
    dispatch({
      type: TaskActionTypes.UPDATE_TASK_ERRORR,
      payload: err.message,
    });
  }
};
