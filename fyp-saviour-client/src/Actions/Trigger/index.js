import * as Type from 'Actions/type';

export const LocalStorageTrigger = (state) => async (dispatch) => {
  dispatch({ type: Type.LOCAL_STORAGE_TRIGGER, payload: state });
};
