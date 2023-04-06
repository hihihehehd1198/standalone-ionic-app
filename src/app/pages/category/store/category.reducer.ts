import { createReducer, on } from "@ngrx/store";
import * as Lodash from 'lodash'
import { addCategoryAction, addCategoryActionFailure, addCategoryActionSuccess, deleteCategoryAction, deleteCategoryActionFailure, deleteCategoryActionSuccess, getCategoryAction, getCategoryActionFailure, getCategoryActionSuccess, updateCategoryAction, updateCategoryActionFailure, updateCategoryActionSuccess } from "./category.action";
import { CategoryItem, CategoryState } from "./category.types";

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
        let newListCategory = Lodash.cloneDeep(state.listCategory)
        newListCategory = [...newListCategory].map((x: CategoryItem) => {
            if (x.id === action.categoryItem.id) {
                x = action.categoryItem
            }
            return x
        })
        return {
            ...state,
            loading: false,
            listCategory: newListCategory
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
        const filter = [...state.listCategory].filter((value) => {
            return [...action.categoryId].indexOf(+value['id']) == -1
        })
        return {
            ...state,
            loading: false,
            listCategory: [...filter]
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