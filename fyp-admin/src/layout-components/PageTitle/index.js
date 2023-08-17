import React, { useState, useEffect } from 'react';

import clsx from 'clsx';

import { Button } from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PieChart } from 'react-feather';

const PageTitle = (props) => {
  const location = useLocation();
  const [imageSource, setImageSource] = useState('');
  const {
    pageTitleStyle,
    pageTitleBackground,
    pageTitleShadow,
    pageTitleIconBox,
    pageTitleDescription,
    titleHeading,
    titleDescription,
    children
  } = props;

  useEffect(() => {
    if (location.pathname.split('/')[1] === 'Add-Charge-Box') {
      setImageSource(
        // process.env.REACT_APP_QR_CODE + location.pathname.split('/')[2]
        'https://csms-bucket.s3.ap-southeast-1.amazonaws.com/qr_codes/qr_code-' +
          location.pathname.split('/')[2]
      );
    }
  }, []);

  return (
    <>
      <div
        className={clsx('app-page-title', pageTitleStyle, pageTitleBackground, {
          'app-page-title--shadow': pageTitleShadow
        })}>
        <div>
          <div className="app-page-title--first">
            {pageTitleIconBox && (
              <div className="app-page-title--iconbox d-70">
                <div className="d-70 d-flex align-items-center justify-content-center">
                  <PieChart className="display-2 text-primary" />
                </div>
              </div>
            )}
            <div className="app-page-title--heading">
              <h1>{titleHeading}</h1>
              {pageTitleDescription && (
                <div className="app-page-title--description">
                  {titleDescription}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* {location &&
          location.pathname !== '/add-Pricing-Policy' &&
          location.pathname !== '/Dashboard' && (
            <div className="d-flex align-items-center">
              {children}
              <Button color="primary">Add New</Button>
            </div>
          )} */}
        {location.pathname.split('/')[1] === 'Add-Charge-Box' &&
          location.pathname.split('/')[2] !== 'new' && (
            <div>
              <img
                width="170px"
                height="170px"
                src={`${imageSource}.png`}
                alt="qr-code"
              />
            </div>
          )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  pageTitleStyle: state.ThemeOptions.pageTitleStyle,
  pageTitleBackground: state.ThemeOptions.pageTitleBackground,
  pageTitleShadow: state.ThemeOptions.pageTitleShadow,
  pageTitleIconBox: state.ThemeOptions.pageTitleIconBox,
  pageTitleDescription: state.ThemeOptions.pageTitleDescription
});

export default connect(mapStateToProps)(PageTitle);
