const STATUS_API_PENDING = "STATUS_API_PENDING"
const STATUS_API_FAILURE = "STATUS_API_FAILURE"
const STATUS_API_SUCCESS = "STATUS_API_SUCCESS"

// enum LoadingStatusType {
//     GET_ARTICLE = 'GET_ARTICLE',
//     UPDATE_ARTICLE = 'UPDATE_ARTICLE',
//     CRETE_ARTICLE = 'CREATE_ARTICLE',

//     GET_USER = 'GET_USER',
//     CREATE_USER = 'CREATE_USER',
//     UPDATE_USER = "UPDATE_USER"

// }
enum ModuleAPI {
    ARTICLE = "ARTICLE",
    BANNER = "BANNER",
    BRAND = "BRAND",
    CATEGORY = "CATEGORY",
    CUSTOMER = "CUSTOMER",
    SERVICESHOP = "SERVICESHOP",
    USER = "USER",
    LOGIN = "LOGIN"
}

type statusAPI = "SUCCESS" | "ERROR" | "PENDING"
interface loadingStore {
    name: string,
    status: statusAPI,
    message: string
}
// interface store loading
interface LoadingState {
    listStatusAPI: loadingStore[]
}




export {
    ModuleAPI,
    statusAPI,
    loadingStore,
    LoadingState
}