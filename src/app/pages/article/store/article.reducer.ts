import {
  getArticleActionFailure,
  getArticleActionSuccess,
  getArticleActionVoid,
} from './article.action';
import { createReducer, on } from '@ngrx/store';

interface ArticleItem {}
interface ArticleStore {
  error: string | null;
  listArticle: ArticleItem[];
  loading: boolean;
}
export const initState: ArticleStore = {
  error: null,
  listArticle: [],
  loading: false,
};
const reducer = createReducer(
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


// export const ArticleReducer = feature