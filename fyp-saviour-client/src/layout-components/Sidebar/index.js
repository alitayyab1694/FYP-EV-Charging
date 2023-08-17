import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { setSidebarToggleMobile } from 'reducers/ThemeOptions';
import { SidebarHeader, SidebarMenu } from '../../layout-components';

const Sidebar = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  const {
    sidebarStyle,
    sidebarShadow,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;
  return (
    <>
      <div
        className={clsx('app-sidebar', sidebarStyle, {
          'app-sidebar--shadow': sidebarShadow
        })}>
        <SidebarHeader />
        <div className="app-sidebar--content">
          <SidebarMenu />
        </div>
      </div>
      <div
        onClick={toggleSidebarMobile}
        className={clsx('app-sidebar-overlay', {
          'is-active': sidebarToggleMobile
        })}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarShadow: state.ThemeOptions.sidebarShadow,
  sidebarFooter: state.ThemeOptions.sidebarFooter,
  sidebarStyle: state.ThemeOptions.sidebarStyle,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
