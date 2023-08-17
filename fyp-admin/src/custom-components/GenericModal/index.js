import React from 'react';
import { Modal } from 'reactstrap';

export default function GenericModal(props) {
  const { toggle, isOpen } = props;
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Modal zIndex={2000} centered isOpen={isOpen} toggle={toggle}>
          {props.children}
        </Modal>
      </div>
    </>
  );
}
