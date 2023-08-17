import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RESERVATION_STATUS } from 'enums';
import moment from 'moment';
import qs from 'querystring';
import React from 'react';
import { useHistory } from 'react-router';
import { Button, Card } from 'reactstrap';
import { getLocalStorage, setLocalStorage } from 'utils';
const ReservationItems = ({ reservation }) => {
  const history = useHistory();
  const {
    idtag_fk: { idtag_fk },
    reservation_pk,
    reservePolicyId_fk: { profilename },
    connectortype_fk: {
      connectortype_fk,
      connectorImage,
      connectorCategory,
      connectorTypeName
    },
    is_expired,
    reservation_status,
    payment_fk: { p_transaction_id, credit, debit, intent_id, charge_id },
    chargeboxid_fk: { chargeboxid },
    reserveStartTime,
    est_KW,
    reserveDate,
    reserveExpiryTime,
    reservationType
  } = reservation;
  console.log('reservation: ', reservation);
  return (
    <div>
      <Card className="card-box mb-5 p-4">
        <div className="d-flex align-items-center justify-content-between py-2">
          <div className="d-flex align-items-center">
            <div className="avatar-icon-wrapper d-50 mr-3 avatar-initials">
              <div className="avatar-icon rounded-circle d-50 shadow-sm font-weight-normal text-white bg-danger">
                {idtag_fk?.[0]?.fullname
                  .split(' ')
                  .map((name) => name?.[0])
                  .join('')}
              </div>
            </div>
            <div>
              <span className="font-weight-bold my-2">
                <span className="text-black-50 ">ChargeBox :</span>
                {chargeboxid}
              </span>

              <br />
              <span className="font-weight-bold my-2">
                <span className="text-black-50 ">Reservation Date :</span>
                {moment.utc(reserveDate).local().format('YYYY-MM-DD')}
                {/* {moment(reserveDate).format('YYYY-MM-DD').loa} */}
              </span>
              <br />

              <span className="font-weight-bold my-2">
                <span className="text-black-50 ">Start Time :</span>
                {moment
                  .utc(`${reserveDate} ${reserveStartTime}`)
                  .local()
                  .format('HH:mm:ss')}
                {/* {reserveStartTime} */}
              </span>
              <br />

              <span className="font-weight-bold my-2">
                <span className="text-black-50 ">End Time :</span>
                {moment
                  .utc(`${reserveDate} ${reserveExpiryTime}`)
                  .local()
                  .format('HH:mm:ss')}
                {/* {reserveExpiryTime} */}
              </span>
            </div>
          </div>
        </div>
        <div className="divider mx-auto my-3 w-100" />
        <div className="text-center">
          <div className="d-flex align-items-center flex-column ">
            <div
              className={`badge rounded-circle badge-neutral-success text-${
                is_expired ? 'danger' : 'success'
              } d-30 btn-icon p-0 mr-1`}>
              {is_expired ? (
                <FontAwesomeIcon
                  size="2x"
                  icon={['fas', 'exclamation-circle']}
                />
              ) : reservation_status === RESERVATION_STATUS.Completed ? (
                <FontAwesomeIcon icon={['fas', 'check']} />
              ) : (
                <FontAwesomeIcon icon={['fas', 'check']} />
              )}
              {/* */}
            </div>
            <span
              className={`font-size-xs text-${
                is_expired ? 'danger' : 'success'
              }`}>
              {is_expired ? 'Expired' : reservation_status}
            </span>
          </div>
        </div>
        <div className="divider mx-auto my-3 w-100" />
        <div className="mx-auto w-100 text-center">
          <Button
            disabled={
              is_expired || reservation_status === RESERVATION_STATUS.Completed
            }
            onClick={() => {
              const user = getLocalStorage('evapUser', true, true, true);
              user.transaction = {
                reserveStartTime,
                reserveDate,
                reserveExpiryTime,
                reservationType,
                p_transaction_id,
                reservation_pk,
                credit,
                charge_id,
                debit,
                intent_id
              };
              setLocalStorage('evapUser', user);
              history.push(
                `/chargeBox/${chargeboxid}?${qs.stringify({
                  est_KW,
                  reserveStartTime,
                  reserveDate,
                  reserveExpiryTime,
                  reservationType,
                  p_transaction_id,
                  reservation_pk,
                  credit,
                  debit,
                  intent_id
                })}`
              );
            }}
            className="btn btn-primary font-weight-bold w-50">
            {' '}
            Visit ChargeBox
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReservationItems;
