import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import * as API from '../../api';

export const getUserGroups = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/usergroup');
    } else {
      res = await API.get(`/usergroup/?${query}`);
    }
    dispatch({
      type: Type.USER_GROUP,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserGroup = (id) => async (dispatch) => {
  try {
    dispatch(Actions.setLoading(true));
    const res = await API.get(`/usergroup/${id}`);
    dispatch({
      type: Type.SINGLE_USER_GROUP,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const createUserGroup = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    groupid: uuidv4(),
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname
  };
  try {
    const res = await API.post('/usergroup/', obj);
    dispatch({
      type: Type.NEW_USER_GROUP
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const updateUserGroup = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    version: (Number(form.version) + 1).toString(),
    updated_date: moment().toISOString(),
    lastmodified_by: pgUser?.fullname,
    pricingpolicies:
      form?.pricingpolicies.length > 0
        ? form.pricingpolicies.map((p) => p?.paymentpolicyid)
        : [],
    users_m: form?.users_m.length > 0 ? form.users_m.map((p) => p?.idtag) : []
  };
  delete obj.created_date;
  delete obj.created_by;
  try {
    const res = await API.patch(`/usergroup/${form.groupid}/`, obj);
    dispatch({
      type: Type.UPDATE_GROUP
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};

export const SearchUserGroup = (groupName) => async (dispatch) => {
  try {
    const res = await API.get(`/search-usergroup/?search=${groupName}`);
    dispatch({
      type: Type.USER_GROUP,
      payload: res
    });
  } catch (error) {
    console.log('error', error);
  }
};
