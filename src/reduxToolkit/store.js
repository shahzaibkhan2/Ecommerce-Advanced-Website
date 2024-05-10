import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const mainStore = configureStore({
  reducer: rootReducer,
});

export default mainStore;
