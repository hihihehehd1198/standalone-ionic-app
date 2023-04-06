import { createReducer, on } from "@ngrx/store";
import { createBranchAction, createBranchActionFailure, createBranchActionSuccess, deleteBranchAction, deleteBranchActionSuccess, getBranchAction, getBranchActionFailure, getBranchActionSuccess, updateBranchAction, updateBranchActionFailure, updateBranchActionSuccess } from "./branch.action";
import { BranchState } from "./branch.types";
import { cloneDeep } from 'lodash'


const initState: BranchState = {
    loading: false,
    listBranch: [],
    error: ''
}

const branchReducer = createReducer(
    initState,

    on(getBranchAction, (state, action) => {
        return {
            ...state,
            loading: true,

        }
    }),
    on(getBranchActionSuccess, ((state, action) => {
        return {
            ...state,
            loading: false,
            listBranch: action.listBranch
        }
    })),
    on(getBranchActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(updateBranchAction, (state, action) => {
        return {
            ...state,
            loading: true,

        }
    }),
    on(updateBranchActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
        }
    }),
    on(updateBranchActionSuccess, (state, action) => {
        const newListBranch = cloneDeep(state.listBranch).map(x => {
            return action.branchItem.id == x.id ? action.branchItem : x
        })
        console.log(newListBranch)
        return {
            ...state,
            loading: false,
            listBranch: newListBranch
        }
    }),
    on(deleteBranchAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(deleteBranchActionSuccess, (state, action) => {
        const filter = [...state.listBranch].filter((value) => {
            return [...action.branchId].indexOf(value['id'] as number) == -1
        })
        return {
            ...state,
            loading: false,

        }
    }),
    on(createBranchAction, (state, action) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(createBranchActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listBranch: [...state.listBranch, action.branchItem]
        }
    }),
    on(createBranchActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    })
)

export default branchReducer