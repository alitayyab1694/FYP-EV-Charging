import * as Actions from 'Actions';
import * as Type from 'Actions/type';
import moment from 'moment';
import { getLocalStorage } from 'utils';
import * as API from '../../api';
export const getChargeBoxes = (data, startTime, endTime) => async (
  dispatch
) => {
  try {
    let res;
    const { city, type, hour, profile } = data;
    if (profile.value === 'profilePKW') {
      res = await API.get(
        `/chargeboxes-nopage/?loc=${city.value}&charger_type=${type.value}&res_start_time=${startTime}&price_type=${profile.value}&kw_needed=${hour}`
      );
    } else {
      res = await API.get(
        `/chargeboxes-nopage/?loc=${city.value}&charger_type=${type.value}&res_start_time=${startTime}&res_end_time=${endTime}&price_type=${profile.value}`
      );
    }
    dispatch({
      type: Type.GET_CHARGING_BOX,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getChargeBoxUserByEmail = (email, history) => async (dispatch) => {
  try {
    const res = await API.get(`/search-usersby-email?search=${email}`);

    dispatch({
      type: Type.GET_CHARGE_BOX_USER,
      payload: res
    });
    if (res?.results?.length === 0) {
      history.push('/PageError404');
    }
  } catch (error) {
    history.push('/PageError404');
    console.log(error);
  }
};
export const removeSingleChargeBox = () => async (dispatch) => {
  dispatch({
    type: Type.SINGLE_CHARGE_BOX,
    payload: null
  });
};
export const getsingleChargeBox = (id, form, startTime, endTime) => async (
  dispatch
) => {
  let res;
  const { profile, hour } = form;
  try {
    if (profile?.value === 'profilePKW') {
      res = await API.get(
        `/chargeboxes/${id}/?price_type=${profile.value}&rate_start_time=${startTime}&kw_needed=${hour}`
      );
    } else {
      res = await API.get(
        `/chargeboxes/${id}/?price_type=${profile.value}&rate_start_time=${startTime}&rate_end_time=${endTime}`
      );
    }
    dispatch({
      type: Type.SINGLE_CHARGE_BOX,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNearByCharge = (data, startTime, endTime, userData) => async (
  dispatch
) => {
  try {
    let res;
    const { profile, hour } = userData;
    const { latitude, longitude, connectorId_fk } = data;
    if (profile.value === 'profilePKW') {
      res = await API.get(
        `/nearby-chargeboxes/?lat=${latitude}&lon=${longitude}&charger_type=${
          connectorId_fk?.connectorCategory === 'AC' ? 'fast' : 'slow'
        }&res_start_time=${startTime}&price_type=${
          profile.value
        }&kw_needed=${hour}`
      );
    } else {
      res = await API.get(
        `/chargeboxes-nopage/?lat=${latitude}&lon=${longitude}&charger_type=${
          connectorId_fk?.connectorCategory === 'AC' ? 'fast' : 'slow'
        }&res_start_time=${startTime}&res_end_time=${endTime}&price_type=${
          profile.value
        }`
      );
    }
    dispatch({
      type: Type.GET_CHARGING_BOX,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getChargeBox = (id, user) => async (dispatch) => {
  try {
    let res;
    let response;
    let connectorResponse;
    const filter = getLocalStorage('filter', true);
    const filter1 = getLocalStorage('dateAndHour', true);
    dispatch(Actions.setLoading(true));

    if (filter?.profile?.value === 'profilePKW') {
      res = await API.get(
        `/chargeboxes/${id}/?price_type=${
          filter?.profile.value
        }&rate_start_time=${
          moment(filter1?.startTime).toISOString().split('T')[0]
        } ${
          moment(filter1?.startTime).toISOString().split('T')[1].split('.')[0]
        }&kw_needed=${filter1?.hour}&user_id=${user?.data?.uid}`
      );
      response = await API.get(`/search-policy?search=${id}`);
      connectorResponse = await API.get(`/search-connector?search=${id}`);
    } else {
      res = await API.get(
        `/chargeboxes/${id}/?price_type=${
          filter?.profile.value
        }&rate_start_time=${
          moment(filter1?.startTime).toISOString().split('T')[0]
        } ${
          moment(filter1?.startTime).toISOString().split('T')[1].split('.')[0]
        }&rate_end_time=${
          moment(filter1?.endTime).toISOString().split('T')[0]
        } ${
          moment(filter1?.endTime).toISOString().split('T')[1].split('.')[0]
        }&user_id=${user?.data?.uid}`
      );
      response = await API.get(`/search-policy?search=${id}`);
      connectorResponse = await API.get(`/search-connector?search=${id}`);
    }
    dispatch({
      type: Type.SINGLE_CHARGE_BOX,
      payload: res
    });
    dispatch({
      type: Type.SINGLE_CHARGE_BOX_POLICY,
      payload: response
    });
    dispatch({
      type: Type.SINGLE_CHARGE_BOX_CONNECTOR,
      payload: connectorResponse
    });
  } catch (error) {
    console.log(error);
  }
};

export const createChargeBox = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: pgUser.firstname + ' ' + pgUser.lastname,
    lastmodified_by: pgUser.firstname + ' ' + pgUser.lastname,
    status: true,
    registration: form?.registration?.label === 'Active' && 'accept',
    city: form?.city?.label,
    country: form?.country?.label,
    capacity: Number(form?.capacity?.label?.split('-')[0]),
    consumption: null,
    fwupdatetimestamp: '2021-09-03T06:54:55.115976',
    connectorId_fk: form?.connectorId_fk.value,
    pricingpolicy: form?.pricingpolicy.map((p) => p.value)
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

export const getChargeBoxesInfo = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Type.GET_CHARGE_BOX_INFO,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeChargeBoxInfo = () => async (dispatch) => {
  dispatch({
    type: Type.SINGLE_CHARGE_BOX,
    payload: null
  });
};
