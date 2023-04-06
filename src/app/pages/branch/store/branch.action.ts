import { createAction, props } from "@ngrx/store";
import { CREATE_BANNER_ACTION } from "../../bannerPage/store/bannerPage.types";
import { BranchItem, CREATE_BRANCH_FAILURE, CREATE_BRANCH_SUCCESS, DELETE_BRANCH, DELETE_BRANCH_FAILURE, DELETE_BRANCH_SUCCESS, GET_BRANCH, GET_BRANCH_FAILURE, GET_BRANCH_SUCCESS, UPDATE_BRANCH, UPDATE_BRANCH_FAILURE, UPDATE_BRANCH_SUCCESS } from "./branch.types";



const getBranchAction = createAction(GET_BRANCH)

const getBranchActionSuccess = createAction(GET_BRANCH_SUCCESS, props<{ listBranch: BranchItem[] }>())

const getBranchActionFailure = createAction(GET_BRANCH_FAILURE, props<{
    error: string
}>())

const createBranchAction = createAction(CREATE_BANNER_ACTION, props<{ branchItem: BranchItem }>())

const createBranchActionSuccess = createAction(CREATE_BRANCH_SUCCESS, props<{ branchItem: BranchItem }>())

const createBranchActionFailure = createAction(CREATE_BRANCH_FAILURE, props<{ error: string }>())

const updateBranchAction = createAction(UPDATE_BRANCH, props<{ branchItem: BranchItem }>())

const updateBranchActionSuccess = createAction(UPDATE_BRANCH_SUCCESS, props<{
    branchItem: BranchItem
}>())

const updateBranchActionFailure = createAction(UPDATE_BRANCH_FAILURE, props<{ error: string }>())

const deleteBranchAction = createAction(DELETE_BRANCH, props<{ branchId: number[] }>())

const deleteBranchActionSuccess = createAction(DELETE_BRANCH_SUCCESS, props<{
    branchId: number[]
}>())

const deleteBranchActionFailure = createAction(DELETE_BRANCH_FAILURE, props<{ error: string }>())

export {
    getBranchAction,
    getBranchActionFailure,
    getBranchActionSuccess,

    updateBranchAction,
    updateBranchActionFailure,
    updateBranchActionSuccess,

    createBranchAction,
    createBranchActionFailure,
    createBranchActionSuccess,

    deleteBranchAction,
    deleteBranchActionFailure,
    deleteBranchActionSuccess,
}