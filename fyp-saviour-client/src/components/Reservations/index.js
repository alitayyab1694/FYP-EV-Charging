import * as Actions from 'Actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import ReservationItems from './components/ReservationItems';
export default function LivePreviewExample() {
  const { pgUser, reservation } = useSelector((state) => ({
    pgUser: state.appReducer.pgUser,
    reservation: state.appReducer.reservation
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (pgUser) dispatch(Actions.getReservation(pgUser?.idtag_fk));
  }, [pgUser]);
  return (
    <Row>
      {reservation?.map((r) => {
        return (
          <Col md={4}>
            <ReservationItems reservation={r} />
          </Col>
        );
      })}
    </Row>
  );
}
