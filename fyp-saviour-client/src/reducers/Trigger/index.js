import * as Type from 'Actions/type';

const initialState = {
  triggerLocalStorage: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.LOCAL_STORAGE_TRIGGER: {
      return {
        triggerLocalStorage: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
