import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ProductService } from "src/app/services/product.service";
import { createProductAction, createProductActionFailure, createProductActionSuccess, deleteProductAction, deleteProductActionFailure, deleteProductActionSuccess, getProductAction, getProductActionFailure, getProductActionSuccess, updateProductAction, updateProductActionFailure } from "./product.action";
import { catchError, map, of, switchMap } from "rxjs";
import { ProductItem } from "./product.type";
import { MutationResult } from "apollo-angular";
import { error } from "console";






@Injectable({
    providedIn: "root"
})
export class ProductEffect {
    private action$ = inject(Actions)
    private productService = inject(ProductService)
    private store = inject(Store)


    getProduct$ = createEffect(() => {
        return this.action$.pipe(ofType(getProductAction), switchMap(() => {
            return this.productService.getProductList().pipe(map((res: MutationResult<any>) => {
                return getProductActionSuccess({ listProductItem: res.data['findProduct'] as ProductItem[] })
            }), catchError((err) => {
                return of(getProductActionFailure(err))
            }))

        }))
    })

    updateProduct$ = createEffect(() => {
        return this.action$.pipe(ofType(updateProductAction), switchMap(({ productItem }) => {
            return this.productService.updateProductList(productItem).pipe(map((res: MutationResult<any>) => {
                return updateProductAction({ productItem: res.data['updateProduct'] })
            }), catchError(err => {
                return of(updateProductActionFailure({ error: err }))
            }))
        })
        )
    })

    createProduct$ = createEffect(() => {
        return this.action$.pipe(ofType(createProductAction), switchMap(({ productItem }) => {
            return this.productService.createProductList(productItem).pipe(map((res: MutationResult<any>) => {
                return createProductActionSuccess({ productItem: res['data']['createProduct'] })
            }), catchError((err) => {
                return of(createProductActionFailure({ error: err }))
            }))
        }))
    })

    deleteProduct$ = createEffect(() => {
        return this.action$.pipe(ofType(deleteProductAction), switchMap(({ id }) => {
            return this.productService.deleteProduct(id).pipe(map(() => {
                return deleteProductActionSuccess({ id })
            }), catchError((err) => {
                return of(deleteProductActionFailure({ error: err }))
            }))
        }))
    })
}