import * as Type from 'Actions/type';
import * as API from '../../api';
export const getUsers = (paginate, query) => async (dispatch) => {
  try {
    var res;
    if (!paginate) {
      res = await API.get('/users');
    } else {
      res = await API.get(`/users/?${query}`);
    }
    dispatch({
      type: Type.GET_USERS,
      payload: res
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUser = (id) => async (dispatch) => {
  try {
    const res = await API.get(`/users/${id}`);
    dispatch({
      type: Type.GET_USER,
      payload: res
    });
  } catch (error) {
    console.log(error.response);
  }
};
// export const getUser = (email) => async (dispatch) => {
//   try {
//     ;
//     let res = await API.get(`/search-usersby-email?search=${email}`);
//     ;
//     dispatch({
//       type: Type.GET_USER,
//       payload: res?.results?.[0]
//     });
//   } catch (error) {
//     ;
//     console.log(error.response);
//   }
// };
export const CreateOrVerifyUser = (user) => async (dispatch) => {
  try {
    await API.post(`/post-user/`, user);
  } catch (error) {
    console.log(error);
  }
};
export const getUserByGroup = (groupId, Load = true) => async (dispatch) => {
  try {
    let res = await API.get(`/search-usersby-gid?search=${groupId}`);
    dispatch({ type: Type.USER_BY_GROUPID, payload: res.results });
    return true;
  } catch (error) {
    console.log(error);
  }
};
export const getUserByEmail = (email) => async (dispatch) => {
  try {
    let res = await API.get(`/search-usersby-email?search=${email}`);
    dispatch({ type: Type.USER_BY_EMAIL, payload: res });
  } catch (error) {}
};
