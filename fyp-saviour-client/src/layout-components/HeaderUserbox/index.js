import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Actions from 'Actions';
import LoginModal from 'custom-components/models/LoginModal';
import QrReader from 'custom-components/models/QrReader';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
  Button,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink as NavLinkStrap,
  UncontrolledDropdown
} from 'reactstrap';
import styled from 'styled-components';
import './header.css';
const HeaderUserbox = ({ className }) => {
  const ref = useRef(null);
  const { pathname } = useLocation();
  const history = useHistory();
  const { user, isLoginModel, stepper, qrReader, pgUser } = useSelector(
    (state) => ({
      user: state.user,
      pgUser: state.appReducer.pgUser,
      isLoginModel: state.model.login,
      stepper: state.model.stepper,
      qrReader: state.model.qrReader
    })
  );
  const dispatch = useDispatch();
  const loginToggleHandler = () => {
    dispatch(Actions.loginModel(!isLoginModel));
  };
  const qrReaderToggleHandler = () => {
    dispatch(Actions.QrReaderModel(!qrReader));
  };

  return (
    <>
      <LoginModal
        className={className}
        open={isLoginModel}
        handleModal={loginToggleHandler}
      />
      <QrReader
        className={className}
        open={qrReader}
        handleModal={qrReaderToggleHandler}
      />
      <div className="d-flex align-items-center">
        <UncontrolledDropdown className="position-relative ml-2">
          <DropdownToggle
            color="link"
            className="p-0 text-left d-flex btn-transition-none align-items-center">
            <div className="user-block d-block">
              <div
                onClick={() => {
                  if (!pgUser) {
                    loginToggleHandler();
                  }
                }}
                className=" color-white">
                <FontAwesomeIcon
                  icon={['far', 'user-circle']}
                  className="mr-2"
                />
                {pgUser
                  ? pgUser?.data?.email?.substring(0, 10) + '...'
                  : 'Login / Signup'}
              </div>
            </div>
          </DropdownToggle>
          {pgUser && (
            <DropdownMenu
              right
              className="dropdown-menu-sm overflow-hidden p-0">
              <ListGroup flush className="text-left bg-transparent">
                <ListGroupItem className="rounded-top">
                  <Nav pills className="nav-neutral-primary flex-column">
                    <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                      My Check-ins
                    </NavLinkStrap>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => e.preventDefault()}>
                        Profile
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push('/reservation');
                        }}>
                        My Reservations
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        href="#/"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(Actions.logoutUser());
                        }}>
                        Logout
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </ListGroupItem>
              </ListGroup>
            </DropdownMenu>
          )}
        </UncontrolledDropdown>
      </div>
    </>
  );
};

export default styled(HeaderUserbox)``;
