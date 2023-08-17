import * as Actions from 'Actions';
import Input from 'custom-components/Input';
import { Form, Formik } from 'formik';
import Switch from 'rc-switch';
import React, { useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, FormGroup, Label, Modal, Row } from 'reactstrap';
import { Toaster } from 'utils';
import { modal } from 'validation';
import Select from '../OptionSelect';
import Uploader from '../Uploader';

export default function LivePreviewExample({ toggle5, modal5 }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state?.appReducer?.pgUser
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [form, setform] = useState({
    connectorImage: null
  });

  // const { connectorTypeName, status, connectorCategory, connectorImage } = form;
  // const onChangeHandler = (e, component) => {
  //   if (component === 'status') {
  //     setform({
  //       ...form,
  //       status: !form.status
  //     });
  //   } else if (component === 'select') {
  //     setform({
  //       ...form,
  //       status: e
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
    const res = await dispatch(
      await Actions.createConnector({ ...values, ...form }, user)
    );
    setIsLoading(false);
    if (res.success) {
      Toaster('success', `Connector Created successfully`);
      // setform({
      //   connectorTypeName: null,
      //   status: true
      // });
      resetForm();
      toggle5();
    } else {
      Toaster('error', `Error in Creating Connector`);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal zIndex={2000} centered isOpen={modal5} toggle={toggle5}>
          <div>
            <Card className="bg-secondary shadow-none border-0">
              <div className="card-header d-block bg-white pt-4 pb-5">
                <div className="text-muted text-center">
                  <h3>Create Connector</h3>
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-5">
                <Formik
                  initialValues={{
                    connectorTypeName: null,
                    status: true,
                    connectorCategory: null
                  }}
                  onSubmit={(values, { resetForm }) => {
                    onSubmitHandler(values, resetForm);
                  }}
                  validationSchema={modal}
                  render={({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    setFieldValue,
                    setFieldError,
                    setFieldTouched,
                    handleBlur,
                    handleChange
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      {console.log('values', values)}
                      <Row>
                        <Col cla md="12">
                          <Uploader setform={setform} form={form} />
                          <FormGroup className="mt-1">
                            <Label className="mb-0">Connector Name</Label>
                            <Input
                              value={values.connectorTypeName}
                              placeholder="Connector Name"
                              type="text"
                              onChange={handleChange}
                              name="connectorTypeName"
                              onBlur={handleBlur}
                              error={errors?.connectorTypeName}
                              touch={touched?.connectorTypeName}
                              id="connectorTypeName"
                              // invalid={
                              //   errors.connectorTypeName &&
                              //   touched.connectorTypeName &&
                              //   'error'
                              // }
                              className={
                                errors.connectorTypeName &&
                                touched.connectorTypeName &&
                                'error'
                              }
                              // error={errors.connectorTypeName}
                              // touch={touched.connectorTypeName}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="mb-4">Connector Type</Label>
                            <Select
                              onBlur={setFieldTouched}
                              onError={setFieldError}
                              error={errors?.connectorCategory}
                              touch={touched?.connectorCategory}
                              placeholder="-- Select Connector type --"
                              form={values.connectorCategory}
                              name="connectorCategory"
                              setform={setFieldValue}
                              options={[
                                { value: 'DC', label: 'DC' },
                                { value: 'AC', label: 'AC' }
                              ]}
                            />
                            {/* {!!errors.connectorCategory &&
                              touched.connectorCategory && (
                                <FormFeedback className="d-block">
                                  {errors.connectorCategory}
                                </FormFeedback>
                              )} */}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-3 ">
                        <Col md={6}>
                          <FormGroup
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}
                            className="my-auto">
                            <span className="mr-2"> Status</span>

                            <Switch
                              checked={values.status}
                              onChange={() =>
                                setFieldValue('status', !values.status)
                              }
                              // onClick={(e) => onChangeHandler(e, 'status')}
                              className="switch-medium toggle-switch-success "
                            />
                          </FormGroup>
                        </Col>
                        <Col className="text-right my-auto" md={6}>
                          <LaddaButton
                            loading={isLoading}
                            data-size={XL}
                            type="submit"
                            // onClick={onSubmitHandler}
                            className="mb-5 btn btn-primary font-weight-bold w-20 my-2">
                            Submit
                          </LaddaButton>
                        </Col>
                      </Row>
                    </Form>
                  )}
                />
              </div>
            </Card>
          </div>
        </Modal>
      </div>
    </>
  );
}
