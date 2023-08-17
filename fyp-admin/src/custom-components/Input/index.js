import React from 'react';
import {
  FormGroup,
  Input as BootstrapInput,
  Label,
  FormFeedback
} from 'reactstrap';
import styled from 'styled-components';
const Input = (props) => {
  const {
    className,
    label,
    type,
    placeholder,
    onChange,
    name,
    value,
    disabled,
    step,
    onBlur,
    invalid,
    error,
    touch
  } = props;

  return (
    <div className={className}>
      <FormGroup>
        <Label>{label}</Label>
        <BootstrapInput
          invalid={invalid}
          onBlur={onBlur}
          step={step}
          placeholder={placeholder}
          type={type}
          // onChange={(e) => onChange(e)}
          onChange={onChange}
          name={name}
          value={value}
          disabled={disabled}
          error={error}
          // touch={touch}
          // className={errors.name && touched.name && 'error'}
        />
      </FormGroup>
      {!!error && touch && (
        <FormFeedback className="d-block">{error}</FormFeedback>
      )}
    </div>
  );
};
export default styled(Input)``;
