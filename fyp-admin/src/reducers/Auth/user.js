import * as Type from 'Actions/type';

const initialState = {
  role: [], // guest
  Auth: false,
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/avatar7.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['calendar', 'mail', 'contacts', 'todo']
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_USER_DATA: {
      return {
        ...initialState,
        ...action.payload
      };
    }
    case Type.REMOVE_USER_DATA: {
      return {
        ...initialState
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
