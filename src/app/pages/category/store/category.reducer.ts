import { createReducer, on } from "@ngrx/store";
import { addCategoryAction, addCategoryActionFailure, addCategoryActionSuccess, deleteCategoryAction, deleteCategoryActionFailure, deleteCategoryActionSuccess, getCategoryAction, getCategoryActionFailure, getCategoryActionSuccess, updateCategoryAction, updateCategoryActionFailure, updateCategoryActionSuccess } from "./category.action";
import { CategoryState } from "./category.types";

const initState: CategoryState = {
    loading: false,
    listCategory: [],
    error: ''
}
const categoryReducer = createReducer(
    initState,
    on(getCategoryAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getCategoryActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listCategory: action.listCategory,
        }
    }),
    on(getCategoryActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(updateCategoryAction, (state, action) => {
        return {
            ...state,
            loading: true,

        }
    }),
    on(updateCategoryActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
        }
    }),
    on(updateCategoryActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(deleteCategoryAction, (state, action) => {
        return {
            ...state,
            loading: true,

        }
    }),
    on(deleteCategoryActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
        }
    }),
    on(deleteCategoryActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),
    on(addCategoryAction, (state, action) => {
        return {
            ...state,
            loading: true,

        }
    }),
    on(addCategoryActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listCategory: [...state.listCategory, action.categoryItem]
        }
    }),
    on(addCategoryActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    })
)

export default categoryReducer