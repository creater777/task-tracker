import {
  AUTH_INIT,
  AUTH_LOGIN,
  AUTH_LOGOUT
} from '../actions/auth'

const initialState = {
  token: null,
  login: null
}

export default (state = initialState, action) => {
  switch (action.type){
    case AUTH_INIT:
      let auth = JSON.parse(localStorage.getItem("auth"))
      return {
        ...(auth || initialState)
      }

    case AUTH_LOGIN:
      localStorage.setItem('auth', JSON.stringify(action.value))
      return {
        ...action.value
      }

    case AUTH_LOGOUT:
      localStorage.setItem('auth', '')
      return {
        ...initialState
      }

    default:
      return {...state}
  }
}