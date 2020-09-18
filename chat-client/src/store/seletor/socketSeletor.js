import { inintSocket } from "../slice/socket";
import { createSelector } from "@reduxjs/toolkit";

const select = () => inintSocket
export const selectSocket = createSelector(
  [select],
  ({ ...select }) => select?.socket
)