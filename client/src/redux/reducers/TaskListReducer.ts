import { TaskActionTypes } from "../actionTypes/taskActionTypes";
import { Action } from "../actions/taskActions";
import { Task } from "../types/TaskType";
import { removeTask } from "./helpers/removeTask";
import { changeStatus } from "./helpers/changeStatus";

interface TaskListState {
  tasks: Task[];
  isFetching: boolean;
  errorMessage: string | undefined;
}

const initState = {
  tasks: [
    {
      id: "abc",
      title: "title1",
      body: "kokoko",
      status: "TODO",
    },
    {
      id: "dfddfdfdf",
      title: "title2",
      body: "kokoko",
      status: "TODO",
    },
    {
      id: "jiort",
      title: "title3",
      body: "kokoko",
      status: "IN_PROGRESS",
    },
    {
      id: "fjgeoeg",
      title: "title4",
      body: "kokoko",
      status: "IN_PROGRESS",
    },
    {
      id: "jfwepfwepfw",
      title: "title5",
      body: "kokoko",
      status: "IN_TEST",
    },
    {
      id: "djfkdpwe",
      title: "title6",
      body: "kokoko",
      status: "IN_TEST",
    },
  ],
  isFetching: false,
  errorMessage: undefined,
};

const reducer = (
  state: TaskListState = initState,
  action: Action
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
    case TaskActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: removeTask(state.tasks, action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
