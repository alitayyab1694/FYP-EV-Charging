import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Actions from "Actions";
import avatar8 from "assets/images/avatars/avatar8.jpg";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Badge,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink as NavLinkStrap,
  UncontrolledDropdown,
} from "reactstrap";
import { logoutUser } from "store/reducer/userSlice";

const HeaderUserbox = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pgUser } = useSelector((state) => state.appReducer);
  const user = useSelector((state) => state.user);
  return (
    <>
      <UncontrolledDropdown className="position-relative ml-2">
        <DropdownToggle
          color="link"
          className="p-0 text-left d-flex btn-transition-none align-items-center"
        >
          <div className="d-block p-0 avatar-icon-wrapper">
            <Badge color="success" className="badge-circle p-top-a">
              Online
            </Badge>
            <div className="avatar-icon rounded">
              <img src={avatar8} alt="..." />
            </div>
          </div>
          <div className="d-none d-xl-block pl-2">
            <div className="font-weight-bold">
              {pgUser?.fullname ? pgUser.fullname : "EVAP"}
            </div>
            <span className="text-black-50">
              {pgUser?.email ? pgUser.email : "Developer"}
            </span>
          </div>
          <span className="pl-1 pl-xl-3">
            <FontAwesomeIcon
              icon={["fas", "angle-down"]}
              className="opacity-5"
            />
          </span>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg overflow-hidden p-0">
          <ListGroup flush className="text-left bg-transparent">
            <ListGroupItem className="rounded-top">
              <Nav className="nav-neutral-primary flex-column">
                <NavItem>
                  <NavLinkStrap
                    onClick={(e) => {
                      e.preventDefault();
                      // if (!user.role || user.role.length === 0) {
                      //   // is guest
                      //   return;
                      // }
                      dispatch(logoutUser());
                      history.push("/login");
                    }}
                  >
                    Logout
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </ListGroupItem>
          </ListGroup>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default HeaderUserbox;
