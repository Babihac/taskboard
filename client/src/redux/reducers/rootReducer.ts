import userReducer from "./userReducer";
import { combineReducers } from "redux";
import taskListReducer from "./TaskListReducer";

const rootReducer = combineReducers({
  taskList: taskListReducer,
  user: userReducer,
});

export default rootReducer;

export type rootState = ReturnType<typeof rootReducer>;
