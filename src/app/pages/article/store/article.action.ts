/**
 * Add article action
 */

import { createAction, props } from '@ngrx/store';

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
  props<{ error: any }>()
);
