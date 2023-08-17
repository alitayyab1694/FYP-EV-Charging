import * as API from 'api';
import SearchSelect from 'custom-components/SearchSelect';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, FormGroup, Label, Modal, Row } from 'reactstrap';
import { getCustomerPolicy, getCustomers } from 'store/reducer/appReducerSlice';
import { customerPolicyModelHandler } from 'store/reducer/modalSlice';
import { Toaster } from 'utils';
import { updateCustomerModelValid } from 'validation';

export default function LivePreviewExample({ userId }) {
  const dispatch = useDispatch();
  const { customerPolicy, customerpolicies } = useSelector((state) => ({
    customerPolicy: state.modelReducer.customerPolicy,
    customerpolicies: state.appReducer.customerpolicies
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [form, setform] = useState({
    user_tag: null
  });
  useEffect(() => {
    if (userId !== '') {
      // setform({
      //   user_tag: null
      // });
      dispatch(getCustomerPolicy(userId));
    }
  }, [userId, customerPolicy]);
  // useEffect(() => {
  //   if (customerpolicies && customerpolicies?.length !== 0) {
  //     setform({
  //       user_tag: customerpolicies?.results?.map((p) => {
  //         return { value: p?.tag_id, label: p?.tag_name };
  //       })
  //     });
  //   }
  // }, [customerpolicies, customerPolicy]);
  const onSubmitHandler = async (values) => {
    // e.preventDefault();
    setIsLoading(true);
    // const res = await dispatch(
    //   await Actions.UpdateCustomerPolicy(
    //     {
    //       user_tag: form.user_tag ? form.user_tag.map((p) => p.value) : []
    //     },
    //     userId
    //   )
    // );
    try {
      await API.patch(`/update-user/${userId}/`, {
        user_tag: values.user_tag ? values.user_tag.map((p) => p.value) : []
      });
      await dispatch(await getCustomers({ paginate: false, query: '' }));
      setIsLoading(false);
      Toaster('success', `User successfully Updated`);
      setform({
        policy: null
      });
      dispatch(customerPolicyModelHandler());
    } catch (error) {
      console.log('error', error);
      Toaster('error', `Error in Updating User`);
    }
    // if (res.success) {
    // } else {
    // }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal
          zIndex={2000}
          centered
          isOpen={customerPolicy}
          toggle={() => dispatch(customerPolicyModelHandler())}>
          <div>
            <Card className="bg-secondary shadow-none border-0">
              <div className="card-header d-block bg-white pt-4 pb-5">
                <div className="text-muted text-center">
                  <h3>Update Policy Tag</h3>
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-5">
                <Formik
                  initialValues={
                    customerpolicies && customerpolicies?.length !== 0
                      ? {
                          user_tag: customerpolicies?.results?.map((p) => {
                            return { value: p?.tag_id, label: p?.tag_name };
                          })
                        }
                      : {
                          user_tag: null
                        }
                  }
                  onSubmit={(values, { resetForm }) => {
                    onSubmitHandler(values, resetForm);
                  }}
                  validationSchema={updateCustomerModelValid}
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
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Label>Tag Name</Label>
                            <SearchSelect
                              form={values.user_tag}
                              onBlur={setFieldTouched}
                              onError={setFieldError}
                              setform={setFieldValue}
                              userId={userId}
                              isMulti={true}
                              placeholder="-- Search Tag --"
                              name="user_tag"
                              component="userTag"
                              url="policy-tags"
                              searchUrl="policy-tags-exclude"
                            />
                            {/* {!!errors.user_tag && touched.user_tag && (
                              <FormFeedback className="d-block">
                                {errors.user_tag}
                              </FormFeedback>
                            )} */}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-3 ">
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
              </div>
            </Card>
          </div>
        </Modal>
      </div>
    </>
  );
}
