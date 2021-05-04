import { UserType } from "../types/UserType";
import { UserAction } from "../actions/userActions";
import { UserActionTypes } from "../actionTypes/userActionTypes";
interface UserReducerState {
  user: UserType | null;
  pending: boolean;
  error: string | null;
}

const initState: UserReducerState = {
  user: null,
  pending: false,
  error: null,
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
    default:
      return { ...state };
  }
};

export default reducer;
