import * as Type from 'Actions/type';

export const setLoading = (value) => async (dispatch) => {
  try {
    dispatch({
      type: Type.SET_LOADING,
      payload: value
    });
  } catch (error) {
    console.log(error);
  }
};
