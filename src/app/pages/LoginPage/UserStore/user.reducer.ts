import { createReducer, on } from '@ngrx/store';
import { loginUserAction, loginUserFail, loginUserSuccess } from './user.action';
import { LoginState } from "./user.type";




export interface UserStore {
    // error: string | null;
    userLogin: LoginState
    // loading: boolean
}
export const userLoginState: UserStore = {
    // error: null,
    userLogin: {
        accessToken: '',
        refreshToken: '',
    },
}

const userLoginReducer = createReducer(
    userLoginState,
    on(loginUserAction, (state, action) => {
        return {
            ...state,
        }
    }),
    on(loginUserSuccess, (state, action) => {
        return {
            ...state,
            userLogin: {
                accessToken: action.userLogin.accessToken,
                refreshToken: action.userLogin.refreshToken
            }
        }
    }),
    on(loginUserFail, (state, action) => {
        return {
            ...state,

        }
    }),
)
export function reducer(state: any, action: any) {
    return userLoginReducer(state, action)
}