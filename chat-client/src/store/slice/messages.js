import { createSlice } from "@reduxjs/toolkit"
export const initialState = {
  messages: [],
  message: '',
  room: null,
  idRoom: null,
  name: '',
  rooms: []
}
const MessagesReducer = createSlice({
  name: 'MessagesReducer',
  initialState,
  reducers: {
    getAllRoom(state, action) {
      state.rooms = action.payload
    },
    joinRoom(state, action) {
      state.room = action.payload.room
      state.name = action.payload.name
      state.idRoom = action.payload.idRoom
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