import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import moment from 'moment';
import * as API from '../../api';
export const getGroups = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/groups');
    } else {
      res = await API.get(`/groups/?${query}`);
    }
    dispatch({
      type: Type.GET_GROUPS,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getGroup = (id) => async (dispatch) => {
  try {
    dispatch(Actions.setLoading(true));
    const res = await API.get(`/groups/${id}`);
    dispatch(Actions.setLoading(false));
    dispatch({
      type: Type.SINGLE_GROUP,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getChargeBoxByGroup = (groupId) => async (dispatch) => {
  try {
    const res = await API.get(`/search-chargebox/?search=${groupId}`);
    dispatch({
      type: Type.FETCH_CHARGE_BOX_GROUP,
      payload: res.results
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPolicesByGroup = (groupId, Load = true) => async (dispatch) => {
  try {
    const res = await API.get(`/search-policy/?search=${groupId}`);
    dispatch({
      type: Type.FETCH_POLICY_BY_GROUP,
      payload: res.results
    });
    if (Load) {
      dispatch(Actions.setLoading(false));
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};
export const createGroup = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    pricingpolicy: form?.pricingpolicy?.map((c) => c.value),
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname,
    chargebox: form?.chargebox?.map((c) => c.value)
  };
  try {
    const res = await API.post('/groups/', obj);
    dispatch({
      type: Type.NEW_GROUP
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const updateGroup = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    pricingpolicy:
      form?.pricingpolicy?.length > 0
        ? form?.pricingpolicy?.map((c) => c.value)
        : [],
    version: (Number(form.version) + 1).toString(),
    updated_date: moment().toISOString(),
    lastmodified_by: pgUser?.fullname,
    chargebox:
      form?.chargebox?.length > 0 ? form?.chargebox?.map((c) => c.value) : []
  };
  delete obj.created_date;
  delete obj.created_by;
  try {
    const res = await API.patch(`/groups/${form.groupid}/`, obj);
    dispatch({
      type: Type.UPDATE_GROUP
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const UpdateGroupPolicyAndUser = (obj, groupId) => async (dispatch) => {
  try {
    await API.patch(`/usergroup/${groupId}/`, obj);
    await dispatch(await Actions.getUserGroups());
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
