import ListPolicyTags1 from 'components/PolicyTags/ListPolicyTags';
import { PageTitle } from 'layout-components';
import React from 'react';

function UserList() {
  return (
    <>
      <PageTitle
        titleHeading="List Policy Tags"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <ListPolicyTags1 />
    </>
  );
}
export default UserList;
