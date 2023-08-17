import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MessageSquare, BatteryCharging } from 'react-feather';
import { Form, FormGroup, Input, Button, Modal, ModalBody } from 'reactstrap';
import styled from 'styled-components';

const Body = styled.div`
  padding: 15% 10%;
`;

const ModalCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
`;

const P = styled.p`
  font-size: 12px;
  margin: 10px 0px;
  color: danger;
`;

export default function LivePreviewExample({ open, handleModal }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal zIndex={2000} centered isOpen={open} toggle={handleModal}>
          <ModalBody>
            <Body>
              <h4 className="font-weight-bold mb-3">Check in</h4>
              <div className="row justify-content-center align-items-center my-3">
                <div className="col4">
                  <ModalCard>
                    <BatteryCharging />
                    <br />
                    <P>Successfully Charging</P>
                  </ModalCard>
                </div>
                <div className="col4">
                  <ModalCard>
                    <FontAwesomeIcon icon={['fas', 'battery-empty']} />
                    <br />
                    <P>
                      <p className="color-danger">Could Not Charge</p>
                    </P>
                  </ModalCard>
                </div>
              </div>
              <Form>
                <div className="row justify-content-center align-items-center my-3">
                  <div className="col-2">
                    <MessageSquare />
                  </div>
                  <div className="col-9">
                    <FormGroup>
                      <Input
                        type="text"
                        name="email"
                        id="exampleEmail"
                        placeholder="Comments"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-2">
                    <BatteryCharging />
                  </div>
                  <div className="col-9">
                    <FormGroup>
                      <Input
                        type="number"
                        name="email"
                        id="exampleEmail"
                        placeholder="Max kilowatts"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <Button color="primary" className="w-100 my-3">
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </Body>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}
