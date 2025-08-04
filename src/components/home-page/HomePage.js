import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import AppointmentServices from "../../services/AppointmentServices";
import InventoryServices from "../../services/InventoryServices";
import AppointmentDetailsPage from "../appointment-details/Appointments";
import { callUnSavedModal } from "../generic-components/un-saved-modal/UnSavedModal";
import ApptOverview from "../home-page/ApptOverview";
import UpcomingAppointments from "../home-page/UpcomingAppointments";
import WhskrPageHeader from "../page-header/WhskrPageHeader";
import LotExpirations from "./LotExpirations";
import LowInventory from "./LowInventory";
import StaffToDos from "./StaffToDos";
import UpcomingReminders from "./UpcomingReminders";

const { Content } = Layout;
const { Text } = Typography;
const HomePage = (props) => {
  const context = useContext(CommonContext);
  const [pageType, setPageType] = useState({ type: "home", data: null });
  const [apptData, setApptData] = useState([]);
  const [lInvData, setLinvData] = useState([]);

  const getUpcomingAppointmentForAll = () => {
    AppointmentServices.getUpcomingAppointmentForAll((k) =>
      setApptData([
        ...k.filter((a) => a.status !== "Completed"),
        ...k.filter((a) => a.status === "Completed"),
      ]),
    );
  };

  const getLowInventoryData = () => {
    InventoryServices.getLowInventoryData(setLinvData);
  };

  useEffect(() => {
    getUpcomingAppointmentForAll();
    getLowInventoryData();
  }, []);

  return (
    <Layout>
      {/* <WhskrPageHeader title="Home" buttonName="Create New" onRightButtonClick={onRightButtonClick }/> */}
      <WhskrPageHeader
        title={
          pageType.type === "home" ? (
            "Home"
          ) : (
            <>
              <ArrowLeftOutlined
                onClick={() => {
                  let disRegard = () => {
                    setPageType({ type: "home", data: null });
                    context.updateStateFields({ callUnSavedModal: false });
                  };
                  if (context.isApptFormTouched) {
                    callUnSavedModal(disRegard, () => {});
                  } else {
                    disRegard();
                  }
                }}
              />
              &nbsp;&nbsp;<Text>Appointment Details</Text>
            </>
          )
        }
        buttonName={
          pageType.type === "home" ? "Create New" : "Save Appointment"
        }
        buttonCallBack={() => getUpcomingAppointmentForAll()}
        extra={
          pageType.type === "home"
            ? []
            : context.userProfile.permission === "FD"
              ? [<div></div>]
              : [
                  <Button
                    form="appointment-form-id"
                    htmlType="submit"
                    type="primary"
                    shape="round"
                    size="large"
                  >
                    {" "}
                    Save Appointment
                  </Button>,
                ]
        }
      />
      <Content className="masterContentPadding scollerMaster">
        {pageType.type === "home" && (
          <Row gutter={[24, 24]}>
            <Col sm={24} xl={12} xxl={8}>
              <UpcomingAppointments
                getUpcomingAppointmentForAll={getUpcomingAppointmentForAll}
                apptData={apptData}
                setApptData={setApptData}
                onSearch={props.onSearch}
                viewAppointment={(
                  apptId,
                  patientId,
                  providerId,
                  clientId,
                  patientName,
                ) =>
                  setPageType({
                    type: "appointment",
                    data: {
                      apptId,
                      patientId,
                      providerId,
                      clientId,
                      patientName,
                    },
                  })
                }
              />
            </Col>
            <Col sm={24} xl={12} xxl={8}>
              <UpcomingReminders isHomePage={true} onSearch={props.onSearch} />
            </Col>
            <Col sm={24} xxl={8}>
              <Row gutter={[24, 24]}>
                <Col sm={24} xl={12} xxl={24}>
                  <ApptOverview />
                </Col>
                <Col sm={24} xl={12} xxl={24}>
                  <LowInventory
                    data={lInvData}
                    onCallBack={() => getLowInventoryData()}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={24} xl={24} xxl={16}>
              <LotExpirations onCallBack={() => getLowInventoryData()} />
            </Col>
            <Col sm={24} xl={12} xxl={8}>
              <StaffToDos isHomePage={true} onSearch={props.onSearch} />
            </Col>
          </Row>
        )}
        {pageType.type === "appointment" && (
          <AppointmentDetailsPage
            inputIds={pageType.data}
            osType={context.isTabletMode}
          />
        )}
      </Content>
    </Layout>
  );
};

export default HomePage;
