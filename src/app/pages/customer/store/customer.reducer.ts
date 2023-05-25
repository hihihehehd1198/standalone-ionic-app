import * as Lodash from 'lodash'
import { createReducer, on } from "@ngrx/store";
import { addCustomerAction, addCustomerActionFailure, addCustomerActionSuccess, deleteCustomerAction, deleteCustomerActionFailure, deleteCustomerActionSuccess, getCustomerAction, getCustomerActionFailure, getCustomerActionSuccess, updateCustomerAction, updateCustomerActionFailure, updateCustomerActionSuccess } from "./customer.action";
import { CustomerItem, CustomerState } from "./customer.types";

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
            loading: true,
            error: '',
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
            error: '',

        }
    }),
    on(updateCustomerActionSuccess, (state, action) => {
        let newListCustomer = Lodash.cloneDeep(state.listCustomer)
        newListCustomer = [...newListCustomer].map((x: CustomerItem) => {
            if (x.id === action.CustomerItem.id) {
                x = action.CustomerItem
            }
            return x
        })
        return {
            ...state,
            loading: false,
            listCustomer: newListCustomer
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
            error: '',
        }
    }),
    on(deleteCustomerActionSuccess, (state, action) => {
        const filter = [...state.listCustomer].filter((value) => {
            return [...action.CustomerId].indexOf(value['id'] as number) == -1
        })
        return {
            ...state,
            loading: false,
            listCustomer: filter,
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
            error: '',
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