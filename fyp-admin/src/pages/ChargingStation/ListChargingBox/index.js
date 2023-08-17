import ListChargingbox1 from 'components/ChargingStation/ListChargingbox';
import { PageTitle } from 'layout-components';
import React from 'react';

function ListChargingbox() {
  return (
    <>
      <PageTitle
        titleHeading="ChargeBox List"
        // titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <ListChargingbox1 />
    </>
  );
}
export default ListChargingbox;
