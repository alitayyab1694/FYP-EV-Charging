import * as Type from 'Actions/type';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import * as API from '../../api';
export const getPolicyTags = (paginate, query) => async (dispatch) => {
  try {
    var res;

    if (!paginate) {
      res = await API.get('/policy-tags');
    } else {
      res = await API.get(`/policy-tags/?${query}`);
    }
    dispatch({
      type: Type.GET_POLICY_TAGS,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPolicytag = (id) => async (dispatch) => {
  try {
    let res = await API.get(`/policy-tags/${id}`);
    dispatch({
      type: Type.GET_TAG,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
// export const getPolicy = (id) => async (dispatch) => {
//   try {
//     dispatch(Actions.setLoading(true));
//     const res = await API.get(`/policies/${id}`);
//     dispatch({
//       type: Type.SINGLE_POLICY,
//       payload: res
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const createPolicyTags = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    tag_id: uuidv4(),
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname
  };
  try {
    const res = await API.post('/policy-tags/', obj);
    dispatch({
      type: Type.NEW_POLICY_TAGE
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const updatePolicyTag = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    tag_multiplier: parseFloat(form?.tag_multiplier).toFixed(2),
    lastmodified_by: pgUser?.fullname
  };
  delete obj.tag_user;
  delete obj.tag_id;
  delete obj.tag_chargebox;
  delete obj.created_date;
  delete obj.created_by;
  try {
    const res = await API.patch(`/policy-tags/${form?.tag_id}/`, obj);
    dispatch({
      type: Type.UPDATE_POLICY
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const deleteChargePolicyTag = (form, obj) => async (dispatch) => {
  try {
    const res = await API.patch(`/policy-tags-rm/${form?.tag_id}/`, obj);
    dispatch({
      type: Type.UPDATE_POLICY
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const deleteUserPolicyTag = (form, obj) => async (dispatch) => {
  try {
    const res = await API.patch(`/policy-tags-rm/${form?.tag_id}/`, obj);
    dispatch({
      type: Type.UPDATE_POLICY
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};

export const SearchPolicyTag = (policyTag) => async (dispatch) => {
  try {
    const res = await API.get(`/search-policy-tags?search=${policyTag}`);
    dispatch({
      type: Type.GET_POLICY_TAGS,
      payload: res
    });
  } catch (error) {
    console.log('error', error);
  }
};
