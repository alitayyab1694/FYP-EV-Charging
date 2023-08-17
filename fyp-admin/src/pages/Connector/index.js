import Connector from 'components/Location/components/connector';
import { ExampleWrapperSeamless, PageTitle } from 'layout-components';
import React from 'react';
import styled from 'styled-components';
function AddConnector() {
  return (
    <>
      <PageTitle
        titleHeading="Add Charging Box"
        titleDescription="Take advantage of these extensive, easy to customize statistics component blocks."
      />

      <ExampleWrapperSeamless>
        <Connector />
      </ExampleWrapperSeamless>
    </>
  );
}
export default styled(AddConnector)``;
