import * as Type from 'Actions/type';
import * as API from '../../api';

export const getUsers = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/users');
    } else {
      res = await API.get(`/users/?${query}`);
    }
    dispatch({
      type: Type.GET_USERS,
      payload: res
    });
  } catch (error) {

    console.log(error);
  }
};
export const getUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: Type.GET_USER,
      payload: user
    });
  } catch (error) {
    console.log(error.response);
  }
};
