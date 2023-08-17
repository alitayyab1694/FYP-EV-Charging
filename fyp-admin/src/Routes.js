import { AnimatePresence, motion } from "framer-motion";
import Connector from "pages/Connector";
import Evse from "pages/Evse";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  withRouter,
} from "react-router-dom";
import { getDashboardInfo } from "store/reducer/appReducerSlice";
// import { setHeaderDrawerToggle } from 'reducers/ThemeOptions';
import { setHeaderDrawerToggle } from "store/reducer/themeOptionsSlice";
// ------------------------------- Private Routes --------------------------------
import PrivateRoute from "utils/PrivateRoute";
// Layout Blueprints
import { LeftSidebar, MinimalLayout } from "./layout-blueprints";
import AddChargeBox from "./pages/ChargingStation/AddChargeBox";
import ListChargingBox from "./pages/ChargingStation/ListChargingBox";
import AddCompany from "./pages/Company/AddCompany";
import ListCompany from "./pages/Company/ListCompany";
import CPO from "./pages/CPO";
import Customer from "./pages/Customer/ListCustomer";
import DashboardPage from "./pages/Dashboard";
import AddLocation from "./pages/Location";
import PageError404 from "./pages/PageError404";
import PageLoginCover from "./pages/PageLoginCover";
import PageRecoverCover from "./pages/PageRecoverCover";
import PageRegisterCover from "./pages/PageRegisterCover";
import AddPolicyTags from "./pages/PolicyTags/AddPolicyTags";
import ListPolicyTags from "./pages/PolicyTags/ListPolicyTags";
import AddPricingPolicy from "./pages/PricingPolicy/AddPricingPolicy";
import ListPricingPolicy from "./pages/PricingPolicy/ListPricingPolicy";
import AddRates from "./pages/Rates/AddRates";
import ListRates from "./pages/Rates/ListRates";
import ListFeedback from "./pages/Feedback/FeedbackList";
import Reports from "./pages/Reports";
import ListReservations from "./pages/Reservation/ListReservations";
import AddGroup from "./pages/TariffGroup/AddGroup";
import GroupList from "./pages/TariffGroup/ListGroup";
import UserAddGroup from "./pages/UserGroup/AddGroup";
import UserGroupList from "./pages/UserGroup/ListGroup";
import UserList from "./pages/UserList";
const Routes = () => {
  useEffect(() => {
    // dispatch(getDashboardInfo());
    dispatch(setHeaderDrawerToggle(false));
  }, []);
  const dispatch = useDispatch();
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.01,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <AnimatePresence>
      <Switch>
        <Redirect exact from="/" to="/chargeboxes" />
        <Route
          path={[
            "/Dashboard",
            "/User",
            "/Add-Group/:groupId?",
            "/Group-List",
            "/Add-Pricing-Policy/:policyId?",
            "/List-Pricing-Policy",
            "/chargeboxes",
            "/chargeboxes/:chargeBoxId?",
            "/List-User-Group",
            "/Add-User-Group/:groupId?",
            "/List-Company",
            "/Add-Company/:companyId?",
            "/List-Reservation",
            "/Add-Rates/:rateId?",
            "/List-Rates",
            "/List-Feedbacks",
            "/List-Customer",
            "/Update-Customer-Policy/:userId?",
            "/policy-tag/:tagId?",
            "/List-Policy-Tag",
            "/reports",
            // '/Location',
            "/Add-Evse",
            "/Add-Connector",
            "/CPO-Hierarchy",
          ]}
        >
          <LeftSidebar>
            <Switch location={location} key={location.pathname}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PrivateRoute path="/CPO-Hierarchy" component={CPO} />
                <PrivateRoute path="/List-User" component={UserList} />
                <PrivateRoute
                  path="/User/:userId"
                  component={AddChargeBox}
                />
                <PrivateRoute
                  path="/Add-Group/:groupId?"
                  component={AddGroup}
                />
                <PrivateRoute path="/Group-List" component={GroupList} />
                <PrivateRoute
                  exact
                  path="/chargeboxes"
                  component={ListChargingBox}
                />
                <PrivateRoute
                  path="/chargeboxes/:chargeBoxId"
                  component={AddChargeBox}
                />
                <PrivateRoute
                  path="/Add-Pricing-Policy/:policyId?"
                  component={AddPricingPolicy}
                />
                <PrivateRoute
                  path="/List-Pricing-Policy"
                  component={ListPricingPolicy}
                />
                <PrivateRoute
                  path="/List-User-Group"
                  component={UserGroupList}
                />
                <PrivateRoute
                  path="/Add-User-Group/:groupId?"
                  component={UserAddGroup}
                />
                <PrivateRoute path="/List-Company" component={ListCompany} />
                <PrivateRoute
                  path="/Add-Company/:companyId?"
                  component={AddCompany}
                />
                <PrivateRoute
                  path="/List-Reservation"
                  component={ListReservations}
                />
                <PrivateRoute path="/Add-Rates/:rateId?" component={AddRates} />
                <PrivateRoute path="/List-Rates" component={ListRates} />
                <PrivateRoute path="/List-Feedbacks" component={ListFeedback} />
                <PrivateRoute path="/List-Customer" component={Customer} />
                <PrivateRoute
                  path="/policy-tag/:tagId?"
                  component={AddPolicyTags}
                />
                <PrivateRoute
                  path="/List-Policy-Tag"
                  component={ListPolicyTags}
                />
                <PrivateRoute path="/reports" component={Reports} />
                {/* <PrivateRoute path="/Location" component={AddLocation} /> */}
                {/* <PrivateRoute path="/Add-Evse" component={Evse} /> */}
                {/* <PrivateRoute path="/Add-Connector" component={Connector} /> */}
              </motion.div>
            </Switch>
          </LeftSidebar>
        </Route>

        <Route
          path={["/Login", "/Register", "/PageError404", "/Forgot-Password"]}
        >
          <MinimalLayout>
            <Switch location={location} key={location.pathname}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Route path="/Login" component={PageLoginCover} />

                <Route path="/Register" component={PageRegisterCover} />
                <Route path="/Forgot-Password" component={PageRecoverCover} />

                <Route path="/PageError404" component={PageError404} />
                {/* <Route path="/PageError500" component={PageError500} />
                  <Route path="/PageError505" component={PageError505} /> */}
              </motion.div>
            </Switch>
          </MinimalLayout>
        </Route>
        <Route path={"*"}>
          <MinimalLayout>
            <Switch location={location} key={location.pathname}>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Redirect exact from="*" to="/PageError404" />
              </motion.div>
            </Switch>
          </MinimalLayout>
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default withRouter(Routes);
