import { LensToken, User } from "../../components/lib/types";

export enum ActionType {
  LoadToken,
  LoadPosts,
  LoadUser,
}

export interface LoadToken {
  type: ActionType.LoadToken;
  payload: LensToken;
}

export interface LoadUser {
  type: ActionType.LoadUser;
  payload: User;
}
export type AppActions = LoadToken | LoadUser;
