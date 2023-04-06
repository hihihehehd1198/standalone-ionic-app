import * as Lodash from 'lodash'
import { createReducer, on } from "@ngrx/store";
import { createAccountAction, createAccountActionSuccess, deleteAccountAction, deleteAccountActionFailure, deleteAccountActionSuccess, getListAccountAction, getListAccountActionFailure, getListAccountActionSuccess, updateListAccountAction, updateListAccountActionFailure, updateListAccountActionSuccess } from "./account.action";
import { AccountItem, AccountState } from "./account.types";



const initState: AccountState = {
    loading: false,
    listAccount: [],
    error: ''
}

const AccountReducer = createReducer(
    initState, on(getListAccountAction, (state, action) => {
        return { ...state, loading: true }
    }),
    on(getListAccountActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error }
    }),
    on(getListAccountActionSuccess, (state, action) => {
        console.log('update reducer')
        return {
            ...state,
            listAccount: action.listAccount,
            loading: false,
        }
    }),
    on(updateListAccountAction, (state, action) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(updateListAccountActionSuccess, (state, action) => {
        let newListAccount = Lodash.cloneDeep(state.listAccount)
        newListAccount = [...newListAccount].map((x: AccountItem) => {
            if (x.id === action.accountItem.id) {
                x = action.accountItem
            }
            return x
        })
        return {
            ...state,
            loading: false,
            listAccount: newListAccount
        }
    }),
    on(updateListAccountActionFailure, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false,
        }
    }),
    on(deleteAccountAction, (state, action) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(deleteAccountActionSuccess, (state, action) => {
        const filter = [...state.listAccount].filter((value) => {
            return [...action.accountId].indexOf(+value.id) == -1
        })
        return {
            ...state,
            loading: false,
            listAccount: [...filter]
        }
    }),
    on(deleteAccountActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(createAccountAction, (state, action) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(createAccountActionSuccess, (state, action) => {
        return {
            ...state,
            loading: true,
            listAccount: [...(state.listAccount), action.accountItem]
        }
    })
)

export default AccountReducer