import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from 'api';
import moment from 'moment';
import { toast, Zoom } from 'react-toastify';
import firebaseService from 'services/firebaseService';
import { v4 as uuidv4 } from 'uuid';
import { createUserSettingsFirebase } from './authUserActions';

export const registerWithFirebaseAsCAdmin = createAsyncThunk(
  'register/registerWithFirebaseAsCAdmin',
  async (model, { getState, dispatch }) => {
    const { email, password, name } = model;
    try {
      const response = await firebaseService.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const addAdminRole = firebaseService.functions.httpsCallable(
        'addCompanyAdminRole'
      );
      await addAdminRole({ email: email });
      await API.post(
        '/post-user/',
        JSON.stringify({
          user_detail_pk: uuidv4(),
          email: email,
          user: {
            idtag: response.user.uid,
            version: '1',
            created_date: moment().toISOString(),
            updated_date: moment().toISOString(),
            created_by: 'SuperAdmin',
            lastmodified_by: 'SuperAdmin',
            status: true,
            parentidtag: '2595',
            expirydate: '2021-08-31T05:55:33.879137',
            intransaction: 0,
            blocked: 0,
            policy: [],
            role: [1]
          },
          version: '1',
          created_date: moment().toISOString(),
          updated_date: moment().toISOString(),
          created_by: 'SuperAdmin',
          lastmodified_by: 'SuperAdmin',
          status: true,
          fullname: name,
          phone: '4325534553',
          street: null,
          region: null,
          city: null,
          country: 'malaysia',
          zipcode: null,
          deviceId: null,
          deviceModel: null,
          osType: null,
          osVersion: null,
          signUpLoc: null,
          lastLogInLoc: null,
          idtag_fk: response.user.uid
        })
      );
      createUserSettingsFirebase(
        {
          ...response.user,
          name,
          email
        },
        { getState, dispatch }
      );
      return true;
    } catch (error) {
      const usernameErrorCodes = [
        'auth/operation-not-allowed',
        'auth/user-not-found',
        'auth/user-disabled'
      ];

      const emailErrorCodes = [
        'auth/email-already-in-use',
        'auth/invalid-email'
      ];

      const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

      const response = {
        email: emailErrorCodes.includes(error.code) ? error.message : null,
        displayName: usernameErrorCodes.includes(error.code)
          ? error.message
          : null,
        password: passwordErrorCodes.includes(error.code) ? error.message : null
      };

      if (error.code === 'auth/invalid-api-key') {
        //;

        toast.error(error.message, {
          containerId: 'D',
          transition: Zoom
        });
      }
      return response;
    }
  }
);

const initialState = {
  success: false,
  error: {
    username: null,
    password: null
  }
};

export const authRegisterSlice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [registerWithFirebaseAsCAdmin.fulfilled]: (state, action) => {
      state.success = action.payload;
    },
    [registerWithFirebaseAsCAdmin.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
});

export default authRegisterSlice.reducer;
