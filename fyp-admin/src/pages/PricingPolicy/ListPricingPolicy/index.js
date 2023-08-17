import ListPricingPolicy from 'components/Pricing-Policy/ListPricingPolicy';
import { PageTitle } from 'layout-components';
import React from 'react';

function UserList() {
  return (
    <>
      <PageTitle
        titleHeading="List Pricing Policy"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <ListPricingPolicy />
    </>
  );
}
export default UserList;
