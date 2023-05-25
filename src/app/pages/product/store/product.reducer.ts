import * as Lodash from 'lodash';
import { createReducer, on } from '@ngrx/store';
import { ProductItem, ProductState } from './product.type';
import {
    createProductAction,
    createProductActionFailure,
    createProductActionSuccess,
    deleteProductAction,
    deleteProductActionFailure,
    deleteProductActionSuccess,
    getProductAction,
    getProductActionFailure,
    getProductActionSuccess,
    updateProductAction,
    updateProductActionFailure,
    updateProductActionSuccess,
} from './product.action';

const initState: ProductState = {
    error: '',
    listProductItem: [],
    loading: false,
};
const ProductReducer = createReducer(
    initState,
    on(getProductAction, (state, action) => {
        return {
            ...state,
            loading: true,
            error: '',
        };
    }),
    on(getProductActionSuccess, (state, action) => {
        return {
            ...state,
            listProductItem: [...action.listProductItem],
            loading: false,
        };
    }),
    on(getProductActionFailure, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false,
        };
    }),

    on(createProductAction, (state, action) => {
        return {
            ...state,
            loading: true,
            error: '',
        };
    }),
    on(createProductActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listProductItem: [...state.listProductItem, action.productItem],
        };
    }),
    on(createProductActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    }),

    on(updateProductAction, (state, action) => {
        return {
            ...state,
            loading: true,
            error: '',
        };
    }),
    on(updateProductActionSuccess, (state, action) => {
        let newListProduct = Lodash.cloneDeep(state.listProductItem);
        newListProduct = [...newListProduct].map((x: ProductItem) => {
            if (x.id === action.productItem.id) {
                x = action.productItem;
            }
            return x;
        });
        return {
            ...state,
            loading: false,
            listProductItem: newListProduct
        };
    }),
    on(updateProductActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    }),

    on(deleteProductAction, (state, action) => {
        return {
            ...state,
            loading: true,
            error: '',
        };
    }),
    on(deleteProductActionSuccess, (state, action) => {
        const filter = [...state.listProductItem].filter((value) => {
            return [...action.id].indexOf(value['id']) == -1;
        });
        return {
            ...state,
            loading: false,
            listProductItem: filter,
        };
    }),
    on(deleteProductActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    })
);
// export function reducer(state: ProductState, action: any) {
//     return ProductReducer(state, action)
// }
export default ProductReducer;
