import Reservation from 'components/Reservations';
import { ExampleWrapperContainer, PageTitle } from 'layout-components';
import React from 'react';
export default function Wallets() {
  return (
    <>
      <PageTitle
        titleHeading="Reservation"
        titleDescription="This is your wallets overview last updated today."
      />
      <ExampleWrapperContainer>
        <Reservation />
      </ExampleWrapperContainer>
    </>
  );
}
