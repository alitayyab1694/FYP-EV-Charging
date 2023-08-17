import history from '@history';
import * as API from 'api';
import Input from 'custom-components/Input';
import { Form, Formik } from 'formik';
import moment from 'moment';
import Switch from 'rc-switch';
import React, { useEffect, useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import {
  Col,
  FormFeedback,
  FormGroup,
  Input as Input1,
  InputGroup,
  InputGroupAddon,
  Label as Label1,
  Row
} from 'reactstrap';
import { getPolicytag } from 'store/reducer/appReducerSlice';
import { Toaster } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { policyTagValidation } from 'validation';
import Table from './Tables';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const { tagId } = useParams();
  const { user, singleTag, mainLoading } = useSelector((state) => ({
    user: state?.appReducer?.pgUser,
    singleTag: state?.appReducer?.singleTag,
    mainLoading: state?.appReducer?.isLoading
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [form, setform] = useState({
    tag_name: null,
    tag_user: null,
    tag_multiplier: 0,
    status: true
  });
  // const { tag_name, status, tag_multiplier } = form;
  useEffect(() => {
    if (tagId !== 'new') {
      dispatch(getPolicytag(tagId));
    }
    // else {
    //   setform({
    //     tag_name: null,
    //     tag_user: null,
    //     tag_multiplier: 0,
    //     status: true
    //   });
    // }
  }, [tagId]);
  // useEffect(() => {
  //   // if (singleTag && tagId !== 'new') {
  //   //   setform({
  //   //     ...singleTag
  //   //   });
  //   // }
  // }, [singleTag]);
  // const onChangeHandler = (e, component) => {
  //   if (component === 'status') {
  //     setform({
  //       ...form,
  //       status: !form.status
  //     });
  //   } else if (e.target.name === 'tag_multiplier') {
  //     if (e.target.value >= 0 && e.target.value < 100) {
  //       setform({
  //         ...form,
  //         tag_multiplier: e.target.value - 0
  //       });
  //     } else {
  //       setform({
  //         ...form,
  //         tag_multiplier: 0
  //       });
  //     }
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
    let res;
    if (tagId !== 'new') {
      // res = await dispatch(await Actions.updatePolicyTag(form, user));
      const obj = {
        ...values,
        created_date: moment().toISOString(),
        updated_date: moment().toISOString(),
        tag_multiplier: parseFloat(values?.tag_multiplier).toFixed(2),
        lastmodified_by: user?.fullname
      };
      delete obj.tag_user;
      delete obj.tag_id;
      delete obj.tag_chargebox;
      delete obj.created_date;
      delete obj.created_by;
      try {
        await API.patch(`/policy-tags/${values?.tag_id}/`, obj);
        ToastHandler(tagId, true);
        setform({
          tag_name: null,
          tag_user: null,
          tag_multiplier: 0,
          status: true
        });
        resetForm();
        history.push('/List-Policy-Tag');
        // dispatch({
        //   type: Type.UPDATE_POLICY
        // });
        // return { success: true, data: res };
      } catch (error) {
        console.log(error.response);
        ToastHandler(tagId, false);

        // return { success: false, data: error.response };
      }
    } else {
      // res = await dispatch(await Actions.createPolicyTags(values, user));
      const obj = {
        ...values,
        tag_id: uuidv4(),
        version: '1',
        created_date: moment().toISOString(),
        updated_date: moment().toISOString(),
        created_by: user?.fullname,
        lastmodified_by: user?.fullname
      };
      try {
        await API.post('/policy-tags/', obj);
        ToastHandler(tagId, true);
        setform({
          tag_name: null,
          tag_user: null,
          tag_multiplier: 0,
          status: true
        });
        resetForm();

        history.push('/List-Policy-Tag');
        // dispatch({
        //   type: Type.NEW_POLICY_TAGE
        // });
        // return { success: true, data: res };
      } catch (error) {
        console.log(error.response);
        ToastHandler(tagId, false);
        // return { success: false, data: error.response };
      }
    }
    setIsLoading(false);
    // if (res.success) {

    // } else {
    // }
  };
  const ToastHandler = (tagId, success) => {
    if (success) {
      Toaster(
        'success',
        `PolicyTag ${tagId !== 'new' ? 'Updated' : 'Created'} successfully`
      );
    } else {
      Toaster(
        'error',
        `Error occured in ${
          tagId !== 'new' ? 'updating' : 'creating'
        } policy tag`
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
          singleTag && tagId !== 'new'
            ? {
                ...singleTag
              }
            : {
                tag_name: null,
                tag_user: null,
                tag_multiplier: null,
                status: true
              }
        }
        onSubmit={(values, { resetForm }) => {
          onSubmitHandler(values, resetForm);
        }}
        validationSchema={policyTagValidation}
        render={({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          handleBlur,
          handleChange
        }) => (
          <Form onSubmit={handleSubmit}>
            {console.log('touched', touched)}
            {console.log('values', values)}
            {console.log('errors', errors)}
            <Row>
              <Col md="6">
                <Input
                  label="Tag Name"
                  placeholder="Tag Name..."
                  type="text"
                  onChange={handleChange}
                  name="tag_name"
                  value={values.tag_name || ''}
                  id="tag_name"
                  onBlur={handleBlur}
                  invalid={errors.tag_name && touched.tag_name && 'error'}
                  className={errors.tag_name && touched.tag_name && 'error'}
                  error={errors.tag_name}
                  touch={touched.tag_name}
                />
              </Col>
              <Col md="6">
                <Label1>Tag Multipler</Label1>
                <InputGroup>
                  <Input1
                    step="0.1"
                    placeholder="Tag Multipler"
                    type="number"
                    onBlur={handleBlur}
                    // onChange={(e) => onChangeHandler(e, 'tag_multiplier')}
                    onChange={handleChange}
                    name="tag_multiplier"
                    value={values.tag_multiplier || ''}
                    // invalid={
                    //   errors.tag_multiplier && touched.tag_multiplier && 'error'
                    //
                    className={
                      errors.tag_multiplier && touched.tag_multiplier && 'error'
                    }
                  />
                  <InputGroupAddon addonType="append">%</InputGroupAddon>
                </InputGroup>
                {!!errors.tag_multiplier && touched.tag_multiplier && (
                  <FormFeedback className="d-block">
                    {errors.tag_multiplier}
                  </FormFeedback>
                )}
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
                    // onClick={(e) => onChangeHandler(e, 'status')}
                    onClick={() => setFieldValue('status', !values.status)}
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
      {tagId !== 'new' && <Table singleTag={singleTag} />}
    </>
  );
}
