import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Actions from 'Actions';
import * as TYPE from 'Actions/type';
import * as API from 'api';
import DisputeModal from 'custom-components/models/DisputeModal';
import WalkInUser from 'custom-components/models/WalkInUser';
import SweatAlert from 'custom-components/SweatAlert';
import { RESERVATION_STATUS } from 'enums';
import useOpenClose from 'hooks/useOpenClose';
import moment from 'moment';
import qs from 'querystringify';
import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { Badge, Button, Card, Col, Container, Progress, Row } from 'reactstrap';
import { setHeaderDrawerToggle } from 'reducers/ThemeOptions';
import styled from 'styled-components';
import swal from 'sweetalert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import LaddaButton, { XL } from 'react-ladda';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import PinDropIcon from '@material-ui/icons/PinDrop';
import {
  LeaveCommentIcon,
  SuccessfullChargingIcon,
  CouldNotChargeIcon,
  ChatIcon,
  BatteryIcon
} from 'assets/svgs';
import './style.scss';
import FormControl from '@material-ui/core/FormControl';

import { getLocalStorage, Toaster } from 'utils';
const Text = styled.p`
  font-size: 13x;
  margin: 10px 0px 0px 0px;
`;

const TextColor = styled.div`
  color: black;
`;

const CardParagraph = styled.p`
  font-size: 15px;
  margin-bottom: 0;
`;

const H5 = styled.h5`
  font-weight: bold;
`;

