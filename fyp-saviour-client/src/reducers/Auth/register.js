import * as Type from 'Actions/type';
import { toast, Zoom } from 'react-toastify';

const initialState = {
  success: false,
  error: {
    username: null,
    password: null
  }
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.REGISTER_SUCCESS: {
      return {
        ...initialState,
        success: true
      };
    }
    case Type.REGISTER_ERROR: {
      toast.error(
        action.payload.username
          ? action.payload.username
          : action.payload.password,
        {
          containerId: 'D',
          transition: Zoom
        }
      );
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

export default registerReducer;
