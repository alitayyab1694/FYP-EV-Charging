import Input from 'custom-components/Input';
import OptionSelect from 'custom-components/OptionSelect';
import { capability, Status, StatusSchedule } from 'enums';
import { useFormik } from 'formik';
import React from 'react';
import { Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import styled from 'styled-components';
import { returnArrayInSelectFormat } from 'utils';
import { v4 as uuidv4 } from 'uuid';
const Evses = () => {
  const {
    values,
    errors,
    touched,
    setValues,
    handleSubmit,
    setFieldValue,
    resetForm,
    handleBlur,
    handleChange,
    setFieldError,
    setFieldTouched
  } = useFormik({
    id: uuidv4(),
    evse_id: '',
    initialValues: {
      status: {
        value: 'Select  Status',
        label: 'Select  Status'
      },
      status_schedule: {
        value: 'Select Schedule Status',
        label: 'Select  Schedule Status'
      },
      capabilities: {
        value: 'Select Capacity',
        label: 'Select Capacity'
      },
      connectors: {
        value: 'Select Connector',
        label: 'Select Connector'
      },
      floor_level: '',
      coordinates: {
        latitude: '',
        longitude: ''
      },
      physical_reference: '',
      directions: {
        language: 'en',
        text: ''
      },
      parking_restrictions: {
        value: 'Select ParkingRestrictions',
        label: 'Select ParkingRestrictions'
      },
      images: ''
    },
    onSubmit: (values) => {}
  });
  return (
    <Row>
      <Col md={6}>
        <FormGroup>
          <Label>Status</Label>
          <OptionSelect
            onBlur={setFieldTouched}
            onError={setFieldError}
            form={values.status}
            setform={setFieldValue}
            options={returnArrayInSelectFormat(Status)}
            placeholder="-- Select Status --"
            name="status"
          />
          {!!errors.status && touched.status && (
            <FormFeedback className="d-block">{errors.status}</FormFeedback>
          )}
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label>Status Schedule</Label>
          <OptionSelect
            onBlur={setFieldTouched}
            onError={setFieldError}
            form={values.status_schedule}
            setform={setFieldValue}
            options={returnArrayInSelectFormat(StatusSchedule)}
            placeholder="-- Select Status Schedule --"
            name="status_schedule"
          />
          {!!errors.status_schedule && touched.status_schedule && (
            <FormFeedback className="d-block">
              {errors.status_schedule}
            </FormFeedback>
          )}
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label>Capabilities</Label>
          <OptionSelect
            onBlur={setFieldTouched}
            onError={setFieldError}
            form={values.capabilities}
            setform={setFieldValue}
            options={returnArrayInSelectFormat(capability)}
            placeholder="-- Select Status Schedule --"
            name="capabilities"
          />
          {!!errors.capabilities && touched.capabilities && (
            <FormFeedback className="d-block">
              {errors.capabilities}
            </FormFeedback>
          )}
        </FormGroup>
      </Col>
      <Col md={6}>
        <h4>Connector</h4>
      </Col>
      <Col md={6}>
        <Input
          onBlur={handleBlur}
          id="floor_level"
          label="Floor Level"
          placeholder="Floor Level"
          type="textarea"
          onChange={handleChange}
          name="floor_level"
          value={values.floor_level}
          invalid={errors.floor_level && touched.floor_level && true}
          className={errors.floor_level && touched.floor_level && 'error'}
          error={errors.floor_level}
          touch={touched.floor_level}
        />
      </Col>
      <Col md={6}>
        <Input
          onBlur={handleBlur}
          id="coordinates.latitude"
          label="Latitude"
          placeholder="Latitude"
          type="number"
          onChange={handleChange}
          name="coordinates.latitude"
          value={values?.coordinates?.latitude}
          invalid={
            errors?.coordinates?.latitude &&
            touched?.coordinates?.latitude &&
            true
          }
          className={
            errors?.coordinates?.latitude &&
            touched?.coordinates?.latitude &&
            'error'
          }
          error={errors?.coordinates?.latitude}
          touch={touched?.coordinates?.latitude}
        />
      </Col>
      <Col md={6}>
        <Input
          onBlur={handleBlur}
          id="coordinates.longitude"
          label="Longitude"
          placeholder="Longitude"
          type="number"
          onChange={handleChange}
          name="coordinates.latitude"
          value={values?.coordinates?.longitude}
          invalid={
            errors?.coordinates?.longitude &&
            touched?.coordinates?.longitude &&
            true
          }
          className={
            errors?.coordinates?.longitude &&
            touched?.coordinates?.longitude &&
            'error'
          }
          error={errors?.coordinates?.longitude}
          touch={touched?.coordinates?.longitude}
        />
      </Col>
      <Col md={6}>
        <Input
          onBlur={handleBlur}
          id="physical_reference"
          label="Physical Reference"
          placeholder="Physical Reference"
          type="text"
          onChange={handleChange}
          name="physical_reference"
          value={values.physical_reference}
          invalid={
            errors.physical_reference && touched.physical_reference && true
          }
          className={
            errors.physical_reference && touched.physical_reference && 'error'
          }
          error={errors.physical_reference}
          touch={touched.physical_reference}
        />
      </Col>
      <Col md={6}>
        <Input
          onBlur={handleBlur}
          id="directions.language"
          label="Language"
          placeholder="Language"
          type="text"
          onChange={handleChange}
          name="directions.language"
          value={values?.directions?.language}
          invalid={
            errors?.directions?.language &&
            touched?.directions?.language &&
            true
          }
          className={
            errors?.directions?.language &&
            touched?.directions?.language &&
            'error'
          }
          error={errors?.directions?.language}
          touch={touched?.directions?.language}
        />
      </Col>
      <Col md={6}>
        <FormGroup>
          <Input
            onBlur={handleBlur}
            id="directions.text"
            label="Directions Text"
            placeholder="Directions Text"
            type="text"
            onChange={handleChange}
            name="directions.text"
            value={values?.directions?.text}
            invalid={
              errors?.directions?.text && touched?.directions?.text && true
            }
            className={
              errors?.directions?.text && touched?.directions?.text && 'error'
            }
            error={errors?.directions?.text}
            touch={touched?.directions?.text}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label>Parking Restrictions</Label>
          <OptionSelect
            onBlur={setFieldTouched}
            onError={setFieldError}
            form={values.parkingRestriction}
            setform={setFieldValue}
            options={returnArrayInSelectFormat(Status)}
            placeholder="-- Select ParkingRestriction --"
            name="parkingRestriction"
          />
          {!!errors.parkingRestriction && touched.parkingRestriction && (
            <FormFeedback className="d-block">
              {errors.parkingRestriction}
            </FormFeedback>
          )}
        </FormGroup>
      </Col>
    </Row>
  );
};
export default styled(Evses)``;
