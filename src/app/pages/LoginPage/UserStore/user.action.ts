import { createAction, props } from "@ngrx/store";
import { CHANGE_USER_INFO, CHANGE_USER_INFO_FAIL, CHANGE_USER_INFO_SUCCESS, LoginState, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOG_OUT, UserInfo } from "./user.type";

// type LoginToken = Pick<LoginState, 'accessToken' | 'refreshToken'>
interface userLoginForm {
    email: string;
    password: string
}
const loginUserAction = createAction(LOGIN_USER, props<{ request: userLoginForm }>())
const loginUserSuccess = createAction(LOGIN_USER_SUCCESS, props<{
    userLogin: LoginState
}>())

const loginUserFail = createAction(LOGIN_USER_FAIL, props<{
    error: any
}>())

const changeUserInfoAction = createAction(CHANGE_USER_INFO)
const changeUserInfoSuccess = createAction(CHANGE_USER_INFO_SUCCESS, props<{
    userInfo: UserInfo
}>())

const logOutAction = createAction(LOG_OUT)

const changeUserInfoFail = createAction(CHANGE_USER_INFO_FAIL, props<{
    error: any
}>())


export {
    loginUserAction,
    loginUserSuccess,
    loginUserFail,
    changeUserInfoAction,
    changeUserInfoSuccess,
    changeUserInfoFail,
    logOutAction
}