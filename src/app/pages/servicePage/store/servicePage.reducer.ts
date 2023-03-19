import { createReducer, on } from '@ngrx/store';
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
import { ServiceState } from './servicePage.types';

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
        return { ...state, loading: false };
    }),

    on(updateServicePageAction, (state, action) => {
        return { ...state, loading: true };
    }),
    on(updateServicePageActionSuccess, (state, action) => {
        return { ...state, loading: false };
    }),
    on(updateServicePageActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error };
    }),

    on(deleteServiceAction, (state, action) => {
        return { ...state, loading: true };
    }),
    on(deleteServiceActionSuccess, (state, action) => {
        return { ...state, loading: false, };
    }),
    on(deleteServiceActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error };
    })
);

export default serviceReducer;
