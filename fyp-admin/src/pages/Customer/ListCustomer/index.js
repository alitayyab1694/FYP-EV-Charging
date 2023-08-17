import ListCustomer from 'components/Customer/ListCustomer';
import { PageTitle } from 'layout-components';
import React from 'react';
function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="List Customer"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <ListCustomer />
    </>
  );
}
export default GroupList;
