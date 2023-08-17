import * as Type from 'Actions/type';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import * as API from '../../api';

export const createConnector = (form, pgUser) => async (dispatch) => {
  const obj = {
    ...form,
    connectorId_pk: uuidv4(),
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    connectorCategory: form?.connectorCategory?.value,
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname
  };
  try {
    const res = await API.post('/connectors/', obj);
    dispatch({
      type: Type.NEW_CONNECTOR
    });
    return { success: true, data: res };
  } catch (error) {
    console.log(error.response);
    return { success: false, data: error.response };
  }
};
