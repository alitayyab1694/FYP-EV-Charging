import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import * as API from '../../api';

export const getRates = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/rates');
    } else {
      res = await API.get(`/rates/?${query}`);
    }
    dispatch({
      type: Type.GET_RATES,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getRate = (id) => async (dispatch) => {
  try {
    dispatch(Actions.setLoading(true));
    const res = await API.get(`/rates/${id}`);
    dispatch({
      type: Type.SINGLE_GROUP,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const createRate = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    profilestart: moment(form.profilestarttime).format('YYYY-MM-DD'),
    profileend: moment(form.profileendtime).format('YYYY-MM-DD'),
    rateid: uuidv4(),
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    profilepricetype: form?.profilepricetype?.value,
    profileendtime: moment(form?.profileendtime).format('HH:mm'),
    profilestarttime: moment(form?.profilestarttime).format('HH:mm'),
    profilepriceunit: form?.profilepriceunit?.toString(),
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname
  };
  try {
    const res = await API.post('/rates/', obj);
    dispatch({
      type: Type.NEW_RATES
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
// export const updateGroup = (form, pgUser) => async (dispatch) => {
//   const obj = {
//     ...form,
//     pricingpolicy: form?.pricingpolicy?.map((c) => c.value),
//     version: (Number(form.version) + 1).toString(),
//     updated_date: moment().toISOString(),
//     lastmodified_by: pgUser.firstname + ' ' + pgUser.lastname,
//     chargebox: form?.chargebox?.map((c) => c.value)
//   };
//   delete obj.created_date;
//   delete obj.created_by;
//   ;
//   try {
//     const res = await API.put(`/groups/${form.groupid}/`, obj);
//     dispatch({
//       type: Type.UPDATE_GROUP
//     });
//     return { success: true, data: res };
//   } catch (error) {
//     console.log(error.response);
//     return { success: false, data: error.response };
//   }
// };

export const SearchRate = (price) => async (dispatch) => {
  try {
    const res = await API.get(`/search-rates?search=${price}`);
    dispatch({
      type: Type.GET_RATES,
      payload: res
    });
  } catch (error) {
    console.log('error', error);
  }
};
