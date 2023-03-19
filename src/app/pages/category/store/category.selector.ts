import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppStateType } from "../../article/store/article.selector"
import { CategoryState } from "./category.types"



export const CategoryFeatureSelector = createFeatureSelector<AppStateType, CategoryState>('categoryState')

// export const CategorySelectorType = (state: AppStateType) => state.Category
export const CategorySelector = createSelector(CategoryFeatureSelector, (CategoryState: CategoryState) => CategoryState.listCategory)