import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { CardBody } from 'reactstrap';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Pointer = styled.div`
  cursor: pointer;
`;

const DashboardMenu = ({ color, number, label, icon, url }) => {
  const history = useHistory();
  return (
    <Pointer>
      <a
        onClick={() => {
          if (url) {
            history.push(url);
          }
        }}
        style={{
          background: color
        }}
        className="card card-box mb-5  text-white hover-scale-sm">
        <CardBody>
          <div className="align-box-row align-items-start p-1">
            <div className="my-auto">
              <h2 className="font-weight-bold mt-2">{number}</h2>
              <p className="text-white d-block mb-1 mt-2  text-uppercase">
                {label}
              </p>
            </div>
            <div className="ml-auto card-hover-indicator align-self-center">
              <FontAwesomeIcon size="5x" icon={['fa', icon]} />
            </div>
          </div>
        </CardBody>
      </a>
    </Pointer>
  );
};

export default DashboardMenu;
