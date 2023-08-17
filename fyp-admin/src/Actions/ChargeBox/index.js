import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import moment from 'moment';
import * as API from '../../api';
export const getChargeBoxes = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/chargeboxes');
    } else {
      res = await API.get(`/chargeboxes/?${query}`);
    }
    dispatch({
      type: Type.GET_CHARGING_BOX,
      payload: res
    });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};
export const getChargeBox = (id) => async (dispatch) => {
  try {
    dispatch(Actions.setLoading(true));
    const res = await API.get(`/chargeboxes/${id}`);
    dispatch({
      type: Type.SINGLE_CHARGE_BOX,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const SelectChargebox = (obj) => async (dispatch) => {
  dispatch({
    type: Type.SELECTED_CHARGEBOX,
    payload: obj
  });
};

export const createChargeBox = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname,
    status: true,
    registration: form?.registration?.label === 'Active' && 'accept',
    city: form?.city?.label,
    country: form?.country?.label,
    state: form?.state?.label,
    capacity: Number(form?.capacity?.label?.split('-')[0]),
    consumption: null,
    fwupdatetimestamp: '2021-09-03T06:54:55.115976',
    connectorId_fk: form?.connectorId_fk.map((c) => {
      return c?.value;
    }),
    chargebox_tag: [],
    pricingpolicy: form?.pricingpolicy.map((p) => p?.value),
    fullTimeAvailable: true,
    availabilityStartTimeStamp: null,
    availabilityEndTimeStamp: null
  };
  try {
    const res = await API.post('/chargeboxes/', obj);
    dispatch({
      type: Type.NEW_CHARGE_BOX
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const getPolicyByChargeBox = (changeBoxId) => async (dispatch) => {
  try {
    const res = await API.get(`/search-policy/?search=${changeBoxId}`);
    dispatch({
      type: Type.FETCH_POLICY_BY_CHARGE_BOX,
      payload: res.results
    });
  } catch (error) {}
};
export const getConnectorByChargeBox = (changeBoxId) => async (dispatch) => {
  try {
    const res = await API.get(`/search-connector/?search=${changeBoxId}`);
    dispatch({
      type: Type.FETCH_CONNECTOR_BY_CHARGE_BOX,
      payload: res.results
    });
  } catch (error) {}
};
export const updateChargeBox = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    updated_date: moment().toISOString(),
    lastmodified_by: pgUser?.fullname,
    status: true,
    registration: form?.registration?.label === 'Active' && 'accept',
    city: form?.city?.label,
    country: form?.country?.label,
    state: form?.state?.label,

    capacity: Number(form?.capacity?.label?.split('-')[0]),
    consumption: null,
    connectorId_fk: form?.connectorId_fk?.map((p) => {
      if (p?.value) {
        return p.value;
      }
      return p;
    }),
    chargebox_tag: form?.chargebox_tag?.map((p) => {
      if (p?.value) {
        return p?.value;
      }
      return p;
    }),
    pricingpolicy: form?.pricingpolicy?.map((p) => {
      if (p?.value) {
        return p.value;
      }
      return p;
    })
  };
  delete obj.created_date;
  delete obj.created_by;
  delete obj.pricingpolicies;
  try {
    const res = await API.patch(`/chargeboxes/${form.chargeboxid}/`, obj);
    dispatch({
      type: Type.UPDATE_CHARGE_BOX
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
export const UpdateChargeBoxTag = (obj, chargeBoxId) => async (dispatch) => {
  try {
    await API.patch(`/chargeboxes/${chargeBoxId}/`, obj);
    await dispatch(await getChargeBoxes());

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const SearchChargeBox = (chargeBoxId) => async (dispatch) => {
  try {
    const res = await API.get(`/search-chargebox/?search=${chargeBoxId}`);
    dispatch({
      type: Type.GET_CHARGING_BOX,
      payload: res
    });
  } catch (error) {
    console.log('error', error);
  }
};
