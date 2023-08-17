import GroupList1 from 'components/UserGroup/ListGroup';
import { PageTitle } from 'layout-components';
import React from 'react';
function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="List User Group"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <GroupList1 />
    </>
  );
}

export default GroupList;
