import React from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { Button, Spinner } from 'reactstrap';

const OTP = ({
  number,
  handleModal,
  onSubmitHandler,
  otp,
  setOtp,
  loading
}) => {
  const dispatch = useDispatch();

  const handleChange = (otp) => {
    setOtp(otp);
  };

  return (
    <>
      <h3 className="font-weight-bold mb-4 mt-4 text-center">
        Register With Phone
      </h3>
      <h5 className="">Enter OTP</h5>
      <div className="my-3">
        <OtpInput
          value={otp}
          shouldAutoFocus={true}
          isInputNum
          inputStyle={{ width: '100%', height: 50 }}
          onChange={handleChange}
          numInputs={6}
          containerStyle={{ width: '100%', height: 50 }}
          separator={<span>-</span>}
        />
        <Button
          disabled={loading}
          onClick={(e) => onSubmitHandler(e, 'withPhone')}
          className="w-100 my-3"
          size="lg"
          color="primary">
          {loading ? <Spinner /> : 'Submit'}
        </Button>
      </div>
    </>
  );
};

export default OTP;
