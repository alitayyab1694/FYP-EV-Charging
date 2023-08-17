import * as Actions from 'Actions';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from 'reactstrap';
const Login = ({ setIsLoading, isLoading, handleModal }) => {
  const dispatch = useDispatch();
  const [form, setform] = useState({
    email: null,
    password: null
  });
  const { email, password } = form;
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
  const onSubmitHandler = async (e) => {
    setIsLoading(true);
    const res = await dispatch(await Actions.submitLoginWithFireBase(form));
    setIsLoading(false);
    if (res) {
      handleModal();
    }
  };
  return (
    <>
      <h3 className="font-weight-bold mb-4 mt-4 text-center">Login</h3>
      <Form>
        <div className="row justify-content-center align-items-center">
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
          <div className="col-12 d-flex flex-row-reverse mt-3">
            <div className="mr-3">
              <Link to="/"> Forgot Password?</Link>
            </div>
          </div>
          <div className="col-12 text-center">
            <LaddaButton
              loading={isLoading}
              data-size={XL}
              onClick={onSubmitHandler}
              className="mb-5 btn btn-primary font-weight-bold w-50 my-2">
              Log in
            </LaddaButton>
          </div>
          <div className="col-12 ">
            <div className="d-flex justify-content-center">
              <p>OR</p>
            </div>
          </div>
          <div className="col-12 ">
            <div className="d-flex justify-content-center">
              <p>
                New to logistics?<Link to="/">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Login;
