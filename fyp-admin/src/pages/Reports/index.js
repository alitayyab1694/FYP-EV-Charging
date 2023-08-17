import ReportsComponent from 'components/Reports';
import { PageTitle } from 'layout-components';
import React from 'react';

function Reports() {
  return (
    <>
      <PageTitle
        titleHeading="Report"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <ReportsComponent />
    </>
  );
}
export default Reports;
