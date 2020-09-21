import { createSlice } from "@reduxjs/toolkit"
import Axios from "axios"

export const iniialAuth = {
  login: localStorage.getItem('access-token') ? true : false,
  username: '',
  me: {}
}
const authReducer = createSlice({
  name: 'authReducer',
  initialState: iniialAuth,
  reducers: {
    loadPage(_, __) { },
    loadMe(state, action) {
      state.me = action.payload
      console.log(state)
    },
    Login(state, action) {
      state.login = true
      state.username = action.payload
      Axios.defaults.headers.common['Authorization'] = 'Bears ' + localStorage.getItem('access-token')
    },
    Logout(state, __) {
      state.login = false
      localStorage.clear()
    }
  }
})
export const { name: sliceKey, reducer, actions } = authReducer 