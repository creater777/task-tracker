import {getGuid} from "../helpers/guid"

export const AUTH_INIT = 'AUTH_INIT'
export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const authInit = () => ({
  type: AUTH_INIT
})

export const authLogin = login => ({
  type: AUTH_LOGIN,
  value: {
    login,
    token: getGuid()
  }
})

export const authLogout = () => ({
  type: AUTH_LOGOUT
})