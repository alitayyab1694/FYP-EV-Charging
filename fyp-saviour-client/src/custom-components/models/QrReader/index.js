import * as Actions from 'Actions';
import React from 'react';
import QrReader from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from 'reactstrap';
const QRReader = ({ open, handleModal }) => {
  const dispatch = useDispatch();
  const { qrReader } = useSelector((state) => ({
    qrReader: state.model.qrReader
  }));
  const history = useHistory();
  return (
    <div>
      <Modal zIndex={2000} centered isOpen={open} toggle={handleModal}>
        <QrReader
          delay={300}
          onError={(e) => {
            console.log(e);
          }}
          onLoad={(e) => {
            console.log(e);
          }}
          onScan={(e) => {
            if (e) {
              dispatch(Actions.QrReaderModel(!qrReader));
              alert(e);
              history.push(
                `chargebox/${e.split('/')?.[4]}?isNotReservation=false`
              );
            }
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </Modal>
    </div>
  );
};

export default QRReader;
