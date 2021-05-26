import { UserActionTypes } from "../actionTypes/userActionTypes";
import { Dispatch } from "redux";
import { UserAction } from "../actions/userActions";
import axios from "axios";
import { userCredentials } from "../types/userCredentials";
export const loginStart =
  (username: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.LOGIN_START,
    });

    try {
      const result = await axios.post("/api/login", {
        username,
        password,
      });

      const user = result.data.user;

      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
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

export const authenticateUser =
  () => async (dispatch: Dispatch<UserAction>) => {
    try {
      const result = await axios.get("http://localhost:4001/me", {
        withCredentials: true,
      });
      const data = result.data;
      if (data.user) {
        const userData = {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
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
  const result = await axios.post("/api/logout");
  dispatch({
    type: UserActionTypes.LOGOUT_SUCCESS,
  });
};

export const signupStart =
  (userCredentials: userCredentials) =>
  async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.SIGNUP_START,
    });

    try {
      const data = await (
        await axios.post("/api/register", userCredentials)
      ).data;

      if (data.newUser) {
        dispatch({
          type: UserActionTypes.LOGIN_SUCCESS,
          payload: {
            id: data.newUser.id,
            username: data.newUser.username,
            email: data.newUser.email,
            firstName: data.newUser.firstName,
            lastName: data.newUser.lastName,
          },
        });
      } else {
        dispatch({
          type: UserActionTypes.SIGNUP_FAILURE,
          payload: data.error,
        });
      }
    } catch (err) {
      dispatch({
        type: UserActionTypes.SIGNUP_FAILURE,
        payload: err.message,
      });
    }
  };

export const updateUserStart =
  (
    id: string,
    userData: {
      firstName?: string;
      lastName?: string;
      username?: string;
      email?: string;
    }
  ) =>
  async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.UPDATE_USER_START,
    });

    try {
      const updateUserResult = await axios.put(`/api/user/${id}`, userData);
      if (updateUserResult.data.updatedUser) {
        const userData = updateUserResult.data.updatedUser;
        dispatch({
          type: UserActionTypes.UPDATE_USER_SUCCESS,
          payload: userData,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

export const updateUserPasswordStart =
  (
    id: string,
    passwordData: {
      oldPassword: string;
      newPassword: string;
      passwordConfirm: string;
    }
  ) =>
  async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.UPDATE_USER_PASSWORD_START,
    });
    try {
      const updateResult = await axios.put(`/test/${id}`, passwordData);
      const updateData = updateResult.data;
      if (updateData.status && updateData.status == "ok") {
        dispatch({
          type: UserActionTypes.UPDATE_USER_PASSWORD_SUCCESS,
          payload: "Password successfuly changed",
        });
      } else {
        dispatch({
          type: UserActionTypes.UPDATE_USER_PASSWORD_FAILURE,
          payload: updateData.message,
        });
      }
    } catch (err) {
      dispatch({
        type: UserActionTypes.UPDATE_USER_PASSWORD_FAILURE,
        payload: err.message,
      });
    }
  };

export const removeMessage = () => {
  return {
    type: UserActionTypes.REMOVE_MESSAGE,
  };
};
