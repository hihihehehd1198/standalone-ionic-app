import { createAction, props } from "@ngrx/store";
import { BannerItem, CREATE_BANNER_ACTION, CREATE_BANNER_ACTION_FAILURE, CREATE_BANNER_ACTION_SUCCESS, DELETE_BANNER_ACTION, DELETE_BANNER_ACTION_FAILURE, DELETE_BANNER_ACTION_SUCCESS, GET_BANNER_ACTION, GET_BANNER_ACTION_FAILURE, GET_BANNER_ACTION_SUCCESS, UPDATE_BANNER_ACTION, UPDATE_BANNER_ACTION_FAILURE, UPDATE_BANNER_ACTION_SUCCESS } from "./bannerPage.types";



const createBannerAction = createAction(CREATE_BANNER_ACTION, props<{ bannerItem: BannerItem }>())
const createBannerActionSuccess = createAction(CREATE_BANNER_ACTION_SUCCESS, props<{ bannerItem: BannerItem }>())

const createBannerActionFailure = createAction(CREATE_BANNER_ACTION_FAILURE, props<{ error: string }>())

const updateBannerAction = createAction(UPDATE_BANNER_ACTION, props<{
    banner: BannerItem
}>())
const updateBannerActionSuccess = createAction(UPDATE_BANNER_ACTION_SUCCESS, props<{ banner: BannerItem }>())
const updateBannerActionFailure = createAction(UPDATE_BANNER_ACTION_FAILURE, props<{ error: string }>())

const deleteBannerAction = createAction(DELETE_BANNER_ACTION, props<{ id: number[] }>())
const deleteBannerActionFailure = createAction(DELETE_BANNER_ACTION_FAILURE, props<{ error: string }>())
const deleteBannerActionSuccess = createAction(DELETE_BANNER_ACTION_SUCCESS, props<{ id: number[] }>())

const getBannerAction = createAction(GET_BANNER_ACTION)
const getBannerActionSuccess = createAction(GET_BANNER_ACTION_SUCCESS,
    props<{ listBanner: BannerItem[] }>())
const getBannerActionFailure = createAction(GET_BANNER_ACTION_FAILURE,
    props<{ error: string }>())


export {
    createBannerAction,
    createBannerActionSuccess,
    createBannerActionFailure,

    deleteBannerAction,
    deleteBannerActionFailure,
    deleteBannerActionSuccess,

    updateBannerAction,
    updateBannerActionSuccess,
    updateBannerActionFailure,

    getBannerAction,
    getBannerActionSuccess,
    getBannerActionFailure,
}
