import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Row,
  Col,
  Input
} from 'reactstrap';

const DisputeModal = ({ isOpen, Toggle }) => {
  const [form, setForm] = useState({
    email: '',
    message: ''
  });
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const { email, message } = form;
  return (
    <Modal zIndex={2000} centered isOpen={isOpen}>
      <ModalHeader>Raise Dispute</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                value={email}
                placeholder="Enter Your Email"
                onChange={onChangeHandler}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label>Dispute Message</Label>
              <Input
                type="textarea"
                name="message"
                value={message}
                placeholder="Enter Your Message"
                onChange={onChangeHandler}
              />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={Toggle}
          className=" btn btn-secondary font-weight-bold w-20 ">
          Cancel
        </Button>
        <Button
          onClick={Toggle}
          className=" btn btn-primary font-weight-bold w-20 ">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DisputeModal;
