import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import companyReducer from "./reducers/company.slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
