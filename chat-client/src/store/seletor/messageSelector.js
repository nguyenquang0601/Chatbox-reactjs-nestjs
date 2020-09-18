import { initialState } from "../slice/messages";
import { createSelector } from "@reduxjs/toolkit";

const select = state => state.MessagesReducer || initialState
export const selectMessages = createSelector(
  [select],
  ({ ...select }) => select?.messages
)
export const selectMessage = createSelector(
  [select],
  ({ ...select }) => select?.message
)
export const selectRoom = createSelector(
  [select],
  ({ ...select }) => select?.room
)
export const selectName = createSelector(
  [select],
  ({ ...select }) => select?.name
)