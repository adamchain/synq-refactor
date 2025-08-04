import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getUpcomingAppointments } from '../services';

const { Content } = Layout;
const { Text } = Typography;


const HomePage = () => {
  const [pageType, setPageType] = useState<PageType>({
    type: "home",
    data: null,
  });
  const [apptData, setApptData] = useState>([]);
  const [lInvData, setLinvData] = useState([]);

  const getUpcomingAppointmentForAll = async () => {
    try {
      const response = await getUpcomingAppointments();
      const appointments = response.data || [];
      setApptData([
        ...appointments.filter((a) => a.status !== "Completed"),
        ...appointments.filter((a) => a.status === "Completed"),
      ]);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const getLowInventoryData = () => {
    // TODO: Implement inventory service call
    setLinvData([]);
  };

  useEffect(() => {
    getUpcomingAppointmentForAll();
    getLowInventoryData();
  }, []);

  return (
    <Layout>
      <div className="page-header">
        <Typography.Title level={2}>
          {pageType.type === "home" ? (
            "Home"
          ) : (
            <>
              <ArrowLeftOutlined
                onClick={() => setPageType({ type: "home", data: null })}
              />
              &nbsp;&nbsp;<Text>Appointment Details</Text>
            </>
          )}
        </Typography.Title>
        <Button type="primary" onClick={() => getUpcomingAppointmentForAll()}>
          {pageType.type === "home" ? "Create New" : "Save Appointment"}
        </Button>
      </div>
      <Content style={{ padding: "24px" }}>
        {pageType.type === "home" && (
          <Row gutter={[24, 24]}>
            <Col sm={24} xl={12} xxl={8}>
              <div className="dashboard-card">
                <Typography.Title level={3}>
                  Upcoming Appointments
                </Typography.Title>
                {apptData.length > 0 ? (
                  apptData.map((appointment, index) => (
                    <div key={index} className="appointment-item">
                      <p>
                        {appointment.date} - {appointment.status}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No upcoming appointments</p>
                )}
              </div>
            </Col>
            <Col sm={24} xl={12} xxl={8}>
              <div className="dashboard-card">
                <Typography.Title level={3}>
                  Upcoming Reminders
                </Typography.Title>
                <p>No reminders scheduled</p>
              </div>
            </Col>
            <Col sm={24} xxl={8}>
              <Row gutter={[24, 24]}>
                <Col sm={24} xl={12} xxl={24}>
                  <div className="dashboard-card">
                    <Typography.Title level={3}>
                      Appointment Overview
                    </Typography.Title>
                    <p>Overview data will be displayed here</p>
                  </div>
                </Col>
                <Col sm={24} xl={12} xxl={24}>
                  <div className="dashboard-card">
                    <Typography.Title level={3}>Low Inventory</Typography.Title>
                    <p>No low inventory items</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm={24} xl={24} xxl={16}>
              <div className="dashboard-card">
                <Typography.Title level={3}>Lot Expirations</Typography.Title>
                <p>No expiring lots</p>
              </div>
            </Col>
            <Col sm={24} xl={12} xxl={8}>
              <div className="dashboard-card">
                <Typography.Title level={3}>Staff To-Dos</Typography.Title>
                <p>No pending tasks</p>
              </div>
            </Col>
          </Row>
        )}
        {pageType.type === "appointment" && (
          <div>
            <Typography.Title level={3}>Appointment Details</Typography.Title>
            <p>Appointment details will be displayed here</p>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default HomePage;
