import * as Type from 'Actions/type';
import { removeLocalStorage } from 'utils';
const initialState = {
  role: [], // guest
  Auth: false,
  data: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_USER_DATA: {
      return {
        ...initialState,
        data: action.payload,
        Auth: true
      };
    }
    case Type.REMOVE_USER_DATA: {
      removeLocalStorage('access_token');
      return {
        ...initialState,
        data: null,
        Auth: false
      };
    }
    case Type.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
