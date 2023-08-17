import firebase from '@firebase/app';
import '@firebase/auth';
import * as Actions from 'Actions';
import * as UserActions from 'Actions';
import * as API from 'api';
import moment from 'moment';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import LaddaButton, { XL } from 'react-ladda';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
// import * as firebase from 'firebase';
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from 'reactstrap';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import OTP from './OTP';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Login = ({ setIsLoading, isLoading, handleModal }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [form, setform] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null
  });
  const { email, password, firstName, lastName } = form;
  const [otp, setOtp] = useState(null);
  const [registerType, setRegisterType] = useState(null);
  const [final, setFinal] = useState('');
  const [userPhone, setUserPhone] = useState(null);
  const [show, setShow] = useState(false);
  const onChangeHandler = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleShow = () => {
    setShow(!show);
  };
  const onSubmitHandler = async (e, loginWith) => {
    e.preventDefault();
    if (loginWith === 'withEmail') {
      setIsLoading(true);
      const res = await dispatch(
        await Actions.registerWithFirebaseAsCustomer(form)
      );
      setIsLoading(false);
      if (res) {
        handleModal();
      }
    } else if (loginWith === 'withPhone') {
      if (registerType === 3) {
        const ValidateOtp = async () => {
          if (otp === null || final === null) return;
          try {
            setIsLoading(true);
            const result = await final.confirm(otp);
            const response = await API.get(
              `/search-usersby-phone?search=${result.user.phoneNumber}`
            );
            if (response.results.length === 0) {
              setIsLoading(false);
              setUserPhone({
                isAlreadyRegistered: result.additionalUserInfo.isNewUser,
                uid: result.user.uid,
                phone: result.user.phoneNumber
              });
              setRegisterType(4);
            } else {
              setIsLoading(false);
              handleModal();
            }
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }
          return;
        };
        ValidateOtp();
        return;
      } else if (registerType === 4) {
        try {
          setIsLoading(true);
          await API.post(
            '/post-tnb-user/',
            JSON.stringify({
              user_detail_pk: uuidv4(),
              email: email,
              user: {
                idtag: userPhone.uid,
                version: '1',
                created_date: moment().toISOString(),
                updated_date: moment().toISOString(),
                created_by: 'usman',
                lastmodified_by: 'usman',
                user_tag:
                  userPhone.phone === '+16505551234'
                    ? ['a38639d9-9571-4059-9cfa-b599ba3f1ac1']
                    : userPhone.phone === '+923164019167'
                    ? ['75189394-48c1-4f4b-8185-4462a5864c71']
                    : [],
                status: true,
                firebaseid: userPhone.uid,
                parentidtag: '2595',
                expirydate: '2021-08-31T05:55:33.879137',
                intransaction: 0,
                blocked: 0,
                policy: [],
                role: [5],
                isTNB: true
              },
              version: '1',
              created_date: moment().toISOString(),
              updated_date: moment().toISOString(),
              created_by: 'Hassan',
              lastmodified_by: 'Hassan',
              status: null,
              fullname: `${firstName} ${lastName}`,
              phone: userPhone.phone,
              street: null,
              region: null,
              city: null,
              country: 'malaysia',
              zipcode: null,
              deviceId: null,
              deviceModel: null,
              osType: null,
              osVersion: null,
              signUpLoc: null,
              lastLogInLoc: null,
              socialID: null,
              socialType: null,
              idtag_fk: userPhone.uid
            })
          );
          setIsLoading(false);
          dispatch(UserActions.getUser(userPhone.uid));
          handleModal();
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
        return;
      }
      try {
        setIsLoading(true);
        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        const res = await firebase.auth().signInWithPhoneNumber(phone, verify);
        setIsLoading(false);
        console.log(res);
        setFinal(res);
        setRegisterType(3);
      } catch (error) {
        setIsLoading(false);
        alert(error);
      }
    }
  };
  return (
    <>
      {!registerType && (
        <>
          <h3 className="font-weight-bold mb-4 mt-4 text-center">
            Register with
          </h3>
          <ButtonContainer>
            <Button
              outline
              color="primary"
              className="font-weight-bold w-100 my-2 py-3"
              onClick={() => setRegisterType(1)}>
              Email
            </Button>
            <Button
              outline
              color="primary"
              className="font-weight-bold w-100 my-2 py-3"
              onClick={() => setRegisterType(2)}>
              Phone Number
            </Button>
          </ButtonContainer>
        </>
      )}
      {registerType === 1 && (
        <>
          <h3 className="font-weight-bold mb-4 mt-4 text-center">
            Register with Email
          </h3>
          <Form>
            <div className="row justify-content-center align-items-center">
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={firstName}
                    id="firstName"
                    placeholder="Enter You First Name"
                    onChange={onChangeHandler}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={lastName}
                    id="lastName"
                    placeholder="Enter You Last Name"
                    onChange={onChangeHandler}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    id="exampleEmail"
                    placeholder="with a placeholder"
                    onChange={onChangeHandler}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <Label htmlFor="examplePassword">Password</Label>
                <InputGroup>
                  <Input
                    type={show ? 'text' : 'password'}
                    name="password"
                    value={password}
                    id="examplePassword"
                    placeholder="password placeholder"
                    onChange={onChangeHandler}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText onClick={handleShow}>
                      {show ? <EyeOff /> : <Eye />}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="col-12 text-center">
                <LaddaButton
                  loading={isLoading}
                  data-size={XL}
                  onClick={(e) => onSubmitHandler(e, 'withEmail')}
                  className="mb-5 btn btn-primary font-weight-bold w-50 my-2">
                  Register
                </LaddaButton>
              </div>
            </div>
          </Form>
        </>
      )}
      {registerType === 2 && (
        <>
          <h3 className="font-weight-bold mb-4 mt-4 text-center">
            Register with Phone Number
          </h3>
          <Form>
            <div className="row justify-content-center align-items-center">
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="firstName">First Phone Number</Label>
                  <PhoneInput
                    inputClass="w-100 py-1"
                    inputProps={{
                      name: 'phone',
                      required: true
                    }}
                    country={'us'}
                    value={phone}
                    onChange={(phone) => {
                      setPhone(`+${phone}`);
                    }}
                  />
                </FormGroup>
              </div>

              <div className="col-12 text-center">
                <div id="recaptcha-container"></div>
                <LaddaButton
                  loading={isLoading}
                  id="sign-in-button"
                  data-size={XL}
                  onClick={(e) => onSubmitHandler(e, 'withPhone')}
                  className="mb-5 btn btn-primary font-weight-bold w-50 my-2">
                  Register
                </LaddaButton>
              </div>
            </div>
          </Form>
        </>
      )}
      {registerType === 3 && (
        <OTP
          loading={isLoading}
          handleModal={handleModal}
          otp={otp}
          setOtp={setOtp}
          onSubmitHandler={(e) => onSubmitHandler(e, 'withPhone')}
        />
      )}

      {registerType === 4 && (
        <div className="row justify-content-center align-items-center">
          <div className="col-12">
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>

              <Input
                type="text"
                name="firstName"
                value={firstName}
                id="firstName"
                placeholder="Enter You First Name"
                onChange={onChangeHandler}
              />
            </FormGroup>
          </div>
          <div className="col-12">
            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={lastName}
                id="lastName"
                placeholder="Enter You Last Name"
                onChange={onChangeHandler}
              />
            </FormGroup>
          </div>
          <div className="col-12">
            <FormGroup>
              <Label htmlFor="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                id="exampleEmail"
                placeholder="with a placeholder"
                onChange={onChangeHandler}
              />
            </FormGroup>
          </div>
          <div className="col-12 text-center">
            <LaddaButton
              loading={isLoading}
              disabled={isLoading}
              data-size={XL}
              onClick={(e) => onSubmitHandler(e, 'withPhone')}
              className="mb-5 btn btn-primary font-weight-bold w-50 my-2">
              Register
            </LaddaButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
