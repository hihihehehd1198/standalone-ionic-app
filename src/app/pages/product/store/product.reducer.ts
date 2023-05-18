import { createReducer, on } from '@ngrx/store';
import { ProductState } from './product.type';
import { createProductAction, createProductActionFailure, createProductActionSuccess, deleteProductAction, deleteProductActionFailure, deleteProductActionSuccess, getProductAction, getProductActionFailure, getProductActionSuccess, updateProductAction, updateProductActionFailure, updateProductActionSuccess } from './product.action';

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
            loading: true
        };
    }),
    on(getProductActionSuccess, (state, action) => {
        return {
            ...state,
            listProductItem: [...action.listProductItem],
            loading: false
        };
    }),
    on(getProductActionFailure, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false,
        }
    }),

    on(createProductAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(createProductActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            listProductItem: [...state.listProductItem, action.productItem]
        }
    }),
    on(createProductActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),

    on(updateProductAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(updateProductActionSuccess, (state, action) => {
        return {
            ...state,
            loading: false,

        }
    }),
    on(updateProductActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }),

    on(deleteProductAction, (state, action) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(deleteProductActionSuccess, (state, action) => {
        const filter = [...state.listProductItem].filter((value) => {
            return [...action.id].indexOf(value['id']) == -1
        })
        return {
            ...state,
            loading: false,
            listProductItem: filter
        }
    }),
    on(deleteProductActionFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    })
);
// export function reducer(state: ProductState, action: any) {
//     return ProductReducer(state, action)
// }
export default ProductReducer