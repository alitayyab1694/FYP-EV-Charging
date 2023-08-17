import Dashboard1 from 'components/Dashboard';
import Dashboard from 'custom-components/Dashboard';
import React from 'react';
import { ExampleWrapperSeamless, PageTitle } from '../../layout-components';
function BlocksStatistics() {
  return (
    <>
      <PageTitle
        titleHeading="Dashboard"
        titleDescription="Take advantage of these extensive, easy to customize statistics component blocks."
      />

      <ExampleWrapperSeamless>
        <Dashboard1 />
      </ExampleWrapperSeamless>
      <ExampleWrapperSeamless>
        <Dashboard />
      </ExampleWrapperSeamless>
    </>
  );
}
export default BlocksStatistics;
