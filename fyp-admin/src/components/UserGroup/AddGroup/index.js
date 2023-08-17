import history from '@history';
import * as API from 'api';
import Input from 'custom-components/Input';
import SearchSelect from 'custom-components/SearchSelect';

import { Form, Formik } from 'formik';
import moment from 'moment';
import Switch from 'rc-switch';
import React, { useEffect, useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { getUserGroup } from 'store/reducer/appReducerSlice';
import { Toaster } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { userGroupValidation } from 'validation';

const LivePreviewExample = () => {
  const dispatch = useDispatch();
  const { user, mainloading, group } = useSelector((state) => ({
    user: state.appReducer.pgUser,
    mainloading: state.appReducer.isLoading,
    group: state.appReducer.singleUserGroup
  }));
  const { groupId } = useParams();
  const [form, setform] = useState({
    groupname: null,
    description: null,
    status: true
  });
  const [isLoading, setIsLoading] = useState(false);
  // const { groupname, description } = form;
  useEffect(() => {
    if (groupId !== 'new') {
      dispatch(getUserGroup(groupId));
    }
    // else {
    //   setform({
    //     groupname: null,
    //     description: null,
    //     status: true
    //   });
    // }
  }, [groupId]);
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
  useEffect(() => {
    if (group && groupId !== 'new') {
      setform({
        ...group
      });
    }
  }, [group]);
  const onSubmitHandler = async (values, resetForm) => {
    setIsLoading(true);
    if (groupId !== 'new') {
      const obj = {
        ...values,
        company:
          values?.pricingpolicies.value 
      
      };
      try {
         await API.patch(`/usergroup/${values.groupid}/`, obj);
        ToastHandler(groupId, true);
        resetForm();
        history.push('/List-User-Group');
       
      } catch (error) {
        console.log(error.response);
        ToastHandler(groupId, false);
        // return { success: false, data: error.response };
      }
    } else {
      const obj = {
        ...values,
        company:
          values?.company.value 
      };
      try {
        await API.post('/auth/company/create', obj);
        ToastHandler(groupId, true);
        history.push('/List-User-Group');
      } catch (error) {
        ToastHandler(groupId, false);
      }
    }
    setIsLoading(false);
  };
  const ToastHandler = (groupId, success) => {
    if (success) {
      Toaster(
        'success',
        `Group ${groupId !== 'new' ? 'Updated' : 'Created'} successfully`
      );
      setform({
        groupname: null,
        description: null,
        status: true
      });
    } else {
      Toaster(
        'error',
        `Error in ${groupId !== 'new' ? 'Updating' : 'Creating'} Group`
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
        initialValues={
          group && groupId !== 'new'
            ? {
                ...group
              }
            : {
                name: null,
                email: null,
              password: null,
                company: null,
              }
        }
        onSubmit={(values, { resetForm }) => {
          onSubmitHandler(values, resetForm);
        }}
        render={({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          handleBlur,
          handleChange,
          setFieldTouched,
          setFieldError
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <Input
                  label="User Name"
                  placeholder="User Name..."
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={values.name}
                  id="name"
                  onBlur={handleBlur}
                  invalid={errors.name && touched.name && 'error'}
                  error={errors.name}
                  touch={touched.name}
                  className={errors.name && touched.name && 'error'}
                />
              </Col>
               <Col md="6">
                <Input
                  label="User Email"
                  placeholder="User Email..."
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  id="email"
                  onBlur={handleBlur}
                  invalid={errors.email && touched.email && 'error'}
                  error={errors.email}
                  touch={touched.email}
                  className={errors.email && touched.email && 'error'}
                />
              </Col>
               <Col md="6">
                <Input
                  label="Password"
                  placeholder="Password..."
                  type="password"
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                  id="password"
                  onBlur={handleBlur}
                  invalid={errors.password && touched.password && 'error'}
                  error={errors.password}
                  touch={touched.password}
                  className={errors.password && touched.password && 'error'}
                />
              </Col>
               <Col md="6">
                <FormGroup>
                            <Label>Select Company</Label>
                            <SearchSelect
                              onBlur={setFieldTouched}
                              onError={setFieldError}
                              form={values.company}
                              setform={setFieldValue}
                              isMulti={false}
                              placeholder="-- Search Company --"
                              name="company"
                              component="userGroup"
                              url="company"
                              searchUrl="company"
                            />
                          </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="text-right" md={12}>
                <LaddaButton
                  loading={isLoading}
                  data-size={XL}
                  onClick={          handleSubmit}
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
