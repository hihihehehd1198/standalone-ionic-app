import { createReducer, on } from "@ngrx/store";
import { addCustomerAction, addCustomerActionFailure, addCustomerActionSuccess, deleteCustomerAction, deleteCustomerActionFailure, deleteCustomerActionSuccess, getCustomerAction, getCustomerActionFailure, getCustomerActionSuccess, updateCustomerAction, updateCustomerActionFailure, updateCustomerActionSuccess } from "./customer.action";
import { CustomerState } from "./customer.types";

const initState: CustomerState = {
    loading: false,
    listCustomer: [],
    error: ''
}
const CustomerReducer = createReducer(
    initState,
    on(getCustomerAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getCustomerActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listCustomer: action.listCustomer,
        }
    }),
    on(getCustomerActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(updateCustomerAction, (state, action) => {
        return {
            ...state,
            loading: true,

        }
    }),
    on(updateCustomerActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
        }
    }),
    on(updateCustomerActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(deleteCustomerAction, (state, action) => {
        return {
            ...state,
            loading: true,

        }
    }),
    on(deleteCustomerActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
        }
    }),
    on(deleteCustomerActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(addCustomerAction, (state, action) => {
        return {
            ...state,
            loading: true,

        }
    }),
    on(addCustomerActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listCustomer: [...state.listCustomer, action.CustomerItem]
        }
    }),
    on(addCustomerActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    })
)

export default CustomerReducer