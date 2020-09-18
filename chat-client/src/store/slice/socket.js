import io from 'socket.io-client'
import { createSlice } from '@reduxjs/toolkit'
let ENDPOINT = 'localhost:3000'
export const inintSocket = {
  socket: io(ENDPOINT)
}
const socketReducer = createSlice({
  name: 'socketReducer',
  initialState: inintSocket,
  reducers: {
    load(_, __) { }
  }
})
export const { name: sliceKey, reducer, actions } = socketReducer