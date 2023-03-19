import { createFeatureSelector, createSelector } from "@ngrx/store"
import { BranchState } from "./branch.types"

export const BranchFeatureSelector = createFeatureSelector<BranchState>('Branch')

// export const BranchSelectorType = (state: AppStateType) => state.Branch
export const BranchSelector = createSelector(BranchFeatureSelector, (BranchState: BranchState) => BranchState.listBranch)