const Heading = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
`;

function LivePreviewExample(props) {
  const localUser = getLocalStorage('evapUser', true, true);
  const { className } = props;
  const { search } = useLocation();
  const history = useHistory();
  const [open, onOpen, onToggle] = useOpenClose();
  const {
    reservationType,
    reserveStartTime,
    reserveDate,
    reservation_pk,
    p_transaction_id,
    credit,
    debit,
    intent_id,
    reserveExpiryTime,
    est_KW
  } = qs.parse(search);
  const [localStoreUser, setLocalStoreUser] = useState(null);
  const [topLoading, setTopLoading] = useState(false);
  const [statusColor, setStatusColor] = useState('success');
  const [agreed, setAgreed] = useState(false);
  const [waiverDialogue, setWaiverDialogue] = useState(false);
  const [checked, setChecked] = useState(false);
  const [connector_id_by_count, setConnector_id_by_count] = useState(1);
  // const [selectedConnector, setSelectedConnector] = React.useState('');
  const {
    mainLoading,
    chargeBoxConnector,
    singleBox,
    pgUser,
    headerDrawerToggle,
    chargeBoxUser,
    triggerLocalStorage,
    checkTransactionReqStatus,
    selectedConnector
  } = useSelector((state) => ({
    pgUser: state.appReducer.pgUser,
    checkTransactionReqStatus: state.appReducer.checkTransactionStatus,
    headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,
    singleBox: state.appReducer.singleBox,
    singleBox: state.appReducer.singleBox,
    stepper: state.model.stepper,
    triggerLocalStorage: state.trigger.triggerLocalStorage,
    chargeBoxUser: state.appReducer.chargeBoxUser,
    selectedConnector: state.appReducer.selectedConnector,
    sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
  }));
  
  const dispatch = useDispatch();
  const params = useParams();
  
  
  useEffect(() => {
    dispatch({ type: TYPE.CHECK_STATUS, payload: null });
    dispatch(
      Actions.getChargeBoxUserByEmail(`guest-${params?.id}@evap.my`, history)
    );

    dispatch(Actions.stepper(false));
    dispatch(Actions.removeChargeBoxInfo());

    if (reservationType) {
      const runAction = async () => {
        setTopLoading(true);
        await dispatch(
          await Actions.getsingleChargeBox(
            params?.id,
            {
              profile: {
                value: reservationType
              },
              hour: est_KW
            },
            `${reserveDate} ${reserveStartTime}`,
            `${reserveDate} ${reserveExpiryTime}`
          )
        );
        setTopLoading(false);
      };
      runAction();
    }

    setIsOpen(true);
    // singleBox?.connectorId_fk?.length ==1 && selectedConnector === ''? setSelectedConnector(singleBox.connectorId_fk[0].connectorId_pk): ''

  }, []);
  useEffect(() => {
    const userLocal = getLocalStorage('evapUser', true, true);
    if (userLocal?.startTransaction && !reservationType) {
      const runAction = async () => {
        const { chargingInfo } = userLocal;
        setTopLoading(true);
        if (chargingInfo?.profile?.value === 'profilePKW') {
          await dispatch(
            await Actions.getsingleChargeBox(
              params?.id,
              chargingInfo,
              moment().format('YYYY-MM-DD HH:mm:ss')
            )
          );
          setTopLoading(false);
        } else {
          await dispatch(
            await Actions.getsingleChargeBox(
              params?.id,
              chargingInfo,
              moment().format('YYYY-MM-DD HH:mm:ss'),
              moment()
                .add(chargingInfo?.min, 'minutes')
                .format('YYYY-MM-DD HH:mm:ss')
            )
          );
          setTopLoading(false);
        }
      };
      runAction();
    }
  }, []);
  useEffect(() => {
    if (localStoreUser?.enableTryAgain) {
      openFeedback();
    }
  }, [localStoreUser]);
  useEffect(() => {
    //     setFeedbackform({ ...feedbackform,
    //       location: singleBox?.chargeboxid,
    //       user: chargeBoxUser?.results?.[0]?.user?.idtag
    //     });

    var handle = setInterval(async () => {
      const userLocal = getLocalStorage('evapUser', true, true);
      if (
        userLocal?.startTransaction &&
        !userLocal.checkStatusStop &&
        !userLocal?.stopTransaction &&
        !userLocal?.enableTryAgain &&
        (chargeBoxUser || pgUser) &&
        singleBox
      ) {
        console.log(connector_id_by_count);
        let obj = {
          chargebox_id: singleBox?.chargeboxid,
          user_id: localUser?.guest
            ? chargeBoxUser?.results?.[0]?.idtag_fk
            : pgUser?.idtag_fk,
          connector_id: connector_id_by_count
        };
        if(connector_id_by_count!==0) {
          const res = await dispatch(
            await Actions.checkTransactionStatus({ ...obj }, !triggerLocalStorage)
          );
          dispatch(Actions.LocalStorageTrigger(!triggerLocalStorage));
        if (res?.Success) {
          if (
            !checkTransactionReqStatus ||
            checkTransactionReqStatus !== res?.Success
          ) {
            dispatch({ type: TYPE.CHECK_STATUS, payload: res?.Success });
            Toaster('success', res?.Success);
          }
        } else {
          if (
            !checkTransactionReqStatus ||
            checkTransactionReqStatus !== res?.Error
          ) {
            dispatch({ type: TYPE.CHECK_STATUS, payload: res?.Error });
            Toaster('error', res?.Error);
          }
        }
        if (res?.Success === 'Transaction Completed') {
          dispatch(Actions.LocalStorageTrigger(!triggerLocalStorage));
          // setTimeout(async () => {
          // connector_id_by_count =  singleBox?.connectorId_fk.map((e) => {
          //   return e.connectorId_pk
          // }).indexOf(selectedConnector) +1;
          if(connector_id_by_count!==0 && connector_id_by_count !=undefined ){
            const fetchResponse = await dispatch(
              await Actions.remoteFetchTransaction(
                { chargebox_id: singleBox.chargeboxid, connector_id: connector_id_by_count },
                !triggerLocalStorage
              )
            );
            if (fetchResponse?.Success === 'Transaction data') {
              if (singleBox?.isPOS) {
                swal('Transaction Successful', 'Please Click Confrim Button', {
                  buttons: {
                    cancel: {
                      text: 'Download Transaction Receipt',
                      value: null,
                      visible: false,
                      className: '',
                      closeModal: false
                    },
                    confirm: {
                      text: 'Confrim',
                      value: true,
                      visible: true,
                      className: '',
                      closeModal: true
                    }
                  },
                  icon: 'success'
                })
                  .then((value) => {
                    setFeedback(true);
                  })
                  .catch((e) => {});
                return;
              }
  
              const user = getLocalStorage('evapUser', true, true);
              let response;
              if (user?.transaction?.charge_id) {
                response = await API.post(`/payments/customer-charge/`, {
                  charge_id: user?.transaction?.charge_id,
                  amount: parseInt(fetchResponse?.data?.charge_amount),
                  email: user?.email
                });
              } else {
                response = await API.post(`/payments/payment-capture/`, {
                  intent_id: user.transaction.intent_id,
                  amount_to_capture: parseInt(fetchResponse?.data?.charge_amount)
                });
              }
              const obj = {
                version: '1',
                created_date: moment().toISOString(),
                updated_date: moment().toISOString(),
                created_by: 'Usman',
                lastmodified_by: 'Usman',
                status: true,
                credit: 0.0,
                debit: parseFloat(response?.amount_captured),
                charge_id: user.guest ? response?.id : 'charge',
                transaction_type: 'PAY',
                intent_id: user.guest ? 'intent' : user.transaction.intent_id,
                receipt_number: '123',
                receipt_url: response?.charges?.data?.[0]?.receipt_url
                  ? response?.charges?.data?.[0]?.receipt_url
                  : response?.receipt_url,
                wallet_fk: localUser?.guest ? null : localUser?.wallet_id
              };
              await Actions.PaymentTransaction2(obj);
              if (reservationType) {
                await dispatch(
                  await Actions.updateReservationStatus(reservation_pk, {
                    reservation_status: RESERVATION_STATUS.Completed
                  })
                );
              }
              swal(
                'Transaction Successful',
                'Please download you receipt and unplug the charger',
                {
                  buttons: {
                    cancel: {
                      text: 'Download Transaction Receipt',
                      value: null,
                      visible: false,
                      className: '',
                      closeModal: false
                    },
                    confirm: {
                      text: 'Download Transaction Receipt',
                      value: true,
                      visible: true,
                      className: '',
                      closeModal: true
                    }
                  },
                  icon: 'success'
                }
              )
                .then((value) => {
                  if (localUser?.guest) {
                    handleToggleFeedback();
                    window.open(
                      response?.charges?.data?.[0]?.receipt_url
                        ? response?.charges?.data?.[0]?.receipt_url
                        : response?.receipt_url,
                      '_blank' // <- This is what makes it open in a new window.
                    );
                  } else {
                    window.open(
                      response?.charges?.data?.[0]?.receipt_url
                        ? response?.charges?.data?.[0]?.receipt_url
                        : response?.receipt_url,
                      '_blank' // <- This is what makes it open in a new window.
                    );
                  }
                })
                .catch((e) => {});
            } else if (
              fetchResponse.Error ===
              'Payment was unsuccessful, please try again...'
            ) {
              const user = getLocalStorage('evapUser', true, true);
              let refundResponse;
              if (user?.transaction?.charge_id) {
                refundResponse = await dispatch(
                  await Actions.paymentRefund(
                    localStoreUser,
                    !triggerLocalStorage
                  )
                );
              } else {
                const cancelObj = {
                  reason: 'Payment was unsuccessful',
                  intent_id: user?.transaction?.intent_id
                };
                refundResponse = await Actions.paymentIntentCancel(cancelObj);
              }
              swal(
                'Payment was unsuccessful',
                'Your amount is refunded please try again',
                {
                  buttons: {
                    cancel: {
                      text: 'Download Transaction Receipt',
                      value: null,
                      visible: false,
                      className: '',
                      closeModal: false
                    },
                    confirm: {
                      text: 'Go Back',
                      value: true,
                      visible: true,
                      className: '',
                      closeModal: true
                    }
                  },
                  icon: 'danger'
                }
              )
                .then((value) => {
                  if (localUser?.guest) {
                    dispatch(Actions.removeSingleChargeBox());
                  } else {
                    history.push('/reservation');
                  }
                })
                .catch((e) => {});
            } 
          }
          
          // }, 5000);
        }
        }
        
      }
    }, 5000);

    if(singleBox?.connectorId_fk?.length ==1 && selectedConnector === null){
      dispatch({
        type: TYPE.SINGLE_CHARGE_BOX_SELETED_CONNECTOR,
        payload: singleBox.connectorId_fk[0].connectorId_pk
      });
    }

    return () => {
      clearInterval(handle);
    };
  }, [singleBox, pgUser, chargeBoxUser, checkTransactionReqStatus]);
  useEffect(() => {
    if(agreed){
      remoteStartFunc();
    }
  }, [agreed])
  useEffect(()=> {
    if(singleBox){
      setConnector_id_by_count(singleBox?.connectorId_fk.map((e) => {
        return e.connectorId_pk
      }).indexOf(selectedConnector) +1);
      console.log(connector_id_by_count);
    }
  },[selectedConnector])
  const _userLocal = getLocalStorage('evapUser', true, true);
  const [isOpen, setIsOpen] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(true);
  const [transactionId, setTransactionId] = useState(null);
  const [notavailable, setNotavailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    profile: {
      "value": "profilePM",
      "label": "Rate Per Minute"
    },
    hour: 10,
    min: 60,
  });
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState(false);

  const handleModalOpener = () => {
    setIsOpen(!isOpen);
  };
  const HanlderRegisterModal = () => {
    setRegisterOpen(!registerOpen);
  };
  const handlerNotAvailable = () => {
    setNotavailable(!notavailable);
    history.push('/');
  };
  const toggleSelected = (param) => (e) => {
    setFeedbackform({ ...feedbackform, satisfaction: param });
    setSelected(param);
  };

  const handleToggleFeedback = () => {
    setFeedback(!feedback);
  };
  const openFeedback = () => {
    setFeedback(true);
  };

  const [feedbackform, setFeedbackform] = useState({
    satisfaction: 0,
    recommend: null,
    gender: '',
    age_group: '',
    feedback_content: '',
    location: '',
    user: ''
  });
  const handleClose = () => {
    setWaiverDialogue(false);
  };
  const handleCheck = () => {
    setChecked(true);
  };
  const agreeHandle = () => {
    setAgreed(true);
    setWaiverDialogue(false);
  };
  const handleConnectorRadioChange = (event) => {
    dispatch({
      type: TYPE.SINGLE_CHARGE_BOX_SELETED_CONNECTOR,
      payload: event.target.value
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    const runAction = async () => {
      setIsLoading(true);
      try {
        await dispatch(
          await Actions.afterTransactionFeedback({
            ...feedbackform,
            age_group: feedbackform.age_group,
            recommend: feedbackform?.recommend,
            location: singleBox.chargeboxid,
            user: chargeBoxUser?.results?.[0]?.user?.idtag
          })
        );
        if (localUser?.guest) {
          dispatch(Actions.removeSingleChargeBox());
        } else {
          history.push('/reservation');
        }
        setFeedback(false);
        Toaster('success', 'Created successfully');
      } catch (error) {
        Toaster('error', 'error in creating');
        setIsLoading(false);
      }
    };
    runAction();
  };
  const buffer = [
    <>
      <InsertEmoticonIcon />
      <p>Happy</p>
    </>,
    <>
      <SentimentDissatisfiedIcon />
      <p>Moderate</p>
    </>,
    <>
      <SentimentVeryDissatisfiedIcon />
      <p>Unhappy</p>
    </>
  ];
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  useEffect(() => {
    if (localUser) {
      setLocalStoreUser(localUser);
    }
  }, [triggerLocalStorage]);
  if (topLoading) {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            Please wait while we load the live preview examples
            <span className="font-size-lg d-block text-dark">
              This live preview instance can be slower than a real production
              build!
            </span>
          </div>
        </div>
      </>
    );
  }
  if (!localStoreUser?.startTransaction && !singleBox && !reservationType) {
    return (
      <>
        <WalkInUser
          form={form}
          setForm={setForm}
          isOpen={isOpen}
          handleModal={handleModalOpener}
        />
        <div className={`${className} app-inner-content-layout`}>
          <div className="app-inner-content-layout--main p-0">
            <div className="hero-wrapper  rounded-bottom shadow-xxl bg-composed-wrapper bg-second">
              <div className="flex-grow-1 w-100 d-flex align-items-center vh-100">
                <div className="bg-composed-wrapper--image opacity-3" />
                <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  const latAndLong = async () => {
    setIsLoading(true);
    await dispatch(
      await Actions.getNearByCharge(
        { ...singleBox },
        moment().format('YYYY-MM-DD HH:mm:ss'),
        moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        form
      )
    );
    setIsLoading(false);
    history.push('/');
  };
  if (
    (!reservationType && singleBox && singleBox?.is_occupied) ||
    (!reservationType && singleBox && singleBox?.applicable_pp === null)
  ) {
    return (
      <>
        <SweatAlert
          isLoading={isLoading}
          close={handlerNotAvailable}
          show={notavailable}
          sweatSubmit={latAndLong}
          submitbutton="Find Nearby"
          cancel="Back to Map"
          title="Sorry! This Charger is not Available at this time"
          type="info"
          message="Click below find near by to find alternative charge"
        />
        <div className={`${className} app-inner-content-layout`}>
          <div className="app-inner-content-layout--main bg-white p-0">
            <div className="hero-wrapper  rounded-bottom shadow-xxl bg-composed-wrapper bg-second">
              <div className="flex-grow-1 w-100 d-flex align-items-center vh-100">
                <div className="bg-composed-wrapper--image opacity-3" />
                <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  const sweatSubmit = () => {
    dispatch(Actions.loginModel(true));
    HanlderRegisterModal();
  };
  const remoteStartFunc = async () => {
    if(selectedConnector === ''){
      Toaster('error', 'Please Select a connector first');
      return;
    }
    if(agreed === false){
      Toaster('error', 'Please Agree to the waiver form');
      return
    }
    setConnector_id_by_count(singleBox.connectorId_fk.map((e) => {
      return e.connectorId_pk
    }).indexOf(selectedConnector) +1);

    if (reservationType) {
      let obj;

      if (reservationType === 'profilePKW') {
        obj = {
          chargebox_id: singleBox.chargeboxid,
          user_id: localUser.guest
            ? chargeBoxUser?.results?.[0]?.idtag_fk
            : pgUser?.idtag_fk,
          est_kw: Number(est_KW),
          p_transaction_id: p_transaction_id,
          reservation_id: reservation_pk,
          connector_id: connector_id_by_count
        };
      } else {
        obj = {
          chargebox_id: singleBox.chargeboxid,
          user_id: localUser.guest
            ? chargeBoxUser?.results?.[0]?.idtag_fk
            : pgUser?.idtag_fk,
          est_mins: moment(`${reserveDate} ${reserveExpiryTime}`).diff(
            moment(`${reserveDate} ${reserveStartTime}`),
            'minutes'
          ),
          p_transaction_id: p_transaction_id,
          reservation_id: reservation_pk,
          connector_id: connector_id_by_count
        };
      }
      await dispatch(
        Actions.remoteStartTransaction({
          ...obj
        })
      );
      return;
    } else if (singleBox?.isPOS) {
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
        connector_id: connector_id_by_count,
        ...chargeObj
      };
      await dispatch(
        Actions.remoteStartTransaction({
          ...obj
        })
      );
      return;
    }
    if (localStoreUser?.enableTryAgain) {
      const obj = {
        chargebox_id: singleBox.chargeboxid,
        user_id: localUser?.guest
          ? chargeBoxUser?.results?.[0]?.idtag_fk
          : pgUser?.idtag_fk,
          connector_id: connector_id_by_count,
      };
      
      console.log(obj);

      if(connector_id_by_count!==0 && connector_id_by_count !=undefined){
        dispatch(
          Actions.checkTransactionStatus(
            { ...obj },
            !triggerLocalStorage,
            singleBox.chargeboxid
          )
        );
      }
      return;
    }
    dispatch(setHeaderDrawerToggle(!headerDrawerToggle));
  };
  const remoteStopTransaction = async () => {
    if (localStoreUser) {
      const obj = {
        chargebox_id: singleBox.chargeboxid,
        user_id: localUser?.guest
          ? chargeBoxUser?.results?.[0]?.idtag_fk
          : pgUser?.idtag_fk,
        connector_id: connector_id_by_count
      };
      const response = await dispatch(
        await Actions.remoteStopTransaction(
          {
            ...obj
          },
          singleBox.chargeboxid
        )
      );
      // setTimeout(async () => {
        
      const res = await dispatch(
        await Actions.remoteFetchTransaction(
          { chargebox_id: singleBox.chargeboxid, connector_id: connector_id_by_count },
          !triggerLocalStorage
        )
      );
      dispatch(Actions.LocalStorageTrigger(!triggerLocalStorage));
      if (res?.Success) {
        if (
          !checkTransactionReqStatus ||
          checkTransactionReqStatus !== res?.Success
        ) {
          dispatch({ type: TYPE.CHECK_STATUS, payload: res?.Success });
          Toaster('success', res?.Success);
        }
      } else {
        if (
          !checkTransactionReqStatus ||
          checkTransactionReqStatus !== res?.Error
        ) {
          dispatch({ type: TYPE.CHECK_STATUS, payload: res?.Error });
          Toaster('error', res?.Error);
        }
      }
      if (res?.Success === 'Transaction data') {
        const user = getLocalStorage('evapUser', true, true);
        if (singleBox?.isPOS) {
          swal('Transaction Successful', 'Please Click Confrim Button', {
            buttons: {
              cancel: {
                text: 'Download Transaction Receipt',
                value: null,
                visible: false,
                className: '',
                closeModal: false
              },
              confirm: {
                text: 'Confrim',
                value: true,
                visible: true,
                className: '',
                closeModal: true
              }
            },
            icon: 'success'
          })
            .then((value) => {
              setFeedback(true);
            })
            .catch((e) => {});
          return;
        }
        let response;
        if (user?.transaction?.charge_id) {
          response = await API.post(`/payments/customer-charge/`, {
            charge_id: user?.transaction?.charge_id,
            amount:
              res?.data?.charge_amount > 200
                ? parseInt(res?.data?.charge_amount)
                : 200,
            email: user?.email
          });
        } else {
          response = await API.post(`/payments/payment-capture/`, {
            intent_id: user.transaction.intent_id,
            amount_to_capture:
              res?.data?.charge_amount > 200
                ? parseInt(res?.data?.charge_amount)
                : 200
          });
        }
        const obj = {
          version: '1',
          created_date: moment().toISOString(),
          updated_date: moment().toISOString(),
          created_by: 'Usman',
          lastmodified_by: 'Usman',
          status: true,
          credit: 0.0,
          debit: parseFloat(response?.amount_captured),
          charge_id: user.guest ? response?.id : 'charge',
          transaction_type: 'PAY',
          intent_id: user.guest ? 'intent' : user.transaction.intent_id,
          receipt_number: '123',
          receipt_url: response?.charges?.data?.[0]?.receipt_url
            ? response?.charges?.data?.[0]?.receipt_url
            : response?.receipt_url,
          wallet_fk: localUser?.guest ? null : localUser?.wallet_id
        };
        await Actions.PaymentTransaction2(obj);
        if (reservationType) {
          await dispatch(
            await Actions.updateReservationStatus(reservation_pk, {
              reservation_status: RESERVATION_STATUS.Completed
            })
          );
        }
        swal(
          'Transaction Successful',
          'Please download you receipt and unplug the charger',
          {
            buttons: {
              cancel: {
                text: 'Download Transaction Receipt',
                value: null,
                visible: false,
                className: '',
                closeModal: false
              },
              confirm: {
                text: 'Download Transaction Receipt',
                value: true,
                visible: true,
                className: '',
                closeModal: true
              }
            },
            icon: 'success'
          }
        )
          .then((value) => {
            if (localUser?.guest) {
              window.open(
                response?.charges?.data?.[0]?.receipt_url
                  ? response?.charges?.data?.[0]?.receipt_url
                  : response?.receipt_url,
                '_blank' // <- This is what makes it open in a new window.
              );
            } else {
              window.open(
                response?.charges?.data?.[0]?.receipt_url
                  ? response?.charges?.data?.[0]?.receipt_url
                  : response?.receipt_url,
                '_blank' // <- This is what makes it open in a new window.
              );
            }
            setFeedback(true);
          })
          .catch((e) => {});
      } else if (
        res?.Error === 'Payment was unsuccessful, please try again...'
      ) {
        const user = getLocalStorage('evapUser', true, true);
        let refundResponse;
        if (user?.transaction?.charge_id) {
          refundResponse = await dispatch(
            await Actions.paymentRefund(localStoreUser, !triggerLocalStorage)
          );
        } else {
          refundResponse = await dispatch(
            await Actions.paymentRefund1(
              {
                amount: credit,
                intent_id: intent_id
              },
              !triggerLocalStorage
            )
          );
        }
        swal(
          'Transaction Successful',
          'Please download you receipt and unplug the charger',
          {
            buttons: {
              cancel: {
                text: 'Download Transaction Receipt',
                value: null,
                visible: false,
                className: '',
                closeModal: false
              },
              confirm: {
                text: 'Download Transaction Receipt',
                value: true,
                visible: true,
                className: '',
                closeModal: true
              }
            },
            icon: 'success'
          }
        )
          .then((value) => {
            handleToggleFeedback();
            if (localUser?.guest) {
              window.open(
                refundResponse?.receipt_url,
                '_blank' // <- This is what makes it open in a new window.
              );
            } else {
              window.open(
                refundResponse?.receipt_url,
                '_blank' // <- This is what makes it open in a new window.
              );
            }
          })
          .catch((e) => {});
      }
      // }, 5000);
    }
  };

  return (
    <>
      {!reservationType && !pgUser && (
        <SweatAlert
          close={HanlderRegisterModal}
          show={registerOpen}
          sweatSubmit={sweatSubmit}
          submitbutton="Register"
          cancel="Not Interested"
          title="Checking First Time?"
          type="info"
          message="You can signup here to avail more benifits"
        />
      )}

      <DisputeModal isOpen={open} Toggle={onToggle} />
      <div className={`${className} app-inner-content-layout`}>
        <div className="app-inner-content-layout--main p-0">
          <div className="hero-wrapper  rounded-bottom shadow-xxl bg-composed-wrapper bg-second">
            <div className="flex-grow-1 w-100 d-flex align-items-center">
              <div className="bg-composed-wrapper--image opacity-3" />
              <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4" />
              <div className="bg-composed-wrapper--content ">
                <Container className="pt-4">
                  <div className="d-block d-md-flex justify-content-center align-items-start">
                    <div className="d-flex text-white flex-column pl-md-2">
                      <div className="d-block d-md-flex align-items-center flex-column">
                        <div >
                          <div className="d-flex flex-column  justify-content-center">
                            <Text style={{textAlign: 'center'}} className="font-size-xxl">
                              Chargebox
                            </Text>
                            <Text style={{textAlign: 'center'}} className="font-size-xxl font-weight-bold mt-0 mb-4">
                              {params?.id.replace(/_/g, ' ').toUpperCase()}
                              {"\n"}
                            </Text>
                            <Text style={{textAlign: 'center'}} >
                               {_userLocal?.startTransaction ? 
                              'Charging' : 'Click here to start Charging'}
                            </Text>

                          </div>
                        </div>
                        <div className="btn-grp-div" style={{textAlign: 'center'}}>
                          <Button
                            onClick={() => {
                              _userLocal?.startTransaction ? 
                              remoteStopTransaction()
                              :
                              (localStoreUser?.enableTryAgain ? remoteStartFunc() :  (agreed ? remoteStartFunc(): setWaiverDialogue(true)) )
                            }}
                            size="sm"
                            color={_userLocal?.startTransaction ? 'danger' : 'success'}
                            className="btn-tag start-btn shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40 mt-2"
                            // disabled={
                            //   !localStoreUser?.enableTryAgain &&
                            //   localStoreUser?.startTransaction
                            // }
                            >
                            {_userLocal?.startTransaction ? 
                              'Stop' 
                              :
                              (localStoreUser?.enableTryAgain ? 'Try Again' : 'Start')}
                          </Button>

                          {/* <Button
                            onClick={remoteStopTransaction}
                            size="sm"
                            color="danger"
                            className="btn-tag  shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                            Stop
                          </Button> */}
                          {localStoreUser?.enableTryAgain && (
                            <Button
                              onClick={async () => {
                                if (localStoreUser?.guest) {
                                  await dispatch(
                                    await Actions.paymentRefund(
                                      localStoreUser,
                                      !triggerLocalStorage
                                    )
                                  );
                                  swal(
                                    'Refund Successful',
                                    'You amount has been refunded Please verify if any query contact to our support'
                                  );
                                } else {
                                  await dispatch(
                                    await Actions.paymentRefund1(
                                      {
                                        amount: credit,
                                        intent_id: intent_id
                                      },
                                      !triggerLocalStorage
                                    )
                                  );
                                  swal(
                                    'Refund Successful',
                                    'You amount has been refunded Please verify if any query contact to our support'
                                  );
                                }
                              }}
                              size="sm"
                              color="success"
                              className="btn-tag  shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                              Refund
                            </Button>
                          )}
                        </div>
                        <div>
                          <Row className="ml-4 mr-4 mt-2">
                            <Col xs="2"><PinDropIcon fontSize='medium'/></Col>
                            <Col xs="10" className="font-size-md">{singleBox.city+', '+singleBox.endpoint_address}</Col>
                          </Row>
                        </div>
                      </div>
                      <div className="font-size-lg mt-3">
                        {/* <div className="card-div my-3 mx-4">
                          <Card className="card-box mb-5 p-4">
                            <TextColor>
                              <div className="p-0">
                                <div className="container-fluid">
                                  <div className="row text-center">
                                    <div className="col-3 p-0">
                                      <FontAwesomeIcon
                                        className="25"
                                        icon={['fas', 'star']}
                                      />
                                      <Text className="text2">Bookmark</Text>
                                    </div>

                                    <div className="col-3 p-0">
                                      <FontAwesomeIcon
                                        icon={['fas', 'image']}
                                      />
                                      <Text className="text2">Add Photo</Text>
                                    </div>

                                    <div className="col-3 p-0">
                                      <FontAwesomeIcon
                                        icon={['fas', 'directions']}
                                      />
                                      <Text className="text2">Directions</Text>
                                    </div>

                                    <div className="col-3 p-0">
                                      <FontAwesomeIcon icon={['fas', 'edit']} />
                                      <Text className="text2">Edit</Text>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="container-fluid">
                                <div className="row align-items-center py-2">
                                  <div className="col-2 p-0 text-center">
                                    <FontAwesomeIcon
                                      icon={['fas', 'map-marker-alt']}
                                    />
                                  </div>
                                  <div className="col-10 p-0">
                                    <CardParagraph>
                                      {`${singleBox?.house_no} 
                                ${singleBox?.street} 
                                ${singleBox?.zip_code} ,
                                ${singleBox?.city}`}
                                    </CardParagraph>
                                  </div>
                                </div>
                              </div>

                              <div className="container-fluid">
                                <div className="row align-items-center py-2">
                                  <div className="col-2 p-0 text-center">
                                    <FontAwesomeIcon icon={['fas', 'star']} />
                                  </div>
                                  <div className="col-10 p-0">
                                    <CardParagraph>
                                      {singleBox?.facilities}
                                    </CardParagraph>
                                  </div>
                                </div>
                              </div>
                              <div className="container-fluid">
                                <div className="row align-items-center py-2">
                                  <div className="col-2 p-0 text-center">
                                    <FontAwesomeIcon icon={['fas', 'info']} />
                                  </div>
                                  <div className="col-10 p-0">
                                    <CardParagraph>
                                      {`${singleBox?.connectorId_fk?.length} x ${singleBox?.capacity}KW`}
                                    </CardParagraph>
                                  </div>
                                </div>
                              </div>
                            </TextColor>
                          </Card>
                        </div> */}

                        <div className="card-div my-3 mx-4">
                          {mainLoading ? (
                            <SkeletonTheme
                              className="ml-2"
                              color="#2c3658"
                              highlightColor="#253053">
                              <Skeleton width={270} height={160} />
                            </SkeletonTheme>
                          ) : (
                            <Card className="card-box mb-5 p-4">
                              <TextColor>
                                <H5>
                                  {`(${singleBox?.connectorId_fk?.length} Connectors)`}
                                </H5>
                                <Container fluid>
                                  <Row className="align-items-center">
                                    {/* {singleBox?.connectorId_fk?.length ==1 && selectedConnector === ''? setSelectedConnector(singleBox.connectorId_fk[0].connectorId_pk): ''} */}
                                    <RadioGroup aria-label="quiz" style={{flexDirection: 'row'}} name="quiz" value={selectedConnector} onChange={handleConnectorRadioChange}>
                                      {singleBox?.connectorId_fk.map((c,index) => (
                                        <>
                                          <Col
                                            xl={2}
                                            lg={2}
                                            md={3}
                                            xs={3}
                                            sm={3}
                                            className="text-center rounded-sm">
                                            <img
                                              style={{
                                                width: '100%'
                                              }}
                                              className="connector_icon"
                                              src={c.connectorImage}
                                              alt=".."
                                            />
                                          </Col>
                                          <Col 
                                            style={{flexDirection: 'row'}}
                                            className="text-align-center d-flex justify-content-between"
                                            xl={10}
                                            lg={10}
                                            md={9}
                                            sm={9}
                                            xs={9}>
                                            <div>
                                              <Heading>
                                                {c?.connectorTypeName}
                                              </Heading>
                                              <CardParagraph  >
                                                <div> 
                                                  {
                                                    chargeBoxConnector?.results.filter(
                                                      (cId) =>
                                                        cId.connectorId_pk ===
                                                        c.connectorId_pk
                                                    )?.length
                                                  }{' '}
                                                  plug  1 station
                                                  
                                                </div>
                                              </CardParagraph>
                                            </div>
                                            <div>
                                              <FormControlLabel value={c.connectorId_pk} control={<Radio color="primary"/>}  />
                                            </div>
                                          </Col>
                                        </>
                                      ))}
                                    </RadioGroup>
                                  </Row>
                                </Container>
                              </TextColor>
                            </Card>
                          )}
                        </div>
                        {singleBox?.isPOS ? <div className="card-div my-3 mx-4">
                          {mainLoading ? (
                            <SkeletonTheme
                              className="ml-2"
                              color="#2c3658"
                              highlightColor="#253053">
                              <Skeleton width={270} height={160} />
                            </SkeletonTheme>
                          ) : (
                            <Card className="card-box mb-5 p-4">
                              <TextColor>
                                <H5>Applied Tariff</H5>

                                <div className="container-fluid">
                                  <div className="row  align-items-center py-2">
                                    <>
                                      <div className="col-2 p-0 text-center">
                                        <FontAwesomeIcon
                                          icon={['fas', 'dollar-sign']}
                                        />
                                      </div>
                                      <div className="col-10 p-0">
                                        <Heading>
                                          {
                                            singleBox?.applicable_pp
                                              ?.profilename
                                          }
                                        </Heading>
                                        <CardParagraph>
                                          {`${
                                            singleBox?.applicable_pp?.rates?.[0]
                                              ?.profilepriceunit
                                          }RM
                                    (${
                                      singleBox?.applicable_pp?.rates?.[0]
                                        ?.profilepricetype === 'profilePM'
                                        ? 'Per Minute'
                                        : 'Per Kilo Watt'
                                    })`}
                                        </CardParagraph>
                                      </div>
                                    </>
                                  </div>
                                </div>
                              </TextColor>
                            </Card>
                          )}
                        </div> : '' }
                        {/* <div className="card-div my-3 mx-4">
                          {mainLoading ? (
                            <SkeletonTheme
                              className="ml-2"
                              color="#2c3658"
                              highlightColor="#253053">
                              <Skeleton width={270} height={160} />
                            </SkeletonTheme>
                          ) : (
                            <Card className="card-box mb-5 p-4">
                              <TextColor>
                                <H5>Applied Tariff</H5>

                                <div className="container-fluid">
                                  <div className="row  align-items-center py-2">
                                    <>
                                      <div className="col-2 p-0 text-center">
                                        <FontAwesomeIcon
                                          icon={['fas', 'dollar-sign']}
                                        />
                                      </div>
                                      <div className="col-10 p-0">
                                        <Heading>
                                          {
                                            singleBox?.applicable_pp
                                              ?.profilename
                                          }
                                        </Heading>
                                        <CardParagraph>
                                          {`${
                                            singleBox?.applicable_pp?.rates?.[0]
                                              ?.profilepriceunit
                                          }RM
                                    (${
                                      singleBox?.applicable_pp?.rates?.[0]
                                        ?.profilepricetype === 'profilePM'
                                        ? 'Per Minute'
                                        : 'Per Kilo Watt'
                                    })`}
                                        </CardParagraph>
                                      </div>
                                    </>
                                  </div>
                                </div>
                              </TextColor>
                            </Card>
                          )}
                        </div> */}
                        {/* <div className="card-div my-3 mx-4">
                          <Card className="card-box mb-5 p-4 text-center">
                            <div className="d-flex align-items-center mx-auto">
                              <Badge
                                color={statusColor}
                                className="badge-circle mx-2 pulse-animation">
                                total
                              </Badge>
                              <span className="d-20 w-auto text-black-50 font-size-sm"></span>
                            </div>
                            <div className="py-4 my-2">
                              <Progress
                                value={100}
                                strokeWidth={30}
                                className="progress-animated-alt progress-lg"
                                color="success"></Progress>
                            </div>
                          </Card>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={feedback}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="walkinUserDialog"
        onClose={handleToggleFeedback}>
        <DialogTitle id="alert-dialog-title">{'Feedback'}</DialogTitle>
        <DialogContent
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
          }}>
          <DialogContentText id="alert-dialog-description">
            <FormControl component="fieldset">
              <div className="rate-select">
                <input name="satisfaction" type="hidden"></input>
                <Row>
                  {/* <Typography>Rate Satisfaction</Typography> */}

                  {buffer.map((obj, index) => {
                    return (
                      <Col
                        onClick={toggleSelected(index)}
                        className={selected == index ? 'selected' : ''}>
                        {obj}
                      </Col>
                    );
                  })}

                  {/* <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">How satisfied are you?</Typography>
              <Rating name="satisfaction_rate" value={ratings} />
              </Box> */}
                </Row>
              </div>
              <div className="justify-content-center mt-2">
                <FormLabel component="legend">
                  Likelihood to Recommend
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="recommend"
                  defaultValue=""
                  onChange={(e) => {
                    setFeedbackform({
                      ...feedbackform,
                      recommend: e.target.value === 'yes' ? true : false
                    });
                  }}>
                  <FormControlLabel
                    value={'yes'}
                    control={<Radio color="primary" />}
                    label="Yes"
                    // labelPlacement="top"
                  />
                  <FormControlLabel
                    value={'no'}
                    control={<Radio color="primary" />}
                    label="No"
                    // labelPlacement="top"
                  />
                </RadioGroup>
              </div>

              <Row className="justify-content-center mt-2">
                <Col>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender1"
                    onChange={(e) => {
                      setFeedbackform({
                        ...feedbackform,
                        gender: e.target.value
                      });
                    }}>
                    <FormControlLabel
                      value="male"
                      control={<Radio color="primary" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio color="primary" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio color="primary" />}
                      label="Other"
                    />
                  </RadioGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Typography id="discrete-slider-always" gutterBottom>
                    Age
                  </Typography>
                  <Slider
                    defaultValue={35}
                    name="age"
                    onChange={(e, v) => {
                      setFeedbackform({ ...feedbackform, age_group: v });
                    }}
                    // valueLabelFormat={valueLabelFormat}
                    // getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    step={5}
                    marks
                    min={20}
                    max={85}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextareaAutosize
                    style={{ border: '1px solid', width: 'inherit' }}
                    content
                    aria-label="minimum height"
                    minRows={3}
                    maxRows={6}
                    placeholder="Leave your comments"
                    onChange={(e) => {
                      setFeedbackform({
                        ...feedbackform,
                        feedback_content: e.target.value
                      });
                    }}
                  />
                </Col>
              </Row>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button  color="primary" autoFocus>
          Submit
          </Button> */}
          <LaddaButton
            color="primary"
            loading={isLoading}
            data-size={XL}
            onClick={onSubmitHandler}
            className="btn btn-primary font-weight-bold w-50 my-2">
            Submit
          </LaddaButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={waiverDialogue}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'BIJAU program policy'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            I hereby agree to be part of BIJAU program by Boustead Holdings
            Berhad (“BHB”) to experience by testing the Electric Vehicle
            Chargers provided to me, at no cost. I agree to indemnify BHB, BHB
            group of companies, its’ subsidiaries and affiliates, partners
            service providers, employees, directors and agents in full against
            all claims, damages, losses, liabilities, expenses, demands,
            actions, penalties and costs, arising out of or in connection with
            my access or use of the BIJAU Electric Vehicle Charging services, my
            negligence, or any omission, act or breach of this terms of use by
            myself or any other persons using my vehicle (whether or not
            expressly authorised by me).
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-around' }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheck}
                checked={checked}
                name="checkedB"
                color="primary"
                className="mr-2"
              />
            }
            label="Yes, I understand"
          />
          <Button
            disabled={checked === false}
            onClick={agreeHandle}
            color="primary"
            autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default styled(LivePreviewExample)`
  @media screen and (max-width: 758px) {
    .hero-wrapper {
      margin: 0px !important;
    }
    .card-div {
      margin: 0px !important;
    }
    .container {
      padding: 10px !important;
    }
    .dropzone {
      width: 140px;
    }
    .btngrp {
      margin: 0px !important;
    }
    .btn-grp-div {
      text-align: center;
    }
    .btn-tag {
      margin-left: 4%;
    }
    .text-tag {
      margin-left: 8%;
    }
    .text2 {
      font-size: 12px;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
  }
  .btn-tag {
    margin-left: 6px;
  }
  .btn-grp-div {
    width: 100%;
  }
`;
