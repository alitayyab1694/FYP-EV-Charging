import * as Type from 'Actions/type';
export const customerPolicyModelHandler = () => async (dispatch) => {
  dispatch({
    type: Type.CUSTOMER_POLICY_MODEL
  });
};
export const GroupUserHandler = () => async (dispatch) => {
  dispatch({
    type: Type.SET_GROUP_MODEL
  });
};
export const chargeBoxTageHandler = () => async (dispatch) => {
  dispatch({
    type: Type.SET_CHARGE_BOX_MODEL
  });
};
