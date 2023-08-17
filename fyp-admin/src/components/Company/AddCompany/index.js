import history from '@history';
import Input from 'custom-components/Input';
import SearchSelect from 'custom-components/SearchSelect';
import { Form, Formik } from 'formik';
import Switch from 'rc-switch';
import React, { useEffect, useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import {
  createCompany,
  getCompany,
  updateCompany
} from 'store/reducer/appReducerSlice';
import { Toaster } from 'utils';
import { companyValidation } from 'validation';

const LivePreviewExample = () => {
  const dispatch = useDispatch();
  const { user, mainloading, Company } = useSelector((state) => ({
    user: state.appReducer.pgUser,
    mainloading: state.appReducer.isLoading,
    Company: state.appReducer.singleCompany
  }));
  const { companyId } = useParams();
  const [form, setform] = useState({
    companyname: null,
    ownername: null,
    description: null,
    status: true
  });
  const [isLoading, setIsLoading] = useState(false);
  // const { companyname, status, description, link } = form;
  useEffect(() => {
    if (companyId !== 'new') {
      dispatch(getCompany(companyId));
    }
    // } else {
    //   // setform({
    //   //   companyname: null,
    //   //   description: null,
    //   //   groupid_fk: null,
    //   //   link: null,
    //   //   status: true
    //   // });
    // }
  }, [companyId]);
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
  //   if (Company && companyId !== 'new') {
  //     setform({
  //       ...Company,
  //       groupid_fk: {
  //         value: Company?.groupid_fk?.groupid,
  //         label: Company?.groupid_fk?.groupname
  //       }
  //     });
  //   }
  // }, [Company]);
  const onSubmitHandler = async (values, resetForm) => {
    setIsLoading(true);

    let res;
    if (companyId !== 'new') {
      res = await dispatch(await updateCompany({ form: values, pgUser: user }));
    } else {
      res = await dispatch(await createCompany({ form: values, pgUser: user }));
    }
    setIsLoading(false);
      Toaster(
        'success',
        `Company ${companyId !== 'new' ? 'Updated' : 'Created'} successfully`
      );
      resetForm();
      history.push('/List-Company');
    
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
          Company && companyId !== 'new'
            ? {
                ...Company,
                groupid_fk: {
                  value: Company?.groupid_fk?.groupid,
                  label: Company?.groupid_fk?.groupname
                }
              }
            : {
                 companyname: null,
                 ownername: null,
                 description: null,
              }
        }
        onSubmit={(values, { resetForm }) => {
          onSubmitHandler(values, resetForm);
        }}
        // validationSchema={companyValidation}
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
                  label="Company Name"
                  placeholder="Company Name..."
                  onBlur={handleBlur}
                  type="text"
                  onChange={handleChange}
                  name="companyname"
                  id="companyname"
                  value={values.companyname}
                  invalid={errors.companyname && touched.companyname && 'error'}
                  className={
                    errors.companyname && touched.companyname && 'error'
                  }
                  error={errors.companyname}
                  touch={touched.companyname}
                />
                {console.log('errorscompany', errors.companyname)}
              </Col>
              <Col md="6">
                <Input
                  onBlur={handleBlur}
                  label="Owner Name"
                  placeholder="Owner Name..."
                  type="text"
                  onChange={handleChange}
                  name="ownername"
                  value={values.ownername}
                  id="ownername"
                  className={errors.ownername && touched.ownername && 'error'}
                  invalid={errors.ownername && touched.ownername && 'error'}
                  error={errors.ownername}
                  touch={touched.ownername}
                />
              </Col>
              <Col md="12">
                <Input
                  onBlur={handleBlur}
                  label="Description"
                  placeholder="Additional Notes"
                  type="textarea"
                  onChange={handleChange}
                  name="description"
                  value={values.description}
                  id="description"
                  invalid={errors.description && touched.description && 'error'}
                  className={
                    errors.description && touched.description && 'error'
                  }
                  error={errors.description}
                  touch={touched.description}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="text-right" md={12}>
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
};
export default LivePreviewExample;
