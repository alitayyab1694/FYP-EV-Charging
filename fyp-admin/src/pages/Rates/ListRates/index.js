import RateList1 from 'components/Rates/RateList';
import { PageTitle } from 'layout-components';
import React from 'react';

function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="List Rates"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <RateList1 />
    </>
  );
}
export default GroupList;
