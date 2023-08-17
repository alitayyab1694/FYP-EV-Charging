import * as Actions from 'Actions';
import moment from 'moment';
import React from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getLocalStorage, setLocalStorage } from 'utils';
const AddMethodWidget = styled.div`
  padding: 15px;
  overflow: hidden;
  background: #fff;
  margin: 0 0 14px;
  border-radius: 3px;
  border: 1px solid #d5dade;

  .head {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0 0 15px;
  }

  .btn-close {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    color: #fff;
    font-size: 14px;
    background: #cecfd1;
    cursor: pointer;
  }

  .btn-close:hover {
    background: #afafaf;
  }

  .title {
    display: block;
    color: #000;
    font-size: 15px;
    font-weight: 500;
  }

  .form-holder {
    overflow: hidden;
  }

  .fields-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .field {
    width: 62.25%;
    padding: 12px 20px 7px;
    background: #f4f6f9;
    border-radius: 3px;
    margin: 0 0 15px;
  }

  .field:last-child {
    width: 35.39%;
  }

  label {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: #a8a8a8;
    margin: 0;
    text-transform: uppercase;
  }

  .text-input {
    background: none;
    font-family: 'Roboto', sans-serif;
    border: none;
    font-weight: 400;
    color: #303030;
    padding: 5px 0;
    width: 100%;
  }

  .text-input::-webkit-input-placeholder {
    color: #303030;
  }

  .text-input::-moz-placeholder {
    opacity: 1;
    color: #303030;
  }

  .text-input:-moz-placeholder {
    color: #303030;
  }

  .text-input:-ms-input-placeholder {
    color: #303030;
  }

  .text-input.placeholder {
    color: #303030;
  }

  .text-input:focus {
    outline: none;
    box-shadow: none;
  }

  .sm-fields-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .sm-field {
    padding-right: 8px;
  }

  .custom-checkbox {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    text-transform: none;
  }

  .custom-checkbox [type='checkbox'] {
    position: fixed;
    display: none;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: -1;
  }

  .custom-checkbox .custom-input {
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1px solid #dad8d8;
    background: #fff;
    vertical-align: middle;
    position: relative;
    margin-right: 10px;
    border-radius: 100%;
  }

  .custom-checkbox .label-text {
    font-size: 15px;
    color: #cccdd0;
    font-weight: 500;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
  }

  .custom-checkbox [type='radio'] + .custom-input {
    border-radius: 100%;
  }

  .custom-checkbox [type='radio'] + .custom-input:after {
    border-radius: 100%;
  }

  .custom-checkbox [type='checkbox'] + .custom-input:before {
    content: '';
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    border-radius: 100%;
    background: #e0e0e0;
    border-radius: 100%;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
  }

  .custom-checkbox:hover .label-text,
  .custom-checkbox [type='checkbox']:checked ~ .label-text {
    color: #000;
  }

  .custom-checkbox:hover [type='checkbox'] + .custom-input:before,
  .custom-checkbox [type='checkbox']:checked + .custom-input:before {
    background: #000;
  }

  @media (max-width: 767px) {
    .fields-wrap {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
    }

    .field {
      width: 100%;
    }

    .field:last-child {
      width: 100%;
    }

    .field.cvc-code {
      width: 70px;
      text-align: center;
      margin: 0;
    }

    .field.cvc-code .text-input {
      text-align: center;
    }

    .text-input {
      font-size: 14px;
    }

    .sm-field {
      padding-right: 5px;
    }

    .checkbox-wrap.cvc-code-check {
      margin: 0 !important;
      position: relative;
    }

    .checkbox-wrap.cvc-code-check .custom-checkbox {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 125px;
      margin: -48px 0 0 40px;
    }

    .custom-checkbox .label-text {
      font-size: 14px;
    }
  }
`;

const CardBox = ({
  card,
  disabledInput = false,
  isLoading,
  onSubmitHandler,
  setIsloading
}) => {
  const { pgUser, singleBox } = useSelector((state) => ({
    pgUser: state.appReducer.pgUser,
    singleBox: state.appReducer.singleBox
  }));
  const SubmitPayments = async () => {
    const filter = getLocalStorage('filter', true);
    setIsloading(true);
    const id = await Actions.CreatePaymentAndIntent({
      amount: singleBox?.estimated_vals.reservation_cost,
      user_id: pgUser?.user?.stripe_customer_id,
      chargeboxid_fk: singleBox.chargeboxid,
      reservationdate: moment(filter?.endTime).format('YYYY-MM-DD'),
      reservationstarttime: moment(filter?.startTime).format('HH:mm:ss'),
      reservationendtime: moment(filter?.endTime).format('HH:mm:ss')
    });
    const res = await Actions.PaymentTransaction(
      id,
      false,
      pgUser?.wallet_id,
      singleBox?.estimated_vals.reservation_cost
    );
    const user = getLocalStorage('evapUser', true, true);
    user.transaction = {
      ...res,
      p_transaction_id: res?.p_transaction_id
    };
    setLocalStorage('evapUser', user);
    await onSubmitHandler(res);
    setIsloading(false);
  };
  return (
    <AddMethodWidget className="addmethod-widget mb-35" key={card.id}>
      <div className="form-holder">
        <div className="fields-wrap">
          <div className="field">
            <label>NAME ON CARD</label>
            <input
              disabled={disabledInput}
              id="name"
              className="text-input"
              type="text"
              placeholder={card.name}
            />
          </div>
          <div className="field">
            <label>EXPIRATION DATE</label>
            <input
              disabled={disabledInput}
              id="date"
              className="text-input"
              type="text"
              placeholder={`${card.exp_month} / ${card.exp_year}`}
            />
          </div>
        </div>
        <div className="fields-wrap">
          <div
            className="field"
            style={{ paddingBottom: 12, paddingRight: 12 }}>
            <label>CARD NUMBER</label>
            <div className="sm-fields-wrap">
              <div className="sm-field">
                <input
                  id="number"
                  className="text-input"
                  type="text"
                  placeholder="• • • •"
                  disabled={disabledInput}
                />
              </div>
              <div className="sm-field">
                <input
                  className="text-input"
                  type="text"
                  placeholder="• • • •"
                  disabled={disabledInput}
                />
              </div>
              <div className="sm-field">
                <input
                  className="text-input"
                  type="text"
                  placeholder="• • • •"
                  disabled={disabledInput}
                />
              </div>
              <div className="sm-field">
                <input
                  className="text-input"
                  type="text"
                  defaultValue={card.last4}
                  disabled={disabledInput}
                />
              </div>
              <div className="icon">
                <img
                  width="45"
                  height="28"
                  src={`/assets/images/stripe-cards/${card.brand}.png`}
                  alt="img description"
                />
              </div>
            </div>
          </div>
          <div className="field cvc-code">
            <label htmlFor="cvc">CVC</label>
            <input
              id="cvc"
              readOnly
              className="text-input"
              type="text"
              placeholder="• • •"
              disabled={disabledInput}
            />
          </div>
        </div>
        <LaddaButton
          loading={isLoading}
          data-size={XL}
          onClick={SubmitPayments}
          className="mb-5 btn btn-primary font-weight-bold w-100 my-2">
          Make Payment
        </LaddaButton>
      </div>
    </AddMethodWidget>
  );
};

export default CardBox;
