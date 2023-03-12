
import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppStateType } from '../../article/store/article.selector';
import { LOG_OUT } from './user.type';




export function clearState(reducer: ActionReducer<AppStateType>): ActionReducer<AppStateType> {
    return function (state: AppStateType | undefined = undefined, action: Action): AppStateType {
        if (action.type === LOG_OUT) {
            state = undefined;
        }
        return reducer(state, action);
    };
}
export const metaReducers: MetaReducer<AppStateType>[] = [clearState];



// export interface AppStateType {
//     article: ArticleStore,
//     userLogin: LoginState
// }