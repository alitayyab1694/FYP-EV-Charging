import firebase from '@firebase/app';
import history from '@history';
import _ from '@lodash';
import * as API from 'api';
import * as Actions from 'Actions';
import * as FuseActions from 'Actions';
import * as Type from 'Actions/type';
import { toast, Zoom } from 'react-toastify';
import firebaseService from 'services/firebaseService';
import { setLocalStorage } from 'utils';

/**
 * Set user data from Firebase data
 */
export function setUserDataFirebase(user, authUser) {
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
    return createUserSettingsFirebase(authUser);
  }

  // Create missing user settings
  return createUserSettingsFirebase(authUser);
}

/**
 * Create User Settings with Firebase data
 */
export function createUserSettingsFirebase(authUser) {
  return (dispatch, getState) => {
    const guestUser = getState().user;
    const { currentUser } = firebase.auth();
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        setLocalStorage('idToken', idToken, false);
      })
      .catch(function (error) {
        // Handle error
      });
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(async (idTokenResult) => {
        console.log("🚀 ~ file: user.actions.js:53 ~ .then ~ idTokenResult:", idTokenResult)
        /**
         * Merge with current Settings
         */
          const user = _.merge({}, guestUser, {
            uid: authUser?.email,
            from: 'firebase',
            role: ['customer'],
            login: authUser?.phoneNumber ? 'Phone' : 'Email',
            Auth: true,
            data: {
              displayName: authUser?.firstName + ' ' + authUser?.lastName,
              email: authUser?.email,
              phone: authUser?.phoneNumber
            }
          });
          await dispatch(await Actions.getUser(user));
          currentUser.updateProfile(user.data);
          updateUserData(user, dispatch);
          return dispatch(setUserData(user));
      })
      .catch((error) => {
        console.log(error);
      });
    /**
     * Merge with current Settings
     */
  };
}

/**
 * Set User Data
 */
export function setUserData(user) {
  return (dispatch) => {
    /*
        You can redirect the logged-in user to a specific route depending on his role
         */

    // history.location.state = {
    //     redirectUrl: user.redirectUrl // for example 'apps/academy'
    // }

    /*
        Set User Settings
         */
    dispatch(FuseActions.setDefaultSettings(user.data.settings));
    //;

    /*
        Set User Data
         */
    dispatch({
      type: Type.SET_USER_DATA,
      payload: user
    });
  };
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
  return (dispatch, getState) => {
    const oldUser = getState().auth.user;
    const user = _.merge({}, oldUser, { data: { settings } });

    updateUserData(user, dispatch);

    return dispatch(setUserData(user));
  };
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts
      }
    };

    updateUserData(newUser, dispatch);

    return dispatch(setUserData(newUser));
  };
}

/**
 * Remove User Data
 */
export function removeUserData() {
  return {
    type: Type.REMOVE_USER_DATA
  };
}

/**
 * Logout
 */
export function logoutUser() {
  return (dispatch, getState) => {
    const user = getState().user;

    // if (!user.role || user.role.length === 0) {
    //   // is guest
    //   return null;
    // }

    history.push({
      pathname: '/'
    });
    firebaseService.signOut();
    dispatch(FuseActions.setInitialSettings());
    return dispatch({
      type: Type.USER_LOGGED_OUT
    });
  };
}
/**
 * Update User Data
 */
function updateUserData(user, dispatch) {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }
  firebaseService
    .updateUserData(user)
    .then(() => {
      //   toast.warn('User data saved to firebase', {
      //     containerId: 'D',
      //     transition: Zoom
      //   });
    })
    .catch((error) => {
      toast.error(error.message, {
        containerId: 'D',
        transition: Zoom
      });
    });
}
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await firebase.auth().sendPasswordResetEmail(email);
    return { success: true, data: res };
  } catch (error) {
    return { success: false, data: error };
  }
};
