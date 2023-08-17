import PricingPolicy from 'components/Pricing-Policy/Add-Pricing-Policy';
import { ExampleWrapperSimple, PageTitle } from 'layout-components';
import React from 'react';

function UserList() {
  return (
    <>
      <PageTitle
        titleHeading="Pricing Policy"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />
      <ExampleWrapperSimple>
        <PricingPolicy />
      </ExampleWrapperSimple>
    </>
  );
}
export default UserList;
