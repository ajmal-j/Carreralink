import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import companyReducer from "./reducers/company.slice";
import adminReducer from "./reducers/admin.slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
