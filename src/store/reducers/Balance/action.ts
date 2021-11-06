import { createAction } from "@reduxjs/toolkit";

export const updateBalance = createAction(
  `Balance/updateBalance`,
  (value: number) => ({
    payload: value,
  }),
);

export const updateRate = createAction(
  `Balance/updateRate`,
  (value: number) => ({
    payload: value,
  }),
);
