import * as UserActions from 'Actions';
import * as Type from 'Actions/type';
import { toast, Zoom } from 'react-toastify';
import firebaseService from 'services/firebaseService';

export const submitLoginWithFireBase = ({ email, password }) => {
  if (!firebaseService.auth) {
    console.warn(
      "Firebase Service didn't initialize, check your configuration"
    );

    return () => false;
  }

  return (dispatch) =>
    firebaseService.auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        dispatch(
          UserActions.createUserSettingsFirebase({
            ...response.user
          })
        );
        toast.success('Successfully Login User', {
          containerId: 'D',
          transition: Zoom
        });
        return dispatch({
          type: Type.LOGIN_SUCCESS
        });
      })
      .catch((error) => {
        console.info('error');
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
        toast.error(response.username ? response.username : response.password, {
          containerId: 'D',
          transition: Zoom
        });
        return dispatch({
          type: Type.LOGIN_ERROR,
          payload: response
        });
      });
};
