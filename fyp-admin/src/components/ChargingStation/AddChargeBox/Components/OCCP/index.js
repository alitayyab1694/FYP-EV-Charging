import Input from "custom-components/Input";
import React from "react";
import Select from "react-select";
import { useFormikContext } from "formik";
import { Col, FormFeedback, FormGroup, Label, Row } from "reactstrap";
const OCCP = ({ newChargebox }) => {
  const {
    touched,
    errors,
    values,
    handleBlur,
    handleChange,
    setFieldError,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext();
  return (
    <>
      <Row>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Chargebox ID"
            value={values?.ocpp?.chargeboxId}
            disabled={!newChargebox}
            placeholder="Chargebox ID"
            type="text"
            onChange={handleChange}
            name="ocpp.chargeboxId"
            id="chargeboxId"
            invalid={
              errors?.ocpp?.chargeboxId && touched?.ocpp?.chargeboxId && true
            }
            className={
              errors?.ocpp?.chargeboxId && touched?.ocpp?.chargeboxId && "error"
            }
            error={errors?.ocpp?.chargeboxId}
            touch={touched?.ocpp?.chargeboxId}
          />
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label>Registration Status</Label>
            <Select
              placeholder="-- Select Registration Status --"
              value={values?.ocpp?.registrationStatus}
              name="ocpp.registrationStatus"
              onBlur={(value) => {
                setFieldTouched("ocpp.registrationStatus", true);
                setFieldError("ocpp.registrationStatus", value.error);
              }}
              // onChange={(e) => onChangeHandler(e, 'select')}
              // onChange={handleChange}
              onChange={(e) => setFieldValue("ocpp.registrationStatus", e)}
              options={[
                { value: "Active", label: "Active" },
                { value: "Deactive", label: "Deactive" },
              ]}
              theme={(theme) => ({
                ...theme,
                borderRadius: "0.29rem",
                borderWidth: 1,

                colors: {
                  ...theme.colors,
                  primary25: "rgba(60,68,177,0.15)",
                  primary50: "rgba(60,68,177,0.15)",
                  primary: "#3c44b1",
                },
              })}
            />
          </FormGroup>
          {!!errors?.ocpp?.registrationStatus &&
            touched?.ocpp?.registrationStatus && (
              <FormFeedback className="d-block">
                {errors?.ocpp?.registrationStatus}
              </FormFeedback>
            )}
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="End Point Address"
            placeholder="End Point Address"
            type="text"
            onChange={handleChange}
            value={values?.ocpp?.endpointAddress}
            name="ocpp.endpointAddress"
            id=".ocpp?.endpointAddress"
            invalid={
              errors?.ocpp?.endpointAddress &&
              touched?.ocpp?.endpointAddress &&
              true
            }
            className={
              errors?.ocpp?.endpointAddress &&
              touched?.ocpp?.endpointAddress &&
              "error"
            }
            error={errors?.ocpp?.endpointAddress}
            touch={touched?.ocpp?.endpointAddress}
          />
        </Col>
        {/* <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Ocpp Version"
            placeholder="Ocpp Version"
            type="text"
            onChange={handleChange}
            value={values.ocppversion}
            name="ocppversion"
            id="ocppversion"
            invalid={errors?.ocppversion && touched?.ocppversion && true}
            className={errors?.ocppversion && touched?.ocppversion && 'error'}
            error={errors?.ocppversion}
            touch={touched?.ocppversion}
          />
        </Col>

        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Charge Point Vendor"
            placeholder="Charge Point Vendor"
            type="text"
            onChange={handleChange}
            name="chargepointvendor"
            value={values?.chargepointvendor}
            id="chargepointvendor"
            invalid={
              errors?.chargepointvendor && touched?.chargepointvendor && true
            }
            className={
              errors?.chargepointvendor && touched.chargepointvendor && 'error'
            }
            error={errors?.chargepointvendor}
            touch={touched?.chargepointvendor}
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Charge Point Model"
            placeholder="Charge Point Model"
            type="text"
            onChange={handleChange}
            name="chargepointmodel"
            value={values.chargepointmodel}
            id="chargepointmodel"
            invalid={
              errors?.chargepointmodel && touched?.chargepointmodel && true
            }
            className={
              errors?.chargepointmodel && touched?.chargepointmodel && 'error'
            }
            error={errors?.chargepointmodel}
            touch={touched?.chargepointmodel}
          />
        </Col>

        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Charge Point Serial Number"
            placeholder="Charge Point Serial Number"
            type="text"
            onChange={handleChange}
            name="chargepointserialnumber"
            value={values.chargepointserialnumber}
            id="chargepointserialnumber"
            invalid={
              errors?.chargepointserialnumber &&
              touched?.chargepointserialnumber &&
              true
            }
            className={
              errors?.chargepointserialnumber &&
              touched?.chargepointserialnumber &&
              'error'
            }
            error={errors?.chargepointserialnumber}
            touch={touched?.chargepointserialnumber}
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Charge Box Serial Number"
            placeholder="Charge Box Serial Number"
            type="text"
            onChange={handleChange}
            name="chargeboxserialnumber"
            value={values.chargeboxserialnumber}
            id="chargeboxserialnumber"
            invalid={
              errors?.chargeboxserialnumber &&
              touched?.chargeboxserialnumber &&
              true
            }
            className={
              errors?.chargeboxserialnumber &&
              touched?.chargeboxserialnumber &&
              'error'
            }
            error={errors?.chargeboxserialnumber}
            touch={touched?.chargeboxserialnumber}
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Fw Version"
            placeholder="Fw Version"
            type="text"
            onChange={handleChange}
            name="fwversion"
            value={values.fwversion}
            id="fwversion"
            invalid={errors?.fwversion && touched?.fwversion && true}
            className={errors?.fwversion && touched?.fwversion && 'error'}
            error={errors?.fwversion}
            touch={touched?.fwversion}
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Fw Update Status"
            placeholder="Fw Update Status"
            type="text"
            onChange={handleChange}
            name="fwupdatestatus"
            value={values.fwupdatestatus}
            id="fwupdatestatus"
            invalid={errors?.fwupdatestatus && touched?.fwupdatestatus && true}
            className={
              errors?.fwupdatestatus && touched?.fwupdatestatus && 'error'
            }
            error={errors?.fwupdatestatus}
            touch={touched?.fwupdatestatus}
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Icc ID"
            placeholder="Icc ID"
            type="text"
            onChange={handleChange}
            name="iccid"
            value={values.iccid}
            invalid={errors?.values && touched?.iccid && true}
            className={errors?.iccid && touched?.iccid && 'error'}
            error={errors?.iccid}
            touch={touched?.iccid}
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Imsi"
            placeholder="Imsi"
            type="text"
            onChange={handleChange}
            name="imsi"
            value={values.imsi}
            invalid={errors?.imsi && touched?.imsi && true}
            className={errors?.imsi && touched?.imsi && 'error'}
            error={errors?.imsi}
            touch={touched?.imsi}
            id="imsi"
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Meter Type"
            placeholder="Meter Type"
            type="text"
            onChange={handleChange}
            name="metertype"
            value={values.metertype}
            id="metertype"
            invalid={errors?.metertype && touched?.metertype && true}
            className={errors?.metertype && touched?.metertype && 'error'}
            error={errors?.metertype}
            touch={touched?.metertype}
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Meter Serial Number"
            placeholder="Meter Serial Number"
            type="text"
            onChange={handleChange}
            name="meterserialnumber"
            value={values.meterserialnumber}
            id="meterserialnumber"
            invalid={
              errors?.meterserialnumber && touched?.meterserialnumber && true
            }
            className={
              errors?.meterserialnumber && touched?.meterserialnumber && 'error'
            }
            error={errors?.meterserialnumber}
            touch={touched?.meterserialnumber}
          />
        </Col>

        <Col md="6">
          <FormGroup>
            <Label>Connector Type</Label>
            <SearchSelect
              onBlur={setFieldTouched}
              error={errors.connectorId_fk}
              touch={touched.connectorId_fk}
              onError={setFieldError}
              form={values.connectorId_fk}
              url="connectors"
              searchUrl="search-connector"
              toggle5={toggle5}
              isMulti={true}
              setform={setFieldValue}
              placeholder="-- Search Connector --"
              name="connectorId_fk"
              component="connector"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label>Capacity</Label>
            <Creatable
              onBlur={(value) => {
                setFieldTouched('capacity', true);
                setFieldError('capacity', value.error);
              }}
              placeholder="-- Select Capacity --"
              name="capacity"
              value={values.capacity}
              onChange={(e) => setFieldValue('capacity', e)}
              options={[
                { value: '18-Kw', label: '18-Kw' },
                { value: '20-Kw', label: '20-Kw' },
                { value: '22-Kw', label: '22-Kw' },
                { value: '40-Kw', label: '40-Kw' },
                { value: '100-Kw', label: '100-Kw' },
                { value: '250-Kw', label: '250-Kw' },
                { value: '500-Kw', label: '500-Kw' }
              ]}
              theme={(theme) => ({
                ...theme,
                borderRadius: '0.29rem',
                borderWidth: 1,

                colors: {
                  ...theme.colors,
                  primary25: 'rgba(60,68,177,0.15)',
                  primary50: 'rgba(60,68,177,0.15)',
                  primary: '#3c44b1'
                }
              })}
            />
          </FormGroup>
          {!!errors?.capacity && touched?.capacity && (
            <FormFeedback className="d-block">{errors?.capacity}</FormFeedback>
          )}
        </Col>
        <Col md="6">
          <FormGroup>
            <Label>Pricing Policy</Label>
            <SearchSelect
              error={errors.pricingpolicy}
              touch={touched.pricingpolicy}
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
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Facilities"
            placeholder="Facilities(Add comma to seperate)"
            type="text"
            onChange={handleChange}
            name="facilities"
            value={values.facilities}
            id="facilities"
            invalid={errors?.facilities && touched?.facilities && true}
            className={errors?.facilities && touched?.facilities && 'error'}
            error={errors?.facilities}
            touch={touched?.facilities}
          />
        </Col> */}
      </Row>
    </>
  );
};

export default OCCP;
