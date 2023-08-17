import * as UserActions from 'Actions';
import * as Type from 'Actions/type';
import { post } from 'api';
import { toast, Zoom } from 'react-toastify';
import firebaseService from 'services/firebaseService';

export function registerWithFirebaseAsCustomer(model) {

  if (!firebaseService.auth) {
    console.warn(
      "Firebase Service didn't initialize, check your configuration"
    );

    return () => false;
  }
  const { email, password, firstName, lastName } = model;
  return async (dispatch) =>
    firebaseService.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        try {
          await post("/auth/signup", {email ,firstName , lastName , firebaseId :response.user?.uid })
          await dispatch(
            await UserActions.createUserSettingsFirebase({
              ...response.user,
              firstName,
              lastName,
              email
            })
          );
          dispatch({
            type: Type.REGISTER_SUCCESS
          });
          return true;
        } catch (err) {
          console.log(err.response);
          return false;
        }
      })
      .catch((error) => {
        const usernameErrorCodes = [
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];

        const emailErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email'
        ];

        const passwordErrorCodes = [
          'auth/weak-password',
          'auth/wrong-password'
        ];

        const response = {
          email: emailErrorCodes.includes(error.code) ? error.message : null,
          displayName: usernameErrorCodes.includes(error.code)
            ? error.message
            : null,
          password: passwordErrorCodes.includes(error.code)
            ? error.message
            : null
        };

        toast.error(error.message, {
          containerId: 'D',
          transition: Zoom
        });

        dispatch({
          type: Type.REGISTER_ERROR,
          payload: response
        });
        return false;
      });
}
