import * as Actions from 'Actions';
import moment from 'moment';
import React, { useState } from 'react';
import CreditCardInput from 'react-credit-card-input';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Modal, ModalBody, Row } from 'reactstrap';
import styled from 'styled-components';
import { getLocalStorage, Toaster } from 'utils';

const Body = styled.div`
  padding: 15% 10%;
`;

export default function LivePreviewExample({ open, handleModal }) {
  const dispatch = useDispatch();
  const { user, singleBox, pgUser } = useSelector((state) => ({
    user: state.user,
    pgUser: state.appReducer.pgUser,

    chargeBox: state.appReducer.chargeBoxInfo,
    singleBox: state.appReducer.singleBox,
    mainLoading: state.appReducer.isLoading,
    isLoginModel: state.model.login,
    isPaymentModel: state.model.payment
  }));
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const { cardNumber, expiry, cvc } = form;
  const [isLoading, setIsloading] = useState(false);
  const handleCardNumberChange = (e) => {
    setForm({
      ...form,
      cardNumber: e.target.value
    });
  };
  const handleCardExpiryChange = (e) => {
    setForm({
      ...form,
      expiry: e.target.value
    });
  };
  const handleCardCVCChange = (e) => {
    setForm({
      ...form,
      cvc: e.target.value
    });
  };
  const filter = getLocalStorage('dateAndHour', true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const obj = {
      idtag_fk: pgUser?.idtag_fk,
      chargeboxid_fk: singleBox.chargeboxid,
      reservePolicyId_fk: singleBox?.applicable_pp?.paymentpolicyid,
      connectorid: singleBox?.applicable_pp?.rates[0]?.profilepricetype,
      reservationType: singleBox?.applicable_pp?.rates[0]?.profilepricetype,
      reservationdate: moment(filter?.startTime).format('YYYY-MM-DD'),
      reservationstarttime: moment(filter?.startTime).format('HH:mm:ss'),
      reservationendtime: moment(filter?.endTime).format('HH:mm:ss')
    };
    const runAction = async () => {
      setIsloading(true);
      const res = await dispatch(await Actions.createReservation(obj));
      if (res.success) {
        Toaster('success', 'Created successfully');
        setIsloading(false);
      } else {
        Toaster('error', 'error in creating');
        setIsloading(false);
      }
      handleModal();
    };
    runAction();
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal zIndex={2000} centered isOpen={open} toggle={handleModal}>
          <ModalBody>
            <Body>
              <h4 className="font-weight-bold mb-3">Make Payment</h4>
              <Form>
                <Row className="mt-5">
                  <Col md={12}>
                    <CreditCardInput
                      cardNumberInputProps={{
                        value: cardNumber,
                        onChange: handleCardNumberChange
                      }}
                      cardExpiryInputProps={{
                        value: expiry,
                        onChange: handleCardExpiryChange
                      }}
                      cardCVCInputProps={{
                        value: cvc,
                        onChange: handleCardCVCChange
                      }}
                      fieldClassName="input"
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={12} className="text-center">
                    <ul className="list-unstyled mb-3">
                      <li className="d-flex justify-content-between pb-1">
                        <span className="pr-4">
                          {filter?.hour > 0
                            ? 'Estimate Pre Cost'
                            : 'Price Pre Minute'}
                        </span>
                        <span className="pl-4">
                          {filter?.hour > 0
                            ? singleBox?.estimated_res_cost
                            : `${singleBox?.applicable_pp?.rates[0]?.profilepriceunit}`}
                        </span>
                      </li>
                      <li className="d-flex justify-content-between pb-1">
                        <span className="pr-4">
                          {filter?.hour > 0
                            ? 'Total KW Reserved'
                            : 'Total Minute Reserve'}
                        </span>
                        <span className="pl-4">
                          {filter?.hour > 0
                            ? singleBox?.estimated_time_mins
                            : `$${Number(
                                moment(filter?.endTime, 'HH:mm:ss').diff(
                                  moment(filter?.startTime, 'HH:mm:ss')
                                ) / 60000
                              )}`}
                        </span>
                      </li>
                      <li className="d-flex justify-content-between font-weight-bold pt-3 pb-2 font-size-lg">
                        <span className="pr-4">Estimated Total </span>
                        <span className="pl-4">
                          $
                          {filter?.hour > 0
                            ? parseFloat(
                                singleBox?.estimated_res_cost *
                                  singleBox?.estimated_time_mins
                              ).toFixed(2)
                            : Number(
                                Number(
                                  moment(filter?.endTime, 'HH:mm:ss').diff(
                                    moment(filter?.startTime, 'HH:mm:ss')
                                  ) / 60000
                                )
                              ) *
                              Number(
                                singleBox?.applicable_pp?.rates[0]
                                  ?.profilepriceunit
                              )}
                        </span>
                      </li>
                    </ul>
                    <LaddaButton
                      loading={isLoading}
                      data-size={XL}
                      onClick={onSubmitHandler}
                      className="mb-5 btn btn-primary font-weight-bold w-50 my-2">
                      Make Payment
                    </LaddaButton>
                  </Col>
                </Row>
              </Form>
            </Body>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}
