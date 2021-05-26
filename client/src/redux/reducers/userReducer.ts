import { UserType } from "../types/UserType";
import { UserAction } from "../actions/userActions";
import { UserActionTypes } from "../actionTypes/userActionTypes";
import { updateUser } from "./helpers/updateUser";
interface UserReducerState {
  user: UserType | null;
  pending: boolean;
  error: string | null;
  message: string | null;
}

const initState: UserReducerState = {
  user: null,
  pending: false,
  error: null,
  message: null,
};

const reducer = (
  state: UserReducerState = initState,
  action: UserAction
): UserReducerState => {
  switch (action.type) {
    case UserActionTypes.LOGIN_START:
      return { ...state, pending: true };

    case UserActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload, pending: false, error: null };

    case UserActionTypes.LOGIN_FAILURE:
      return { ...state, user: null, error: action.payload, pending: false };

    case UserActionTypes.LOGOUT_START:
      return { ...state, pending: true };
    case UserActionTypes.LOGOUT_SUCCESS:
      return { ...state, user: null, pending: false };

    case UserActionTypes.SIGNUP_START:
      return { ...state, pending: true };

    case UserActionTypes.SIGNUP_FAILURE:
      return { ...state, pending: false, error: action.payload };

    case UserActionTypes.UPDATE_USER_START:
      return { ...state, pending: true };

    case UserActionTypes.UPDATE_USER_SUCCESS:
      if (state.user) {
        return {
          ...state,
          user: updateUser(state.user, action.payload),
          pending: false,
        };
      }
      return { ...state };

    case UserActionTypes.UPDATE_USER_PASSWORD_START:
      return { ...state, pending: true };
    case UserActionTypes.UPDATE_USER_PASSWORD_SUCCESS:
      return { ...state, pending: false, message: action.payload, error: null };

    case UserActionTypes.UPDATE_USER_PASSWORD_FAILURE:
      return { ...state, pending: false, error: action.payload };
    case UserActionTypes.REMOVE_MESSAGE:
      return { ...state, message: null, error: null };
    default:
      return { ...state };
  }
};

export default reducer;
