import * as Type from 'Actions/type';
import * as API from '../../api';
export const getReservation = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/reservation');
    } else {
      res = await API.get(`/reservation/?${query}`);
    }
    dispatch({
      type: Type.NEW_RESERVATION,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};

export const SearchReservation = (resEmail) => async (dispatch) => {
  try {
    const res = await API.get(`/search-reservation?search=${resEmail}`);
    dispatch({
      type: Type.NEW_RESERVATION,
      payload: res
    });
  } catch (error) {
    console.log('error', error);
  }
};
