import AddPolicyTags1 from 'components/PolicyTags/AddPolicyTags';
import { ExampleWrapperSimple, PageTitle } from 'layout-components';
import React from 'react';

function UserList() {
  return (
    <>
      <PageTitle
        titleHeading="Policy Tags"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />
      <ExampleWrapperSimple>
        <AddPolicyTags1 />
      </ExampleWrapperSimple>
    </>
  );
}

export default UserList;
