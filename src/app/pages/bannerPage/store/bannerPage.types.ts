

const GET_BANNER_ACTION = "GET_BANNER_ACTION"
const GET_BANNER_ACTION_SUCCESS = "GET_BANNER_ACTION_SUCCESS"
const GET_BANNER_ACTION_FAILURE = "GET_BANNER_ACTION_FAILURE"

const UPDATE_BANNER_ACTION = "UPDATE_BANNER_ACTION"
const UPDATE_BANNER_ACTION_FAILURE = "UPDATE_BANNER_ACTION_FAILURE"
const UPDATE_BANNER_ACTION_SUCCESS = "UPDATE_BANNER_ACTION_SUCCESS"

const CREATE_BANNER_ACTION = "CREATE_BANNER_ACTION"
const CREATE_BANNER_ACTION_FAILURE = "CREATE_BANNER_ACTION_FAILURE"
const CREATE_BANNER_ACTION_SUCCESS = "CREATE_BANNER_ACTION_SUCCESS"

const DELETE_BANNER_ACTION = "DELETE_BANNER_ACTION"
const DELETE_BANNER_ACTION_SUCCESS = "DELETE_BANNER_ACTION_SUCCESS"
const DELETE_BANNER_ACTION_FAILURE = "DELETE_BANNER_ACTION_FAILURE"


interface BannerItem {
    id: number | string,
    adminId: number | string
    img: string | File
    location: string
}
interface BannerState {
    error: string,
    loading: boolean,
    listBanner: BannerItem[]
}

export {
    GET_BANNER_ACTION,
    GET_BANNER_ACTION_SUCCESS,
    GET_BANNER_ACTION_FAILURE,

    UPDATE_BANNER_ACTION,
    UPDATE_BANNER_ACTION_SUCCESS,
    UPDATE_BANNER_ACTION_FAILURE,

    CREATE_BANNER_ACTION,
    CREATE_BANNER_ACTION_SUCCESS,
    CREATE_BANNER_ACTION_FAILURE,

    DELETE_BANNER_ACTION,
    DELETE_BANNER_ACTION_SUCCESS,
    DELETE_BANNER_ACTION_FAILURE,

    BannerItem,
    BannerState,
}