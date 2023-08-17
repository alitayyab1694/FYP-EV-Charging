import React from 'react';
import { Card, CardBody } from 'reactstrap';

const index = ({ children }) => {
  return (
    <Card>
      <CardBody style={{ boxSizing: 'border-box', padding: 0 }}>
        <div className="p-3">{children}</div>
      </CardBody>
    </Card>
  );
};

export default index;
