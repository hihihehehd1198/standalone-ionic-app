import { createReducer } from "@ngrx/store";
import { BranchState } from "./branch.types";


const initState: BranchState = {
    loading: false,
    listBranch: [],
    error: ''
}

// const branchReducer = createReducer(
//     initState,
//     on(getbranch)
// )