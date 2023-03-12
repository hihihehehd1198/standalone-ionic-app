import { userLoginState } from './user.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateType } from "../../article/store/article.selector";
import { LoginState } from "./user.type";





export const userLoginFeatureSelector = createFeatureSelector<AppStateType, LoginState>('userLogin')

export const userSelector = createSelector(userLoginFeatureSelector, (userState: LoginState) => userState.user)
