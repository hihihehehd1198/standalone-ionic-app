


import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppStateType } from "../../article/store/article.selector"
import { ServiceState } from "./servicePage.types"



export const ArticleFeatureSelector = createFeatureSelector<ServiceState>('servicePage')

// export const articleSelectorType = (state: AppStateType) => state.article
export const articleSelector = createSelector(ArticleFeatureSelector, (servicePageState: ServiceState) => servicePageState.listService)