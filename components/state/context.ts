import React, { createContext } from "react";
import { AppOwnerState, initialAppOwnerState } from "./state";
import { AppActions } from "./actions";

export const AppContext = createContext<{
  state: AppOwnerState;
  dispatch: React.Dispatch<AppActions>;
}>({
  state: initialAppOwnerState,
  dispatch: () => undefined,
});
