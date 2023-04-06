import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash'
import {
    createServiceAction,
    createServiceActionFailure,
    createServiceActionSuccess,
    deleteServiceAction,
    deleteServiceActionFailure,
    deleteServiceActionSuccess,
    getServicePageAction,
    getServicePageActionFailure,
    getServicePageActionSuccess,
    updateServicePageAction,
    updateServicePageActionFailure,
    updateServicePageActionSuccess,
} from './servicePage.action';
import { ServiceItem, ServiceState } from './servicePage.types';

const initState: ServiceState = {
    loading: false,
    error: '',
    listService: [],
};

const serviceReducer = createReducer(
    initState,
    on(getServicePageAction, (state, action) => {
        return { ...state, loading: true };
    }),
    on(getServicePageActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listService: action.listService,
        };
    }),
    on(getServicePageActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    }),
    on(createServiceAction, (state, action) => {
        return { ...state, loading: true };
    }),
    on(createServiceActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error };
    }),
    on(createServiceActionSuccess, (state, action) => {
        return { ...state, loading: false, listService: [...state.listService, action.serviceItem] };
    }),

    on(updateServicePageAction, (state, action) => {
        return { ...state, loading: true };
    }),
    on(updateServicePageActionSuccess, (state, action) => {
        let newListService = cloneDeep(state.listService)
        newListService = [...newListService].map((x: ServiceItem) => {
            if (x.id === action.serivceItem.id) {
                x = action.serivceItem
            }
            return x
        })
        return { ...state, loading: false, listService: newListService };
    }),
    on(updateServicePageActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error };
    }),

    on(deleteServiceAction, (state, action) => {
        return { ...state, loading: true };
    }),
    on(deleteServiceActionSuccess, (state, action) => {
        const filter = [...state.listService].filter((value) => {
            return [...action.serviceId].indexOf(+value['id']) == -1
        })
        return { ...state, loading: false, listService: [...filter] };
    }),
    on(deleteServiceActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error };
    })
);

export default serviceReducer;
