import { combineReducers } from "redux";

//reducers
import authReducer from "./auth";

const reducers = combineReducers({
  auth: authReducer,
});

export default reducers;
