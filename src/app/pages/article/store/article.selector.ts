import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AccountState } from "../../account/store/account.types";
import { BannerState } from "../../bannerPage/store/bannerPage.types";
import { BranchState } from "../../branch/store/branch.types";
import { CategoryState } from "../../category/store/category.types";
import { CustomerState } from "../../customer/store/customer.types";
import { LoginState } from "../../LoginPage/UserStore/user.type";
import { ServiceState } from "../../servicePage/store/servicePage.types";
// import { ArticleStore } from "./article.reducer";

export interface AppStateType {
    article: ArticleStore,
    userLogin: LoginState
    banner: BannerState,
    servicePage: ServiceState,
    accountState: AccountState,
    categoryState: CategoryState,
    customerState: CustomerState,
    brandState: BranchState,
}
interface ArticleItem { }

export interface ArticleStore {
    error: string | null;
    listArticle: ArticleItem[] | any;
    loading: boolean;
    message?: string
}
export const ArticleFeatureSelector = createFeatureSelector<AppStateType, ArticleStore>('article')

// export const articleSelectorType = (state: AppStateType) => state.article
export const articleSelector = createSelector(ArticleFeatureSelector, (articleState: ArticleStore) => articleState.listArticle)
