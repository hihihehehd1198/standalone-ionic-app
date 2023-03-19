import { createAction, props } from "@ngrx/store";
import { CREATE_SERIVCE_FAILURE, CREATE_SERVICE, CREATE_SERVICE_SUCCESS, DELETE_SERVICE, DELETE_SERVICE_FAILURE, DELETE_SERVICE_SUCCESS, GET_LIST_SERVICE, GET_LIST_SERVICE_FAILURE, GET_LIST_SERVICE_SUCCESS, ServiceItem, UPDATE_SERVICE, UPDATE_SERVICE_FAILURE, UPDATE_SERVICE_SUCCESS } from "./servicePage.types";



const getServicePageAction = createAction(GET_LIST_SERVICE)

const getServicePageActionSuccess = createAction(GET_LIST_SERVICE_SUCCESS,
    props<{ listService: ServiceItem[] }>())

const getServicePageActionFailure = createAction(GET_LIST_SERVICE_FAILURE, props<{ error: string }>())

const updateServicePageActionSuccess = createAction(UPDATE_SERVICE_SUCCESS, props<{ serivceItem: ServiceItem }>())


const updateServicePageAction = createAction(UPDATE_SERVICE, props<{ serivceItem: ServiceItem }>())

const updateServicePageActionFailure = createAction(UPDATE_SERVICE_FAILURE, props<{ error: string }>())

const createServiceAction = createAction(CREATE_SERVICE, props<{ serviceItem: ServiceItem }>())

const createServiceActionSuccess = createAction(CREATE_SERVICE_SUCCESS, props<{
    serviceItem: ServiceItem
}>())

const createServiceActionFailure = createAction(CREATE_SERIVCE_FAILURE, props<{ error: string }>())

const deleteServiceAction = createAction(DELETE_SERVICE, props<{
    serviceId: string[] | number[]
}>())
const deleteServiceActionFailure = createAction(DELETE_SERVICE_FAILURE, props<{ error: string }>())

const deleteServiceActionSuccess = createAction(DELETE_SERVICE_SUCCESS, props<{
    serviceId: string[] | number[]
}>())

export {
    deleteServiceAction,
    deleteServiceActionFailure,
    deleteServiceActionSuccess,

    getServicePageAction,
    getServicePageActionFailure,
    getServicePageActionSuccess,

    updateServicePageAction,
    updateServicePageActionFailure,
    updateServicePageActionSuccess,

    createServiceAction,
    createServiceActionFailure,
    createServiceActionSuccess,
}