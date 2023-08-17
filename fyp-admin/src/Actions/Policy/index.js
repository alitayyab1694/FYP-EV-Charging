import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import * as API from '../../api';
export const getPolices = (paginate, query) => async (dispatch) => {
  try {
    var res;
    //;
    if (!paginate) {
      res = await API.get('/policies');
    } else {
      res = await API.get(`/policies/?${query}`);
    }
    //;
    dispatch({
      type: Type.GET_POLICIES,
      payload: res
    });
  } catch (error) {
    //;
    console.log(error);
  }
};
export const getPolicy = (id) => async (dispatch) => {
  try {
    dispatch(Actions.setLoading(true));
    const res = await API.get(`/policies/${id}`);
    dispatch({
      type: Type.SINGLE_POLICY,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const createPolicy = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    paymentpolicyid: uuidv4(),
    version: '1',
    rates: form?.rates.map((r) => r?.value),
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname,
    applicabletype: form?.applicabletype?.value,
    profileday: form?.profileday?.value
  };
  try {
    const res = await API.post('/policies/', obj);
    dispatch({
      type: Type.NEW_PRICING_POLICY
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const updatePolicy = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    rates: form?.rates.map((p) => p.value),
    lastmodified_by: pgUser?.fullname,
    applicabletype: form?.applicabletype?.value,
    profileday: form?.profileday?.value
  };
  delete obj.created_date;
  delete obj.created_by;
  try {
    const res = await API.patch(`/policies/${form.paymentpolicyid}/`, obj);
    dispatch({
      type: Type.UPDATE_POLICY
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};

export const SearchPolicy = (policyName) => async (dispatch) => {
  try {
    const res = await API.get(`/search-policy/?search=${policyName}`);
    dispatch({
      type: Type.GET_POLICIES,
      payload: res
    });
  } catch (error) {
    console.log('error', error);
  }
};
