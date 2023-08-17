import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LaddaButton, { XL } from 'react-ladda';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'reactstrap';

const SweatAlert = ({
  show,
  title,
  message,
  type,
  close,
  submitbutton,
  cancel,
  sweatSubmit,
  isLoading
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal zIndex={2000} centered isOpen={show} toggle={close}>
        <div className="text-center p-5">
          <div className="avatar-icon-wrapper rounded-circle m-0">
            <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first text-first m-0 d-130">
              <FontAwesomeIcon
                icon={['far', 'keyboard']}
                className="d-flex align-self-center display-3"
              />
            </div>
          </div>
          <h4 className="font-weight-bold mt-4">{title}</h4>
          <p className="mb-0 text-black-50">{message}</p>
          <div className="pt-4">
            <Button
              onClick={close}
              color="neutral-secondary"
              className="btn-pill text-danger mx-1">
              <span className="btn-wrapper--label">{cancel}</span>
            </Button>
            <LaddaButton
              data-size={XL}
              loading={isLoading}
              onClick={sweatSubmit}
              className=" btn btn-primary font-weight-bold w-50">
              <span className="btn-wrapper--label">{submitbutton}</span>
            </LaddaButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SweatAlert;
