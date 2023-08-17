// import Stepper from 'custom-components/models/Stepper';
import Stepper from 'custom-components/models/Stepper';
import { AnimatePresence, motion } from 'framer-motion';
import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import styled from 'styled-components';
import { getLocalStorage, setLocalStorage } from 'utils';
import { Redirect } from 'react-router-dom';

// Layout Blueprints
import { LeftSidebar, MinimalLayout } from './layout-blueprints';

// Example Pages
const Home = lazy(() => import('pages/Homepage'));
const Wallet = lazy(() => import('pages/Wallet'));
const ChargeBox = lazy(() => import('pages/Chargebox'));

const PageError404 = lazy(() => import('pages/PageError404'));
const Reservation = lazy(() => import('pages/Reservation'));

const Routes = (props) => {
  const { className } = props;
  const { pgUser } = useSelector((state) => ({
    pgUser: state.appReducer.pgUser
  }));
  const location = useLocation();
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };
  useEffect(() => {
    if (pgUser) {
      let data = getLocalStorage('evapUser', true, true);
      if (data?.startTransaction) {
        delete data.checkStatusStop;
        delete data.stopTransaction;
        setLocalStorage('evapUser', { ...data });
      }
      if (data.guest) {
        delete data.guest;
        delete data.user;
        delete data.name;
        setLocalStorage('evapUser', { ...data, pgUser });
      } else {
        data = {
          ...data,
          ...pgUser
        };
        setLocalStorage('evapUser', data);
      }
    } else {
      let data = getLocalStorage('evapUser', true, true);
      if (data?.startTransaction) {
        delete data.checkStatusStop;
        delete data.stopTransaction;
        setLocalStorage('evapUser', { ...data });
      }
      if (!data) {
        setLocalStorage('evapUser', {
          name: 'guest',
          user: 'guest',
          guest: true
        });
      } else if (!data?.guest) {
        setLocalStorage('evapUser', {
          ...data,
          name: 'guest',
          user: 'guest',
          guest: true
        });
      }
    }
  }, [pgUser]);
  const SuspenseLoading = () => {
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
  };
  // console.log('location.pathname: ', location.pathname);
  return (
    <AnimatePresence className={className}>
      {location.pathname === '/' && <Stepper />}

      <Suspense fallback={<SuspenseLoading />}>
        <Switch>
          <Route path={['/', '/wallet', '/chargebox/:id']}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/wallet" component={Wallet} />
                  <Route exact path="/reservation" component={Reservation} />
                  <Route exact path="/chargebox/:id" component={ChargeBox} />
                  <Route path="/PageError404" component={PageError404} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={'*'}>
            <MinimalLayout>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}>
                  <Redirect exact from="*" to="/PageError404" />
                </motion.div>
              </Switch>
            </MinimalLayout>
          </Route>
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

export default styled(Routes)``;
