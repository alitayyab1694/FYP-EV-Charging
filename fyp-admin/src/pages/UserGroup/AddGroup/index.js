import AddGroup1 from 'components/UserGroup/AddGroup';
import { ExampleWrapperSimple, PageTitle } from 'layout-components';
import React from 'react';

function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="User Group"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />
      <ExampleWrapperSimple>
        <AddGroup1 />
      </ExampleWrapperSimple>
    </>
  );
}

export default GroupList;
