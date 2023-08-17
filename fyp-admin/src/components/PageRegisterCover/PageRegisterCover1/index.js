import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as API from 'api';
import hero4 from 'assets/images/hero-bg/hero8.jpg';
import { Country } from 'country-state-city';
import moment from 'moment';
import React, { useState } from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import {
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Nav,
  NavItem,
  NavLink as NavLinkStrap,
  Row,
  UncontrolledTooltip
} from 'reactstrap';
import './password.css';

export default function LivePreviewExample() {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const { auth } = useSelector((state) => ({
    auth: state.user.isAuth
  }));

  const [form, setform] = useState({
    name: null,
    email: null,
    country: null
  });
  const [isPasswordShown, setisPasswordShown] = useState(false);
  const [error, setError] = useState([]);
  const [focusOut, setfocusOut] = useState([]);

  const { name, email, country, password } = form;
  const togglePasswordVisiblity = () => {
    setisPasswordShown(!isPasswordShown);
  };

  const onBlurHandler = async (e) => {
    const passwordRegex = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
    );
    if (e.target.name === 'name') {
      if (name && name.length > 0) {
        setfocusOut([...focusOut, 'name']);
        setError(error.filter((e) => e !== 'name'));
      } else {
        setfocusOut([...focusOut, 'name']);
        setError([...error, 'name']);
      }
    } else if (e.target.name === 'email') {
      if (email && email.length > 0) {
        setfocusOut([...focusOut, 'email']);
        setError(error.filter((e) => e !== 'email'));
      } else {
        setfocusOut([...focusOut, 'email']);
        setError([...error, 'email']);
      }
    } else if (e.target.name === 'password') {
      if (password && password.length > 0) {
        if (passwordRegex.test(password)) {
          setfocusOut([...focusOut, 'password']);
          setError(error.filter((e) => e !== 'password'));
        } else {
          setfocusOut([...focusOut, 'password']);
          setError([...error, 'password']);
        }
      } else {
        setfocusOut([...focusOut, 'password']);
        setError([...error, 'password']);
      }
    }
  };
  const onChangeHandler = (e, select) => {
    if (select === 'country') {
      setform({
        ...form,
        country: e
      });
    } else {
      setform({
        ...form,
        [e.target.name]: e.target.value,
        [e.target.email]: e.target.value
      });
    }
  };

  const onSubmitHandler = async (e) => {
    let obj = {
      version: 1,
      country_code: form?.country?.value,
      email: form?.email,
      company_name: form?.name,
      created_date: moment().toISOString(),
      updated_date: moment().toISOString(),
      created_by: 'Usman',
      lastmodified_by: 'Usman',
      status: true
    };
    try {
      const res = await API.post('/companies/', obj);
      console.log(res);
    } catch (error) {
      console.log('error: ', error);
    }
  };
  if (auth) {
    return <Redirect to="/Dashboard" />;
  }
  return (
    <>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <Row className="min-vh-100 no-gutters">
                    <Col lg="7" xl="6" className="d-flex align-items-center">
                      <Col md="10" lg="8" xl="7" className="mx-auto">
                        <div className="py-4">
                          <div className="text-center">
                            <h3 className="display-4 mb-2 font-weight-bold">
                              Create account
                            </h3>
                            <p className="font-size-lg mb-5 text-black-50">
                              Start using our tools right away! Create an
                              account today!
                            </p>
                          </div>

                          <FormGroup>
                            <label className="font-weight-bold">
                              Company Name
                            </label>
                            <Input
                              placeholder="Enter your Company Name"
                              type="text"
                              name="name"
                              valid={
                                focusOut.includes('name') &&
                                !error.includes('name') &&
                                true
                              }
                              invalid={
                                focusOut.includes('name') &&
                                error.includes('name') &&
                                true
                              }
                              onBlur={onBlurHandler}
                              onChange={onChangeHandler}
                            />
                            <FormFeedback>
                              Please Enter Your Company Name
                            </FormFeedback>
                          </FormGroup>
                          <FormGroup>
                            <label className="font-weight-bold">
                              Email address
                            </label>
                            <Input
                              placeholder="Enter your email address"
                              type="email"
                              name="email"
                              valid={
                                focusOut.includes('email') &&
                                !error.includes('email') &&
                                true
                              }
                              invalid={
                                focusOut.includes('email') &&
                                error.includes('email') &&
                                true
                              }
                              onBlur={onBlurHandler}
                              onChange={onChangeHandler}
                            />
                            <FormFeedback>Please Enter Your Email</FormFeedback>
                          </FormGroup>
                          <FormGroup>
                            <label className="font-weight-bold">Country</label>
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
                          <FormGroup>
                            <div className="d-flex justify-content-between mg-b-5">
                              <label className="font-weight-bold">
                                Password
                              </label>
                            </div>
                            <div class="form-input">
                              <Input
                                placeholder="Enter your password"
                                type={isPasswordShown ? 'text' : 'password'}
                                name="password"
                                valid={
                                  focusOut.includes('password') &&
                                  !error.includes('password') &&
                                  true
                                }
                                invalid={
                                  focusOut.includes('password') &&
                                  error.includes('password') &&
                                  true
                                }
                                onBlur={onBlurHandler}
                                onChange={onChangeHandler}
                                icon={['fas', 'eye']}
                              />
                              <div className="icon">
                                {isPasswordShown ? (
                                  <FontAwesomeIcon
                                    icon={['fas', 'eye']}
                                    onClick={togglePasswordVisiblity}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={['fas', 'eye-slash']}
                                    onClick={togglePasswordVisiblity}
                                  />
                                )}
                              </div>
                            </div>

                            {focusOut.includes('password') ? (
                              focusOut.includes('password') &&
                              !error.includes('password') ? (
                                <FormFeedback valid>
                                  Please include minimum eight characters, at
                                  least one uppercase, atleast one lowercase
                                  letter and one number.
                                </FormFeedback>
                              ) : (
                                <FormFeedback>
                                  Please include minimum eight characters, at
                                  least one uppercase, atleast one lowercase
                                  letter and one number.
                                </FormFeedback>
                              )
                            ) : (
                              <FormText>
                                Please include minimum eight characters, at
                                least one uppercase, atleast one lowercase
                                letter and one number.
                              </FormText>
                            )}
                          </FormGroup>
                          <div className="form-group mb-5">
                            By clicking the <strong>Create account</strong>{' '}
                            button below you agree to our terms of service and
                            privacy statement.
                          </div>
                          <div className="text-center">
                            <LaddaButton
                              loading={isLoading}
                              data-size={XL}
                              onClick={onSubmitHandler}
                              className="mb-5 btn btn-primary">
                              Create Account
                            </LaddaButton>
                          </div>
                        </div>
                      </Col>
                    </Col>
                    <Col lg="5" xl="6" className="d-flex">
                      <div className="hero-wrapper w-100 bg-composed-wrapper bg-dark min-vh-lg-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                          <div
                            className="bg-composed-wrapper--image opacity-5"
                            style={{ backgroundImage: 'url(' + hero4 + ')' }}
                          />
                          <div className="bg-composed-wrapper--bg bg-second opacity-5" />
                          <div className="bg-composed-wrapper--bg bg-deep-sky opacity-2" />
                          <div className="bg-composed-wrapper--content text-center p-5">
                            <div className="text-white px-0 px-lg-2 px-xl-4">
                              <h1 className="display-3 mb-4 font-weight-bold">
                                EVAP - electrifying the future of mobility.
                              </h1>
                              <p className="font-size-lg mb-0 opacity-8">
                                We have dedicated ourselves to the topic of e
                                Mobility. Our Evap electric mobility service
                                providers software (emsp) performs virtually all
                                the tasks required to manage charging stations.
                              </p>
                              <div className="divider mx-auto border-1 my-5 border-light opacity-2 rounded w-25" />
                            </div>
                          </div>
                        </div>
                        <div className="hero-footer pb-4">
                          <Nav pills className="nav-neutral-secondary">
                            <NavItem>
                              <NavLinkStrap
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50"
                                id="FacebookTooltipExample7">
                                <FontAwesomeIcon icon={['fab', 'facebook']} />
                              </NavLinkStrap>
                              <UncontrolledTooltip
                                target="FacebookTooltipExample7"
                                container="body">
                                Facebook
                              </UncontrolledTooltip>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                href="https://www.linkedin.com/company/evapmy/"
                                target="_blank"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50"
                                id="FacebookTooltipExample7">
                                <FontAwesomeIcon
                                  icon={['fab', 'linkedin-in']}
                                />
                              </NavLinkStrap>
                              <UncontrolledTooltip
                                target="FacebookTooltipExample7"
                                container="body">
                                LinkedIn
                              </UncontrolledTooltip>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50"
                                id="btnTwitterTooltip">
                                <FontAwesomeIcon icon={['fab', 'twitter']} />
                              </NavLinkStrap>
                              <UncontrolledTooltip target="btnTwitterTooltip">
                                Twitter
                              </UncontrolledTooltip>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50"
                                id="btnGoogleTooltip">
                                <FontAwesomeIcon icon={['fab', 'google']} />
                              </NavLinkStrap>
                              <UncontrolledTooltip target="btnGoogleTooltip">
                                Google
                              </UncontrolledTooltip>
                            </NavItem>
                            <NavItem>
                              <NavLinkStrap
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className="font-size-lg text-white-50"
                                id="btnInstagramTooltip">
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                              </NavLinkStrap>
                              <UncontrolledTooltip target="btnInstagramTooltip">
                                Instagram
                              </UncontrolledTooltip>
                            </NavItem>
                          </Nav>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
