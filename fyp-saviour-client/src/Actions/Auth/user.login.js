import * as UserActions from 'Actions';
import * as Type from 'Actions/type';
import * as API from 'api';
import { toast, Zoom } from 'react-toastify';
import firebaseService from 'services/firebaseService';
export const submitLoginWithFireBase = async ({ email, password }) => {
  if (!firebaseService.auth) {
    console.warn(
      "Firebase Service didn't initialize, check your configuration"
    );

    return () => false;
  }
  try {
    return (dispatch) =>
      firebaseService.auth
        .signInWithEmailAndPassword(email, password)
        .then(async (response) => {
            dispatch(
              UserActions.createUserSettingsFirebase({
                ...response.user
              })
            );
            dispatch({
              type: Type.LOGIN_SUCCESS
            });
            toast.success('User Logged in', {
              containerId: 'D',
              transition: Zoom
            });
            return true;
        })
        .catch((error) => {
          const usernameErrorCodes = [
            'auth/email-already-in-use',
            'auth/invalid-email',
            'auth/operation-not-allowed',
            'auth/user-not-found',
            'auth/user-disabled'
          ];
          const passwordErrorCodes = [
            'auth/weak-password',
            'auth/wrong-password'
          ];

          const response = {
            username: usernameErrorCodes.includes(error.code)
              ? error.message
              : null,
            password: passwordErrorCodes.includes(error.code)
              ? error.message
              : null
          };

          if (error.code === 'auth/invalid-api-key') {
            toast.error(error.message, {
              containerId: 'D',
              transition: Zoom
            });
          }
          toast.error(
            response.username ? response.username : response.password,
            {
              containerId: 'D',
              transition: Zoom
            }
          );
          dispatch({
            type: Type.LOGIN_ERROR,
            payload: response
          });
          return false;
        });
  } catch (error) {
    toast.error("User Doesn't Exist", {
      containerId: 'D',
      transition: Zoom
    });
  }
};
