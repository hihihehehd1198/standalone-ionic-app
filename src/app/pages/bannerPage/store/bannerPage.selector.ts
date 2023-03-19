import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppStateType } from "../../article/store/article.selector"
import { BannerState } from "./bannerPage.types"




export const ArticleFeatureSelector = createFeatureSelector<BannerState>('banner')

// export const articleSelectorType = (state: AppStateType) => state.article
export const articleSelector = createSelector(ArticleFeatureSelector, (articleState: BannerState) => articleState.listBanner)