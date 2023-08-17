import RateList1 from 'components/Feedbacks/FeedbackList';
import { PageTitle } from 'layout-components';
import React from 'react';

function GroupList() {
  return (
    <>
      <PageTitle
        titleHeading="Feedbacks"
        titleDescription="Feedback is the response of customer after charging"
      />

      <RateList1 />
    </>
  );
}
export default GroupList;
