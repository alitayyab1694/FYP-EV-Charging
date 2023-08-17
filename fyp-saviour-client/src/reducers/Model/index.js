import * as Type from 'Actions/type';

const initialState = {
  stepper: true,
  login: false,
  payment: false,
  qrReader: false,
  walkInUser: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_STEPPER: {
      return {
        ...state,
        stepper: action.payload
      };
    }
    case Type.SET_LOGIN_MODEL: {
      return {
        ...state,
        login: action.payload
      };
    }
    case Type.SET_PAYMENT_MODEL: {
      return {
        ...state,
        payment: action.payload
      };
    }
    case Type.SET_QR_READER_MODEL: {
      return {
        ...state,
        qrReader: action.payload
      };
    }
    case Type.SET_WALK_IN_USER_MODEL: {
      return {
        ...state,
        walkInUser: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
