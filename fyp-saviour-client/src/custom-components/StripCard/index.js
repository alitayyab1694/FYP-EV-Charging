import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import * as Actions from 'Actions';
import qs from 'querystringify';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { CircleLoader } from 'react-spinners';
import { getLocalStorage } from 'utils';
import CardBox from './CardBox';
import CardForm from './CardForm';

const apikey =
  'pk_test_51H64odEGhJpVZtxX6vHePeGIv3u00r3Zupn02BsdLeSAN2RcfamPA0GvdntxZrvH1wQAxRDynps1aEFo5F3csdzD00ZKdm8SPh';
const stripePromise = loadStripe(apikey === undefined ? '' : apikey);
export default function AddCard({ isLoading, onSubmitHandler, setIsloading }) {
  const params = useParams();
  const { search } = useLocation();
  const { isNotReservation } = qs.parse(search);
  const dispatch = useDispatch();
  const { headerDrawerToggle, pgUser, chargeBoxUser, singleBox, chargeBoxConnector, selectedConnector } = useSelector(
    (state) => ({
      singleBox: state.appReducer.singleBox,
      headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,
      pgUser: state.appReducer.pgUser,
      chargeBoxUser: state.appReducer.chargeBoxUser,
      chargeBoxConnector: state.appReducer.chargeBoxConnector,
      selectedConnector: state.appReducer.selectedConnector,
    })
  );
  const [customerCard, setCustomerCard] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setEmail('');
  }, []);
  if (loading) {
    return (
      <>
        <div className="d-flex align-items-center flex-column px-4">
          <CircleLoader color={'#3c44b1'} loading={true} />
        </div>
        <div className="text-muted font-size-xl text-center pt-3">
          <span className="font-size-lg d-block text-dark">
            Wait While we are loading... Card
          </span>
        </div>
      </>
    );
  }

    const connectorIndex = chargeBoxConnector?.results?.map((e)=> { return e.connectorId_pk}).indexOf(selectedConnector) + 1;
  
  return (
    <div>
      <Elements stripe={stripePromise}>
          <CardForm
            setName={setName}
            name={name}
            setEmail={setEmail}
            email={email}
            customerCard={customerCard}
            isLoading={isLoading}
            onSubmitHandler={async (id) => {
              const localUser = getLocalStorage('evapUser', true, true);
              if (localUser && isNotReservation) {
                let chargeObj = {};
                if (localUser?.chargingInfo?.profile?.value == 'profilePM') {
                  chargeObj = {
                    est_mins: Number(localUser?.chargingInfo?.min)
                  };
                } else {
                  chargeObj = {
                    est_kw: Number(singleBox.estimated_vals.total_killowatt)
                  };
                }
                const obj = {
                  chargebox_id: singleBox.chargeboxid,
                  user_id: localUser?.guest
                    ? chargeBoxUser?.results?.[0]?.idtag_fk
                    : pgUser?.idtag_fk,
                  p_transaction_id: localUser.transaction.p_transaction_id,
                  amount_to_charge: localUser.transaction.debit,
                  connector_id: connectorIndex,
                  ...chargeObj
                };
                await dispatch(
                  Actions.remoteStartTransaction({
                    ...obj
                  })
                );
                return;
              }
              onSubmitHandler(id);
            }}
            setIsloading={setIsloading}
          />
      </Elements>
    </div>
  );
}
