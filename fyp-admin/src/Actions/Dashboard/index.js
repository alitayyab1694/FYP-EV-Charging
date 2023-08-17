import * as Type from 'Actions/type';
import * as API from '../../api';
export const getDashboardInfo = () => async (dispatch) => {
  try {
    const res = await API.get('/dashboard');
    dispatch({
      type: Type.GET_DASHBOARD,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
