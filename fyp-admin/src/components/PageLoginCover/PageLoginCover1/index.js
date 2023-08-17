import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import hero8 from "assets/images/hero-bg/hero8.jpg";
import React, { useState } from "react";
import LaddaButton, { XL } from "react-ladda";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Nav,
  NavItem,
  NavLink as NavLinkStrap,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import firebaseService from "services/firebaseService";
import { submitLoginWithFireBase } from "store/reducer/authLoginSlice";
import * as API from "api";
import { Toaster, setLocalStorage } from "utils";
import { setUserData } from "store/reducer/userSlice";

export default function LivePreviewExample() {
  const { auth } = useSelector((state) => ({
    auth: state.user.isAuth,
  }));
  console.log("auth", auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setform] = useState({
    email: null,
    password: null,
  });
  const [error, setError] = useState([]);
  const [focusOut, setfocusOut] = useState([]);
  const { email, password } = form;
  const onChangeHandler = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onBlurHandler = async (e) => {
    // const passwordRegex = new RegExp(
    //   "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
    // );
    if (e.target.name === "email") {
      if (email && email.length > 0) {
        setfocusOut([...focusOut, "email"]);
        setError(error.filter((e) => e !== "email"));
      } else {
        setfocusOut([...focusOut, "email"]);
        setError([...error, "email"]);
      }
    }
    // else if (e.target.name === "password") {
    //   if (password && password.length > 0) {
    //     if (passwordRegex.test(password)) {
    //       setfocusOut([...focusOut, "password"]);
    //       setError(error.filter((e) => e !== "password"));
    //     } else {
    //       setfocusOut([...focusOut, "password"]);
    //       setError([...error, "password"]);
    //     }
    //   } else {
    //     setfocusOut([...focusOut, "password"]);
    //     setError([...error, "password"]);
    //   }
    // }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("form", form);
    if (Object.values(form).every((x) => x === null)) {
      return Toaster("error", "Please Enter Value In Input");
    } else if (error.length > 0) {
      return Toaster("error", "Please Remove Fields Error");
    } else {
      setIsLoading(true);
      try {
        const res = await API.post(API.LOGIN, form);
        console.log("res", res);
        setLocalStorage("evap-user", res);
        dispatch(setUserData({ ...res, isAuth: true }));
        // await dispatch(await submitLoginWithFireBase(form));
        setIsLoading(false);
      } catch (error) {
        Toaster("error", error?.response?.data?.message);
        setIsLoading(false);
      }
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
                            <h1 className="display-4 mb-1 font-weight-bold">
                              Login
                            </h1>
                            <p className="font-size-lg mb-0 text-black-50">
                              Fill in the fields below to login to your account
                            </p>
                          </div>

                          <div className="text-center text-black-50 mb-4">
                            Sign in with credentials
                          </div>
                          <div>
                            <FormGroup className=" mb-3">
                              <Input
                                value={email}
                                placeholder="Email"
                                type="email"
                                name="email"
                                valid={
                                  focusOut.includes("email") &&
                                  !error.includes("email") &&
                                  true
                                }
                                invalid={
                                  focusOut.includes("email") &&
                                  error.includes("email") &&
                                  true
                                }
                                onBlur={onBlurHandler}
                                onChange={onChangeHandler}
                              />
                              <FormFeedback>
                                Please Enter Your Email
                              </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Input
                                value={password}
                                placeholder="Password"
                                type="password"
                                name="password"
                                valid={
                                  focusOut.includes("password") &&
                                  !error.includes("password") &&
                                  true
                                }
                                invalid={
                                  focusOut.includes("password") &&
                                  error.includes("password") &&
                                  true
                                }
                                onBlur={onBlurHandler}
                                onChange={onChangeHandler}
                              />
                              {focusOut.includes("password") ? (
                                focusOut.includes("password") &&
                                !error.includes("password") ? (
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
                            <div className="d-flex justify-content-between">
                              <div className="custom-control custom-control-alternative d-flex align-items-center custom-checkbox">
                                <input
                                  className="custom-control-input"
                                  id=" customCheckLogin55"
                                  type="checkbox"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor=" customCheckLogin55"
                                >
                                  <span>Remember me</span>
                                </label>
                              </div>
                              {/* <div>
                                <Link
                                  to="/Forgot-Password"
                                  className="text-first">
                                  Recover password
                                </Link>
                              </div> */}
                            </div>
                            <div className="text-center py-4">
                              <LaddaButton
                                loading={isLoading}
                                data-size={XL}
                                onClick={onSubmitHandler}
                                className="mb-5 btn btn-primary font-weight-bold w-50 my-2"
                              >
                                Sign in
                              </LaddaButton>
                            </div>
                            {/* <div className="text-center text-black-50 mt-3">
                              Are you a mobility service provider?
                              <Link to="/Register" className="text-first">
                                Register here
                              </Link>
                            </div> */}
                             <div className="text-center py-4">
                              {/* <LaddaButton
                                data-size={XL}
                                onClick={() => {
                                  window.location.href = 'https://647054f0c7403c5b81a6ebae--timely-biscuit-994fda.netlify.app';
                                }}
                                className="mb-5 btn btn-primary font-weight-bold w-50 my-2"
                              >
                              Switch To Client
                              </LaddaButton> */}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Col>
                    <Col lg="5" xl="6" className="d-flex">
                      <div className="hero-wrapper w-100 bg-composed-wrapper bg-premium-dark min-vh-lg-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                          <div
                            className="bg-composed-wrapper--image opacity-5"
                            style={{ backgroundImage: "url(" + hero8 + ")" }}
                          />
                          <div className="bg-composed-wrapper--bg bg-second opacity-6" />
                          <div className="bg-composed-wrapper--bg bg-deep-blue opacity-2" />
                          <div className="bg-composed-wrapper--content text-center p-5">
                            <div className="text-white px-0 px-lg-2 px-xl-4">
                              <h1 className="display-3 mb-4 font-weight-bold">
                                EVAP - electrifying the future of mobility
                              </h1>
                              <p className="font-size-lg mb-0 opacity-8">
                                We have dedicated ourselves to the topic of e
                                Mobility. Our Evap electric mobility service
                                providers software (emsp) performs virtually all
                                the tasks required to manage charging stations.
                              </p>
                              <div className="divider mx-auto border-1 my-5 border-light opacity-2 rounded w-25" />
                              {/* <div>
                                <div className="text-center">
                                  <p className="font-size-lg mb-0 text-white">
                                    Connect with Social Account
                                  </p>
                                </div>
                                <div className="text-center py-4 rounded  my-2">
                                  <Button
                                    className="m-2 btn-pill px-4 font-weight-bold"
                                    size="sm"
                                    color="google">
                                    <span className="btn-wrapper--icon">
                                      <FontAwesomeIcon
                                        icon={['fab', 'google']}
                                      />
                                    </span>
                                    <span className="btn-wrapper--label">
                                      Login with Google
                                    </span>
                                  </Button>
                                  <Button
                                    className="m-2 btn-pill px-4 font-weight-bold"
                                    size="sm"
                                    color="facebook">
                                    <span className="btn-wrapper--icon">
                                      <FontAwesomeIcon
                                        icon={['fab', 'facebook']}
                                      />
                                    </span>
                                    <span className="btn-wrapper--label">
                                      Login with Facebook
                                    </span>
                                  </Button>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        {/* <div className="hero-footer pb-4">
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
                        </div> */}
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
