import * as Lodash from 'lodash';
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
import { BannerItem, BannerState } from './bannerPage.types';

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
        return { ...state, listBanner: action.listBanner, loading: false };
    }),
    on(getBannerActionFailure, (state, action) => {
        return { ...state, error: action.error, loading: false };
    }),
    on(updateBannerAction, (state, action) => {
        return { ...state, loading: false };
    }),
    on(updateBannerActionSuccess, (state, action) => {
        let newListBanner = Lodash.cloneDeep(state.listBanner)
        newListBanner = [...newListBanner].map((x: BannerItem) => {
            if (x.id === action.banner.id) {
                x = action.banner
            }
            return x
        })
        return { ...state, loading: false, listBanner: newListBanner };

    }),
    on(updateBannerActionFailure, (state, action) => {
        return { ...state, loading: false, error: action.error };
    }),
    on(deleteBannerAction, (state, action) => {
        return { ...state, loading: true };
    }),
    on(deleteBannerActionSuccess, (state, action) => {
        const filter = [...state.listBanner].filter((value) => {
            return [...action.id].indexOf(+value['id']) == -1
        })
        return {
            ...state,
            loading: false,
            listBanner: [...filter]
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
            listBanner: [...state.listBanner, action.bannerItem]

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
