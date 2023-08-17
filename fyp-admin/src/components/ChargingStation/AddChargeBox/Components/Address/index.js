/** @format */

import { City, Country, State } from "country-state-city";
import Input from "custom-components/Input";
import React from "react";
import { useFormikContext } from "formik";
import Select from "react-select";
import { Col, FormFeedback, FormGroup, Label, Row } from "reactstrap";
const Address = () => {
  const {
    setFieldError,
    setFieldTouched,
    touched,
    errors,
    setFieldValue,
    values,
    handleChange,
    handleBlur,
  } = useFormikContext();
  console.log("touched", touched);
  console.log("errors", errors);
  return (
    <>
      <Row>
        <Col md='6'>
          <Input
            onBlur={handleBlur}
            label='Street'
            placeholder='Street'
            type='text'
            onChange={handleChange}
            name='address.street'
            value={values?.address?.street}
            id='address.street'
            invalid={
              errors?.address?.street && touched?.address?.street && true
            }
            className={
              errors?.address?.street && touched?.address?.street && "error"
            }
            error={errors?.address?.street}
            touch={touched?.address?.street}
          />
        </Col>

        <Col md='6'>
          <Input
            onBlur={handleBlur}
            label='Zip Code'
            placeholder='Zip Code'
            type='text'
            onChange={handleChange}
            name='address.zipcode'
            value={values?.address?.zipcode}
            id='address.zipcode'
            invalid={
              errors?.address?.zipcode && touched?.address?.zipcode && true
            }
            className={
              errors?.address?.zipcode && touched?.address?.zipcode && "error"
            }
            error={errors?.address?.zipcode}
            touch={touched?.address?.zipcode}
          />
        </Col>

        <Col md='6'>
          <FormGroup>
            <Label>Country</Label>
            <Select
              id='address.country'
              placeholder='-- Select Country --'
              value={values?.address?.country || ""}
              name='address.country'
              onBlur={(value) => {
                setFieldTouched("address.country", true);
                setFieldError("address.country", value.error);
              }}
              onChange={(e) => setFieldValue("address.country", e)}
              options={Country.getAllCountries().map((c) => {
                return {
                  value: c.isoCode,
                  label: c.name,
                };
              })}
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
          {!!errors?.address?.country && touched?.address?.country && (
            <FormFeedback className='d-block'>
              {errors?.address?.country}
            </FormFeedback>
          )}
        </Col>
        <Col md='6'>
          <FormGroup>
            <Label>State</Label>
            <Select
              id='address.state'
              placeholder='-- Select State --'
              value={values?.address?.state}
              name='address.state'
              onBlur={(value) => {
                setFieldTouched("address.state", true);
                setFieldError("address.state", value.error);
              }}
              onChange={(e) => {
                console.log("e", e);
                setFieldValue("address.state", e);
              }}
              isDisabled={values?.address?.country?.value === null && true}
              options={
                values?.address?.country?.value === null
                  ? []
                  : State.getStatesOfCountry(
                      values?.address?.country?.value
                    ).map((s) => {
                      return {
                        value: s.isoCode,
                        label: s.name,
                      };
                    })
              }
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

            {!!errors?.address?.state?.value && touched?.address?.state && (
              <FormFeedback className='d-block'>
                {errors?.address?.state?.value}
              </FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md='6'>
          <FormGroup>
            <Label>City</Label>
            <Select
              id='address.city'
              placeholder='-- Select State --'
              value={values?.address?.city}
              name='address.city'
              onBlur={(value) => {
                setFieldTouched("address.city", true);
                setFieldError("address.city", value.error);
              }}
              onChange={(e) => setFieldValue("address.city", e)}
              isDisabled={values?.address?.state?.value === null && true}
              options={
                values?.address?.state?.value === null
                  ? []
                  : City.getCitiesOfState(
                      values?.address?.country?.value,
                      values?.address?.state?.value
                    ).map((s) => ({
                      value: s.name,
                      label: s.name,
                    }))
              }
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

            {!!errors?.address?.city?.value && touched?.address?.city && (
              <FormFeedback className='d-block'>
                {errors?.address?.city?.value}
              </FormFeedback>
            )}
          </FormGroup>
          {/* <Input
            onBlur={handleBlur}
            label="City"
            placeholder="City"
            type="text"
            onChange={handleChange}
            name="address.city"
            value={values?.address?.city}
            id="address.city"
            invalid={errors?.address?.city && touched?.address?.city && true}
            className={
              errors?.address?.city && touched?.address?.city && "error"
            }
            error={errors?.address?.city}
            touch={touched?.address?.city}
          /> */}
        </Col>
        <Col md='6'>
          <Input
            onBlur={handleBlur}
            label='Latitude'
            placeholder='Latitude'
            type='number'
            onChange={handleChange}
            name='misc.latitude'
            value={values?.misc?.latitude}
            id='misc.latitude'
            invalid={errors?.misc?.latitude && touched?.misc?.latitude && true}
            className={
              errors?.misc?.latitude && touched?.misc?.latitude && "error"
            }
            error={errors?.misc?.latitude}
            touch={touched?.misc?.latitude}
          />
        </Col>
        <Col md='6'>
          <Input
            onBlur={handleBlur}
            label='Longitude'
            placeholder='Longitude'
            type='number'
            onChange={handleChange}
            name='misc.longitude'
            value={values?.misc?.longitude}
            id='misc.longitude'
            invalid={
              errors?.misc?.longitude && touched?.misc?.longitude && true
            }
            className={
              errors?.misc?.longitude && touched?.misc?.longitude && "error"
            }
            error={errors?.misc?.longitude}
            touch={touched?.misc?.longitude}
          />
        </Col>
      </Row>
    </>
  );
};

export default Address;
