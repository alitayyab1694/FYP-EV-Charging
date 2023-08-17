import * as API from 'api';
import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { Button, Col, Row, UncontrolledTooltip } from 'reactstrap';
// import { setHeaderDrawerToggle } from 'reducers/ThemeOptions';
import { setHeaderDrawerToggle } from 'store/reducer/themeOptionsSlice';
import styled from 'styled-components';

const HeaderDrawer = (props) => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [next, setNext] = useState(null);
  const dispatch = useDispatch();
  const { selectedCharge } = useSelector((state) => state.appReducer);
  const { selectedCustomer } = useSelector((state) => state.appReducer);
  const [drawerDate, setDrawerDate] = useState([]);
  const { headerDrawerToggle, headerDrawerToggleCustomer } = useSelector(
    (state) => ({
      headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,
      headerDrawerToggleCustomer: state.ThemeOptions.headerDrawerToggleCustomer,
      chargeBoxData: state.appReducer.chargeBox?.results?.find(
        (box) => box.chargeboxid === state?.appReducer?.selectedCharge
      )
    })
  );
  useEffect(() => {
    dispatch(setHeaderDrawerToggle(false));
  }, [pathname]);
  useEffect(() => {
    setDrawerDate([]);
  }, [headerDrawerToggle]);

  useEffect(() => {
    const fetchData = async () => {
      let type = ''; //type =>chargebox_id , user_id
      let selectedId = ''; //selectedId=> selectedCharge, selectedCustomer
      if (!headerDrawerToggleCustomer && selectedCharge) {
        type = 'chargebox_id';
        selectedId = selectedCharge;
      } else if (headerDrawerToggleCustomer && selectedCustomer) {
        type = 'user_id';
        selectedId = selectedCustomer;
      }
      try {
        setIsLoading(true);
        const response = await API.get(
          `/single-chargebox-repo?${type}=${selectedId}`
        );
        setNext(response.next);
        setDrawerDate(response.results);
        setIsLoading(false);
      } catch (error) {
        console.log('error', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCharge, headerDrawerToggle, selectedCustomer]);

  const toogleHeaderDrawer = () => {
    dispatch(setHeaderDrawerToggle(!headerDrawerToggle));
  };

  const scrollDownHandler = async () => {
    if (next) {
      try {
        setScrollLoading(true);
        const response = await axios.get(next);
        setNext(response.data.next);
        setDrawerDate([...drawerDate, ...response.data.results]);
        setScrollLoading(false);
      } catch (error) {
        console.log('error', error);
        setScrollLoading(false);
      }
    }
  };

  return (
    <>
      <div className="app-drawer-content">
        <Button
          onClick={toogleHeaderDrawer}
          className="close-drawer-btn btn btn-sm"
          id="CloseDrawerTooltip">
          <div
            className={clsx('navbar-toggler hamburger hamburger--elastic', {
              'is-active': headerDrawerToggle
            })}>
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </div>
        </Button>
        <UncontrolledTooltip target="CloseDrawerTooltip" placement="left">
          Close drawer
        </UncontrolledTooltip>
        <div className="vh-100 shadow-overflow">
          {isLoading ? (
            <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
              <div className="d-flex align-items-center flex-column px-4">
                <CircleLoader color={'#2f2f2f'} loading={true} />
              </div>
              <div className="text-muted font-size-xl text-center pt-3">
                Please wait while we load.....
              </div>
            </div>
          ) : (
            <>
              <div className="p-4">
                <div className="text-center">
                  <p className="font-size-lg text-black-50">
                    Evap Chargers Billing Info
                  </p>
                </div>
              </div>
              <div className="divider" />
              <div className="px-4 text-center">
                <Row>
                  <Col sm="12" md="6">
                    <div className="font-weight-bold font-size-lg text-black my-3">
                      Transaction - Revenue Collected from End User
                    </div>
                    <hr />

                    <PerfectScrollbar
                      onYReachEnd={scrollDownHandler}
                      className="post-scrollerparant">
                      {drawerDate?.map((charge, ind) => {
                        return (
                          <>
                            <div
                              key={ind}
                              className="d-flex justify-content-between align-items-center">
                              <div className="font-size-md text-black text-left">
                                Applied Rate
                              </div>
                              <span className="opacity-6 pb-2 ">
                                {charge?.applied_rate}&nbsp;RM
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-size-md text-black text-left">
                                Date
                              </div>
                              <div className=" font-size-lg">
                                {moment(charge.reserveDate).format(
                                  'YYYY-MM-DD'
                                )}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-size-md text-black text-left">
                                Time
                              </div>
                              <div className=" font-size-lg">
                                {`${moment
                                  .utc(
                                    `${charge?.reserveDate.split('T')[0]} ${
                                      charge?.reserveStartTime
                                    }`
                                  )

                                  .local()
                                  .format('HH:mm:ss')} |
                                ${moment
                                  .utc(
                                    `${charge?.reserveDate.split('T')[0]} ${
                                      charge?.reserveExpiryTime
                                    }`
                                  )
                                  .local()
                                  .format('HH:mm:ss')}`}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-size-md text-black text-left">
                                Sub-Total Price
                              </div>
                              <div className=" font-size-lg">
                                {charge?.reservation_price}&nbsp; RM
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-size-md text-black text-left">
                                Sub-Total Consumption
                              </div>
                              <div className=" font-size-lg">
                                {charge?.reservation_consumption}&nbsp; kW
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-size-md text-black text-left">
                                Distance Cover
                              </div>
                              <div className=" font-size-lg">
                                {charge?.reservation_distance}&nbsp; km
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="font-size-md text-black text-left">
                                Co2 Reduction
                              </div>
                              <div className=" font-size-lg">
                                {charge?.reservation_co2_reduction}&nbsp; kg
                              </div>
                            </div>

                            <hr />
                          </>
                        );
                      })}
                      {scrollLoading && (
                        <div className="d-flex align-items-center flex-column justify-content-center text-center py-3">
                          <div className="d-flex align-items-center flex-column px-4">
                            <CircleLoader color={'#2f2f2f'} loading={true} />
                          </div>
                          <div className="text-muted font-size-xl text-center pt-3">
                            Please wait while we load.....
                          </div>
                        </div>
                      )}
                    </PerfectScrollbar>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="font-size-md text-black text-left">
                        Total Price
                      </div>
                      <div className="font-weight-bold font-size-lg">
                        {drawerDate
                          .reduce(
                            (acc, charge) =>
                              acc + parseFloat(charge?.reservation_price),
                            0
                          )
                          .toFixed(2)}
                        &nbsp; RM
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="font-size-md text-black text-left">
                        Total Consumption
                      </div>
                      <div className="font-weight-bold font-size-lg">
                        {drawerDate
                          .reduce(
                            (acc, charge) =>
                              acc + parseFloat(charge?.reservation_consumption),
                            0
                          )
                          .toFixed(2)}
                        &nbsp; kW
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="font-size-md text-black text-left">
                        Total Co2 Reduction
                      </div>
                      <div className="font-weight-bold font-size-lg">
                        {drawerDate
                          .reduce(
                            (acc, charge) =>
                              acc +
                              parseFloat(charge?.reservation_co2_reduction),
                            0
                          )
                          .toFixed(2)}
                        &nbsp; kg
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="6">
                    <div className="font-weight-bold font-size-lg text-black my-3">
                      Usage - TNB Charges to CPO
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between ">
                      <div className="font-size-md text-black text-left">
                        Available Rate
                      </div>
                      <div className="font-size-md font-weight-bold text-black text-left">
                        59 cents
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="font-size-md text-black text-left">
                        Total Consumption
                      </div>
                      <div className="font-size-md text-black font-weight-bold text-left">
                        {drawerDate
                          .reduce(
                            (acc, charge) =>
                              acc + parseFloat(charge?.reservation_consumption),
                            0
                          )
                          .toFixed(2)}
                        &nbsp; kW
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <div className="font-size-md text-black text-left">
                        Current Month Total
                      </div>
                      <div className="font-size-md font-weight-bold text-black text-left">
                        {(
                          (drawerDate
                            .reduce(
                              (acc, charge) =>
                                acc +
                                parseFloat(charge?.reservation_consumption),
                              0
                            )
                            .toFixed(2) *
                            59) /
                          100
                        ).toFixed(2)}
                        &nbsp; RM
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="font-size-md text-black text-left">
                        Total Rebate Applied
                      </div>
                      <div className="font-size-md text-black text-left font-weight-bold">
                        0&nbsp;RM
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="font-size-md text-black text-left">
                        Total Bill
                      </div>
                      <div className="font-size-md font-weight-bold text-black text-left">
                        {(
                          (drawerDate
                            .reduce(
                              (acc, charge) =>
                                acc +
                                parseFloat(charge?.reservation_consumption),
                              0
                            )
                            .toFixed(2) *
                            59) /
                          100
                        ).toFixed(2)}
                        &nbsp; RM
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default styled(HeaderDrawer)``;
