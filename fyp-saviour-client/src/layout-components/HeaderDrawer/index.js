import * as Actions from 'Actions';
import { Reservation } from 'assets/svgs';
import clsx from 'clsx';
import StripCard from 'custom-components/StripCard';
import { RESERVATION_STATUS } from 'enums';
import moment from 'moment';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { setHeaderDrawerToggle } from 'reducers/ThemeOptions';
import { getLocalStorage, Toaster } from 'utils';
import CustomTimeSlotSelect from './TimeSlot';
const HeaderDrawer = (props) => {
  const filter = getLocalStorage('filter', true);
  const params = useParams();

  const ReserveInfo = getLocalStorage('dateAndHour', true);
  const dispatch = useDispatch();
  const { user, singleBox, pgUser , chargeBox } = useSelector((state) => ({
    user: state.user,
    pgUser: state.appReducer.pgUser,
    chargeBox: state.appReducer.chargeBoxInfo,
    singleBox: state.appReducer.singleBox,
    mainLoading: state.appReducer.isLoading,
    isLoginModel: state.model.login,
    isPaymentModel: state.model.payment
  }));
  const [isLoading, setIsloading] = useState(false);
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const { cardNumber, expiry, cvc } = form;
  const { headerDrawerToggle, setHeaderDrawerToggle } = props;

  const toogleHeaderDrawer = () => {
    setHeaderDrawerToggle(!headerDrawerToggle);
  };
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
  const onSubmitHandler = (transactionId) => {
    // e.preventDefault();
    const obj = {
      idtag_fk: pgUser?.idtag_fk,
      chargeboxid_fk: singleBox.chargeboxid,
      reservePolicyId_fk: singleBox?.applicable_pp?.paymentpolicyid,
      connectortype_fk: singleBox?.connectorId_fk[0]?.connectorId_pk,
      reservationType: filter?.profile?.value,
      reservation_status: RESERVATION_STATUS.Pending,
      reservationdate: moment(filter?.endTime).toISOString().split('T')[0],
      reservationstarttime: moment(filter?.startTime)
        .toISOString()
        .split('T')[1]
        .split('.')[0],
      reservationendtime: moment(filter?.endTime)
        .toISOString()
        .split('T')[1]
        .split('.')[0],
      est_KW: Number(filter?.hour),
      payment_fk: transactionId.p_transaction_id
    };
    const runAction = async () => {
      setIsloading(true);
      const res = await dispatch(await Actions.createReservation(obj));
      const { profile, startTime, hour, endTime } = getLocalStorage(
        'filter',
        true,
        true
      );
      if (profile.value === 'profilePKW') {
        dispatch(
          Actions.getChargeBoxes(
            getLocalStorage('filter', true, true),
            `${moment(startTime).toISOString().split('T')[0]} ${
              moment(startTime).toISOString().split('T')[1].split('.')[0]
            }`,
            hour
          )
        );
      } else {
        dispatch(
          Actions.getChargeBoxes(
            getLocalStorage('filter', true, true),
            `${moment(startTime).toISOString().split('T')[0]} ${
              moment(startTime).toISOString().split('T')[1].split('.')[0]
            }`,
            `${moment(endTime).toISOString().split('T')[0]} ${
              moment(endTime).toISOString().split('T')[1].split('.')[0]
            }`,
            hour
          )
        );
      }
      if (res.success) {
        Toaster('success', 'Created successfully');
        setIsloading(false);
      } else {
        Toaster('error', res?.data?.data?.error);
        setIsloading(false);
      }
    };
    runAction();
  };
  function generateRandomNumber(digits) {
  const min = 10 ** (digits - 1); // Minimum value (e.g., for 3 digits, min = 100)
  const max = 10 ** digits - 1; // Maximum value (e.g., for 3 digits, max = 999)
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}
  // console.log('params: ', params);
  return (
    <>
      <div className="app-drawer-content">
        <Button
          onClick={toogleHeaderDrawer}
          className="close-drawer-btn btn btn-sm"
          id="CloseDrawerTooltip">
          <div
            className={clsx('navbar-toggler hamburger hamburger--elastic', {
              'is-active': headerDrawerToggle
            })}>
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </div>
        </Button>
        <UncontrolledTooltip target="CloseDrawerTooltip" placement="left">
          Close drawer
        </UncontrolledTooltip>
        <div className="vh-100 shadow-overflow">
          <PerfectScrollbar>
            <div className="p-3">
              <div className="text-center">
                <Reservation />
              </div>
            </div>
            <div className="divider" />
             <CustomTimeSlotSelect/>
            <div className="divider" />
             <div className="p-3 text-center">
              <div className="font-weight-bold font-size-lg mb-0 text-black">
                Payment Info
              </div>
              <Row className="mt-3">
                <Col md={12} className="text-center">
                  <StripCard
                    isLoading={isLoading}
                    onSubmitHandler={onSubmitHandler}
                    setIsloading={setIsloading}
                  />
                </Col>
              </Row>
            </div>
            
          </PerfectScrollbar>
        </div>
      </div>

      <div
        onClick={toogleHeaderDrawer}
        className={clsx('app-drawer-overlay', {
          'is-active': headerDrawerToggle
        })}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle
});

const mapDispatchToProps = (dispatch) => ({
  setHeaderDrawerToggle: (enable) => dispatch(setHeaderDrawerToggle(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDrawer);
