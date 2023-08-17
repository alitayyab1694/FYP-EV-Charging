import Evses from 'components/Location/components/Evses';
import { ExampleWrapperSeamless, PageTitle } from 'layout-components';
import React from 'react';
import styled from 'styled-components';
function AddEvse() {
  return (
    <>
      <PageTitle
        titleHeading="Add Charging Box"
        titleDescription="Take advantage of these extensive, easy to customize statistics component blocks."
      />

      <ExampleWrapperSeamless>
        <Evses />
      </ExampleWrapperSeamless>
    </>
  );
}
export default styled(AddEvse)``;
