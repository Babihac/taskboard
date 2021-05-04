import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { userActionCreators } from "../redux";

export const useUserAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(userActionCreators, dispatch);
};
