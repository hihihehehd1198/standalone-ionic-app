







import { createFeatureSelector, createSelector } from "@ngrx/store"
import { OrderState } from "./order.types"




export const OrderFeatureSelector = createFeatureSelector<OrderState>('orderState')

// export const OrderSelectorType = (state: AppStateType) => state.Order
export const OrderSelector = createSelector(OrderFeatureSelector, (OrderState: OrderState) => OrderState.listOrder)