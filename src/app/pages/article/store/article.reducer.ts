import {
  getArticleActionFailure,
  getArticleActionSuccess,
  getArticleActionVoid,
} from './article.action';
import { createReducer, on } from '@ngrx/store';

interface ArticleItem { }
export interface ArticleStore {
  error: string | null;
  listArticle: ArticleItem[] | any;
  loading: boolean;
}
export const initState: ArticleStore = {
  error: null,
  listArticle: [],
  loading: false,
};
const articleReducer = createReducer(
  initState,
  on(getArticleActionVoid, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(getArticleActionSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      listArticle: action.listArticle,
    };
  }),
  on(getArticleActionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export function reducer(state: any, action: any) {
  return articleReducer(state, action)
}