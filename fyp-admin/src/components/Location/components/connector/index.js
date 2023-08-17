import Input from 'custom-components/Input';
import OptionSelect from 'custom-components/OptionSelect';
import { ConnectorFormat, connectorType, parkingType } from 'enums';
import { useFormik } from 'formik';
import moment from 'moment';
import React from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import { returnArrayInSelectFormat } from 'utils';
import { v4 as uuidv4 } from 'uuid';

const Connector = () => {
  const {
    values,
    errors,
    touched,
    setValues,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    resetForm,
    handleBlur,
    handleChange,
    setFieldError,
    setFieldTouched
  } = useFormik({
    initialValues: {
      id: uuidv4(),
      evse_id: '',
      standard: {
        value: 'Select Connector Type',
        label: 'Select Connector Type'
      },
      format: {
        value: 'Select Connector Format',
        label: 'Select Connector Format'
      },
      power_type: {
        value: 'Select Power Type',
        label: 'Select Power Type'
      },
      max_voltage: 0,
      max_amperage: 0,
      max_electric_power: 0,
      tariff_ids: [],
      terms_and_conditions: '',
      last_updated: moment().toISOString()
    },
    onSubmit: (values) => {}
  });
  return (
    <>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Standard</Label>
            <OptionSelect
              onBlur={setFieldTouched}
              onError={setFieldError}
              form={values.standard}
              setform={setFieldValue}
              options={returnArrayInSelectFormat(connectorType)}
              placeholder="-- Select Connector Type --"
              name="standard"
            />
            {!!errors.standard && touched.standard && (
              <FormFeedback className="d-block">{errors.standard}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Standard</Label>
            <OptionSelect
              onBlur={setFieldTouched}
              onError={setFieldError}
              form={values.format}
              setform={setFieldValue}
              options={returnArrayInSelectFormat(ConnectorFormat)}
              placeholder="-- Select Connector Format --"
              name="format"
            />
            {!!errors.format && touched.format && (
              <FormFeedback className="d-block">{errors.format}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Parking Type</Label>
            <OptionSelect
              onBlur={setFieldTouched}
              onError={setFieldError}
              form={values.parking_type}
              setform={setFieldValue}
              options={returnArrayInSelectFormat(parkingType)}
              placeholder="-- Select Parking Type --"
              name="parking_type"
            />
            {!!errors.parking_type && touched.parking_type && (
              <FormFeedback className="d-block">
                {errors.parking_type}
              </FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <Input
            onBlur={handleBlur}
            id="max_voltage"
            label="Max Voltage"
            placeholder="Max Voltage"
            type="number"
            onChange={handleChange}
            name="max_voltage"
            value={values.max_voltage}
            invalid={errors.max_voltage && touched.max_voltage && true}
            className={errors.max_voltage && touched.max_voltage && 'error'}
            error={errors.max_voltage}
            touch={touched.max_voltage}
          />
        </Col>
        <Col md={6}>
          <Input
            onBlur={handleBlur}
            id="max_amperage"
            label="Max Amperage"
            placeholder="Max Amperage"
            type="number"
            onChange={handleChange}
            name="max_amperage"
            value={values.max_amperage}
            invalid={errors.max_amperage && touched.max_amperage && true}
            className={errors.max_amperage && touched.max_amperage && 'error'}
            error={errors.max_amperage}
            touch={touched.max_amperage}
          />
        </Col>
        <Col md={6}>
          <Input
            onBlur={handleBlur}
            id="max_electric_power"
            label="Max Electric Power"
            placeholder="Max Electric Power"
            type="number"
            onChange={handleChange}
            name="max_electric_power"
            value={values.max_electric_power}
            invalid={
              errors.max_electric_power && touched.max_electric_power && true
            }
            className={
              errors.max_electric_power && touched.max_electric_power && 'error'
            }
            error={errors.max_electric_power}
            touch={touched.max_electric_power}
          />
        </Col>
        <Col md={12}>
          <Input
            onBlur={handleBlur}
            id="terms_and_conditions"
            label="Terms And Conditions"
            placeholder="Terms And Conditions"
            type="textarea"
            onChange={handleChange}
            name="max_electric_power"
            value={values.terms_and_conditions}
            invalid={
              errors.terms_and_conditions &&
              touched.terms_and_conditions &&
              true
            }
            className={
              errors.terms_and_conditions &&
              touched.terms_and_conditions &&
              'error'
            }
            error={errors.terms_and_conditions}
            touch={touched.terms_and_conditions}
          />
        </Col>
        <Col className="text-right" md={12}>
          <LaddaButton
            loading={isSubmitting}
            data-size={XL}
            onClick={handleSubmit}
            type="submit"
            className="mb-5 btn btn-primary font-weight-bold w-20 my-2">
            Submit
          </LaddaButton>
        </Col>
      </Row>
    </>
  );
};
export default Connector;
