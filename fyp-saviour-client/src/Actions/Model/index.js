import * as Type from 'Actions/type';
export const stepper = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Type.SET_STEPPER,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const loginModel = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Type.SET_LOGIN_MODEL,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const paymentModel = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Type.SET_PAYMENT_MODEL,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const QrReaderModel = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Type.SET_QR_READER_MODEL,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const walkInUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Type.SET_WALK_IN_USER_MODEL,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
