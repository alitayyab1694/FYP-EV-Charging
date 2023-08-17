import { City, Country } from 'country-state-city';
import React from 'react';
import Select from 'react-select';
import { Col, FormGroup, Label, Row } from 'reactstrap';
const Location = ({ form, onChangeHandler }) => {
  const { country, city } = form;
  return (
    <>
      <div className="wizard-steps horizontal">
        <div className="p-4">
          <h5 className="font-size-xl font-weight-bold">
            Select You Current Location
          </h5>
          <p className="text-black-50 mb-4">
            Please provide us your location or if already filled verify it
          </p>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label>Country</Label>
                <Select
                  placeholder="-- Select Country --"
                  value={country}
                  onChange={(e) => onChangeHandler(e, 'country')}
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
            </Col>

            <Col md="12">
              <FormGroup>
                <Label>City</Label>
                <Select
                  isDisabled={country === null && true}
                  placeholder="-- Select City --"
                  value={city}
                  onChange={(e) => onChangeHandler(e, 'city')}
                  options={
                    country === null
                      ? []
                      : City?.getCitiesOfCountry(country?.value).map((c) => {
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
              </FormGroup>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Location;
