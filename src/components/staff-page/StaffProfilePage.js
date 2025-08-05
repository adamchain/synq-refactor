import { Button, Col, Layout, Row, Tabs, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import StaffServices from "../../services/StaffServices";
import CustomImage from "../generic-components/custom-image/CustomImage";
import StaffToDos from "../home-page/StaffToDos";
import ClockInHistoryTab from "./ClockInHistoryTab";
import CreateEditStaffDrawer from "./CreateEditStaffDrawer";
import StaffInformation from "./StaffInformation";

const { Text, Link } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const STAFF_ROLES = {
  FD: "Front Desk",
  TN: "Technician",
  DR: "Doctor",
  LD: "Leadership",
};
const customImageStyling = (fullname, image) => {
  return {
    width: "131px",
    height: "131px",
    showInfoIcon: false,
    showOuterBorder: true,
    // ...(alerts ? {toolTip: {
    //     title: alerts,
    //     placement: 'bottom',
    // }}:{}),
    url: image ? `url(` + image + `)` : "",
    fullName: fullname, // pass dynamic full name
  };
};

const StaffProfilePage = (props) => {
  const [staffData, setStaffData] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const context = useContext(CommonContext);

  useEffect(() => {
    StaffServices.fetchStaffById(props.staffId, setStaffData);
  }, []);

  const onButtonClick = () => {
    setShowDrawer(true);
  };

  const onTabChange = (tabname) => {};

  return (
    <Content className="masterContentPadding iPadScroller">
      {showDrawer && (
        <CreateEditStaffDrawer
          onClose={() => setShowDrawer(null)}
          staffData={staffData}
          isProfile={false}
          isEdit={true}
          onStaffDelete={props.onStaffDelete}
          onSuccessReturn={() => {
            setShowDrawer(null);
            StaffServices.fetchStaffById(props.staffId, setStaffData);
          }}
        />
      )}
      <Row gutter={[24, 24]} className="staff-profile">
        <Col xs={24} lg={24} xxl={9} className="staff-profile-info">
          <div className="staff-profile-widget">
            <Row justify="center" className="page-header">
              <Col>
                <CustomImage
                  styling={customImageStyling(
                    staffData?.firstName + " " + staffData?.lastName,
                    staffData?.image,
                  )}
                ></CustomImage>
                <Row justify="center">
                  <Text className="text-default-500">
                    {(staffData?.firstName ?? "") +
                      " " +
                      (staffData?.lastName ?? "")}
                  </Text>
                </Row>
                <Row justify="center">
                  <Text className="text-secondary-400">
                    {STAFF_ROLES[staffData?.permission] ?? "-"}
                  </Text>
                </Row>
                <Row className="editProfileContainer">
                  {context.userProfile.permission === "LD" && (
                    <Button
                      shape="round"
                      type="primary"
                      className="edit-profile"
                      ghost
                      onClick={onButtonClick}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Row>

                {/* <Row justify="center">
                                        <Button type="text"
                                                icon={<UserIcon
                                                    className='client-profile-icon'/>}/>
                                    </Row>
                                    <Row justify="center">
                                        <Text className='client-profile text-default-500 font-size-12'>
                                            View Client
                                        </Text>
                                    </Row> */}
              </Col>
            </Row>
            {!context.isTabletMode && (
              <Row className="staff-information">
                <Col span={24} className="staff-profile-config">
                  <StaffInformation staffData={staffData} />
                </Col>
              </Row>
            )}
          </div>
        </Col>
        <Col lg={24} xxl={15}>
          <div className="staff-profile-details-tabs staff-profile-widget">
            <Tabs
              className="staff-profile-tabs"
              defaultActiveKey={context.isTabletMode ? "2" : "1"}
              onChange={onTabChange}
              destroyInactiveTabPane={true}
            >
              <>
                {context.isTabletMode && (
                  <TabPane tab="Staff Information" key="2">
                    <StaffInformation staffData={staffData} />
                  </TabPane>
                )}

                {
                  //  (staffData && staffData.pay === "H") &&
                  <TabPane tab="Time Card" key="1">
                    <ClockInHistoryTab staffId={props.staffId} />
                  </TabPane>
                }
                {/* {(staffData && (staffData.pay === "S" || staffData.permission === "DR")) && <TabPane
                                         tab="Reminders"
                                         key="2">
                                    <UpcomingReminders onSearch ={()=>{}} isHomePage={false} reminderList={[].filter(e => e.completed===false)} fetchReminders = {()=>{}}/>
                                    </TabPane>} */}
                <TabPane tab="Reminders" key="2">
                  <StaffToDos
                    staffId={props.staffId}
                    isHomePage={false}
                    onSearch={props.onSearch}
                  />
                </TabPane>
              </>
            </Tabs>
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default StaffProfilePage;
