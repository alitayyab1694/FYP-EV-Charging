import Location from 'components/Location';
import { ExampleWrapperSeamless, PageTitle } from 'layout-components';
import React from 'react';
import styled from 'styled-components';
function AddLocation() {
  return (
    <>
      <PageTitle
        titleHeading="Add Charging Box"
        titleDescription="Take advantage of these extensive, easy to customize statistics component blocks."
      />

      <ExampleWrapperSeamless>
        <Location />
      </ExampleWrapperSeamless>
    </>
  );
}
export default styled(AddLocation)``;
