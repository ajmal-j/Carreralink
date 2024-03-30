import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IRecruiter {
  id: string;
  logo: string;
  company: string;
  email: string;
}

interface InitialState {
  isAuth: boolean;
  recruiter: IRecruiter | null;
}

const initialState: InitialState = {
  isAuth: false,
  recruiter: null,
};

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState,
  reducers: {
    setRecruiter: (state, { payload }: PayloadAction<IRecruiter>) => {
      if (!payload) {
        state.isAuth = false;
        state.recruiter = null;
        return;
      }
      state.isAuth = true;
      state.recruiter = payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.recruiter = null;
    },
  },
});

export const { setRecruiter, logout } = recruiterSlice.actions;

export default recruiterSlice.reducer;
