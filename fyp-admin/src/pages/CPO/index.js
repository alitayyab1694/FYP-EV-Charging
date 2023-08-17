import CPO1 from 'components/CPO';
import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../../layout-components';

function CPO({ className }) {
  return (
    <div className={className}>
      <PageTitle
        titleHeading="CPO's"
        titleDescription="Take advantage of these extensive, easy to customize statistics component blocks."
      />

      {/* <ExampleWrapperSeamless> */}
      <CPO1 />
      {/* </ExampleWrapperSeamless> */}
    </div>
  );
}
export default styled(CPO)`
  .react-flow {
    height: 100%;
    overflow: visible !important;
    position: relative;
    width: 100%;
  }
`;
