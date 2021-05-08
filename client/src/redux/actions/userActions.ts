import { UserActionTypes } from "../actionTypes/userActionTypes";
import { userCredentials } from "../types/userCredentials";
import { UserType } from "../types/UserType";

export interface loginStart {
  type: UserActionTypes.LOGIN_START;
}

export interface SignupStart {
  type: UserActionTypes.SIGNUP_START;
}

export interface LoginSucces {
  type: UserActionTypes.LOGIN_SUCCESS;
  payload: UserType;
}

export interface LoginFailure {
  type: UserActionTypes.LOGIN_FAILURE;
  payload: string;
}

export interface LogoutSuccess {
  type: UserActionTypes.LOGOUT_SUCCESS;
}

export interface LogoutFailure {
  type: UserActionTypes.LOGOUT_FAILURE;
  payload: string;
}

export interface logoutStart {
  type: UserActionTypes.LOGOUT_START;
}

export interface SignUpSuccess {
  type: UserActionTypes.SIGNUP_SUCCESS;
  payload: userCredentials;
}

export interface SignUpFailure {
  type: UserActionTypes.SIGNUP_FAILURE;
  payload: string;
}

export type UserAction =
  | loginStart
  | SignupStart
  | LoginSucces
  | LoginFailure
  | LogoutFailure
  | LogoutSuccess
  | logoutStart
  | SignUpFailure
  | SignUpSuccess;
