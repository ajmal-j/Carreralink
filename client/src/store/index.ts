import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import adminReducer from "./reducers/admin.slice";
import companyReducer from "./reducers/company.slice";
import recruiterReducer from "./reducers/recruiter.slice";
import userReducer from "./reducers/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    admin: adminReducer,
    recruiter: recruiterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
