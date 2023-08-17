import firebase from '@firebase/app';
import _ from 'lodash';
import { toast, Zoom } from 'react-toastify';
import firebaseService from 'services/firebaseService';
import { setLocalStorage } from 'utils';
import { getUser } from './appReducerSlice';
import { setUserData } from './userSlice';

export const createUserSettingsFirebase = async (
  authUser,
  getState,
  dispatch
) => {
  const guestUser = getState().user;
  const { currentUser } = firebase.auth();
  try {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        setLocalStorage('idToken', idToken, false);
      })
      .catch(function (error) {
        // Handle error
      });
    // const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
    const user = _.merge({}, guestUser, {
      uid: authUser.uid,
      from: 'firebase',
      role: ['admin'],

      isAuth: true,
      data: {
        displayName: authUser.name,
        email: authUser.email
      }
    });
    dispatch(getUser(authUser.uid));
    currentUser.updateProfile(user.data);
    updateUserData(user);
    dispatch(setUserData(user));
  } catch (error) {
    console.log(error);
  }
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      setLocalStorage('idToken', idToken, false);
    })
    .catch(function (error) {
      // Handle error
    });
};

export const updateUserData = async (user) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }
  try {
    await firebaseService.updateUserData(user);
  } catch (error) {
    toast.error(error.message, {
      containerId: 'D',
      transition: Zoom
    });
  }
};
