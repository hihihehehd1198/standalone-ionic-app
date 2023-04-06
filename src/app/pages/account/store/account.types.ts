



const EDIT_ACCOUNT = "[User] EDIT_ACCOUNT"
const EDIT_ACCOUNT_SUCCESS = "[User] EDIT_ACCOUNT_SUCCESS"
const EDIT_ACCOUNT_FAILURE = "[User] EDIT_ACCOUNT_FAILURE"

const DELETE_ACCOUNT = "[User] DELETE_ACCOUNT"
const DELETE_ACCOUNT_SUCCESS = "[User] DELETE_ACCOUNT_SUCCESS"
const DELETE_ACCOUNT_FAILURE = "[User] DELETE_ACCOUNT_FAILURE"

const CREATE_ACCOUNT = "[User] CREATE_ACCOUNT"
const CREATE_ACCOUNT_SUCCESS = "[User] CREATE_ACCOUNT_SUCCESS"
const CREATE_ACCOUNT_FAILURE = "[User] CREATE_ACCOUNT_FAILURE"

const GET_LIST_ACCOUNT = "[User] GET_LIST_ACCOUNT"
const GET_LIST_ACCOUNT_SUCCESS = "[User] GET_LIST_ACCOUNT_SUCCESS"
const GET_LIST_ACCOUNT_FAILURE = "[User] GET_LIST_ACCOUNT_FAILURE"

interface AccountItem {
    id: string
    username: string,
    Role: string,
    email: string,
    PhoneNumber: string,
    hashedPassword: string,
}

export type AccountProps = Omit<AccountItem, "id" | "hashedPassword"> & { password: string }

interface AccountState {
    loading: boolean,
    listAccount: AccountItem[],
    error: string,
}
type AccountList = Pick<AccountState, "listAccount">
type ErrorMessageType = { error: string }
interface AccountItemProp {
    accountItem: AccountItem
}
interface NewAccountType {
    accountItem: AccountProps
}

interface UpdateAccountProps {
    accountItem: Omit<AccountItem, 'hashedPassword'> & { password: string }
}

export {
    GET_LIST_ACCOUNT,
    GET_LIST_ACCOUNT_FAILURE,
    GET_LIST_ACCOUNT_SUCCESS,

    EDIT_ACCOUNT,
    EDIT_ACCOUNT_FAILURE,
    EDIT_ACCOUNT_SUCCESS,

    DELETE_ACCOUNT,
    DELETE_ACCOUNT_FAILURE,
    DELETE_ACCOUNT_SUCCESS,

    CREATE_ACCOUNT,
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_SUCCESS,

    AccountItem,
    AccountState,
    AccountList,
    AccountItemProp,
    NewAccountType,
    ErrorMessageType,
    UpdateAccountProps
}


