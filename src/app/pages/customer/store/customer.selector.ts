import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppStateType } from "../../article/store/article.selector"
import { CustomerState } from "./customer.types"



export const CustomerFeatureSelector = createFeatureSelector<AppStateType, CustomerState>('customerState')

// export const CustomerSelectorType = (state: AppStateType) => state.Customer
export const CustomerSelector = createSelector(CustomerFeatureSelector, (CustomerState: CustomerState) => CustomerState.listCustomer)