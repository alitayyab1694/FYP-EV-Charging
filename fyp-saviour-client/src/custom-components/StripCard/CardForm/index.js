import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  CardElement, 
  useStripe
} from '@stripe/react-stripe-js';
import * as Actions from 'Actions';
import { post } from 'api';
import moment from 'moment';
import React, { useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { toast, Zoom } from 'react-toastify';

import { Input } from 'reactstrap';
import { setHeaderDrawerToggle } from 'reducers/ThemeOptions';
import styled from 'styled-components';
import { getLocalStorage, setLocalStorage, Toaster } from 'utils';
const CreditCard = styled.div`
  overflow: hidden;
  padding: 36px;
  margin: 0 auto 15px;
  border: 1px solid #eaebeb;
  border-radius: 5px;

  .img {
    position: absolute;
    right: 10px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .form-control {
    height: 44px;
    line-height: 20px;
    border-color: #d8d8d8;
    font-weight: 400;
    color: #000;
    padding: 17px 15px 3px;
    .name-card {
      padding: 0.53rem 1.3rem !important;
    }
  }

  .form-control:focus {
    border-width: 1px;
  }

  .text-input label {
    line-height: 20px;
    color: rgba(0, 0, 0, 0.6);
    top: 13px;
    font-weight: 400;
  }

  .text-input.input-active label {
    font-size: 14px;
    line-height: 16px;
    top: 3px;
    opacity: 0.7;
  }

  .text-input.input-active .form-control {
    border-width: 1px;
  }

  .input-wrap.cols {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .input-wrap.cols .text-input {
    width: 70%;

    @media (max-width: 767px) {
      width: 60%;
    }
  }

  .input-wrap.cols .text-input:nth-child(2) {
    width: 26%;

    @media (max-width: 767px) {
      width: 35%;
    }
  }

  .max-holder {
    max-width: 525px;
    margin: 0 auto;
    padding: 0 0 10px;
  }

  &.add-style {
    border-radius: 3px;
    border: none;
    background: #f4f6f9;
    max-width: inherit;
    padding: 20px;

    .max-holder {
      max-width: inherit;
      padding: 0;
    }

    .form-control {
      height: 40px;
      padding-top: 13px;

      &.input-focus {
        border-color: #255b87;
      }
    }
  }

  @media (max-width: 767px) {
    padding: 15px;

    .form-control {
      font-size: 14px;
    }

    .text-input label {
      font-size: 14px;
    }

    &.add-style {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

const CardForm = ({
  isLoading,
  setName,
  name,
  onSubmitHandler,
  setIsloading,
  setEmail,
  email
}) => {
  const { pgUser, singleBox, headerDrawerToggle } = useSelector((state) => ({
    pgUser: state.appReducer.pgUser,
    singleBox: state.appReducer.chargeBoxInfo,
    headerDrawerToggle: state.ThemeOptions.headerDrawerToggle
  }));
  const handleToken = async (token) => {
     
    const newSlot = singleBox?.slots.find(item => item.new)
   delete singleBox.new
    await post('/stripe/create-charge', {
      token, date: moment().toDate(), chargeboxid: singleBox?.id, chargeBoxId: singleBox?._id, slot: singleBox?.slots.map(item => {
      delete  item?.new
      return  item
      }), firebaseId: pgUser?.uid, newSlot: newSlot
   }).then(() => {
      toast.success("Reservation Created", {
          containerId: 'D',
          transition: Zoom
        });
   }).catch(console.error);
    // Handle the token received from Stripe Checkout
    // Perform necessary actions, such as sending the token to your backend for processing
  };
  return    <StripeCheckout
      token={handleToken}
      stripeKey="pk_test_51H64odEGhJpVZtxX6vHePeGIv3u00r3Zupn02BsdLeSAN2RcfamPA0GvdntxZrvH1wQAxRDynps1aEFo5F3csdzD00ZKdm8SPh"
      amount={1000} // Amount in cents
      name="My Store"
      description="Product Description"
      currency="USD"
    />
  
  
};

export default CardForm;
