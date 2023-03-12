import { createAction, props } from "@ngrx/store";
import { loadingStore, ModuleAPI } from "./statusAPI.type";



const genericActionModule = createAction("UPDATE_LOADING_API", props<loadingStore>())
export default genericActionModule