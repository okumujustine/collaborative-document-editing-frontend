import { combineReducers } from "redux";
import user from "./users/auth";

const rootReducer = combineReducers({
  auth: user,
});

export default rootReducer;