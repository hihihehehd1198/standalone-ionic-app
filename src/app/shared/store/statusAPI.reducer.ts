import * as LO from 'lodash';
import { createReducer, on } from "@ngrx/store"
import genericActionModule from "./statusAPI.action"
import { LoadingState, loadingStore, ModuleAPI } from "./statusAPI.type"




const defaultLoadingState: LoadingState = {
    listStatusAPI: []
}

const statusApiReducer = createReducer(defaultLoadingState, on((state: LoadingState, action: loadingStore) => {

    const listState: loadingStore[] = LO.cloneDeep(state.listStatusAPI)
    const index = listState.findIndex(x => x.name = action.name)
    if (index === -1) {
        listState.push(action)
    } else {
        listState[index] = LO.cloneDeep(action)
    }


    return {
        listStatusAPI: listState
    }
}))

export default statusApiReducer