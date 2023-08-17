import UserList1 from 'components/User/UserList';
import React from 'react';
import { ExampleWrapperSimple, PageTitle } from '../../layout-components';

function UserList() {
  return (
    <>
      <PageTitle
        titleHeading="User"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <ExampleWrapperSimple>
        <UserList1 />
      </ExampleWrapperSimple>
    </>
  );
}

export default UserList;
