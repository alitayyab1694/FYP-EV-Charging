import * as Type from 'Actions/type';

const initialState = {
  success: false,
  error: {
    username: null,
    password: null
  }
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.LOGIN_SUCCESS: {
      return {
        ...initialState,
        success: true
      };
    }
    case Type.LOGIN_ERROR: {
      return {
        success: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
