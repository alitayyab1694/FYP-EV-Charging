import React from 'react';
import Select from 'react-select';
import { FormFeedback } from 'reactstrap';

const LivePreviewExample = ({
  form,
  setform,
  name,
  options,
  placeholder,
  onBlur,
  onError,
  error,
  touch
}) => {
  const onChangeHandler = (e) => {
    // setform({
    //   ...form,
    //   [name]: e
    // });
    setform(name, e);
  };
  return (
    <>
      <Select
        name={name}
        onBlur={(value) => {
          onBlur(name, true);
          onError(name, value.error);
        }}
        placeholder={placeholder}
        value={form}
        onChange={onChangeHandler}
        options={options}
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
      {!!error && touch && (
        <FormFeedback className="d-block">{error}</FormFeedback>
      )}
    </>
  );
};
export default LivePreviewExample;
