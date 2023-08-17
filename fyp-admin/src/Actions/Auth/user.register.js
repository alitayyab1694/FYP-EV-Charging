import * as UserActions from 'Actions';
import * as Type from 'Actions/type';
import * as API from 'api';
import moment from 'moment';
import { toast, Zoom } from 'react-toastify';
import firebaseService from 'services/firebaseService';
import { v4 as uuidv4 } from 'uuid';

export function registerWithFirebaseAsCAdmin(model) {
  const { email, password, name } = model;
  return (dispatch) =>
    firebaseService.auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const addAdminRole = firebaseService.functions.httpsCallable(
          'addCompanyAdminRole'
        );
        addAdminRole({ email: email })
          .then(async (res) => {
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
            await dispatch(
              await UserActions.createUserSettingsFirebase({
                ...response.user,
                name,
                email
              })
            );
            return dispatch({
              type: Type.REGISTER_SUCCESS
            });
          })
          .catch((error) => {
            console.log(error);
          });
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

        if (error.code === 'auth/invalid-api-key') {
          //;

          toast.error(error.message, {
            containerId: 'D',
            transition: Zoom
          });
        }
        return dispatch({
          type: Type.REGISTER_ERROR,
          payload: response
        });
      });
}
