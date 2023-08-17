import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import * as API from "api";

// User Thunks
export const getUsers = createAsyncThunk(
  "appReducer/getUsers",
  async ({ paginate, query }) => {
    let res;
    if (!paginate) {
      res = await API.get("/users");
    } else {
      res = await API.get(`/users/?${query}`);
    }
    return res;
  }
);

export const getUser = createAsyncThunk("appReducer/getUser", async (id) => {
  try {
    const res = await API.get(`/users/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const CreateOrVerifyUser = createAsyncThunk(
  "appReducer/createUser",
  async (user) => {
    try {
      await API.post(`/post-user/`, user);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserByGroup = createAsyncThunk(
  "appReducer/getUserByGroup",
  async (groupId) => {
    try {
      let res = await API.get(`/search-usersby-gid?search=${groupId}`);
      return res.results;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getUserByEmail = createAsyncThunk(
  "appReducer/getUserByEmail",
  async (email) => {
    try {
      let res = await API.get(`/search-usersby-email?search=${email}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

//Chargeboxes Thunks
export const getChargeBoxes = createAsyncThunk(
  "appReducer/getChargeBoxes",
  async (id) => {
    try {
     const query= id ? `?companyId=${id}` : ''
     const res = await API.get(API.GET_CHARGEBOXES+query);
     return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getChargeBox = createAsyncThunk(
  "appReducer/getChargeBox",
  async (id) => {
    try {
      const res = await API.get(`/chargeboxes/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createChargeBox = createAsyncThunk(
  "appReducer/createChargeBox",
  async ({ form, pgUser }) => {
    const obj = {
      ...form,
      version: "1",
      created_date: moment().toISOString(),
      updated_date: moment().toISOString(),
      created_by: pgUser?.fullname,
      lastmodified_by: pgUser?.fullname,
      status: true,
      registration: form?.registration?.label === "Active" && "accept",
      city: form?.city?.label,
      country: form?.country?.label,
      state: form?.state?.label,
      capacity: Number(form?.capacity?.label?.split("-")[0]),
      consumption: null,
      fwupdatetimestamp: "2021-09-03T06:54:55.115976",
      connectorId_fk: form?.connectorId_fk.map((c) => {
        return c?.value;
      }),
      chargebox_tag: [],
      pricingpolicy: form?.pricingpolicy.map((p) => p?.value),
      fullTimeAvailable: true,
      availabilityStartTimeStamp: null,
      availabilityEndTimeStamp: null,
    };
    try {
      const res = await API.post("/chargeboxes/", obj);
      return true;
    } catch (error) {
      // console.log(error.response);
      //   return { success: false, data: error.response };
    }
  }
);
export const getPolicyByChargeBox = createAsyncThunk(
  "appReducer/getPolicyByChargeBox",
  async (changeBoxId) => {
    try {
      const res = await API.get(`/search-policy/?search=${changeBoxId}`);
      return res.results;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getConnectorByChargeBox = createAsyncThunk(
  "appReducer/getConnectorByChargeBox",
  async (changeBoxId) => {
    try {
      const res = await API.get(`/search-connector/?search=${changeBoxId}`);
      return res.results;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const UpdateChargeBoxTag = createAsyncThunk(
//   'appReducer/UpdateChargeBoxTag',
//   async (obj, chargeBoxId) => {
//     try {
//       await API.patch(`/chargeboxes/${chargeBoxId}/`, obj);
//       await getChargeBoxes();
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const SearchChargeBox = createAsyncThunk(
  "appReducer/SearchChargeBox",
  async (chargeBoxId) => {
    try {
      const res = await API.get(`/search-chargebox/?search=${chargeBoxId}`);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// Company Thunks
export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  async (obj) => {
    try {
     const   res = await API.get("/company");
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCompany = createAsyncThunk("company/getCompany", async (id) => {
  try {
    const res = await API.get(`/company/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
});
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async ({ form,  }) => {
    const obj = {
      ...form,
    };
    try {
       await API.post("/company/create", obj);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ form,  }) => {
    const obj = {
      ...form,
      
    };
    try {
       await API.patch(`/company/${form._id}/`, obj);
    } catch (error) {
      console.log(error.response);
      return { success: false, data: error.response };
    }
  }
);

// Connector Thunk
export const createConnector = async (form, pgUser) => {
  const obj = {
    ...form,
    connectorId_pk: uuidv4(),
    version: "1",
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    connectorCategory: form?.connectorCategory?.value,
    created_by: pgUser?.fullname,
    lastmodified_by: pgUser?.fullname,
  };
  try {
    const res = await API.post("/connectors/", obj);
    return { success: true, data: res };
  } catch (error) {
    console.log(error);
  }
};

// Customer Thunks
export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async ({ paginate, query }) => {
    try {
      let res;
      if (!paginate) {
        res = await API.get("/search-users?search=5");
      } else {
        res = await API.get(`/search-users?${query}`);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCustomerPolicy = createAsyncThunk(
  "company/getCompanyPolicy",
  async (userId) => {
    try {
      let res = await API.get(`/search-policy-tags?search=${userId}`);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

// search-customerby-email

export const SearchCustomer = createAsyncThunk(
  "customer/searchCustomer",
  async (customerEmail) => {
    try {
      const res = await API.get(
        `/search-customerby-email/?search=${customerEmail}`
      );
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// Dashboardinfo Thunk
export const getDashboardInfo = createAsyncThunk(
  "dashboard/getDashboardInfo",
  async () => {
    try {
      const res = await API.get("/dashboard");
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

// Groups Thunks
export const getGroups = createAsyncThunk(
  "groups/getGroups",
  async ({ paginate, query }) => {
    try {
      let res;
      if (!paginate) {
        res = await API.get("/groups");
      } else {
        res = await API.get(`/groups/?${query}`);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getGroup = createAsyncThunk("groups/getGroup", async (id) => {
  try {
    const res = await API.get(`/groups/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
});
export const getChargeBoxByGroup = createAsyncThunk(
  "groups/getChargeboxByGroup",
  async (groupId) => {
    try {
      const res = await API.get(`/search-chargebox/?search=${groupId}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getPolicesByGroup = createAsyncThunk(
  "groups/getPoliciesByGroup",
  async (groupId) => {
    try {
      const res = await API.get(`/search-policy/?search=${groupId}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

// Policies Thunks
export const getPolices = createAsyncThunk(
  "policies/getPolicies",
  async ({ paginate, query }) => {
    let res;
    try {
      if (!paginate) {
        res = await API.get("/policies");
      } else {
        res = await API.get(`/policies/?${query}`);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getPolicy = createAsyncThunk("policies/getPolicy", async (id) => {
  try {
    const res = await API.get(`/policies/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const SearchPolicy = createAsyncThunk(
  "policies/searchPolicy",
  async (policyName) => {
    try {
      const res = await API.get(`/search-policy/?search=${policyName}`);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// PolicyTag Thunks
export const getPolicyTags = createAsyncThunk(
  "policyTag/getPolicyTags",
  async ({ paginate, query }) => {
    let res;
    try {
      if (!paginate) {
        res = await API.get("/policy-tags");
      } else {
        res = await API.get(`/policy-tags/?${query}`);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getPolicytag = createAsyncThunk(
  "policyTag/getPolicyTag",
  async (id) => {
    try {
      let res = await API.get(`/policy-tags/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const SearchPolicyTag = createAsyncThunk(
  "policyTag/searchPolicyTag",
  async (policyTag) => {
    try {
      const res = await API.get(`/search-policy-tags?search=${policyTag}`);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// Rate Thunks
export const getRates = createAsyncThunk(
  "rates/getRates",
  async ({ paginate, query }) => {
    let res;
    try {
      if (!paginate) {
        res = await API.get("/rates");
      } else {
        res = await API.get(`/rates/?${query}`);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getRate = createAsyncThunk("rates/getRate", async (id) => {
  try {
    const res = await API.get(`/rates/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const SearchRate = createAsyncThunk(
  "rates/searchRate",
  async (price) => {
    try {
      const res = await API.get(`/search-rates?search=${price}`);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// Reservation Thunks
export const getReservation = createAsyncThunk(
  "reservations/getReservations",
  async () => {
    let res;
    try {
        res = await API.get("/reservation");
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const SearchReservation = createAsyncThunk(
  "reservations/searchReservations",
  async (resEmail) => {
    try {
      const res = await API.get(`/search-reservation?search=${resEmail}`);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// Usergroup Thunks
export const  getUserGroups = createAsyncThunk(
  "usergroup/getUserGroups",
  async () => {
    
    try {
     const   res = await API.get("/auth/company/users");
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCompanyUsers = createAsyncThunk(
  "usergroup/getUserGroups",
  async (obj) => {
    try {
     const   res = await API.get("/auth/company/users");
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getUserGroup = createAsyncThunk(
  "usergroup/getUserGroup",
  async (id) => {
    try {
      const res = await API.get(`/usergroup/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const SearchUserGroup = createAsyncThunk(
  "usergroup/searchUserGroup",
  async (groupName) => {
    try {
      const res = await API.get(`/search-usergroup/?search=${groupName}`);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const getFeedBackList = createAsyncThunk(
  "feedback/feedbackList",
  async (feedback) => {
    try {
      const res = await API.get(`/feedback/`);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const appReducerSlice = createSlice({
  name: "appReducer",
  initialState: {
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
    chargeBox: [],
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
    isLoading: false,
  },
  reducers: {
    SelectChargebox: (state, action) => {
      state.selectedCharge = action.payload;
    },
    SelectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getUser.fulfilled]: (state, action) => {
      state.pgUser = action.payload;
    },
    [CreateOrVerifyUser.fulfilled]: (state, action) => {
      return state;
    },
    [getUserByGroup.fulfilled]: (state, action) => {
      state.usersGroup = action.payload;
    },
    [getUserByEmail.fulfilled]: (state, action) => {
      state.userByEmail = action.payload;
    },
    [getChargeBoxes.fulfilled]: (state, action) => {
      state.chargeBox = action.payload;
    },
    [getChargeBox.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getChargeBox.fulfilled]: (state, action) => {
      state.singleBox = action.payload;
      state.isLoading = false;
    },
    [getChargeBox.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [createChargeBox.fulfilled]: (state, action) => {
      return state;
    },
    [getPolicyByChargeBox.fulfilled]: (state, action) => {
      state.chargeBoxPolicy = action.payload;
    },
    [getConnectorByChargeBox.fulfilled]: (state, action) => {
      state.chargeBoxConnectors = action.payload;
    },
    // [UpdateChargeBoxTag.fulfilled]: (state, action) => {
    //   return state;
    // },
    [SearchChargeBox.fulfilled]: (state, action) => {
      state.chargeBox = action.payload;
    },
    [getCompanies.fulfilled]: (state, action) => {
      state.companies = action.payload;
    },
    [getCompany.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCompany.fulfilled]: (state, action) => {
      state.singleCompany = action.payload;
      state.isLoading = false;
    },
    [getCompany.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [createCompany.fulfilled]: (state, action) => {
      return state;
    },
    [updateCompany.fulfilled]: (state, action) => {
      return state;
    },
    [getCustomers.fulfilled]: (state, action) => {
      state.customer = action.payload;
    },
    [getCustomerPolicy.fulfilled]: (state, action) => {
      state.customerpolicies = action.payload;
    },
    [SearchCustomer.fulfilled]: (state, action) => {
      state.customer = action.payload;
    },
    [getDashboardInfo.fulfilled]: (state, action) => {
      state.dashboard = action.payload;
    },
    [getGroups.fulfilled]: (state, action) => {
      state.groups = action.payload;
    },
    [getGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getGroup.fulfilled]: (state, action) => {
      state.singleGroup = action.payload;
      state.isLoading = false;
    },
    [getGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getChargeBoxByGroup.fulfilled]: (state, action) => {
      state.groupByChargeBox = action.payload;
    },
    [getPolicesByGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPolicesByGroup.fulfilled]: (state, action) => {
      state.policyByGroup = action.payload;
      state.isLoading = false;
    },
    [getPolicesByGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [getPolices.fulfilled]: (state, action) => {
      state.policies = action.payload;
    },
    [getPolicy.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPolicy.fulfilled]: (state, action) => {
      state.singlePolicy = action.payload;
      state.isLoading = false;
    },
    [getPolicy.fulfilled]: (state, action) => {
      state.singlePolicy = action.payload;
      state.isLoading = false;
    },
    [SearchPolicy.fulfilled]: (state, action) => {
      state.policies = action.payload;
    },
    [getPolicyTags.fulfilled]: (state, action) => {
      state.policyTags = action.payload;
    },
    [getPolicytag.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPolicytag.fulfilled]: (state, action) => {
      state.singleTag = action.payload;
      state.isLoading = false;
    },
    [getPolicytag.fulfilled]: (state, action) => {
      state.singleTag = action.payload;
      state.isLoading = false;
    },
    [SearchPolicyTag.fulfilled]: (state, action) => {
      state.policyTags = action.payload;
    },
    [getRates.fulfilled]: (state, action) => {
      state.rates = action.payload;
    },
    [getRate.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getRate.fulfilled]: (state, action) => {
      state.singleGroup = action.payload;
      state.isLoading = false;
    },
    [getRate.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [SearchRate.fulfilled]: (state, action) => {
      state.rates = action.payload;
    },
    [getReservation.fulfilled]: (state, action) => {
      state.reservations = action.payload;
    },
    [SearchReservation.fulfilled]: (state, action) => {
      state.reservations = action.payload;
    },
    [getUserGroups.fulfilled]: (state, action) => {
      state.userGroup = action.payload;
    },
    [getUserGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUserGroup.fulfilled]: (state, action) => {
      state.singleUserGroup = action.payload;
      state.isLoading = false;
    },
    [getUserGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [SearchUserGroup.fulfilled]: (state, action) => {
      state.userGroup = action.payload;
    },
  },
});

export const {
  SelectChargebox,
  SelectCustomer,
  setLoading,
} = appReducerSlice.actions;

export default appReducerSlice.reducer;
