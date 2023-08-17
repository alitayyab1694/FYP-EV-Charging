import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    customerPolicy: false,
    userGroupModal: false,
    chargeBoxModal: false
  },
  reducers: {
    customerPolicyModelHandler: (state, action) => {
      state.customerPolicy = !state.customerPolicy;
    },
    GroupUserHandler: (state, action) => {
      state.userGroupModal = !state.userGroupModal;
    },
    chargeBoxTageHandler: (state, action) => {
      state.chargeBoxModal = !state.chargeBoxModal;
    }
  }
});

export const {
  customerPolicyModelHandler,
  GroupUserHandler,
  chargeBoxTageHandler
} = modalSlice.actions;

export default modalSlice.reducer;
