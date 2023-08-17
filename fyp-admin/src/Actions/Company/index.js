import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import moment from 'moment';
import * as API from '../../api';
export const getCompanies = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/companies');
    } else {
      res = await API.get(`/companies/?${query}`);
    }
    dispatch({
      type: Type.GET_COMPANYS,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompany = (id) => async (dispatch) => {
  try {
    dispatch(Actions.setLoading(true));
    const res = await API.get(`/companies/${id}`);
    dispatch({
      type: Type.SINGLE_COMPANY,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const createCompany = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname,
    groupid_fk_id: form?.groupid_fk?.value
  };
  try {
    const res = await API.post('/companies/', obj);
    dispatch({
      type: Type.NEW_COMPANY
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const updateCompany = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    version: (Number(form.version) + 1).toString(),
    updated_date: moment().toISOString(),
    lastmodified_by: pgUser?.fullname,
    groupid_fk: form?.groupid_fk?.value
  };
  delete obj.created_date;
  delete obj.created_by;
  try {
    const res = await API.put(`/companies/${form.companyid}/`, obj);
    dispatch({
      type: Type.UPDATE_COMPANY
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
