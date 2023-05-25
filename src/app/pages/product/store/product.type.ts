import { BranchItem } from "../../branch/store/branch.types"
import { CategoryItem } from "../../category/store/category.types"


type ProductItem = {
    id: number
    name: string
    count: number,
    price: number
    location: string
    Category?: Array<Pick<CategoryItem, 'id' | 'name'>>
    Brand?: Pick<BranchItem, 'id' | 'brandName'>
}

type ProductItemParam = Omit<ProductItem, 'id' | 'Category' | 'Brand'> & {
    brandId?: number,
    categoryId?: number[]
}

interface ProductState {
    loading: boolean,
    error: string,
    listProductItem: ProductItem[]
}

const GET_PRODUCT_ACTION = "GET_PRODUCT_ACTION"
const GET_PRODUCT_ACTION_SUCCESS = "GET_PRODUCT_ACTION_SUCCESS"
const GET_PRODUCT_ACTION_FAILURE = "GET_PRODUCT_ACTION_FAILURE"

const UPDATE_PRODUCT_ACTION = "UPDATE_PRODUCT_ACTION"
const UPDATE_PRODUCT_ACTION_FAILURE = "UPDATE_PRODUCT_ACTION_FAILURE"
const UPDATE_PRODUCT_ACTION_SUCCESS = "UPDATE_PRODUCT_ACTION_SUCCESS"

const CREATE_PRODUCT_ACTION = "CREATE_PRODUCT_ACTION"
const CREATE_PRODUCT_ACTION_FAILURE = "CREATE_PRODUCT_ACTION_FAILURE"
const CREATE_PRODUCT_ACTION_SUCCESS = "CREATE_PRODUCT_ACTION_SUCCESS"

const DELETE_PRODUCT_ACTION = "DELETE_PRODUCT_ACTION"
const DELETE_PRODUCT_ACTION_SUCCESS = "DELETE_PRODUCT_ACTION_SUCCESS"
const DELETE_PRODUCT_ACTION_FAILURE = "DELETE_PRODUCT_ACTION_FAILURE"

export {
    GET_PRODUCT_ACTION,
    GET_PRODUCT_ACTION_FAILURE,
    GET_PRODUCT_ACTION_SUCCESS,
    CREATE_PRODUCT_ACTION,
    CREATE_PRODUCT_ACTION_FAILURE,
    CREATE_PRODUCT_ACTION_SUCCESS,
    UPDATE_PRODUCT_ACTION,
    UPDATE_PRODUCT_ACTION_FAILURE,
    UPDATE_PRODUCT_ACTION_SUCCESS,
    DELETE_PRODUCT_ACTION,
    DELETE_PRODUCT_ACTION_FAILURE,
    DELETE_PRODUCT_ACTION_SUCCESS,
    ProductState,
    ProductItem,
    ProductItemParam
}