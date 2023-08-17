import * as Actions from 'Actions';
import moment from 'moment';
import React, { useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Button, Modal, ModalFooter } from 'reactstrap';
import { getLocalStorage, setLocalStorage, Toaster } from 'utils';
import Type from '../Stepper/components/Type';

const WalkInUser = ({ isOpen, handleModal, form, setForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [rateError, setRateError] = useState(false);
  const [errorMinutes, setErrorMinutes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { type, profile, hour, min } = form;
  const onChangeHandler = (e, select) => {
    console.log(e);
    if (select === 'type') {
      setForm({
        ...form,
        type: e
      });
    } else if (select === 'pfType') {
      setForm({
        ...form,
        profile: e
      });
    } else {
      if (e.target.name === 'hour') {
        if (e.target.value < 10) {
          setRateError(true);
        } else {
          setRateError(false);
        }
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      } else if (e.target.name === 'min') {
        if (e.target.value < 60) {
          setErrorMinutes(true);
        } else {
          setErrorMinutes(false);
        }
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      } else {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      }
    }
  };
  const submitHandler = async () => {
    if (!profile) {
      Toaster('info', 'Please Select Profile First');
      return;
    }
    setIsLoading(true);
    const user = getLocalStorage('evapUser', true, true);
    if (user) {
      user.chargingInfo = { ...form };
      setLocalStorage('evapUser', user);
    }
    if (profile?.value === 'profilePKW') {
      await dispatch(
        await Actions.getsingleChargeBox(
          id,
          form,
          `${moment().toISOString().split('T')[0]} ${
            moment().toISOString().split('T')[1].split('.')[0]
          }`
        )
      );
      setIsLoading(false);
    } else {
      await dispatch(
        await Actions.getsingleChargeBox(
          id,
          form,
          `${moment().toISOString().split('T')[0]} ${
            moment().toISOString().split('T')[1].split('.')[0]
          }`,
          `${moment().add(min, 'minutes').toISOString().split('T')[0]} ${
            moment().toISOString().split('T')[1].split('.')[0]
          }`
        )
      );
      setIsLoading(false);
    }
  };

  return (
    <Modal zIndex={2000} centered isOpen={isOpen}>
      <Type
        rateError={rateError}
        errorMinutes={errorMinutes}
        show={true}
        showMon={true}
        form={form}
        onChangeHandler={onChangeHandler}
      />
      <ModalFooter>
        <Button
          onClick={() => {
            history.push('/');
          }}
          disabled={isLoading}
          className=" btn btn-primary font-weight-bold w-20 ">
          Go Back to Map
        </Button>
        <LaddaButton
          data-size={XL}
          disabled={rateError || errorMinutes}
          loading={isLoading}
          onClick={submitHandler}
          className=" btn btn-primary font-weight-bold w-50">
          Get ChargBox Info
        </LaddaButton>
      </ModalFooter>
    </Modal>
  );
};

export default WalkInUser;
