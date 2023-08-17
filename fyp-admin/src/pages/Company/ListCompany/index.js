import ListCompany1 from 'components/Company/ListCompany';
import { PageTitle } from 'layout-components';
import React from 'react';

function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="List Companies"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <ListCompany1 />
    </>
  );
}
export default GroupList;
