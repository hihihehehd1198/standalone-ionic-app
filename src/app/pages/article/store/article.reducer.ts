import * as Lodash from 'lodash';
import {
  createArticleAction,
  createArticleActionFailure,
  createArticleActionSuccess,
  deleteArticleAction,
  deleteArticleActionFailure,
  deleteArticleActionSuccess,
  getArticleActionFailure,
  getArticleActionSuccess,
  getArticleActionVoid,
  updateArticleAction,
  updateArticleActionFailure,
  updateArticleActionSuccess,
} from './article.action';
import { createReducer, on } from '@ngrx/store';

export interface ArticleItem {
  id: Number;
  title: String;
  body: String;
}
export interface ArticleStore {
  loading: boolean;
  listArticle: ArticleItem[] | any;
  error: string;
}
export const initState: ArticleStore = {
  listArticle: [],
  loading: false,
  error: '',
};
const articleReducer = createReducer(
  initState,
  on(getArticleActionVoid, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(getArticleActionSuccess, (state, action) => {
    return {
      ...state,
      listArticle: action.listArticle,
      loading: false,
    };
  }),
  on(getArticleActionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(createArticleAction, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(createArticleActionSuccess, (state, action) => {
    return {
      ...state,
      listArticle: [...state.listArticle, action.article],
      loading: false,
    };
  }),
  on(createArticleActionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(updateArticleAction, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(updateArticleActionSuccess, (state, action) => {
    let newListArticle = Lodash.cloneDeep(state.listArticle);
    newListArticle = [...newListArticle].map((x: ArticleItem) => {
      if (x.id === action.articleItem.id) {
        x = action.articleItem;
      }
      return x;
    });
    return {
      ...state,
      listArticle: newListArticle,
      loading: false,
    };
  }),
  on(updateArticleActionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(deleteArticleAction, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(deleteArticleActionSuccess, (state, action) => {
    const filter = [...state.listArticle].filter((value) => {
      return [...action.id].indexOf(value['id']) == -1;
    });
    return {
      ...state,
      listArticle: [...filter],
      loading: false,
    };
  }),
  on(deleteArticleActionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export function reducer(state: any, action: any) {
  return articleReducer(state, action);
}
