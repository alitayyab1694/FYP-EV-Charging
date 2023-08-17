import TextField from '@material-ui/core/TextField';
import { LocalizationProvider, MobileTimePicker } from '@material-ui/pickers';
import DateMomentAdapter from '@material-ui/pickers/adapter/moment';
import * as API from 'api';
import Input from 'custom-components/Input';
import OptionSelect from 'custom-components/OptionSelect';
import { Form, Formik } from 'formik';
import moment from 'moment';
import Switch from 'rc-switch';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { getGroup } from 'store/reducer/appReducerSlice';
import styled from 'styled-components';
import { Toaster } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { rateVAlidationSchema } from 'validation';
import './style.css';

const TimePickerStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const LivePreviewExample = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [endDateError, setEndDateError] = useState(null);
  const [startTimeError, setStartTimeError] = useState(null);
  const [endTimeError, setEndTimeError] = useState(null);
  const { user, mainloading, group } = useSelector((state) => ({
    user: state.appReducer.pgUser,
    mainloading: state.appReducer.isLoading,
    group: state.appReducer.singleGroup
  }));
  const { rateId } = useParams();
  const [form, setform] = useState({
    profilestart: null,
    profileend: null,
    profilestarttime: moment(),
    profileendtime: moment().add(15, 'minutes'),
    profilepricetype: null,
    profilepriceunit: 0,
    status: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const {
    profilestarttime,
    profileendtime,
    profilepricetype,
    profilepriceunit,
    pricingpolicy,
    status
  } = form;
  useEffect(() => {
    if (rateId !== 'new') {
      dispatch(getGroup(rateId));
    } else {
      setform({
        profilestarttime: moment(),
        profileendtime: moment().add(15, 'minutes'),
        profilepricetype: null,
        profilepriceunit: 0,
        status: true
      });
    }
  }, [rateId]);
  const onChangeHandler = (e, component) => {
    if (component === 'status') {
      setform({
        ...form,
        status: !form.status
      });
    } else if (component === 'startDate') {
      setform({
        ...form,
        profilestarttime: moment(e),
        profileendtime: moment(e).add(15, 'minutes')
      });
    } else if (component === 'endDate') {
      setform({
        ...form,
        profileendtime: moment(e)
      });
    } else if (component === 'startTime') {
      setform({
        ...form,
        profilestarttime: e,
        profileendtime: moment(e).add(15, 'minutes')
      });
    } else if (component === 'endTime') {
      setform({
        ...form,
        profileendtime: e
      });
    } else if (component === 'profilepriceunit') {
      setform({
        ...form,
        profilepriceunit: e.target.value - 0
      });
    }
  };
  useEffect(() => {
    if (group && rateId !== 'new') {
      setform({
        ...group,
        chargebox: group?.chargebox?.map((c) => {
          return { value: c?.chargeboxid, label: c?.chargeboxid };
        }),
        pricingpolicy: group?.pricingpolicy?.map((c) => {
          return {
            value: c.paymentpolicyid,
            label: c.profilename
          };
        })
      });
    }
  }, [group]);
  const onSubmitHandler = async (values, resetForm) => {
    // e.preventDefault();
    setIsLoading(true);

    let res;
    if (rateId !== 'new') {
      // res = await dispatch(await Actions.updateGroup(form, user));
    } else {
      // res = await dispatch(await Actions.createRate(form, user));
      const obj = {
        ...values,
        profilestart: moment(form.profilestarttime).format('YYYY-MM-DD'),
        profileend: moment(form.profileendtime).format('YYYY-MM-DD'),
        rateid: uuidv4(),
        version: '1',
        created_date: moment().toISOString(),
        updated_date: moment().toISOString(),
        profilepricetype: values?.profilepricetype?.value,
        profileendtime: moment(form?.profileendtime)
          .toISOString()
          .split('T')[1]
          .split('.')[0],
        profilestarttime: moment(form?.profilestarttime)
          .toISOString()
          .split('T')[1]
          .split('.')[0],
        profilepriceunit: values?.profilepriceunit?.toString(),
        created_by: user?.fullname,
        lastmodified_by: user?.fullname
      };
      try {
        await API.post('/rates/', obj);
        setIsLoading(false);
        resetForm();
        ToastHandler(rateId, true);
        // dispatch({
        //   type: Type.NEW_RATES
        // });
        // return { success: true, data: res };
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
        ToastHandler(rateId, false);
        // return { success: false, data: error.response };
      }
    }
    // if (res.success) {
    //   Toaster(
    //     'success',
    //     `Rates ${rateId !== 'new' ? 'Updated' : 'Created'} successfully`
    //   );
    //   setform({
    //     profilestarttime: moment(),
    //     profileendtime: moment().add(15, 'minutes'),
    //     profilepricetype: null,
    //     profilepriceunit: 0,
    //     status: true
    //   });
    //   history.push('/List-Rates');
    // } else {
    //   Toaster(
    //     'error',
    //     `Error in ${rateId !== 'new' ? 'Updating' : 'Creating'} Rates`
    //   );
    // }
  };

  const ToastHandler = (rateId, success) => {
    if (success) {
      setform({
        profilestarttime: moment(),
        profileendtime: moment().add(15, 'minutes'),
        profilepricetype: null,
        profilepriceunit: 0,
        status: true
      });
      Toaster(
        'success',
        `Rates ${rateId !== 'new' ? 'Updated' : 'Created'} successfully`
      );
      history.push('/List-Rates');
    } else {
      Toaster(
        'error',
        `Error in ${rateId !== 'new' ? 'Updating' : 'Creating'} Rates`
      );
    }
  };

  if (mainloading) {
    return (
      <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <CircleLoader color={'#2f2f2f'} loading={true} />
        </div>
        <div className="text-muted font-size-xl text-center pt-3">
          Please wait while we load.....
        </div>
      </div>
    );
  }
  return (
    <>
      <Formik
        initialValues={{
          profilepricetype: null,
          profilepriceunit: 0,
          status: true
        }}
        onSubmit={(values, { resetForm }) => {
          onSubmitHandler(values, resetForm);
        }}
        validationSchema={rateVAlidationSchema}
        render={({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldError,
          setFieldValue,
          setFieldTouched,
          handleBlur,
          handleChange
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Start Date</Label>
                  <DatePicker
                    selected={moment(profilestarttime).toDate()}
                    // selected={moment(values.profilestarttime).toDate()}
                    // name="profilestarttime"
                    onChange={(e) => {
                      onChangeHandler(e, 'startDate');
                    }}
                    minDate={moment().toDate()}
                    inline
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>End Date</Label>
                  <DatePicker
                    // selected={moment(values.profileendtime).toDate()}
                    selected={moment(profileendtime).toDate()}
                    onChange={(e) => onChangeHandler(e, 'endDate')}
                    // name="profileendtime"
                    minDate={moment(profilestarttime).toDate()}
                    inline
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Start Time</Label>
                  <LocalizationProvider dateAdapter={DateMomentAdapter}>
                    <TimePickerStyled>
                      <MobileTimePicker
                        renderInput={(props) => (
                          <TextField variant="outlined" {...props} />
                        )}
                        ampm={false}
                        minutesStep={1}
                        ToolbarComponent={'hideTabs'}
                        label="Start Time"
                        value={profilestarttime}
                        autoOk
                        onChange={(newValue) => {
                          onChangeHandler(newValue, 'startTime');
                        }}
                        onAccept={() => {}}
                        onError={(e) => {
                          setStartTimeError(e ? true : false);
                        }}
                        shouldDisableTime={(timeValue, clockType) => {
                          if (
                            moment(
                              moment(profilestarttime).format('YYYY-MM-DD')
                            ).isSame(moment().format('YYYY-MM-DD'))
                          ) {
                            if (
                              clockType === 'hours' &&
                              timeValue < moment().format('HH')
                            ) {
                              return true;
                            }
                            if (
                              clockType === 'minutes' &&
                              moment(profilestarttime).format('HH') ===
                                moment().format('HH') &&
                              timeValue < moment().format('mm')
                            ) {
                              return true;
                            }
                          }
                          return false;
                        }}
                      />
                    </TimePickerStyled>
                  </LocalizationProvider>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>End Time</Label>
                  <LocalizationProvider dateAdapter={DateMomentAdapter}>
                    <TimePickerStyled>
                      <MobileTimePicker
                        renderInput={(props) => (
                          <TextField variant="outlined" {...props} />
                        )}
                        ampm={false}
                        minutesStep={1}
                        label="End Time"
                        value={profileendtime}
                        ToolbarComponent={'hideTabs'}
                        displayStaticWrapperAs="mobile"
                        onChange={(newValue) =>
                          onChangeHandler(newValue, 'endTime')
                        }
                        onError={(e) => {
                          setStartTimeError(e ? true : false);
                        }}
                        shouldDisableTime={(timeValue, clockType) => {
                          const jj =
                            60 -
                            (Number(moment(profilestarttime).format('mm')) +
                              15);
                          let remain = 15 - Number(jj);
                          remain = remain - 15;
                          if (
                            Math.abs(
                              profilestarttime?.diff(profileendtime, 'minutes')
                            ) < 60 &&
                            Number(moment(profilestarttime).format('mm')) >= 45
                          ) {
                            if (
                              clockType === 'hours' &&
                              moment(profilestarttime).format('HH') ===
                                moment(profileendtime).format('HH') &&
                              timeValue <= moment(profilestarttime).format('HH')
                            ) {
                              return true;
                            }
                            if (clockType === 'minutes' && timeValue < remain) {
                              return true;
                            }
                          } else {
                            if (
                              moment(
                                moment(profilestarttime).format('YYYY-MM-DD')
                              ).isSame(
                                moment(profileendtime).format('YYYY-MM-DD')
                              )
                            ) {
                              if (
                                clockType === 'hours' &&
                                timeValue <
                                  moment(profilestarttime).format('HH')
                              ) {
                                return true;
                              }
                              if (
                                clockType === 'minutes' &&
                                Math.abs(
                                  profilestarttime?.diff(
                                    profileendtime,
                                    'minutes'
                                  )
                                ) <= 60 &&
                                timeValue <
                                  Number(
                                    moment(profilestarttime).format('mm')
                                  ) +
                                    15
                              ) {
                                return true;
                              }
                            }
                          }
                          return false;
                        }}
                      />
                    </TimePickerStyled>
                  </LocalizationProvider>
                </FormGroup>
              </Col>
              <Col md="6">
                <Input
                  onBlur={handleBlur}
                  invalid={
                    !!errors.profilepriceunit && touched.profilepriceunit
                  }
                  label="Price"
                  placeholder="Price..."
                  name="profilepriceunit"
                  type="number"
                  // onChange={(e) => onChangeHandler(e, 'profilepriceunit')}
                  onChange={handleChange}
                  className={
                    errors.profilepriceunit &&
                    touched.profilepriceunit &&
                    'error'
                  }
                  error={errors.profilepriceunit}
                  touch={touched.profilepriceunit}
                  value={values.profilepriceunit}
                />
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Price Type</Label>
                  <OptionSelect
                    form={values.profilepricetype}
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    error={errors.profilepricetype}
                    touch={touched.profilepricetype}
                    setform={setFieldValue}
                    options={[
                      {
                        value: 'profilePKW',
                        label: 'Price Per Killo Watt'
                      },
                      { value: 'profilePM', label: 'Price Per Minute' }
                    ]}
                    placeholder="-- Select Type --"
                    name="profilepricetype"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12}>
                <FormGroup
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Switch
                    checked={values.status}
                    // onClick={(e) => onChangeHandler(e, 'status')}
                    onClick={(e) => setFieldValue('status', !values.status)}
                    className="switch-medium toggle-switch-success mr-2"
                  />
                  <span> Status</span>
                </FormGroup>
              </Col>
              <Col className="text-right" md={12}>
                <LaddaButton
                  loading={isLoading}
                  data-size={XL}
                  disabled={startTimeError || endTimeError || endDateError}
                  // onClick={onSubmitHandler}
                  type="submit"
                  className="mb-5 btn btn-primary font-weight-bold w-20 my-2">
                  Submit
                </LaddaButton>
              </Col>
            </Row>
          </Form>
        )}
      />
    </>
  );
};
export default LivePreviewExample;
