import { createAction, props } from "@ngrx/store";
import { ADD_CATEGORY, ADD_CATEGORY_FAILURE, ADD_CATEGORY_SUCCESS, CategoryItem, CategoryState, DELETE_CATEGORY, DELETE_CATEGORY_FAILURE, DELETE_CATEGORY_SUCCESS, GET_CATEGORY, GET_CATEGORY_FAILURE, GET_CATEGORY_SUCCESS, UPDATE_CATEGORY, UPDATE_CATEGORY_FAILURE, UPDATE_CATEGORY_SUCCESS } from "./category.types";


type CategoryList = Pick<CategoryState, 'listCategory'>
interface ErrorMessageType {
    error: string
}

const getCategoryAction = createAction(GET_CATEGORY)

const getCategoryActionSuccess = createAction(GET_CATEGORY_SUCCESS, props<CategoryList>())

const getCategoryActionFailure = createAction(GET_CATEGORY_FAILURE, props<{ error: string }>())

const updateCategoryAction = createAction(UPDATE_CATEGORY, props<{ categoryItem: CategoryItem }>())

const updateCategoryActionFailure = createAction(UPDATE_CATEGORY_FAILURE, props<ErrorMessageType>())

const updateCategoryActionSuccess = createAction(UPDATE_CATEGORY_SUCCESS, props<{ categoryItem: CategoryItem }>())

const deleteCategoryAction = createAction(DELETE_CATEGORY, props<{ categoryId: number[] }>())

const deleteCategoryActionSuccess = createAction(DELETE_CATEGORY_SUCCESS, props<{ categoryId: number[] }>())


const deleteCategoryActionFailure = createAction(DELETE_CATEGORY_FAILURE, props<ErrorMessageType>())

const addCategoryAction = createAction(ADD_CATEGORY, props<{ categoryItem: Omit<CategoryItem, 'id'> }>())

const addCategoryActionSuccess = createAction(ADD_CATEGORY_SUCCESS, props<{ categoryItem: CategoryItem }>())

const addCategoryActionFailure = createAction(ADD_CATEGORY_FAILURE, props<ErrorMessageType>())

export {
    addCategoryAction,
    addCategoryActionFailure,
    addCategoryActionSuccess,

    getCategoryAction,
    getCategoryActionFailure,
    getCategoryActionSuccess,

    updateCategoryAction,
    updateCategoryActionFailure,
    updateCategoryActionSuccess,

    deleteCategoryAction,
    deleteCategoryActionFailure,
    deleteCategoryActionSuccess,
}