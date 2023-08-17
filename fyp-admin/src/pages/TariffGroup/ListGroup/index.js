import GroupList1 from 'components/TariffGroup/GroupList';
import { PageTitle } from 'layout-components';
import React from 'react';

function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="List Group"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <GroupList1 />
    </>
  );
}
export default GroupList;
