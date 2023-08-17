import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { UncontrolledTooltip } from 'reactstrap';
import {
  setSidebarToggle,
  setSidebarToggleMobile
} from 'reducers/ThemeOptions';

const SidebarHeader = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const {
    sidebarToggleMobile,
    setSidebarToggleMobile,

    sidebarToggle,
    setSidebarToggle
  } = props;

  return (
    <>
      <div className="app-sidebar--header">
        <div className="app-sidebar-logo">
          <div className="">
            {/* <img
              alt="Bamburgh React Admin Dashboard with Reactstrap PRO"
              // src={logo}
            /> */}
          </div>
        </div>
        <button
          className={clsx(
            'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
            { 'is-active': sidebarToggleMobile }
          )}
          onClick={toggleSidebarMobile}>
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <button
          onClick={toggleSidebar}
          className="expand-sidebar-btn btn btn-sm"
          id="ExpandSidebarTooltip">
          <FontAwesomeIcon icon={['fas', 'arrows-alt-h']} />
        </button>
        <UncontrolledTooltip
          target="ExpandSidebarTooltip"
          container=".app-sidebar"
          placement="right">
          Expand sidebar
        </UncontrolledTooltip>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggle: (enable) => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader);
