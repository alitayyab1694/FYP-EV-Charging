import * as Type from 'Actions/type';
import moment from 'moment';
import * as API from '../../api';

export const getReservation = (id) => async (dispatch) => {
  try {
    const res = await API.get(`/my-reservations/${id}/`);
    dispatch({
      type: Type.GET_RESERVATION,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const SelectedReservation = (obj) => async (dispatch) => {
  dispatch({ type: Type.SELECTED_RESERVATION, payload: obj });
};
export const createReservation = (form) => async (dispatch) => {
  const obj = {
    ...form,
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: 'Sundus',
    lastmodified_by: 'Sundus',
    status: true
  };
  try {
    const res = await API.post('/reservation/', obj);
    dispatch({
      type: Type.NEW_RESERVATION
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};

export const updateReservationStatus = (id, form) => async (dispatch) => {
  const obj = {
    ...form,
    updated_date: moment().toISOString(),
    lastmodified_by: 'Sundus'
  };
  try {
    const res = await API.patch(`/reservation/${id}/`, obj);
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
