import WalletsChart from 'components/Wallets/WalletsChart';
import WalletsPageTitleActions from 'components/Wallets/WalletsPageTitleActions';
import { PageTitle } from 'layout-components';
import React from 'react';
import { Container } from 'reactstrap';

export default function Wallets() {
  return (
    <>
      <PageTitle
        titleHeading="Wallets"
        titleDescription="This is your wallets overview last updated today.">
        <WalletsPageTitleActions />
      </PageTitle>
      <Container>
        <WalletsChart />
      </Container>
    </>
  );
}
