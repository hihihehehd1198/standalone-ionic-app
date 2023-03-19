


const ADD_CATEGORY = "ADD_CATEGORY"
const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS"
const ADD_CATEGORY_FAILURE = "ADD_CATEGORY_FAILURE"

const GET_CATEGORY = "GET_CATEGORY"
const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS"
const GET_CATEGORY_FAILURE = "GET_CATEGORY_FAILURE"

const UPDATE_CATEGORY = "UPDATE_CATEGORY"
const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS"
const UPDATE_CATEGORY_FAILURE = "UPDATE_CATEGORY_FAILURE"

const DELETE_CATEGORY = "DELETE_CATEGORY"
const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS"
const DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE"

interface CategoryItem {
    id: number,
    name: string,
    status: boolean
}

interface CategoryState {
    loading: boolean,
    listCategory: CategoryItem[],
    error: string,
}

export {
    ADD_CATEGORY,
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS,

    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,

    GET_CATEGORY,
    GET_CATEGORY_FAILURE,
    GET_CATEGORY_SUCCESS,

    DELETE_CATEGORY,
    DELETE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,

    CategoryItem,
    CategoryState
}