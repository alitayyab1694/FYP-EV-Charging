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
import { Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import { getGroup } from 'store/reducer/appReducerSlice';
import { Toaster } from 'utils';
import { tarifGroupValidation } from 'validation';

const LivePreviewExample = () => {
  const dispatch = useDispatch();
  const { user, mainloading, group } = useSelector((state) => ({
    user: state.appReducer.pgUser,
    mainloading: state.appReducer.isLoading,
    group: state.appReducer.singleGroup
  }));
  const { groupId } = useParams();
  const [form, setform] = useState({
    groupname: null,
    pricingpolicy: null,
    chargebox: null,
    status: true
  });
  const [isLoading, setIsLoading] = useState(false);
  // const { groupname } = form;
  useEffect(() => {
    const runAction = async () => {
      if (groupId !== 'new') {
        dispatch(getGroup(groupId));
      }
      //   else {
      //     setform({
      //       groupname: null,
      //       pricingpolicy: null,
      //       chargebox: null,
      //       status: true
      //     });
      //   }
    };
    runAction();
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
  // useEffect(() => {
  //   if (group && groupId !== 'new') {
  //     setform({
  //       ...group,
  //       chargebox: group?.chargebox?.map((c) => {
  //         return { value: c, label: c };
  //       }),
  //       pricingpolicy: group?.pricingpolicy?.map((c) => {
  //         return {
  //           value: c.paymentpolicyid,
  //           label: c.profilename
  //         };
  //       })
  //     });
  //   }
  // }, [group]);
  const onSubmitHandler = async (values, resetForm) => {
    // e.preventDefault();
    setIsLoading(true);

    // let res;
    if (groupId !== 'new') {
      // res = await dispatch(await Actions.updateGroup(form, user));
      const obj = {
        ...values,
        pricingpolicy:
          values?.pricingpolicy?.length > 0
            ? values?.pricingpolicy?.map((c) => c.value)
            : [],
        version: (Number(values.version) + 1).toString(),
        updated_date: moment().toISOString(),
        lastmodified_by: user?.fullname,
        chargebox:
          values?.chargebox?.length > 0
            ? values.chargebox?.map((c) => c.value)
            : []
      };
      delete obj.created_date;
      delete obj.created_by;
      try {
        await API.patch(`/groups/${values.groupid}/`, obj);
        // dispatch({
        //   type: Type.UPDATE_GROUP
        // });
        // return { success: true, data: res };

        ToasterHandler(groupId, true);
      } catch (error) {
        console.log(error.response);
        // return { success: false, data: error.response };
        ToasterHandler(groupId, false);
      }
    } else {
      const obj = {
        ...values,
        pricingpolicy: values?.pricingpolicy?.map((c) => c.value),
        version: '1',
        created_date: moment().toISOString(),
        updated_date: moment().toISOString(),
        created_by: user?.fullname,
        lastmodified_by: user?.fullname,
        chargebox: values?.chargebox?.map((c) => c.value)
      };
      try {
        await API.post('/groups/', obj);
        // dispatch({
        //   type: Type.NEW_GROUP
        // });
        setIsLoading(false);
        ToasterHandler(groupId, true);
        // Toaster(
        //   'success',
        //   `Group ${groupId !== 'new' ? 'Updated' : 'Created'} successfully`
        // );
        // setform({
        //   groupname: null,
        //   pricingpolicy: null,
        //   chargebox: null,
        //   status: true
        // });
        // return { success: true, data: res };
      } catch (error) {
        console.log(error.response);
        // Toaster(
        //   'error',
        //   `Error in ${groupId !== 'new' ? 'Updating' : 'Creating'} Group`
        // );
        ToasterHandler(groupId, false);
        setIsLoading(false);
        // return { success: false, data: error.response };
      }
      // res = await dispatch(await Actions.createGroup(form, user));
    }
    // if (res.success) {
    // } else {

    // }
  };

  const ToasterHandler = (groupId, success) => {
    if (success) {
      Toaster(
        'success',
        `Group ${groupId !== 'new' ? 'Updated' : 'Created'} successfully`
      );
      setform({
        groupname: null,
        pricingpolicy: null,
        chargebox: null,
        status: true
      });

      history.push('/Group-List');
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
                ...group,
                chargebox: group?.chargebox?.map((c) => {
                  return { value: c, label: c };
                }),
                pricingpolicy: group?.pricingpolicy?.map((c) => {
                  return {
                    value: c.paymentpolicyid,
                    label: c.profilename
                  };
                })
              }
            : {
                groupname: null,
                pricingpolicy: null,
                chargebox: null,
                status: true
              }
        }
        onSubmit={(values, { resetForm }) => {
          onSubmitHandler(values, resetForm);
        }}
        validationSchema={tarifGroupValidation}
        render={({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          handleBlur,
          handleChange,
          setFieldError,

          setFieldTouched
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <Input
                  onBlur={handleBlur}
                  label="Group Name"
                  placeholder="Group Name..."
                  type="text"
                  // onChange={(e) => onChangeHandler(e)}
                  onChange={handleChange}
                  name="groupname"
                  value={values.groupname}
                  invalid={errors.groupname && touched.groupname && 'error'}
                  error={errors.groupname}
                  touch={touched.groupname}
                  className={errors.groupname && touched.groupname && 'error'}
                />
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Pricing Policy</Label>
                  <SearchSelect
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    form={values.pricingpolicy}
                    setform={setFieldValue}
                    isMulti={true}
                    placeholder="-- Search Policy --"
                    name="pricingpolicy"
                    component="pricingPolicy"
                    url="policies"
                    searchUrl="search-policy"
                  />
                </FormGroup>
                {!!errors.pricingpolicy && touched.pricingpolicy && (
                  <FormFeedback className="d-block">
                    {errors.pricingpolicy}
                  </FormFeedback>
                )}
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Charge Box</Label>
                  <SearchSelect
                    onBlur={setFieldTouched}
                    onError={setFieldError}
                    form={values.chargebox}
                    setform={setFieldValue}
                    isMulti={true}
                    placeholder="-- Search Charge Box --"
                    name="chargebox"
                    component="chargebox"
                    url="chargeboxes"
                    searchUrl="search-chargebox"
                  />
                </FormGroup>
                {!!errors.chargebox && touched.chargebox && (
                  <FormFeedback className="d-block">
                    {errors.chargebox}
                  </FormFeedback>
                )}
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
                    onChange={() => setFieldValue('status', !values.status)}
                    className="switch-medium toggle-switch-success mr-2"
                  />
                  <span> Status</span>
                </FormGroup>
              </Col>
              <Col className="text-right" md={12}>
                <LaddaButton
                  loading={isLoading}
                  data-size={XL}
                  // onClick={onSubmitHandler}
                  className="mb-5 btn btn-primary font-weight-bold w-20 my-2"
                  type="submit">
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
