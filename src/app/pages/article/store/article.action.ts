// import { updateArticleAction, updateArticleActionSuccess } from './article.action';
/**
 * Add article action
 */

import { createAction, props } from '@ngrx/store';
import { ArticleItem } from './article.reducer';

export const ADD_ARTICLE_ACTION = 'ADD_ARTICLE_ACTION';
export const ADD_ARTICLE_ACTION_SUCCESS = 'ADD_ARTICLE_ACTION_SUCCESS';
export const ADD_ARTICLE_ACTION_FAILURE = 'ADD_ARTICLE_ACTION_FAILURE';

/**
 * edit article action
 */
export const EDIT_ARTICLE_ACTION = 'EDIT_ARTICLE_ACTION';
export const EDIT_ARTICLE_ACTION_SUCCESS = 'EDIT_ARTICLE_ACTION_SUCCESS';
export const EDIT_ARTICLE_ACTION_FAILURE = 'EDIT_ARTICLE_ACTION_FAILURE';

/**
 * delete article action
 */
export const DELETE_ARTICLE_ACTION = 'DELETE_ARTICLE_ACTION';
export const DELETE_ARTICLE_ACTION_SUCCESS = 'DELETE_ARTICLE_ACTION_SUCCESS';
export const DELETE_ARTICLE_ACTION_FAILURE = 'DELETE_ARTICLE_ACTION_FAILURE';

/**
 * get list article action
 */
export const GET_ARTICLE_ACTION = 'GET_ARTICLE_ACTION';
export const GET_ARTICLE_ACTION_SUCCESS = 'GET_ARTICLE_ACTION_SUCCESS';
export const GET_ARTICLE_ACTION_FAILURE = 'GET_ARTICLE_ACTION_FAILURE';

export const getArticleActionVoid = createAction(GET_ARTICLE_ACTION);
export const getArticleActionSuccess = createAction(
  GET_ARTICLE_ACTION_SUCCESS,
  props<{ listArticle: any }>()
);
export const getArticleActionFailure = createAction(
  GET_ARTICLE_ACTION_FAILURE,
  props<{ error: string }>()
);

export const createArticleAction = createAction(
  ADD_ARTICLE_ACTION,
  props<{ article: ArticleItem }>()
)

export const createArticleActionSuccess = createAction(
  ADD_ARTICLE_ACTION_SUCCESS,
  props<{ article: ArticleItem }>()
)
export const createArticleActionFailure = createAction(
  ADD_ARTICLE_ACTION_FAILURE,
  props<{ error: string }>()
)

export const updateArticleAction = createAction(
  EDIT_ARTICLE_ACTION,
  props<{ articleItem: ArticleItem }>()
)
export const updateArticleActionSuccess = createAction(
  EDIT_ARTICLE_ACTION_SUCCESS,
  props<{ articleItem: ArticleItem }>()
)
export const updateArticleActionFailure = createAction(
  EDIT_ARTICLE_ACTION_FAILURE,
  props<{ error: string }>()
)

export const deleteArticleAction = createAction(
  DELETE_ARTICLE_ACTION,
  props<{ id: number[] }>()
)
export const deleteArticleActionSuccess = createAction(
  DELETE_ARTICLE_ACTION_SUCCESS,
  props<{ id: number[] }>()
)
export const deleteArticleActionFailure = createAction(
  DELETE_ARTICLE_ACTION_FAILURE,
  props<{ error: string }>()
)