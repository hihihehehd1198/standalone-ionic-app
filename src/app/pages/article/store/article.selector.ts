import { createFeatureSelector, createSelector } from "@ngrx/store";
// import { ArticleStore } from "./article.reducer";

export interface AppStateType {
    article: ArticleStore,
}
interface ArticleItem { }

export interface ArticleStore {
    error: string | null;
    listArticle: ArticleItem[] | any;
    loading: boolean;
}
export const ArticleFeatureSelector = createFeatureSelector<AppStateType, ArticleStore>('article')

// export const articleSelectorType = (state: AppStateType) => state.article
export const articleSelector = createSelector(ArticleFeatureSelector, (articleState: ArticleStore) => articleState?.listArticle)