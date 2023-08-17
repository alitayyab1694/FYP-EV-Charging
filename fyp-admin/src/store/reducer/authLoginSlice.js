import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast, Zoom } from 'react-toastify';
import firebaseService from 'services/firebaseService';
import { createUserSettingsFirebase } from './authUserActions';

export const submitLoginWithFireBase = createAsyncThunk(
  'login/submitLoginWithFirebase',
  async ({ email, password }, { getState, dispatch }) => {
    try {
      const response = await firebaseService.auth.signInWithEmailAndPassword(
        email,
        password
      );

      createUserSettingsFirebase({ ...response.user }, getState, dispatch);
      toast.success('Successfully Login User', {
        containerId: 'D',
        transition: Zoom
      });
      return true;
    } catch (error) {
      console.info('error', error);
      const usernameErrorCodes = [
        'auth/email-already-in-use',
        'auth/invalid-email',
        'auth/operation-not-allowed',
        'auth/user-not-found',
        'auth/user-disabled'
      ];
      const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

      const response = {
        username: usernameErrorCodes.includes(error?.code)
          ? error?.message
          : null,
        password: passwordErrorCodes.includes(error?.code)
          ? error?.message
          : null
      };

      if (error?.code === 'auth/invalid-api-key') {
        toast.error(error?.message, {
          containerId: 'D',
          transition: Zoom
        });
      }
      toast.error(response.username ? response.username : response.password, {
        containerId: 'D',
        transition: Zoom
      });
      return response;
    }
  }
);

export const authLoginSlice = createSlice({
  name: 'login',
  initialState: {
    success: false,
    error: {
      username: null,
      password: null
    }
  },
  reducers: {},
  extraReducers: {
    [submitLoginWithFireBase.fulfilled]: (state, action) => {
      state.success = true;
    },
    [submitLoginWithFireBase.rejected]: (state, action) => {
      state.success = false;
      state.error = action.payload;
    }
  }
});

export default authLoginSlice.reducer;
