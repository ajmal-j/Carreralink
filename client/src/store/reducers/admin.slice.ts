import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAdmin {
  _id: string;
  name: string;
  email: string;
  profile: string;
  role: string;
  username: string;
  contact: string;
  createdAt: Date;
}

interface InitialState {
  isAuth: boolean;
  admin: IAdmin | null;
}
const initialState: InitialState = {
  isAuth: false,
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, { payload }: PayloadAction<IAdmin>) => {
      if (!payload) {
        state.isAuth = false;
        state.admin = null;
        return;
      }
      const { profile, ...user } = payload;
      state.isAuth = true;
      // @ts-ignore
      state.admin = payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.admin = null;
    },
  },
});

export const { setAdmin, logout } = adminSlice.actions;

export default adminSlice.reducer;
