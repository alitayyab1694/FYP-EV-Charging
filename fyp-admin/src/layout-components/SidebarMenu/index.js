import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useState } from 'react';
import { ChevronRight, Map, Users } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { setSidebarToggleMobile } from 'store/reducer/themeOptionsSlice';

const SidebarMenu = (props) => {
  const { setSidebarToggleMobile } = props;
 const {  user} = useSelector((state) => ({
    user: state.user,
  }));
  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const [elementsOpen, setElementsOpen] = useState({
    pricingpolicy: false,
    group: false,
    chargingBox: false,
    userGroup: false,
    company: false,
    reservation: false,
    policyTags: false,
    rates: false,
    reports: false,
    location: false,
    feedback: false,
    user:false
  });

  const toggleElements = (event) => {
    setElementsOpen({ ...elementsOpen, [event]: !elementsOpen[event] });
  };

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          <div className="sidebar-header">
            <span>Navigation menu</span>
          </div>
          <ul>
            {/* <li>
              <NavLink
                activeClassName="active"
                className="nav-link-simple"
                to="/Dashboard">
                <span className="sidebar-icon">
                  <FontAwesomeIcon icon={['far', 'chart-bar']} />
                </span>
                Dashboard
              </NavLink>
            </li> */}
            <li>
              <Link
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  toggleElements('chargingBox');
                }}
                className={clsx({ active: elementsOpen.chargingBox })}>
                <span className="sidebar-icon">
                  <FontAwesomeIcon icon={['fas', 'battery-three-quarters']} />
                </span>

                <span className="sidebar-item-label">Charging Station</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </Link>
              <Collapse isOpen={elementsOpen.chargingBox}>
                <ul>
                 {user?.company  && <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/chargeboxes/new">
                      Charging Box
                    </NavLink>
                  </li>}
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/chargeboxes">
                      List Charging Boxes
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
           
           
            
            <li>
              <NavLink
                activeClassName="active"
                className="nav-link-simple"
                to="/List-Reservation">
                <span className="sidebar-icon">
                  <FontAwesomeIcon icon={['far', 'calendar-plus']} />
                  {/* <Users /> */}
                </span>
                List Reservation
              </NavLink>
            </li>
            {!user.company && (
            <li>
              <Link
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  toggleElements('company');
                }}
                className={clsx({ active: elementsOpen.company })}>
                <span className="sidebar-icon">
                  <FontAwesomeIcon icon={['fas', 'battery-three-quarters']} />
                </span>

                <span className="sidebar-item-label">Company</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </Link>
              <Collapse isOpen={elementsOpen.company}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/Add-Company/new">
                     Company
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/List-Company">
                      List Charging Boxes
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            )}
            {!user?.company && (  <li>
              <Link
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  toggleElements('user');
                }}
                className={clsx({ active: elementsOpen.user })}>
                <span className="sidebar-icon">
                  <FontAwesomeIcon icon={['fas', 'battery-three-quarters']} />
                </span>

                <span className="sidebar-item-label">User</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </Link>
              <Collapse isOpen={elementsOpen.user}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/Add-User-Group/new">
                     User
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/List-User-Group">
                      List User
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>)}
          </ul>
        </div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
