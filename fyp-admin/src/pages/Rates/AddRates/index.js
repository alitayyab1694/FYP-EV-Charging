import AddRates1 from 'components/Rates/AddRates';
import { ExampleWrapperSimple, PageTitle } from 'layout-components';
import React from 'react';

function GroupList() {
  return (
    <>
      <PageTitle titleHeading="Rates" />
      <ExampleWrapperSimple>
        <AddRates1 />
      </ExampleWrapperSimple>
    </>
  );
}
export default GroupList;
