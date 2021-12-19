import { Dispatch, useReducer } from "react";

export type PreloadState =
  | { status: "suspense" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

export type PreloadAction =
  | { type: "suspense" }
  | { type: "loading" }
  | { type: "success" }
  | { type: "error"; message: string };

const preloadReducer =
  () =>
  (state: PreloadState, action: PreloadAction): PreloadState => {
    switch (action.type) {
      case "suspense":
        return {
          ...state,
          status: "suspense",
        };
      case "loading":
        return {
          ...state,
          status: "loading",
        };
      case "success":
        return {
          ...state,
          status: "success",
        };
      case "error":
        return {
          ...state,
          message: action.message,
          status: "error",
        };
    }
  };

export function usePreloadReducer(): [PreloadState, Dispatch<PreloadAction>] {
  return useReducer(preloadReducer(), {
    status: "suspense",
  });
}
