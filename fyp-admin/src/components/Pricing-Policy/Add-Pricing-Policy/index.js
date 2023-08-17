import history from '@history';
import * as API from 'api';
import Input from 'custom-components/Input';
import OptionSelect from 'custom-components/OptionSelect';
import SearchSelect from 'custom-components/SearchSelect';
import { Form, Formik } from 'formik';
import moment from 'moment';
import Switch from 'rc-switch';
import React, { useEffect, useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import { getPolicy } from 'store/reducer/appReducerSlice';
import { Toaster } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { pricingPolicyValidation } from 'validation';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { policyId } = useParams();
  const { user, policy, mainLoading } = useSelector((state) => ({
    user: state?.appReducer?.pgUser,
    policy: state?.appReducer?.singlePolicy,
    mainLoading: state?.appReducer?.isLoading
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [form, setform] = useState({
    profilename: null,
    applicabletype: { value: 'Select Type', label: 'Select Type' },
    profileday: { value: 'Select Profile Day', label: 'Select Profile Day' },
    profilepriority: 0,
    limitminutes: 0,
    rates: null,
    status: true
  });
  // const { profilename, profilepriority, limitminutes, status } = form;
  useEffect(() => {
    if (policyId !== 'new') {
      dispatch(getPolicy(policyId));
    }
    // else {
    //   setform({
    //     profilename: null,
    //     applicabletype: { value: 'Select Type', label: 'Select Type' },
    //     profileday: {
    //       value: 'Select Profile Day',
    //       label: 'Select Profile Day'
    //     },
    //     profilepriority: 0,
    //     limitminutes: 0,
    //     status: true
    //   });
    // }
  }, [policyId]);
  // useEffect(() => {
  //   if (policy && policyId !== 'new') {
  //     setform({
  //       ...policy,
  //       applicabletype: {
  //         value: policy?.applicabletype,
  //         label: policy?.applicabletype
  //       },
  //       rates: policy?.rates.map((r) => {
  //         return {
  //           value: r?.rateid,
  //           label: `Price ${r?.profilepriceunit}`
  //         };
  //       }),
  //       profileday: { value: policy?.profileday, label: policy?.profileday }
  //     });
  //   }
  // }, [policy]);
  // const onChangeHandler = (e, component) => {
  //   if (component === 'status') {
  //     setform({
  //       ...form,
  //       status: !form.status
  //     });
  //   } else {
  //     setform({
  //       ...form,
  //       [e.target.name]: e.target.value
  //     });
  //   }
  // };
  const onSubmitHandler = async (values, resetForm) => {
    // e.preventDefault();
    setIsLoading(true);
    if (policyId !== 'new') {
      // res = await dispatch(await Actions.updatePolicy(form, user));
      const obj = {
        ...values,
        created_date: moment().toISOString(),
        updated_date: moment().toISOString(),
        rates: values?.rates.map((p) => p.value),
        lastmodified_by: user?.fullname,
        applicabletype: values?.applicabletype?.value,
        profileday: values?.profileday?.value
      };
      delete obj.created_date;
      delete obj.created_by;
      try {
        await API.patch(`/policies/${values.paymentpolicyid}/`, obj);
        ToastHandler(policyId, true);
        resetForm();
        history.push('/List-Pricing-Policy');

        // dispatch({
        //   type: Type.UPDATE_POLICY
        // });
        // return { success: true, data: res };
      } catch (error) {
        console.log(error.response);
        ToastHandler(policyId, false);
        // return { success: false, data: error.response };
      }
    } else {
      // res = await dispatch(await Actions.createPolicy(values, user));
      const obj = {
        ...values,
        paymentpolicyid: uuidv4(),
        version: '1',
        rates: values?.rates.map((r) => r?.value),
        created_date: moment().toISOString(),
        updated_date: moment().toISOString(),
        created_by: user?.fullname,
        lastmodified_by: user?.fullname,
        applicabletype: values?.applicabletype?.value,
        profileday: values?.profileday?.value
      };
      try {
        await API.post('/policies/', obj);
        // dispatch({
        //   type: Type.NEW_PRICING_POLICY
        // });
        // return { success: true, data: res };
        // Toaster(
        //   'success',
        //   `Policy ${policyId !== 'new' ? 'Updated' : 'Created'} successfully`
        // );
        ToastHandler(policyId, true);
        setform({
          profilename: null,
          applicabletype: { value: 'Select Type', label: 'Select Type' },
          profileday: {
            value: 'Select Profile Day',
            label: 'Select Profile Day'
          },
          profilepriority: 0,
          limitminutes: 0,
          status: true
        });
        resetForm();
        history.push('/List-Pricing-Policy');
      } catch (error) {
        console.log(error.response);
        // return { success: false, data: error.response };
        ToastHandler(policyId, false);
      }
    }
    setIsLoading(false);
    // if (res.success) {
    // } else {

    // }
  };

  const ToastHandler = (policyId, success) => {
    if (success) {
      Toaster(
        'success',
        `Policy ${policyId !== 'new' ? 'Updated' : 'Created'} successfully`
      );
    } else {
      Toaster(
        'error',
        `Error in ${policyId !== 'new' ? 'Updating' : 'Creating'} Policy`
      );
    }
  };

  if (mainLoading) {
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
        initialValues={
          policy && policyId !== 'new'
            ? {
                ...policy,
                applicabletype: {
                  value: policy?.applicabletype,
                  label: policy?.applicabletype
                },
                rates: policy?.rates.map((r) => {
                  return {
                    value: r?.rateid,
                    label: `Price ${r?.profilepriceunit}`
                  };
                }),
                profileday: {
                  value: policy?.profileday,
                  label: policy?.profileday
                }
              }
            : {
                profilename: null,
                // applicabletype: { value: 'Select Type', label: 'Select Type' },
                applicabletype: null,
                profileday: null,
                profilepriority: null,
                limitminutes: null,
                rates: null,
                status: true
              }
        }
        onSubmit={(values, { resetForm }) => {
          onSubmitHandler(values, resetForm);
        }}
        validationSchema={pricingPolicyValidation}
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
                <Input
                  onBlur={handleBlur}
                  label="Policy Name"
                  invalid={!!errors.profilename && touched.profilename}
                  placeholder="Policy Name..."
                  type="text"
                  // onChange={(e) => onChangeHandler(e)}
                  onChange={handleChange}
                  id="profilename"
                  name="profilename"
                  value={values.profilename || ''}
                  className={
                    errors.profilename && touched.profilename && 'error'
                  }
                  error={errors.profilename}
                  touch={touched.profilename}
                />
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Rates</Label>
                  <SearchSelect
                    form={values.rates}
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    setform={setFieldValue}
                    isMulti={true}
                    placeholder="-- Search Rates --"
                    name="rates"
                    component="rates"
                    url="rates"
                    searchUrl="search-rates"
                  />
                  {!!errors.rates && touched.rates && (
                    <FormFeedback className="d-block">
                      {errors.rates}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Type</Label>
                  <OptionSelect
                    form={values.applicabletype}
                    setform={setFieldValue}
                    options={[
                      { value: 'Select Type', label: 'Select Type' },
                      { value: 'All', label: 'All' },
                      { value: 'Daily', label: 'Daily' },
                      { value: 'Weekly', label: 'Weekly' }
                    ]}
                    placeholder="-- Select Type --"
                    name="applicabletype"
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                  />
                  {!!errors.applicabletype && touched.applicabletype && (
                    <FormFeedback className="d-block">
                      {errors.applicabletype}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label>Profile Day</Label>
                  <OptionSelect
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    form={values.profileday}
                    setform={setFieldValue}
                    options={[
                      { value: 'Sun', label: 'Sun' },
                      { value: 'Mon', label: 'Mon' },
                      { value: 'Tue', label: 'Tue' },
                      { value: 'Wed', label: 'Wed' },
                      { value: 'Thu', label: 'Thu' },
                      { value: 'Fri', label: 'Fri' },
                      { value: 'Sat', label: 'Sat' }
                    ]}
                    placeholder="-- Select Profile Day --"
                    name="profileday"
                  />
                  {!!errors.profileday && touched.profileday && (
                    <FormFeedback className="d-block">
                      {errors.profileday}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <Input
                  label="Priority"
                  placeholder="Priority..."
                  type="number"
                  invalid={!!errors.profilepriority && touched.profilepriority}
                  id="profilepriority"
                  // onChange={(e) => onChangeHandler(e)}
                  onChange={handleChange}
                  name="profilepriority"
                  onBlur={handleBlur}
                  invalid={
                    errors.profilepriority && touched.profilepriority && 'error'
                  }
                  className={
                    errors.profilepriority && touched.profilepriority && 'error'
                  }
                  error={errors.profilepriority}
                  touch={touched.profilepriority}
                  value={values.profilepriority || ''}
                />
              </Col>

              <Col md={6}>
                <Input
                  label="Minimum Limit"
                  placeholder="Minimum Limit..."
                  type="number"
                  // onChange={(e) => onChangeHandler(e)}
                  onChange={handleChange}
                  id="limitminutes"
                  name="limitminutes"
                  onBlur={handleBlur}
                  invalid={
                    errors.limitminutes && touched.limitminutes && 'error'
                  }
                  className={
                    errors.limitminutes && touched.limitminutes && 'error'
                  }
                  error={errors.limitminutes}
                  touch={touched.limitminutes}
                  value={values.limitminutes || ''}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Switch
                    checked={values.status}
                    onChange={() => setFieldValue('status', !values.status)}
                    // onClick={(e) => onChangeHandler(e, 'status')}
                    className="switch-medium toggle-switch-success mr-2"
                  />
                  <span> Status</span>
                </FormGroup>
              </Col>
              <Col md={12}>
                <LaddaButton
                  loading={isLoading}
                  data-size={XL}
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
}
