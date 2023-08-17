import ListReservation1 from 'components/Reservation/ListReservation';
import { PageTitle } from 'layout-components';
import React from 'react';

function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="List Reservation"
        titleDescription="Examples that can be used for building interactive tabular data lists."
      />

      <ListReservation1 />
    </>
  );
}
export default GroupList;
