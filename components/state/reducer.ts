import { AppOwnerState } from "./state";
import { ActionType, AppActions, LoadToken, LoadUser } from "./actions";
import { LensToken, User } from "../lib/types";

export function appReducer(
  state: AppOwnerState,
  action: AppActions
): AppOwnerState {
  switch (action.type) {
    case ActionType.LoadToken:
      state.token = action.payload;
      return { ...state };
    case ActionType.LoadUser:
      state.user = action.payload;
      return { ...state };
    default:
      return state;
  }
}

export const loadToken = (token: LensToken): LoadToken => ({
  type: ActionType.LoadToken,
  payload: token,
});

export const loadUser = (user: User): LoadUser => ({
  type: ActionType.LoadUser,
  payload: user,
});
