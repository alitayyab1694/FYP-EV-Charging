import * as Type from 'Actions/type';

const initialState = {
  customerPolicy: false,
  userGroupModal: false,
  chargeBoxModal: false
};

const modelReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.CUSTOMER_POLICY_MODEL: {
      return {
        ...state,
        customerPolicy: !state.customerPolicy
      };
    }
    case Type.SET_GROUP_MODEL: {
      return {
        ...state,
        userGroupModal: !state.userGroupModal
      };
    }
    case Type.SET_CHARGE_BOX_MODEL: {
      return {
        ...state,
        chargeBoxModal: !state.chargeBoxModal
      };
    }
    default: {
      return state;
    }
  }
};

export default modelReducer;
