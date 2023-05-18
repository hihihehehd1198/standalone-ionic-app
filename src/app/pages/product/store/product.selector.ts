


import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppStateType } from "../../article/store/article.selector"
import { ProductState } from "./product.type"




export const ArticleFeatureSelector = createFeatureSelector<ProductState>('productState')

// export const articleSelectorType = (state: AppStateType) => state.article
export const articleSelector = createSelector(ArticleFeatureSelector, (articleState: ProductState) => articleState.listProductItem)