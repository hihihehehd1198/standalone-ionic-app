
const LOGIN_USER = "LOGIN_USER"
const GET_USER = "GET_USER"
const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
const LOGIN_USER_FAIL = "LOGIN_USER_FAIL"
const CHANGE_USER_INFO = "CHANGE_USER_INFO"
const CHANGE_USER_INFO_SUCCESS = "CHANGE_USER_INFO_SUCCESS"
const CHANGE_USER_INFO_FAIL = "CHANGE_USER_INFO_FAIL"
const LOG_OUT = "LOG_OUT"
export interface UserInfo {
    username: string,
    id: string,
    email: string,
    role: string,
    phoneNumber: string,
}
export interface LoginState {
    accessToken: string,
    refreshToken: string,
    user?: UserInfo
}

export {
    LOGIN_USER,
    GET_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    CHANGE_USER_INFO,
    CHANGE_USER_INFO_SUCCESS,
    CHANGE_USER_INFO_FAIL,
    LOG_OUT
}