import AddChargebox from 'components/ChargingStation/AddChargeBox';
import { ExampleWrapperSeamless, PageTitle } from 'layout-components';
import React from 'react';

function AddChargeBox() {
  return (
    <>
      <PageTitle
        titleHeading="Add Charging Box"
        // titleDescription="Take advantage of these extensive, easy to customize statistics component blocks."
      />

      <ExampleWrapperSeamless>
        <AddChargebox />
      </ExampleWrapperSeamless>
    </>
  );
}
export default AddChargeBox;
