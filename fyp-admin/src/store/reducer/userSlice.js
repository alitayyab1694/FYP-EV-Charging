import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebaseService from "services/firebaseService";
import { createUserSettingsFirebase } from "./authUserActions";
import { removeLocalStorage, setLocalStorage } from "utils";

export const setUserDataFirebase = createAsyncThunk(
  "user/setUserDataFirebase",
  ({ user, authUser }, { getState, dispatch }) => {
    if (
      user &&
      user.data &&
      user.data.settings &&
      user.data.settings.theme &&
      user.data.settings.layout &&
      user.data.settings.layout.style
    ) {
      // Set user data but do not update
      // return setUserData(user);
      return createUserSettingsFirebase(authUser, getState, dispatch);
    }
    // Create missing user settings
    return createUserSettingsFirebase(authUser, getState, dispatch);
  }
);

const initialState = {
  role: [], // guest
  Auth: true,
  isAuth: false,
  data: {
    displayName: "John Doe",
    photoURL: "assets/images/avatars/avatar7.jpg",
    email: "johndoe@withinpixels.com",
    shortcuts: ["calendar", "mail", "contacts", "todo"],
  },
};

// export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
//   // await firebaseService.signOut();
//   removeLocalStorage("evap-user");
//   return false;
// });

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      console.log("action", action);
      return (state = { ...initialState, ...action.payload });
    },
    logoutUser: (state, action) => {
      removeLocalStorage("evap-user");
      return (state = initialState);
    },
  },
  // extraReducers: {
  //   [logoutUser.fulfilled]: (state, action) => {
  //     return (state = initialState);
  //   },
  // },
});

export const { setUserData, logoutUser } = userSlice.actions;

export default userSlice.reducer;
