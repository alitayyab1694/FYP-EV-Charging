import clsx from 'clsx';
import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink as NavLinkStrap
} from 'reactstrap';
import styled from 'styled-components';
import Login from './components/Login';
import Register from './components/Register';

const Body = styled.div`
  padding: 15% 10%;
`;

export default function LivePreviewExample({ open, handleModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal centered isOpen={open} toggle={handleModal}>
          <ModalBody>
            <Body>
              <div className=" nav-tabs-primary tabs-animated tabs-animated-shadow">
                <Nav tabs justified>
                  <NavItem>
                    <NavLinkStrap
                      className={clsx({ active: activeTab === '1' })}
                      onClick={() => {
                        toggle('1');
                      }}>
                      <span>Login</span>
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      className={clsx({ active: activeTab === '2' })}
                      onClick={() => {
                        toggle('2');
                      }}>
                      <span>Register</span>
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </div>

              {activeTab === '1' && (
                <Login
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  handleModal={handleModal}
                />
              )}
              {activeTab === '2' && (
                <Register
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  handleModal={handleModal}
                />
              )}
            </Body>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}
