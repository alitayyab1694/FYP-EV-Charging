import * as Type from 'Actions/type';
import * as API from '../../api';
export const getCustomers = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/search-users?search=5');
    } else {
      res = await API.get(`/search-users?${query}`);
    }
    dispatch({
      type: Type.GET_CUSTOMERS,
      payload: res
    });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};
export const getCustomerPolicy = (userId) => async (dispatch) => {
  try {
    let res = await API.get(`/search-policy-tags?search=${userId}`);

    dispatch({ type: Type.CUSTOMER_POLICY, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const SelectCustomer = (obj) => async (dispatch) => {
  dispatch({
    type: Type.GET_SELECTED_CUSTOMER,
    payload: obj
  });
};

export const UpdateCustomerPolicy = (obj, userId) => async (dispatch) => {
  try {
    await API.patch(`/update-user/${userId}/`, obj);
    await dispatch(await getCustomers());

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

// search-customerby-email

export const SearchCustomer = (customerEmail) => async (dispatch) => {
  try {
    const res = await API.get(
      `/search-customerby-email/?search=${customerEmail}`
    );
    dispatch({
      type: Type.GET_CUSTOMERS,
      payload: res
    });
  } catch (error) {
    console.log('error', error);
  }
};
