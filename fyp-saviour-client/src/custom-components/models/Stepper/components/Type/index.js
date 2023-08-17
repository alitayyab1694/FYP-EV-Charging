import React from 'react';
import Select from 'react-select';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
const Type = ({
  form,
  onChangeHandler,
  rateError,
  show,
  errorMinutes,
  showMon
}) => {
  const { type, profile, hour, min } = form;
  return (
    <>
      <div className="wizard-steps horizontal">
        <div className="p-4">
          <h5 className="font-size-xl font-weight-bold">Select Charger Type</h5>
          <p className="text-black-50 mb-4">
            Please select what type of charges do you want.
          </p>
          <Row>
            {!show && (
              <Col md="12">
                <FormGroup>
                  <Label>Charger Type</Label>
                  <Select
                    placeholder="-- Select Type --"
                    value={type}
                    onChange={(e) => onChangeHandler(e, 'type')}
                    options={[
                      { value: 'fast', label: 'Fast' },
                      { value: 'slow', label: 'Slow' }
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
              </Col>
            )}
            <Col md="12">
              <FormGroup>
                <Label>Rate Type</Label>
                <Select
                  placeholder="-- Select Type --"
                  value={profile}
                  onChange={(e) => onChangeHandler(e, 'pfType')}
                  options={[
                    { value: 'profilePKW', label: 'Rate Per KiloWatt' },
                    { value: 'profilePM', label: 'Rate Per Minute' }
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
            </Col>
            {profile?.value === 'profilePM' && showMon && (
              <Col md="12">
                <FormGroup>
                  <Label>Enter Minute</Label>
                  <Input
                    type="number"
                    name="min"
                    min={10}
                    value={min}
                    placeholder="Enter Minutes"
                    onChange={onChangeHandler}
                  />
                  {errorMinutes && <div style={{ color: 'red' }}>Invalid</div>}
                </FormGroup>
              </Col>
            )}
            {profile?.value === 'profilePKW' && (
              <Col md="12">
                <FormGroup>
                  <Label>Enter KW</Label>
                  <Input
                    type="number"
                    name="hour"
                    min={10}
                    value={hour}
                    placeholder="Enter KW"
                    onChange={onChangeHandler}
                  />
                  {rateError && <div style={{ color: 'red' }}>Invalid</div>}
                </FormGroup>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Type;
