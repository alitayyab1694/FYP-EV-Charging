import AddCompany1 from 'components/Company/AddCompany';
import { ExampleWrapperSimple, PageTitle } from 'layout-components';
import React from 'react';

function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="Company"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />
      <ExampleWrapperSimple>
        <AddCompany1 />
      </ExampleWrapperSimple>
    </>
  );
}
export default GroupList;
