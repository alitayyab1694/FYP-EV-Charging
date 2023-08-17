// import * as Actions from 'Actions';
import * as API from 'api';
import SearchSelect from 'custom-components/SearchSelect';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import { Card, Col, FormGroup, Label, Modal, Row } from 'reactstrap';
import { getUserGroups } from 'store/reducer/appReducerSlice';
import { GroupUserHandler } from 'store/reducer/modalSlice';
import { Toaster } from 'utils';
import { updateGroupValidation } from 'validation';

export default function LivePreviewExample({ groupId }) {
  const dispatch = useDispatch();
  const { userGroupModal, userGroup } = useSelector((state) => ({
    userGroupModal: state.modelReducer.userGroupModal,
    userGroup: state.appReducer.userGroup
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [form, setform] = useState({
    user: [],
    policy: []
  });
  // useEffect(() => {
  //   // setform({
  //   //   user: [],
  //   //   policy: []
  //   // });
  //   // if (groupId !== '') {
  //   //   setform({
  //   //     user: userGroup?.results
  //   //       ?.find((g) => g?.groupid === groupId)
  //   //       ?.users_m?.map((p) => {
  //   //         return { value: p?.idtag, label: p?.idtag_fk?.[0]?.email };
  //   //       }),
  //   //     policy: userGroup?.results
  //   //       ?.find((g) => g?.groupid === groupId)
  //   //       ?.pricingpolicies?.map((p) => {
  //   //         return { value: p?.paymentpolicyid, label: p?.profilename };
  //   //       })
  //   //   });
  //   // }
  // }, [userGroupModal, groupId]);
  const onSubmitHandler = async (values) => {
    // e.preventDefault();
    setIsLoading(true);
    // const res = await dispatch(
    //   await Actions.UpdateGroupPolicyAndUser(
    //     {
    //       pricingpolicies: form.policy ? form.policy.map((p) => p.value) : [],
    //       users_m: form.user ? form.user.map((u) => u.value) : []
    //     },
    //     groupId
    //   )
    // );
    try {
      await API.patch(`/usergroup/${groupId}/`, {
        pricingpolicies: values.policy ? values.policy.map((p) => p.value) : [],
        users_m: values.user ? values.user.map((u) => u.value) : []
      });
      await dispatch(await getUserGroups({ paginate: false, query: '' }));
      setIsLoading(false);
      Toaster('success', `Group successfully Updated`);
      setform({
        policy: null
      });
      dispatch(GroupUserHandler());
    } catch (error) {
      console.log(error);
      Toaster('error', `Error in Updating Group`);
      // return { success: false };
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal
          zIndex={2000}
          centered
          isOpen={userGroupModal}
          toggle={() => dispatch(GroupUserHandler())}>
          {loading ? (
            <>
              {' '}
              <div className="d-flex align-items-center flex-column justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                  <CircleLoader color={'#2f2f2f'} loading={true} />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  Please wait while we load.....
                </div>
              </div>
            </>
          ) : (
            <div>
              <Card className="bg-secondary shadow-none border-0">
                <div className="card-header d-block bg-white pt-4 pb-5">
                  <div className="text-muted text-center">
                    <h3>Update Group</h3>
                  </div>
                </div>
                <div className="card-body px-lg-5 py-lg-5">
                  <Formik
                    initialValues={
                      groupId !== ''
                        ? {
                            user: userGroup?.results
                              ?.find((g) => g?.groupid === groupId)
                              ?.users_m?.map((p) => {
                                return {
                                  value: p?.idtag,
                                  label: p?.idtag_fk?.[0]?.email
                                };
                              }),
                            policy: userGroup?.results
                              ?.find((g) => g?.groupid === groupId)
                              ?.pricingpolicies?.map((p) => {
                                return {
                                  value: p?.paymentpolicyid,
                                  label: p?.profilename
                                };
                              })
                          }
                        : {
                            user: [],
                            policy: []
                          }
                    }
                    onSubmit={(values, { resetForm }) => {
                      onSubmitHandler(values, resetForm);
                    }}
                    validationSchema={updateGroupValidation}
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
                              <Label>Users</Label>
                              <SearchSelect
                                onBlur={setFieldTouched}
                                onError={setFieldError}
                                form={values.user}
                                setform={setFieldValue}
                                isMulti={true}
                                placeholder="-- Search User --"
                                name="user"
                                component="userEmail"
                                url="search-usersby-email"
                                searchUrl="search-usersby-email"
                              />
                              {/* {!!errors.user && touched.user && (
                                <FormFeedback className="d-block">
                                  {errors.user}
                                </FormFeedback>
                              )} */}
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <Label>Profile Name</Label>
                              <SearchSelect
                                onBlur={setFieldTouched}
                                onError={setFieldError}
                                form={values.policy}
                                setform={setFieldValue}
                                isMulti={true}
                                placeholder="-- Search Policy --"
                                name="policy"
                                component="pricingPolicy"
                                url="policies"
                                searchUrl="search-policy"
                              />
                              {/* {!!errors.policy && touched.policy && (
                                <FormFeedback className="d-block">
                                  {errors.policy}
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
          )}
        </Modal>
      </div>
    </>
  );
}
