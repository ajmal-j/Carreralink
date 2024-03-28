import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profile: string;
  role: string;
  username: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  education: {
    _id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  experience: {
    _id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
  }[];
  skills: [];
  location: string;
  currentStatus: string;
  workingAt: string;
  place: string;
  portfolioLink: string;
  about: string;
}

interface InitialState {
  isAuth: boolean;
  user: IUser | null;
}
const initialState: InitialState = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      if (!payload) {
        state.isAuth = false;
        state.user = null;
        return;
      }
      const { profile, ...user } = payload;
      state.isAuth = true;
      // @ts-ignore
      state.user = user;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    updateEducationState: (state, { payload }: PayloadAction<any>) => {
      if (state.user) {
        state.user.education = payload;
      }
    },
    deleteEducationState: (state, { payload }: PayloadAction<any>) => {
      if (state.user) {
        state.user.education = state.user.education.filter(
          (edu) => edu._id !== payload,
        );
      }
    },
    updateExperienceState: (state, { payload }: PayloadAction<any>) => {
      if (state.user) {
        state.user.experience = payload;
      }
    },
    deleteExperienceState: (state, { payload }: PayloadAction<any>) => {
      if (state.user) {
        state.user.experience = state.user.experience.filter(
          (exp) => exp._id !== payload,
        );
      }
    },
    addSkillsState: (state, { payload }: PayloadAction<any>) => {
      if (state.user) {
        state.user.skills = payload;
      }
    },
    updateProfilePicState: (state, { payload }: PayloadAction<any>) => {
      if (state.user) {
        state.user.profile = payload;
      }
    },
  },
});

export const {
  setUser,
  logout,
  updateEducationState,
  deleteEducationState,
  updateExperienceState,
  deleteExperienceState,
  addSkillsState,
  updateProfilePicState,
} = userSlice.actions;
export default userSlice.reducer;
