import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import * as API from 'api';
import {
  CustomReturnTransactionResponseSuccess,
  getLocalStorage,
  setLocalStorage,
  Toaster 
} from 'utils';
// import { SelectorsAll } from '../Selectors'
// console.log(getLocalStorage);
// const selectedConnector123 = Actions.SelectorsAll;
// console.log(selectedConnector);
// const selectedConnector = '1';
  // const {
  //   selectedConnector
  // } = useSelector((state) => ({
  //   selectedConnector: state.appReducer.selectedConnector,
  // }));
export const remoteStartTransaction = (obj, state) => async (dispatch) => {


  try {
    const res = await API.post(`/st-transaction-req/`, { ...obj });
    dispatch({ type: Type.START_TRANSACTION, payload: res }); 
    if (res?.Success) {
      CustomReturnTransactionResponseSuccess(res?.Success);
      Toaster('success', res?.Success);
    } else {
      CustomReturnTransactionResponseSuccess(res?.Error);
      Toaster('error', res?.Error);
    }
    dispatch(Actions.LocalStorageTrigger(!state));
    // dispatch(checkTransactionStatus({ ...obj }, !state));
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const remoteFetchTransaction = (obj, state) => async (dispatch) => {
  
  try {
    const res = await API.post(`/fetch-transaction-req/`, {
      ...obj
      // ,connector_id: selectedConnector
    });
    dispatch({ type: Type.START_TRANSACTION, payload: res });
    if (res?.Success) {
      CustomReturnTransactionResponseSuccess(res?.Success);
      Toaster('success', res?.Success);
    } else {
      CustomReturnTransactionResponseSuccess(res?.Error);
      Toaster('error', res?.Error);
    }
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const remoteStopTransaction = (obj, state) => async (dispatch) => {
  
  try {
    const user = getLocalStorage('evapUser', true, true);
    if (user) {
      delete user.enableTryAgain;
      delete user.checkStatusStop;
      delete user.startTransaction;
      setLocalStorage('evapUser', user);
    }
    const res = await API.post(`/sto-transaction-req/`, {
      ...obj
    });
    dispatch({ type: Type.STOP_TRANSACTION, payload: res });
    if (res?.Success) {
      CustomReturnTransactionResponseSuccess(res?.Success);
      Toaster('success', res?.Success);
    } else {
      CustomReturnTransactionResponseSuccess(res?.Error);
      Toaster('error', res?.Error);
    }
    dispatch(Actions.LocalStorageTrigger(!state));
  } catch (error) {
    console.log('error: ', error);
  }
};

export const checkTransactionStatus = (obj, state) => async (dispatch) => {
  
  try {
    const res = await API.post(`/check-status-req/`, {
      ...obj
    });
    // dispatch({ type: Type.CHECK_STATUS, payload: res });
    if (res?.Success) {
      CustomReturnTransactionResponseSuccess(res?.Success);
      // Toaster('success', res?.Success);
    } else {
      CustomReturnTransactionResponseSuccess(res?.Error);
      // Toaster('error', res?.Error);
    }
    dispatch(Actions.LocalStorageTrigger(!state));
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};
export const afterTransactionFeedback = (obj, state) => async (dispatch) => {
  try {
    const res = await API.post(`/feedback/`, {
      ...obj,
    });
    // if (res?.Success) {
    //   Toaster('success', res?.Success);
    // } else {
    //   Toaster('error', res?.Error);
    // }
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};
