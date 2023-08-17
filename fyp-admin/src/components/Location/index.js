import { City, Country, State } from 'country-state-city';
import Input from 'custom-components/Input';
import OptionSelect from 'custom-components/OptionSelect';
import { parkingType } from 'enums';
import { useFormik } from 'formik';
import React from 'react';
import Select from 'react-select';
import { Col, FormFeedback, FormGroup, Label, Row } from 'reactstrap';
import { returnArrayInSelectFormat } from 'utils';

const Location = () => {
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
    initialValues: {
      country_code: '',
      publish: false,
      publish_allowed_to: false,
      name: '',
      address: '',
      city: '',
      postal_code: '',
      state: { value: 'Select State', label: 'Select State' },
      country: { value: 'Select Country', label: 'Select Country' },
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      related_locations: {
        latitude: 0,
        longitude: 0
      },
      parking_type: { value: 'Select ParkingType', label: 'Select ParkingType' }
    },
    onSubmit: (values) => {
      ;
      // onSubmitHandler(values, resetForm);
    }
  });
  return (
    <>
      <Row>
        <Col md="6">
          <Input
            label="Location Name"
            placeholder="Location Name..."
            onBlur={handleBlur}
            type="text"
            onChange={handleChange}
            name="name"
            id="name"
            value={values.name}
            invalid={errors.name && touched.name && 'error'}
            className={errors.name && touched.name && 'error'}
            error={errors.name}
            touch={touched.name}
          />
        </Col>
        <Col md="6">
          <Input
            label="Address"
            placeholder="Street/block name and house number if available."
            onBlur={handleBlur}
            type="text"
            onChange={handleChange}
            name="address"
            id="address"
            value={values.address}
            invalid={errors.address && touched.address && 'error'}
            className={errors.address && touched.address && 'error'}
            error={errors.address}
            touch={touched.address}
          />
        </Col>
        <Col md="6">
          <Input
            label="Postal Code"
            placeholder="Enter Postal Code"
            onBlur={handleBlur}
            type="text"
            onChange={handleChange}
            name="postal_code"
            id="postal_code"
            value={values.postal_code}
            invalid={errors.postal_code && touched.postal_code && 'error'}
            className={errors.postal_code && touched.postal_code && 'error'}
            error={errors.postal_code}
            touch={touched.postal_code}
          />
        </Col>
        <Col md="6">
          <Input
            label="Postal Code"
            placeholder="Enter Postal Code"
            onBlur={handleBlur}
            type="text"
            onChange={handleChange}
            name="postal_code"
            id="postal_code"
            value={values.postal_code}
            invalid={errors.postal_code && touched.postal_code && 'error'}
            className={errors.postal_code && touched.postal_code && 'error'}
            error={errors.postal_code}
            touch={touched.postal_code}
          />
        </Col>
        <Col md="6">
          <FormGroup>
            <Label>Country</Label>
            <Select
              id="country"
              placeholder="-- Select Country --"
              value={values.country}
              name="country"
              onBlur={(value) => {
                setFieldTouched('country', true);
                setFieldError('country', value.error);
              }}
              onChange={(e) => {
                setFieldValue('country', e);
              }}
              options={Country.getAllCountries().map((c) => {
                return {
                  value: c.isoCode,
                  label: c.name
                };
              })}
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
          {!!errors?.country && touched?.country && (
            <FormFeedback className="d-block">{errors?.country}</FormFeedback>
          )}
        </Col>
        <Col md="6">
          <FormGroup>
            <Label>State</Label>
            <Select
              onBlur={(value) => {
                setFieldTouched('state', true);
                setFieldError('state', value.error);
              }}
              onChange={(e) => {
                setFieldValue('state', e);
              }}
              isDisabled={values.country === null && true}
              placeholder="-- Select State --"
              value={values.state}
              options={
                values.country === null
                  ? []
                  : State.getStatesOfCountry(values.country.value).map((s) => {
                      return {
                        value: s.isoCode,
                        label: s.name
                      };
                    })
              }
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

            {!!errors?.state && touched?.state && (
              <FormFeedback className="d-block">{errors?.state}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label>City</Label>
            <Select
              id="city"
              onBlur={(value) => {
                setFieldTouched('city', true);
                setFieldError('city', value.error);
              }}
              onChange={(e) => {
                setFieldValue('city', e);
              }}
              isDisabled={
                (values.country === null || values.state === null) && true
              }
              name="city"
              placeholder="-- Select City --"
              value={values.city}
              options={
                values.country === null || values.state === null
                  ? []
                  : City.getCitiesOfState(
                      values.country.value,
                      values.state.value
                    ).map((c) => {
                      return { value: c.name, label: c.name };
                    })
              }
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
            {!!errors?.city && touched?.city && (
              <FormFeedback className="d-block">{errors?.city}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <div className="section_header mb-3">
        <div className="font-weight-bold text-black font-size-xxl">
          Coordinates
        </div>
      </div>
      <Row>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Latitude"
            placeholder="Latitude"
            type="number"
            onChange={handleChange}
            name="latitude"
            value={values?.coordinates?.latitude}
            id="latitude"
            invalid={
              errors?.coordinates?.latitude &&
              errors?.coordinates?.latitude &&
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
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Longitude"
            placeholder="Longitude"
            type="text"
            onChange={handleChange}
            name="longitude"
            value={values?.coordinates?.longitude}
            id="longitude"
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
      </Row>
      <div className="section_header mb-3">
        <div className="font-weight-bold text-black font-size-xxl">
          Related Location
        </div>
      </div>
      <Row>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Latitude"
            placeholder="Latitude"
            type="number"
            onChange={handleChange}
            name="latitude"
            value={values?.related_locations?.latitude}
            id="latitude"
            invalid={
              errors?.related_locations?.latitude &&
              errors?.related_locations?.latitude &&
              true
            }
            className={
              errors?.related_locations?.latitude &&
              touched?.related_locations?.latitude &&
              'error'
            }
            error={errors?.related_locations?.latitude}
            touch={touched?.related_locations?.latitude}
          />
        </Col>
        <Col md="6">
          <Input
            onBlur={handleBlur}
            label="Longitude"
            placeholder="Longitude"
            type="text"
            onChange={handleChange}
            name="longitude"
            value={values?.related_locations?.longitude}
            id="longitude"
            invalid={
              errors?.related_locations?.longitude &&
              touched?.related_locations?.longitude &&
              true
            }
            className={
              errors?.related_locations?.longitude &&
              touched?.related_locations?.longitude &&
              'error'
            }
            error={errors?.related_locations?.longitude}
            touch={touched?.related_locations?.longitude}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
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
          <FormGroup>
            <Label>Directions</Label>
            <Input
              onBlur={handleBlur}
              id="aditional_note"
              label="Additional Notes"
              placeholder="Additional Notes"
              type="textarea"
              onChange={handleChange}
              name="aditional_note"
              value={values.aditional_note}
              invalid={errors.aditional_note && touched.aditional_note && true}
              className={
                errors.aditional_note && touched.aditional_note && 'error'
              }
              error={errors.aditional_note}
              touch={touched.aditional_note}
            />
          </FormGroup>
        </Col>
      </Row>
      <div className="section_header mb-3">
        <div className="font-weight-bold text-black font-size-xxl">
          Operator
        </div>
      </div>
      <Col md={6}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            onBlur={handleBlur}
            id="operator.name"
            label="Name"
            placeholder="Operator Name"
            type="text"
            onChange={handleChange}
            name="operator.name"
            value={values?.operator?.name}
            invalid={errors?.operator?.name && touched?.operator?.name && true}
            className={
              errors?.operator?.name && touched?.operator?.name && 'error'
            }
            error={errors?.operator?.name}
            touch={touched?.operator?.name}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label>Website URL</Label>
          <Input
            onBlur={handleBlur}
            id="operator.website"
            label="Website"
            placeholder="Operator Website"
            type="text"
            onChange={handleChange}
            name="operator.website"
            value={values.operator?.website}
            invalid={
              errors.operator?.website && touched.operator?.website && true
            }
            className={
              errors.operator?.website && touched.operator?.website && 'error'
            }
            error={errors.operator?.website}
            touch={touched.operator?.website}
          />
        </FormGroup>
      </Col>
      <div className="section_header mb-3">
        <div className="font-weight-bold text-black font-size-xxl">
          Sub Operator
        </div>
      </div>
      <Col md={6}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            onBlur={handleBlur}
            id="Sub Operator.name"
            label="Name"
            placeholder="suboperator Name"
            type="text"
            onChange={handleChange}
            name="suboperator.name"
            value={values.suboperator?.name}
            invalid={
              errors.suboperator?.name && touched.suboperator?.name && true
            }
            className={
              errors.suboperator?.name && touched.suboperator?.name && 'error'
            }
            error={errors.suboperator?.name}
            touch={touched.suboperator?.name}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label>Website URL</Label>
          <Input
            onBlur={handleBlur}
            id="suboperator.website"
            label="Website"
            placeholder="Operator Website"
            type="text"
            onChange={handleChange}
            name="suboperator.website"
            value={values.suboperator?.website}
            invalid={
              errors.suboperator?.website &&
              touched.suboperator?.website &&
              true
            }
            className={
              errors.suboperator?.website &&
              touched.suboperator?.website &&
              'error'
            }
            error={errors.suboperator?.website}
            touch={touched.suboperator?.website}
          />
        </FormGroup>
      </Col>
      <div className="section_header mb-3">
        <div className="font-weight-bold text-black font-size-xxl">Owner</div>
      </div>
      <Col md={6}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            onBlur={handleBlur}
            id="owner.name"
            label="Name"
            placeholder="Owner Name"
            type="text"
            onChange={handleChange}
            name="owner.name"
            value={values.owner?.name}
            invalid={errors.owner?.name && touched.owner?.name && true}
            className={errors.owner?.name && touched.owner?.name && 'error'}
            error={errors.owner?.name}
            touch={touched.owner?.name}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label>Website URL</Label>
          <Input
            onBlur={handleBlur}
            id="owner.website"
            label="Website"
            placeholder="Owner Website"
            type="text"
            onChange={handleChange}
            name="owner.website"
            value={values.owner?.website}
            invalid={errors.owner?.website && touched.owner?.website && true}
            className={
              errors.owner?.website && touched.owner?.website && 'error'
            }
            error={errors.owner?.website}
            touch={touched.owner?.website}
          />
        </FormGroup>
      </Col>
      <div className="section_header mb-3">
        <div className="font-weight-bold text-black font-size-xxl">
          More Info
        </div>
      </div>
      {/* <Row>
        <Col md="6">
          <FormGroup>
            <Label>Website URL</Label>
            <Input
              onBlur={handleBlur}
              id="owner.website"
              label="Website"
              placeholder="Owner Website"
              type="text"
              onChange={handleChange}
              name="owner.website"
              value={values.owner.website}
              invalid={errors.owner.website && touched.owner.website && true}
              className={
                errors.owner.website && touched.owner.website && 'error'
              }
              error={errors.owner.website}
              touch={touched.owner.website}
            />
          </FormGroup>
        </Col>
      </Row> */}
    </>
  );
};

export default Location;
