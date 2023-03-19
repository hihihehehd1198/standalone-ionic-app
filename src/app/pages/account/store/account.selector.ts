import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppStateType } from "../../article/store/article.selector"
import { AccountState } from "./account.types"

export const AccountFeatureSelector = createFeatureSelector<AppStateType, AccountState>('accountState')

// export const AccountSelectorType = (state: AppStateType) => state.Account
export const AccountSelector = createSelector(AccountFeatureSelector, (AccountState: AccountState) => AccountState.listAccount)
