import { createReducer, on } from '@ngrx/store';
import { OrderState } from './order.types';
import { createOrderAction, createOrderActionFailure, createOrderActionSuccess, deleteOrderAction, deleteOrderActionFailure, deleteOrderActionSuccess, getOrderListAction, getOrderListActionSuccess, getOrderlistActionFailure, updateOrderAction, updateOrderActionFailure, updateOrderActionSuccess } from './order.action';

const initState: OrderState = {
    listOrder: [],
    loading: false,
    error: '',
};

const orderReducer = createReducer(
    initState,
    on(getOrderListAction, (state, action) => {
        return {
            ...state,
            loading: true,
            error: '',
        };
    }),
    on(getOrderListActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listOrder: action.listOrder,
        };
    }),
    on(getOrderlistActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(createOrderAction, (state, action) => {
        return {
            ...state,
            loading: true,
            error: ""
        }
    }),
    on(createOrderActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(createOrderActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),

    on(updateOrderAction, (state, action) => {
        return {
            ...state,
            loading: true,
            error: "",
        }
    }),
    on(updateOrderActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
        }
    }),
    on(updateOrderActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),

    on(deleteOrderAction, (state, action) => {
        return {
            ...state,
            loading: true,
            error: "",

        }
    }),
    on(deleteOrderActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,

        }
    }),
    on(deleteOrderActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    })

);

export default orderReducer