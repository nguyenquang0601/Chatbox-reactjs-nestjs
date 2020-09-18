import { createSlice } from "@reduxjs/toolkit"

export const iniialAuth = {
  login: localStorage.getItem('access-token') ? true : false,
  username: ''
}
const authReducer = createSlice({
  name: 'authReducer',
  initialState: iniialAuth,
  reducers: {
    Login(state, action) {
      state.login = true
      state.username = action.payload
    },
    Logout(state, __) {
      state.login = false
      localStorage.clear()
    }
  }
})
export const { name: sliceKey, reducer, actions } = authReducer 