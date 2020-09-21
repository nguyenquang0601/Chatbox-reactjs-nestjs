import { createSelector } from "@reduxjs/toolkit";
import { iniialAuth } from "../slice/auth";

const select = (state) => state.authReducer || iniialAuth
export const checkAuth = createSelector(
  [select],
  ({ ...select }) => select?.login
)
export const selectUsername = createSelector(
  [select],
  ({ ...select }) => select?.username
)
export const selectMe = createSelector(
  [select],
  ({ ...select }) => select?.me
)