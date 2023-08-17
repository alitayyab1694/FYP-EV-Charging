import React, { useState } from 'react';
import { Bell } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Badge, Button, UncontrolledPopover } from 'reactstrap';
import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar6 from '../../assets/images/avatars/avatar6.jpg';
import people1 from '../../assets/images/stock-photos/people-1.jpg';
import people3 from '../../assets/images/stock-photos/people-3.jpg';

const HeaderDots = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const chartHeaderDotsOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      stacked: true
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%'
      }
    },
    stroke: {
      show: false,
      width: 0,
      colors: ['transparent']
    },
    colors: ['#7a7b97', 'rgba(122, 123, 151, 0.15)'],
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Last week',
      'Last month',
      'Last year',
      'Last quarter'
    ],
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartHeaderDotsData = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2]
    }
  ];

  return (
    <>
      <div className="d-flex align-items-center popover-header-wrapper">
        <span className="d-inline-block pr-2">
         
          
        </span>
      </div>
    </>
  );
};

export default HeaderDots;
