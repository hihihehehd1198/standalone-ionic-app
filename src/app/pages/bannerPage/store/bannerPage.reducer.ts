import { createReducer, on } from '@ngrx/store';
import {
    createBannerAction,
    createBannerActionFailure,
    createBannerActionSuccess,
    deleteBannerAction,
    deleteBannerActionFailure,
    deleteBannerActionSuccess,
    getBannerAction,
    getBannerActionFailure,
    getBannerActionSuccess,
    updateBannerAction,
    updateBannerActionFailure,
    updateBannerActionSuccess,
} from './bannerPage.action';
import { BannerState } from './bannerPage.types';

const initState: BannerState = {
    loading: false,
    error: '',
    listBanner: [],
};

const bannerReducer = createReducer(
    initState,
    on(getBannerAction, (state) => {
        return { ...state, loading: true };
    }),
    on(getBannerActionSuccess, (state, action) => {
        return { ...state, listBanner: action.listBanner };
    }),
    on(getBannerActionFailure, (state, action) => {
        return { ...state, error: action.error, loading: false };
    }),
    on(updateBannerAction, (state, action) => {
        return { ...state, loading: false };
    }),
    on(updateBannerActionSuccess, (state, action) => {
        return { ...state, loading: false };
    }),
    on(updateBannerActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error };
    }),
    on(deleteBannerAction, (state, action) => {
        return { ...state, loading: true };
    }),
    on(deleteBannerActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
        }
    }),
    on(deleteBannerActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(createBannerAction, (state, action) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(createBannerActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,

        }
    }),
    on(createBannerActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    })
);

export default bannerReducer;
