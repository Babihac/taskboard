import { UserActionTypes } from "../actionTypes/userActionTypes";
import { Dispatch } from "redux";
import { UserAction } from "../actions/userActions";
import axios from "axios";
export const loginStart = (username: string, password: string) => async (
  dispatch: Dispatch<UserAction>
) => {
  dispatch({
    type: UserActionTypes.LOGIN_START,
  });

  try {
    const result = await axios.post("/login", {
      username,
      password,
    });

    const user = result.data.user;

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    dispatch({
      type: UserActionTypes.LOGIN_SUCCESS,
      payload: userData,
    });
  } catch (err) {
    dispatch({
      type: UserActionTypes.LOGIN_FAILURE,
      payload: err.message,
    });
  }
};

export const authenticateUser = () => async (
  dispatch: Dispatch<UserAction>
) => {
  try {
    const result = await axios.get("http://localhost:4001/me", {
      withCredentials: true,
    });
    const data = result.data;
    console.log(data);
    if (data.user) {
      console.log(data.user);
      const userData = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
      };
      dispatch({
        type: UserActionTypes.LOGIN_SUCCESS,
        payload: userData,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const logoutStart = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({
    type: UserActionTypes.LOGOUT_START,
  });
  const result = await axios.post("/logout");
  dispatch({
    type: UserActionTypes.LOGOUT_SUCCESS,
  });
};
