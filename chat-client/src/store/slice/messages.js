import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  messages: [],
  message: '',
  room: '',
  idRoom: '',
  name: ''
}
const MessagesReducer = createSlice({
  name: 'MessagesReducer',
  initialState,
  reducers: {
    joinRoom(state, action) {
      state.room = action.payload.room
      state.name = action.payload.name
    },
    loadingMessages(state, action) {
      state.messages = action.payload.messages
      state.idRoom = action.payload.id
    },
    sendMessage(state, action) {
      state.message = action.payload
    }
  }
})
export const { name: sliceKey, actions, reducer } = MessagesReducer