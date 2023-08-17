import DashboardMenu from "components/Dashboard/Components/DashboardMenu";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import * as API from "api";
import { useSelector } from "react-redux";

const Dashboard = () => {
   const { user} = useSelector((state) => ({
    user: state.user,
  }));
  const [dashboard, setDashboard] = useState({
    chargeboxes: 0,
  });
  const [reservation, setReservation] = useState(0)
  useEffect(() => {
      const query= user?.company ? `?companyId=${user?.company}` : ''

    const fetchDashboardData = async () => {
      try {
        const res = await API.get(API.GET_DASHBOARD+query);
        setDashboard({ ...res });

      } catch (error) {
        console.log("error", error);
      }
    };
    API.get('/reservation'+query).then((res) => {
      setReservation(res.length)
     }).catch(console.error)

    fetchDashboardData();
  }, []);
  return (
    <Row>
      <Col md={6} xl={4}>
        <DashboardMenu
          icon="plug"
          label="Number of Charge Points"
          number={dashboard.chargeboxes}
          color="#fb0792"
        />
      </Col>
      <Col md={6} xl={4}>
        <DashboardMenu
          icon="bolt"
          label="Number of OCPP Tags"
          number={3}
          color="#8e54e9"
        />
      </Col>
      <Col md={6} xl={4}>
        <DashboardMenu
          icon="calendar-check"
          dashboard={dashboard}
          label="Active Reservations"
          number={reservation}
          color="#fd9644"
        />
      </Col>
      <Col md={6} xl={4}>
        <DashboardMenu
          icon="user"
          number={8}
          label="Number of Users"
          color="#45aaf2"
        />
      </Col>
      <Col md={6} xl={4}>
        <DashboardMenu
          icon="money-bill-alt"
          label="Active Transactions"
          number={3}
          color="#32b432"
        />
      </Col>
      <Col md={6} xl={4}>
        <DashboardMenu
          icon="rss"
          label="Active Connectors"
          number={3}
          color="#e3324c"
        />
      </Col>
      {/* <Col md={6} xl={4}>
        <DashboardMenu
          url="/CPO-Hierarchy"
          icon="charging-station"
          label="CPO"
          number={
            dashboard?.length > 0
              ? dashboard[0]?.chargebox_cpo_count > 0
                ? dashboard[0]?.chargebox_cpo_count - 2
                : dashboard[0]?.chargebox_cpo_count
              : 0
          }
          color="#e3c832"
        />
      </Col> */}
    </Row>
  );
};

export default Dashboard;
