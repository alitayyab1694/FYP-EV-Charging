import * as Actions from 'Actions';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loki from 'react-loki';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'reactstrap';
import styled from 'styled-components';
import { getLocalStorage, setLocalStorage, Toaster } from 'utils';
import CalendarTime from './components/CalendarTime';
import Location from './components/Location';
import Type from './components/Type';
function LivePreviewExample(prop) {
  const dispatch = useDispatch();
  const [startTimeError, setStartTimeError] = useState(false);
  const [rateError, setRateError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [error, setError] = useState(false);
  const { stepper } = useSelector((state) => ({
    stepper: state.model.stepper
  }));
  const [form, setForm] = useState({
    country: null,
    city: null,
    type: null,
    profile: null,
    startTime: moment(),
    endTime: moment().add(1, 'hours'),
    hour: 10
  });
  useEffect(() => {
    setForm({
      ...form,
      startTime: moment(),
      endTime: moment().add(1, 'hours'),
      startDate: new Date()
    });
  }, [stepper]);
  useEffect(() => {
    const filter = getLocalStorage('filter', true);
    if (Object.keys(filter).length !== 0) {
      setForm((f) => {
        return {
          ...f,
          country: filter?.country,
          city: filter?.city,
          type: filter?.type,
          profile: filter?.profile
        };
      });
    }
  }, []);
  const [isOpen, setIsOpen] = useState(true);
  const { startDate, hour, profile, startTime, endTime } = form;
  const onChangeHandler = (e, select) => {
    if (select === 'country') {
      setForm({
        ...form,
        state: null,
        city: null,
        country: e
      });
    } else if (select === 'date') {
      console.log(e);
      console.log(startDate);
      setForm({
        ...form,
        startTime: e,
        endTime: moment(e).add(1, 'hours')
      });
    } else if (select === 'city') {
      setForm({
        ...form,
        city: e
      });
    } else if (select === 'type') {
      setForm({
        ...form,
        type: e
      });
    } else if (select === 'pfType') {
      setForm({
        ...form,
        profile: e
      });
    } else if (select === 'startingTime') {
      setForm({
        ...form,
        startTime: e,
        endTime: moment(e).add(1, 'hours')
      });

      console.log(moment(e).add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'));
      setStartTimeError(null);
    } else if (select === 'endingTime') {
      setForm({
        ...form,
        endTime: e
      });
    } else {
      if (e.target.name === 'hour') {
        if (e.target.name < 10) {
          setError(true);
        } else {
          setError(false);
        }
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
        if (e.target.value < 10) {
          setRateError(true);
        } else {
          setRateError(false);
        }
        // // if (e.target.value >= 10) {
        // setForm({
        //   ...form,
        //   [e.target.name]: e.target.value
        // });
        // // }
      } else {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      }
    }
  };
  const customSteps = [
    {
      label: 'Location',
      number: '1',
      description: 'Select You Current Location',
      component: <Location form={form} onChangeHandler={onChangeHandler} />
    },
    {
      label: 'Charger Type',
      number: '2',
      description: 'Provide Us Charge Type',
      component: (
        <Type
          form={form}
          rateError={rateError}
          onChangeHandler={onChangeHandler}
        />
      )
    },
    {
      label: 'Calendar',
      number: '3',
      description: 'Provide Us time and date for reservation',
      component: (
        <CalendarTime
          setEndTimeError={setEndTimeError}
          setStartTimeError={setStartTimeError}
          form={form}
          onChangeHandler={onChangeHandler}
        />
      )
    }
  ];
  const _customRenderer = ({ currentStep }) => {
    const steps = customSteps.map((step, index) => {
      const isActive = currentStep === index + 1;
      return (
        <li key={index} className={clsx('card-box', { current: isActive })}>
          <a href="#/" onClick={(e) => e.preventDefault()}>
            <div className="step-indicator">
              <div className="d-flex">
                <div className="font-size-lg d-44 rounded-sm mr-2 stepper-wrapper text-center">
                  <span className="font-weight-bold">{step.number}</span>
                </div>
                <div>
                  <div className="font-weight-bold">{step.label}</div>
                  <small className="text-black-50">{step.description}</small>
                </div>
              </div>
            </div>
          </a>
        </li>
      );
    });

    return (
      <div className="horizontal">
        <ul className="steps-indicator">{steps}</ul>
      </div>
    );
  };

  const _customActions = ({
    isComplete,
    cantBack,
    isInFinalStep,
    backHandler,
    nextHandler
  }) => {
    return (
      <div className="actions p-4">
        <Button
          outline
          color="primary"
          onClick={backHandler}
          disabled={cantBack || isComplete}>
          Previous
        </Button>
        <Button
          color="primary"
          onClick={() => {
            if (!isInFinalStep) {
              setForm({
                ...form,
                startTime: moment(),
                endTime: moment().add(1, 'hours')
              });
            }
            if (isInFinalStep) {
              dispatch(Actions.stepper(!stepper));
              _onFinish();
              return;
            }
            nextHandler();
          }}
          disabled={isComplete || form.hour < 10}>
          {isInFinalStep ? 'Finish' : 'Next'}
        </Button>
      </div>
    );
  };

  const _onFinish = () => {
    let dd = moment(startTime).format('YYYY-MM-DD');
    // .split('T')[1].split('.')[0]

    console.log(
      'startTime: ',
      `${moment(startTime).toISOString().split('T')[0]} ${
        moment(startTime).toISOString().split('T')[1].split('.')[0]
      } `
    );

    if (profile.value === 'profilePKW') {
      dispatch(
        Actions.getChargeBoxes(
          form,
          `${moment(startTime).toISOString().split('T')[0]} ${
            moment(startTime).toISOString().split('T')[1].split('.')[0]
          }`,
          hour
        )
      );
    } else {
      dispatch(
        Actions.getChargeBoxes(
          form,
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
    setIsOpen(false);
    setLocalStorage('filter', form, true);
    setLocalStorage(
      'dateAndHour',
      {
        hour: hour,
        startTime: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
        date: dd
      },
      true
    );
    Toaster('success', 'Filter applied wait for the charge to be appear');
  };
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Modal
        zIndex={1111}
        centered
        size="xl"
        isOpen={false}
        toggle={() => {
          dispatch(Actions.stepper(!stepper));
        }}>
        <div className="wizard-alternate-2 horizontal">
          <Loki
            steps={customSteps}
            renderSteps={_customRenderer}
            renderActions={_customActions}
            onFinish={_onFinish}
          />
        </div>
      </Modal>
    </>
  );
}

export default styled(LivePreviewExample)``;
