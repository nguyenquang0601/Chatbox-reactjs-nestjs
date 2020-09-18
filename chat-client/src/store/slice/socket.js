import io from 'socket.io-client'
import { createSlice } from '@reduxjs/toolkit'
let ENDPOINT = 'localhost:3000'
export const inintSocket = {
  socket: io(ENDPOINT)
}
const socketReducer = createSlice({
  name: 'socketReducer',
  inintSocket,
  reducers: {
    load(_, __) { }
  }
})
export const { key: sliceKey, reducer, actions } = socketReducer