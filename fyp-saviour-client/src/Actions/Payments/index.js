import { loadStripe } from '@stripe/stripe-js';
import * as Actions from 'Actions';
import * as API from 'api';
import moment from 'moment';
import { getLocalStorage, setLocalStorage } from 'utils';
const stripePromise = loadStripe(
  'pk_test_51H64odEGhJpVZtxX6vHePeGIv3u00r3Zupn02BsdLeSAN2RcfamPA0GvdntxZrvH1wQAxRDynps1aEFo5F3csdzD00ZKdm8SPh'
);

export const getCustomerAndBilling = (billingDate, userId) => async (
  dispatch
) => {
  try {
    const res = await API.post(`/payments/customer-create/`, {
      ...billingDate
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.error);
  }
};
export const getCardofCustomer = async (userId) => {
  try {
    const res = await API.get(`/payments/customer-cards-list/${userId}/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const paymentIntentCancel = async (obj) => {
  try {
    const res = await API.post(`/payments/payment-cancel`, { ...obj });
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};
export const paymentRefund = (obj, triggerLocalStorage) => async (dispatch) => {
  try {
    const obj1 = {
      amount: obj?.transaction?.debit,
      charge_id: obj?.transaction?.charge_id
    };
    const res = await API.post(`/payments/refund-create/`, { ...obj1 });
    const user = getLocalStorage('evapUser', true, true);
    delete user.transaction;
    delete user.enableTryAgain;
    delete user.checkStatusStop;
    delete user.startTransaction;
    setLocalStorage('evapUser', user);
    const obj3 = {
      version: '1',
      created_date: moment().toISOString(),
      updated_date: moment().toISOString(),
      created_by: 'Usman',
      lastmodified_by: 'Usman',
      status: true,
      credit: res?.amount,
      debit: 0.0,
      charge_id: res?.charge,
      transaction_type: 'REFUND',
      intent_id: null,
      receipt_number: '123',
      receipt_url: null,
      wallet_fk: user?.guest ? null : user?.wallet_id
    };
    await PaymentTransaction2(obj3);
    dispatch(Actions.LocalStorageTrigger(triggerLocalStorage));
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};
export const paymentRefund1 = (obj, triggerLocalStorage) => async (
  dispatch
) => {
  try {
    const obj1 = {
      amount: obj?.transaction?.debit,
      intent_id: obj?.transaction?.intent_id
    };
    const res = await API.post(`/payments/refund-create/`, { ...obj1 });
    const user = getLocalStorage('evapUser', true, true);
    delete user.transaction;
    delete user.enableTryAgain;
    delete user.startTransaction;
    setLocalStorage('evapUser', user);
    const obj3 = {
      version: '1',
      created_date: moment().toISOString(),
      updated_date: moment().toISOString(),
      created_by: 'Usman',
      lastmodified_by: 'Usman',
      status: true,
      credit: res?.amount,
      debit: 0.0,
      charge_id: 'charge',
      transaction_type: 'REFUND',
      intent_id: null,
      receipt_number: '123',
      receipt_url: null,
      wallet_fk: user?.guest ? null : user?.wallet_id
    };
    await PaymentTransaction2(obj3);

    dispatch(Actions.LocalStorageTrigger(triggerLocalStorage));
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};
const createPaymentIntent = async (obj) => {
  try {
    const res = await API.post('/payments/payment-create/', {
      ...obj
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const CreatePaymentAndIntent = async (obj) => {
  try {
    const secret = await createPaymentIntent({ ...obj });
    if (!secret.client_secret) {
      throw new Error(
        'Sorry, Due to some technical issue this action can not be performed'
      );
    }

    const stripe = await stripePromise;
    const res = await stripe?.confirmCardPayment(secret.client_secret);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const chargeCustomer = async (obj) => {
  try {
    const res = await API.post('/payments/payment-create/', {
      ...obj
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const PaymentTransaction = async (form, isDirect, walletId, amount) => {
  const obj = {
    version: '1',
    created_date: moment().toISOString(),
    updated_date: moment().toISOString(),
    created_by: 'Usman',
    lastmodified_by: 'Usman',
    status: true,
    credit: 0.0,
    debit: form?.paymentIntent?.amount
      ? form?.paymentIntent?.amount
      : parseFloat(amount),
    transaction_type: 'pay',
    intent_id: isDirect ? null : form?.paymentIntent?.id,
    receipt_number: '123',
    receipt_url: isDirect
      ? form?.receipt_url
      : form?.charges?.data?.[0]?.receipt_url,
    wallet_fk: walletId
  };
  try {
    const res = await API.post(`/payment-transaction/`, obj);
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const PaymentTransaction2 = async (obj) => {
  try {
    const res = await API.post(`/payment-transaction/`, obj);
    return res;
  } catch (error) {
    console.log('error: ', error);
  }
};
