import * as Type from 'Actions/type';

const initialState = {
  users: null,
  policies: null,
  rates: null,
  policyByGroup: null,
  singlePolicy: null,
  policyTags: null,
  singleTag: null,
  groups: null,
  singleGroup: null,
  groupByPolicy: null,
  groupByChargeBox: null,
  chargeBox: null,
  selectedCharge: null,
  selectedCustomer: null,
  singleBox: null,
  chargeBoxPolicy: null,
  chargeBoxConnectors: null,
  customer: null,
  customerpolicies: null,
  pgUser: null,
  dashboard: null,
  userGroup: null,
  usersGroup: null,
  userByEmail: null,
  singleUserGroup: null,
  companies: null,
  singleCompany: null,
  reservations: null,
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
    case Type.GET_USER: {
      return {
        ...state,
        pgUser: action.payload
      };
    }
    case Type.SELECTED_CHARGEBOX: {
      return {
        ...state,
        selectedCharge: action.payload
      };
    }
    case Type.GET_SELECTED_CUSTOMER: {
      return {
        ...state,
        selectedCustomer: action.payload
      };
    }
    case Type.FETCH_POLICY_BY_GROUP: {
      return {
        ...state,
        policyByGroup: action.payload
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
        singleGroup: action.payload
      };
    }
    case Type.FETCH_CHARGE_BOX_GROUP: {
      return {
        ...state,
        groupByChargeBox: action.payload
      };
    }
    case Type.FETCH_POLICY_BY_CHARGE_BOX: {
      return {
        ...state,
        groupByPolicy: action.payload,
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
    case Type.FETCH_POLICY_BY_CHARGE_BOX: {
      return {
        ...state,
        chargeBoxPolicy: action.payload
      };
    }
    case Type.FETCH_CONNECTOR_BY_CHARGE_BOX: {
      return {
        ...state,
        chargeBoxConnectors: action.payload,
        isLoading: false
      };
    }
    case Type.USER_GROUP: {
      return {
        ...state,
        userGroup: action.payload
      };
    }
    case Type.USER_BY_GROUPID: {
      return {
        ...state,
        usersGroup: action.payload
      };
    }
    case Type.USER_BY_EMAIL: {
      return {
        ...state,
        userByEmail: action.payload
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
    case Type.SINGLE_COMPANY: {
      return {
        ...state,
        singleCompany: action.payload,
        isLoading: false
      };
    }
    case Type.NEW_RESERVATION: {
      return {
        ...state,
        reservations: action.payload
      };
    }
    case Type.GET_DASHBOARD: {
      return {
        ...state,
        dashboard: action.payload
      };
    }
    case Type.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    case Type.GET_CUSTOMERS: {
      return {
        ...state,
        customer: action.payload
      };
    }
    case Type.CUSTOMER_POLICY: {
      return {
        ...state,
        customerpolicies: action.payload
      };
    }
    case Type.CUSTOMER_POLICY_MODEL: {
      return {
        ...state,
        customerpolicies: null
      };
    }
    case Type.GET_POLICY_TAGS: {
      return {
        ...state,
        policyTags: action.payload
      };
    }
    case Type.GET_TAG: {
      return {
        ...state,
        singleTag: action.payload
      };
    }
    case Type.GET_RATES: {
      return {
        ...state,
        rates: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
