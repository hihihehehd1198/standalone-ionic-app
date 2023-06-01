import { createAction, props } from '@ngrx/store';
import {
    CREATE_ORDER_LIST,
    CREATE_ORDER_LIST_FAILURE,
    CREATE_ORDER_LIST_SUCCESS,
    DELETE_ORDER_LIST,
    DELETE_ORDER_LIST_FAILURE,
    DELETE_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_ACTION,
    GET_ORDER_LIST_FAILURE,
    GET_ORDER_LIST_SUCCESS,
    OrderItem,
    UPDATE_ORDER_LIST,
    UPDATE_ORDER_LIST_FAILURE,
    UPDATE_ORDER_LIST_SUCCESS,
} from './order.types';

const createOrderAction = createAction(
    CREATE_ORDER_LIST,
    props<{
        orderItem: OrderItem;
    }>()
);
const createOrderActionSuccess = createAction(
    CREATE_ORDER_LIST_SUCCESS,
    props<{
        orderItem: OrderItem;
    }>()
);

const createOrderActionFailure = createAction(
    CREATE_ORDER_LIST_FAILURE,
    props<{
        error: string;
    }>()
);

const updateOrderAction = createAction(UPDATE_ORDER_LIST,
    props<{ orderItem: OrderItem }>())



const updateOrderActionSuccess = createAction(UPDATE_ORDER_LIST_SUCCESS,
    props<{ orderItem: OrderItem }>())


const updateOrderActionFailure = createAction(
    UPDATE_ORDER_LIST_FAILURE,
    props<{
        error: string;
    }>()
);

const deleteOrderAction = createAction(DELETE_ORDER_LIST, props<{
    id: number[]
}>())


const deleteOrderActionSuccess = createAction(DELETE_ORDER_LIST_SUCCESS, props<{
    id: number[]
}>())

const deleteOrderActionFailure = createAction(
    DELETE_ORDER_LIST_FAILURE,
    props<{
        error: string;
    }>()
);

const getOrderListAction = createAction(GET_ORDER_LIST_ACTION)
const getOrderListActionSuccess = createAction(GET_ORDER_LIST_SUCCESS, props<{
    listOrder: OrderItem[],
}>())

const getOrderlistActionFailure = createAction(GET_ORDER_LIST_FAILURE, props<{
    error: string
}>())


export {
    createOrderAction,
    createOrderActionFailure,
    createOrderActionSuccess,

    updateOrderAction,
    updateOrderActionFailure,
    updateOrderActionSuccess,

    deleteOrderAction,
    deleteOrderActionFailure,
    deleteOrderActionSuccess,

    getOrderListAction,
    getOrderListActionSuccess,
    getOrderlistActionFailure,

}