import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICompany {
  id: string;
  name: string;
  website: string;
  logo: string;
  tagline: string;
  email: string;
  industry: string;
  foundedOn: number;
  imageOfCEO: string;
  description: string;
  ceo: string;
  revenue: string;
  headquarters: string;
  size: string;
  recruiters: string[];
  jobs: string[];
  coverPhoto: string;
}

const initialState: ICompany = {
  id: "",
  name: "",
  website: "",
  logo: "",
  tagline: "",
  email: "",
  industry: "",
  foundedOn: 0,
  imageOfCEO: "",
  description: "",
  ceo: "",
  revenue: "",
  headquarters: "",
  size: "",
  recruiters: [],
  jobs: [],
  coverPhoto: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<ICompany>) => {
      state = action.payload;
      return state;
    },
    logout: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setState, logout } = companySlice.actions;

export default companySlice.reducer;
