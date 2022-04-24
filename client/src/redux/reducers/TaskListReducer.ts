import { TaskActionTypes } from "../actionTypes/taskActionTypes";
import { TaskAction } from "../actions/taskActions";
import { Task } from "../types/TaskType";
import { removeTask } from "./helpers/removeTask";
import { changeStatus } from "./helpers/changeStatus";
import { updateTask } from "./helpers/updateTask";
import { setLoading } from "./helpers/setLoading";

interface TaskListState {
  tasks: Task[];
  isFetching: boolean;
  errorMessage: string | undefined;
  loadingNewTask: boolean;
}

const initState = {
  tasks: [],
  isFetching: false,
  errorMessage: undefined,
  loadingNewTask: false,
};

const reducer = (
  state: TaskListState = initState,
  action: TaskAction
): TaskListState => {
  switch (action.type) {
    case TaskActionTypes.ADD_NEW_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case TaskActionTypes.CHANGE_TASK_STATUS:
      return {
        ...state,
        tasks: changeStatus(
          state.tasks,
          action.payload.id,
          action.payload.newStatus
        ),
      };
    case TaskActionTypes.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: removeTask(state.tasks, action.payload),
      };

    case TaskActionTypes.FETCH_TASKS_START: {
      return { ...state, isFetching: true };
    }

    case TaskActionTypes.FETCH_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload,
        isFetching: false,
        errorMessage: undefined,
      };
    }

    case TaskActionTypes.FETCH_TASKS_ERROR: {
      return { ...state, isFetching: false, errorMessage: action.payload };
    }

    case TaskActionTypes.DELETE_TASK_START:
      return { ...state, tasks: setLoading(state.tasks, action.payload, true) };

    case TaskActionTypes.CREATE_TASK_START:
      return { ...state, loadingNewTask: true };

    case TaskActionTypes.CREATE_TASK_SUCCESS:
      return {
        ...state,
        loadingNewTask: false,
        tasks: [...state.tasks, action.payload],
      };

    case TaskActionTypes.CREATE_TASK_ERROR:
      return { ...state, loadingNewTask: false, errorMessage: action.payload };

    case TaskActionTypes.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: updateTask(state.tasks, action.payload.id, action.payload.data),
      };

    default:
      return state;
  }
};

export default reducer;
