import clsx from 'clsx';
import HeaderDrawer from 'layout-components/HeaderDrawer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HeaderDots from '../../layout-components/HeaderDots';
import HeaderUserbox from '../../layout-components/HeaderUserbox';
import { setSidebarToggleMobile } from '../../store/reducer/themeOptionsSlice';
const Header = (props) => {
  const dispatch = useDispatch();
  const {
    headerShadow,
    headerBgTransparent,
    sidebarToggleMobile
  } = useSelector((state) => ({
    headerShadow: state.ThemeOptions.headerShadow,
    headerBgTransparent: state.ThemeOptions.headerBgTransparent,
    sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
  }));
  const { className } = props;
  const toggleSidebarMobile = () => {
    dispatch(setSidebarToggleMobile(!sidebarToggleMobile));
  };

  return (
    <>
      <div
        className={clsx(`${className} app-header `, {
          'app-header--shadow': headerShadow,
          'app-header--opacity-bg': headerBgTransparent
        })}>
        <div className="app-header--pane">
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
        </div>
        <div className="app-header--pane">
          <HeaderDots />
          <HeaderUserbox />
          <HeaderDrawer />
        </div>
      </div>
    </>
  );
};

export default styled(Header)`
  .post-scrollerparant {
    height: calc(100vh - 280px);
  }
  .shadow-overflow::after {
    top: auto;
    bottom: 0;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
    background: none;
  }
`;
