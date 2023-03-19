import { createReducer, on } from "@ngrx/store";
import { createAccountAction, createAccountActionSuccess, deleteAccountAction, deleteAccountActionFailure, deleteAccountActionSuccess, getListAccountAction, getListAccountActionFailure, getListAccountActionSuccess, updateListAccountAction, updateListAccountActionFailure, updateListAccountActionSuccess } from "./account.action";
import { AccountState } from "./account.types";



const initState: AccountState = {
    loading: false,
    listAccount: [],
    error: ''
}

const accountReducer = createReducer(
    initState, on(getListAccountAction, (state, action) => {
        return { ...state, loading: true }
    }),
    on(getListAccountActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error }
    }),
    on(getListAccountActionSuccess, (state, action) => {
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
        return {
            ...state,
            loading: false,

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
        return {
            ...state,
            loading: false,
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

export default accountReducer