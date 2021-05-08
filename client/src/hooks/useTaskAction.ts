import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { taskActionCreators } from "../redux";

export const useTaskAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(taskActionCreators, dispatch);
};
