import * as Type from 'Actions/type';

const initialState = {
  users: null,
  policies: null,
  singlePolicy: null,
  chargeBoxPolicy: null,
  chargeBoxConnector: null,
  selectedConnector: null,
  chargeBoxUser: null,
  groups: null,
  singleGroup: null,
  startTransaction: null,
  stopTransaction: null,
  checkTransactionStatus: null,
  chargeBox: null,
  singleBox: null,
  pgUser: null,
  dashboard: null,
  userGroup: null,
  singleUserGroup: null,
  companies: null,
  singleCompany: null,
  reservation: null,
  chargeBoxInfo: null,
  isLoading: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_USERS: {
      return {
        ...state,
        users: action.payload
      };
    }
    case Type.START_TRANSACTION: {
      return {
        ...state,
        startTransaction: action.payload
      };
    }
    case Type.STOP_TRANSACTION: {
      return {
        ...state,
        stopTransaction: action.payload
      };
    }
    case Type.CHECK_STATUS: {
      return {
        ...state,
        checkTransactionStatus: action.payload
      };
    }
    case Type.GET_CHARGE_BOX_USER: {
      return {
        ...state,
        chargeBoxUser: action.payload
      };
    }
    case Type.USER_LOGGED_OUT: {
      return {
        ...state,
        pgUser: null
      };
    }
    case Type.GET_USER: {
      return {
        ...state,
        pgUser: action.payload
      };
    }
    case Type.GET_POLICIES: {
      return {
        ...state,
        policies: action.payload
      };
    }
    case Type.SINGLE_POLICY: {
      return {
        ...state,
        singlePolicy: action.payload,
        isLoading: false
      };
    }
    case Type.GET_GROUPS: {
      return {
        ...state,
        groups: action.payload
      };
    }
    case Type.SINGLE_GROUP: {
      return {
        ...state,
        singleGroup: action.payload,
        isLoading: false
      };
    }
    case Type.GET_CHARGING_BOX: {
      return {
        ...state,
        chargeBox: action.payload
      };
    }
    case Type.SINGLE_CHARGE_BOX: {
      return {
        ...state,
        singleBox: action.payload
      };
    }
    case Type.SINGLE_CHARGE_BOX_POLICY: {
      return {
        ...state,
        chargeBoxPolicy: action.payload
      };
    }
    case Type.SINGLE_CHARGE_BOX_CONNECTOR: {
      return {
        ...state,
        chargeBoxConnector: action.payload,
        isLoading: false
      };
    }
    case Type.SINGLE_CHARGE_BOX_SELETED_CONNECTOR: {
      return {
        ...state,
        selectedConnector: action.payload,
        isLoading: false
      };
    }
    case Type.USER_GROUP: {
      return {
        ...state,
        userGroup: action.payload
      };
    }
    case Type.SINGLE_USER_GROUP: {
      return {
        ...state,
        singleUserGroup: action.payload,
        isLoading: false
      };
    }
    case Type.GET_COMPANYS: {
      return {
        ...state,
        companies: action.payload
      };
    }
    case Type.GET_RESERVATION: {
      return {
        ...state,
        reservation: action.payload
      };
    }
    case Type.SINGLE_COMPANY: {
      return {
        ...state,
        singleCompany: action.payload,
        isLoading: false
      };
    }
    case Type.GET_DASHBOARD: {
      return {
        ...state,
        dashboard: action.payload
      };
    }
    case Type.GET_CHARGE_BOX_INFO: {
      return {
        ...state,
        chargeBoxInfo: action.payload
      };
    }
    case Type.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
