import { LensToken, User } from "../lib/types";

export interface AppOwnerState {
  token: LensToken;
  user: User;
}

export const initialAppOwnerState: AppOwnerState = {
  token: {
    accessToken: "",
    refreshToken: "",
  },
  user: {
    bio: "",
    handle: "",
    id: "",
    name: "",
    twitterUrl: "",
    website: "",
    picture: "",
  },
};
