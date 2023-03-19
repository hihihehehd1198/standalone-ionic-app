import { createAction, props } from "@ngrx/store";
import { AccountItem, AccountState, CREATE_ACCOUNT, CREATE_ACCOUNT_FAILURE, CREATE_ACCOUNT_SUCCESS, DELETE_ACCOUNT, DELETE_ACCOUNT_FAILURE, DELETE_ACCOUNT_SUCCESS, EDIT_ACCOUNT, EDIT_ACCOUNT_FAILURE, EDIT_ACCOUNT_SUCCESS, GET_LIST_ACCOUNT, GET_LIST_ACCOUNT_FAILURE, GET_LIST_ACCOUNT_SUCCESS } from "./account.types";

const getListAccountAction = createAction(GET_LIST_ACCOUNT)

type AccountList = Pick<AccountState, "listAccount">
type ErrorMessageType = { error: string }
interface AccountItemProp {
    accountItem: AccountItem
}

const getListAccountActionSuccess = createAction(GET_LIST_ACCOUNT_SUCCESS, props<AccountList>())

const getListAccountActionFailure = createAction(GET_LIST_ACCOUNT_FAILURE, props<ErrorMessageType>())

const updateListAccountAction = createAction(EDIT_ACCOUNT, props<AccountItemProp>())

const updateListAccountActionFailure = createAction(EDIT_ACCOUNT_FAILURE, props<ErrorMessageType>())

const updateListAccountActionSuccess = createAction(EDIT_ACCOUNT_SUCCESS, props<AccountItemProp>())

const createAccountAction = createAction(CREATE_ACCOUNT, props<AccountItemProp>())

const createAccountActionSuccess = createAction(CREATE_ACCOUNT_SUCCESS, props<AccountItemProp>())

const createAccountActionFailure = createAction(CREATE_ACCOUNT_FAILURE, props<ErrorMessageType>())


const deleteAccountAction = createAction(DELETE_ACCOUNT, props<{ accountId: string[] | number[] }>())

const deleteAccountActionFailure = createAction(DELETE_ACCOUNT_FAILURE, props<ErrorMessageType>())

const deleteAccountActionSuccess = createAction(DELETE_ACCOUNT_SUCCESS, props<{ accountId: string[] | number[] }>())

export {
    getListAccountAction,
    getListAccountActionFailure,
    getListAccountActionSuccess,

    updateListAccountAction,
    updateListAccountActionFailure,
    updateListAccountActionSuccess,

    createAccountAction,
    createAccountActionFailure,
    createAccountActionSuccess,

    deleteAccountAction,
    deleteAccountActionFailure,
    deleteAccountActionSuccess
}