import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import moment from 'moment';
import * as API from '../../api';

export const updateStatus = (id, component, form) => async (dispatch) => {
  const obj = {
    groupid: form.groupid,
    status: !form.status,
    updated_date: moment().toISOString()
  };

  try {
    const res = await API.put(`/groups/${id}/`, obj);
    dispatch(Actions.getGroups());
    dispatch({
      type: Type.UPDATE_STATUS_GROUP,
      payload: id
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
