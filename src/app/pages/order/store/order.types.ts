import { ProductItem } from "../../product/store/product.type"




const GET_ORDER_LIST_ACTION = "GET_ORDER_LIST"
const GET_ORDER_LIST_FAILURE = "GET_ORDER_LIST_FAILURE"
const GET_ORDER_LIST_SUCCESS = "GET_ORDER_LIST_SUCCESS"

const UPDATE_ORDER_LIST = "UPDATE_ORDER_LIST"
const UPDATE_ORDER_LIST_SUCCESS = "UPDATE_ORDER_LIST_SUCCESS"
const UPDATE_ORDER_LIST_FAILURE = "UPDATE_ORDER_LIST_FAILURE"

const DELETE_ORDER_LIST = "DELETE_ORDER_LIST"
const DELETE_ORDER_LIST_SUCCESS = "DELETE_ORDER_LIST_SUCCESS"
const DELETE_ORDER_LIST_FAILURE = "DELETE_ORDER_LIST_FAILURE"

const CREATE_ORDER_LIST = "CREATE_ORDER_LIST"
const CREATE_ORDER_LIST_SUCCESS = "CREATE_ORDER_LIST_SUCCESS"
const CREATE_ORDER_LIST_FAILURE = "CREATE_ORDER_LIST_FAILURE"


interface OrderItem {
    id?: number
    orderStatus: string,
    customerName: string,
    paymentStatus: boolean
    createdAt?: Date
    updatedAt?: Date
    productOrder?: Pick<ProductItem, 'id' | 'count' | 'name' | 'price'>[]
}

interface OrderState {
    loading: boolean,
    listOrder: OrderItem[],
    error: string
}


export {
    GET_ORDER_LIST_ACTION,
    GET_ORDER_LIST_FAILURE,
    GET_ORDER_LIST_SUCCESS,

    CREATE_ORDER_LIST,
    CREATE_ORDER_LIST_FAILURE,
    CREATE_ORDER_LIST_SUCCESS,

    UPDATE_ORDER_LIST,
    UPDATE_ORDER_LIST_FAILURE,
    UPDATE_ORDER_LIST_SUCCESS,

    DELETE_ORDER_LIST,
    DELETE_ORDER_LIST_FAILURE,
    DELETE_ORDER_LIST_SUCCESS,

    OrderItem,
    OrderState,
}