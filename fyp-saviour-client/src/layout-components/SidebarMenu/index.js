import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Actions from "Actions";
import Card from "custom-components/Card";
import PaymentModel from "custom-components/models/CardPayment";
import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import {
  setHeaderDrawerToggle,
  setSidebarToggleMobile,
} from "reducers/ThemeOptions";
import styled from "styled-components";
import SidebarUserbox from "../SidebarUserbox";
import Radio from "@material-ui/core/Radio";
import { useLocation, useParams } from "react-router";
import qs from "querystringify";
import { getLocalStorage, Toaster } from "utils";
import * as Type from "Actions/type";

const Text = styled.p`
  font-size: 12px;
  margin: 10px 0px 0px 0px;
`;

const CardParagraph = styled.p`
  font-size: 12px;
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

const SidebarMenu = (props) => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const {
    user,
    chargeBox,
    mainLoading,
    chargeBoxConnector,
    isLoginModel,
    chargeBoxUser,
    pgUser,
    singleBox,
    isPaymentModel,
  } = useSelector((state) => ({
    user: state.user,
    chargeBox: state.appReducer.chargeBoxInfo,
    chargeBoxPolicy: state.appReducer.chargeBoxPolicy,
    singleBox: state.appReducer.singleBox,
    chargeBoxUser: state.appReducer.chargeBoxUser,
    pgUser: state.appReducer.pgUser,
    chargeBoxConnector: state.appReducer.chargeBoxConnector,
    selectedConnector: state.appReducer.selectedConnector,
    mainLoading: state.appReducer.isLoading,
    isLoginModel: state.model.login,
    isPaymentModel: state.model.payment,
  }));

  const {
    sidebarToggleMobile,
    setSidebarToggleMobile,
    sidebarUserbox,
    headerDrawerToggle,
    setHeaderDrawerToggle,
    sidebarToggle,
  } = props;
  const [connector, setConnector] = React.useState("");
  const toogleHeaderDrawer = () => {
    setHeaderDrawerToggle(true);
  };
  const toggleSideBarOnClick = () => {
    // setSidebarToggleMobile(!sidebarToggle);
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const modelHandler = (d) => {
    if (pgUser?.Auth) {
        toogleHeaderDrawer();
        toggleSideBarOnClick();
    } else {
      Toaster("error", "Please Login/Register to proceed");
      dispatch(Actions.loginModel(!isLoginModel));
      toggleSideBarOnClick();
    }
  };
  const paymentModelHandler = () => {
    dispatch(Actions.paymentModel(!isPaymentModel));
  };
  const handleConnectorRadioChange = (event) => {
    setConnector(event.target.value);

    dispatch({
      type: Type.SINGLE_CHARGE_BOX_SELETED_CONNECTOR,
      payload: event.target.value,
    });
  };
  return (
    <div className="className">
      <PaymentModel open={isPaymentModel} handleModal={paymentModelHandler} />
      <PerfectScrollbar>
        {sidebarUserbox && <SidebarUserbox />}
        <div className="sidebar-navigation">
          <ul>
            <li>
              <div className="d-flex justify-content-between my-3 mx-4">
                <Button
                  onClick={() => modelHandler(chargeBox)}
                  size="sm"
                  color="primary"
                >
                  Reserve Now
                </Button>

                
              </div>
            </li>
             <li>
              <div className="d-flex bg-white justify-content-between my-3 mx-4">
                {chargeBox?.misc?.desc}
              </div>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarToggle: state.ThemeOptions.sidebarToggle,

  headerDrawerToggle: state.ThemeOptions.headerDrawerToggle,
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
  setHeaderDrawerToggle: (enable) => dispatch(setHeaderDrawerToggle(enable)),
});

export default styled(
  connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)
)`
  .connector_icon {
    width: 100%;
  }
`;
