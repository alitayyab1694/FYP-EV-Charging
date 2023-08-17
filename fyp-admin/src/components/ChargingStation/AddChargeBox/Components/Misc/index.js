/** @format */

import Input from "custom-components/Input";
import React from "react";
import Select from "react-select";

import { useFormikContext } from "formik";
import { Col, CustomInput, FormFeedback, FormGroup, Label, Row } from "reactstrap";

const Misc = () => {
  const {
    setFieldValue,
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
  } = useFormikContext();
  return (
    <div>
      <Row>
        <Col md='6'>
          <FormGroup>
            <Label>Charging Type</Label>
         <Select
              id='misc.chargingType'
              placeholder='Charging type'
              value={values?.misc?.chargingType}
              name='misc.chargingType'
              onChange={(e) => setFieldValue("misc.chargingType", e)}
              options={[{
              value: "fast",
              label: "Fast Charging"
              
            },
            {
              value: "normal",
              label: "Normal Charging"
              }]
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
            </FormGroup>
        </Col>
        <Col md='6'>
          <Input
            onBlur={handleBlur}
            id='misc.desc'
            label='Description'
            placeholder='Description'
            type='text'
            onChange={handleChange}
            name='misc.desc'
            value={values?.misc?.desc}
            invalid={errors?.misc?.desc && touched?.misc?.desc && true}
            className={errors?.misc?.desc && touched?.misc?.desc && "error"}
            error={errors?.misc?.desc}
            touch={touched?.misc?.desc}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Misc;
