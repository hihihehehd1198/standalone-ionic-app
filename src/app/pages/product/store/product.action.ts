import { createAction, props } from '@ngrx/store';
import {
    CREATE_PRODUCT_ACTION,
    CREATE_PRODUCT_ACTION_FAILURE,
    CREATE_PRODUCT_ACTION_SUCCESS,
    DELETE_PRODUCT_ACTION,
    DELETE_PRODUCT_ACTION_SUCCESS,
    GET_PRODUCT_ACTION,
    GET_PRODUCT_ACTION_FAILURE,
    GET_PRODUCT_ACTION_SUCCESS,
    ProductItem,
    UPDATE_PRODUCT_ACTION,
    UPDATE_PRODUCT_ACTION_FAILURE,
    UPDATE_PRODUCT_ACTION_SUCCESS,
} from './product.type';

const createProductAction = createAction(
    CREATE_PRODUCT_ACTION,
    props<{ productItem: Omit<ProductItem, 'id'> }>()
);
const createProductActionSuccess = createAction(
    CREATE_PRODUCT_ACTION_SUCCESS,
    props<{
        productItem: ProductItem;
    }>()
);
const createProductActionFailure = createAction(
    CREATE_PRODUCT_ACTION_FAILURE,
    props<{ error: string }>()
);

const updateProductAction = createAction(
    UPDATE_PRODUCT_ACTION,
    props<{ productItem: Omit<ProductItem, 'id'> }>()
);
const updateProductActionSuccess = createAction(
    UPDATE_PRODUCT_ACTION_SUCCESS,
    props<{
        productItem: ProductItem;
    }>()
);
const updateProductActionFailure = createAction(
    UPDATE_PRODUCT_ACTION_FAILURE,
    props<{ error: string }>()
);

const deleteProductAction = createAction(
    DELETE_PRODUCT_ACTION,
    props<{ id: number[] }>()
);
const deleteProductActionSuccess = createAction(DELETE_PRODUCT_ACTION_SUCCESS, props<{ id: number[] }>());

const deleteProductActionFailure = createAction(
    CREATE_PRODUCT_ACTION_FAILURE,
    props<{ error: string }>()
);

const getProductAction = createAction(GET_PRODUCT_ACTION);
const getProductActionSuccess = createAction(
    GET_PRODUCT_ACTION_SUCCESS,
    props<{
        listProductItem: ProductItem[];
    }>()
);
const getProductActionFailure = createAction(
    GET_PRODUCT_ACTION_FAILURE,
    props<{ error: string }>()
);


export {
    getProductAction,
    getProductActionFailure,
    getProductActionSuccess,

    createProductAction,
    createProductActionFailure,
    createProductActionSuccess,

    updateProductAction,
    updateProductActionSuccess,
    updateProductActionFailure,

    deleteProductAction,
    deleteProductActionFailure,
    deleteProductActionSuccess,

}