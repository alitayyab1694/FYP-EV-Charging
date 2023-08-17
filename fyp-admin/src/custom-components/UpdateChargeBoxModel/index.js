// import * as Actions from 'Actions';
import * as API from 'api';
import SearchSelect from 'custom-components/SearchSelect';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, FormGroup, Label, Modal, Row } from 'reactstrap';
import { getChargeBoxes } from 'store/reducer/appReducerSlice';
import { chargeBoxTageHandler } from 'store/reducer/modalSlice';
import { Toaster } from 'utils';
import { updateChargeBoxModelValid } from 'validation';

export default function LivePreviewExample({ chargeBoxId, tags }) {
  const dispatch = useDispatch();
  const { chargeBoxModal } = useSelector((state) => ({
    chargeBoxModal: state.modelReducer.chargeBoxModal
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({ chargebox_tag: null });
  const [form, setform] = useState({
    chargeBoxId: null
    // chargebox_tag: tags?.map((tag) => ({
    //   label: tag.tag_name,
    //   value: tag.tag_id
    // }))
  });

  useEffect(() => {
    setInitialValue({
      // ...initialValue,
      chargebox_tag: tags?.map((tag) => ({
        label: tag?.tag_name,
        value: tag?.tag_id
      }))
    });
  }, [tags, chargeBoxModal]);

  const onSubmitHandler = async (values) => {
    // e.preventDefault();
    setIsLoading(true);
    // const res = await dispatch(
    //   await UpdateChargeBoxTag(
    //     {
    //       chargebox_tag: form.chargebox_tag
    //         ? form.chargebox_tag.map((p) => p.value)
    //         : []
    //     },
    //     chargeBoxId
    //   )
    // );
    const obj = {
      chargebox_tag: values.chargebox_tag
        ? values.chargebox_tag.map((p) => p.value)
        : []
    };
    let res;
    try {
      res = await API.patch(`/chargeboxes/${chargeBoxId}/`, obj);
      await dispatch(getChargeBoxes({ paginate: false, query: '' }));
      // return true;
      ToastHandler(true);
      dispatch(chargeBoxTageHandler());
    } catch (error) {
      console.log(error);
      ToastHandler(false);
    }
    setIsLoading(false);
    // if (res.success) {
    //   Toaster('success', `ChangeBox successfully Updated`);
    //   setform({
    //     chargebox_tag: null
    //   });
    //   dispatch(chargeBoxTageHandler());
    // } else {
    //   Toaster('error', `Error in Updating ChangeBox`);
    // }
  };

  const ToastHandler = (success) => {
    if (success) {
      Toaster('success', `ChangeBox Updated`);
      setform({
        chargebox_tag: null
      });
    } else {
      Toaster('error', `Error in Updating ChangeBox`);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal
          zIndex={2000}
          centered
          isOpen={chargeBoxModal}
          toggle={() => dispatch(chargeBoxTageHandler())}>
          <div>
            <Card className="bg-secondary shadow-none border-0">
              <div className="card-header d-block bg-white pt-4 pb-5">
                <div className="text-muted text-center">
                  <h3>Update Charge Tags</h3>
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-5">
                <Formik
                  initialValues={initialValue}
                  onSubmit={(values, { resetForm }) => {
                    onSubmitHandler(values, resetForm);
                  }}
                  validationSchema={updateChargeBoxModelValid}
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
                        <Col md="12">
                          <FormGroup>
                            <Label>Tag Name</Label>
                            <SearchSelect
                              onBlur={setFieldTouched}
                              onError={setFieldError}
                              form={values.chargebox_tag}
                              setform={setFieldValue}
                              chargeboxId={chargeBoxId}
                              isMulti={true}
                              placeholder="-- Search Tag --"
                              name="chargebox_tag"
                              component="chargeBoxTag"
                              url="policy-tags"
                              searchUrl="policy-tags-exclude"
                            />
                          </FormGroup>
                          {/* {!!errors.chargebox_tag && touched.chargebox_tag && (
                            <FormFeedback className="d-block">
                              {errors.chargebox_tag}
                            </FormFeedback>
                          )} */}
                        </Col>
                      </Row>
                      <Row className="mt-3 ">
                        <Col className="text-right" md={12}>
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
