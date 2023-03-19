import { createAction, props } from "@ngrx/store";
import { ADD_CUSTOMER, ADD_CUSTOMER_FAILURE, ADD_CUSTOMER_SUCCESS, CustomerItem, CustomerState, DELETE_CUSTOMER, DELETE_CUSTOMER_FAILURE, DELETE_CUSTOMER_SUCCESS, GET_CUSTOMER, GET_CUSTOMER_FAILURE, GET_CUSTOMER_SUCCESS, UPDATE_CUSTOMER, UPDATE_CUSTOMER_FAILURE, UPDATE_CUSTOMER_SUCCESS } from "./customer.types";


type CustomerList = Pick<CustomerState, 'listCustomer'>
interface ErrorMessageType {
    error: string
}

const getCustomerAction = createAction(GET_CUSTOMER)

const getCustomerActionSuccess = createAction(GET_CUSTOMER_SUCCESS, props<CustomerList>())

const getCustomerActionFailure = createAction(GET_CUSTOMER_FAILURE, props<ErrorMessageType>())

const updateCustomerAction = createAction(UPDATE_CUSTOMER, props<{ CustomerItem: CustomerItem }>())

const updateCustomerActionFailure = createAction(UPDATE_CUSTOMER_FAILURE, props<ErrorMessageType>())

const updateCustomerActionSuccess = createAction(UPDATE_CUSTOMER_SUCCESS, props<{ CustomerItem: CustomerItem }>())

const deleteCustomerAction = createAction(DELETE_CUSTOMER, props<{ CustomerId: number[] }>())

const deleteCustomerActionSuccess = createAction(DELETE_CUSTOMER_SUCCESS, props<{ CustomerId: number[] }>())


const deleteCustomerActionFailure = createAction(DELETE_CUSTOMER_FAILURE, props<ErrorMessageType>())

const addCustomerAction = createAction(ADD_CUSTOMER, props<{ CustomerItem: CustomerItem }>())

const addCustomerActionSuccess = createAction(ADD_CUSTOMER_SUCCESS, props<{ CustomerItem: CustomerItem }>())

const addCustomerActionFailure = createAction(ADD_CUSTOMER_FAILURE, props<ErrorMessageType>())

export {
    addCustomerAction,
    addCustomerActionFailure,
    addCustomerActionSuccess,

    getCustomerAction,
    getCustomerActionFailure,
    getCustomerActionSuccess,

    updateCustomerAction,
    updateCustomerActionFailure,
    updateCustomerActionSuccess,

    deleteCustomerAction,
    deleteCustomerActionFailure,
    deleteCustomerActionSuccess,
}