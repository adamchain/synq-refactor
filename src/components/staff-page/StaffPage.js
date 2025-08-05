import { Col, Row, Typography, Button, Select, Layout } from "antd";
import "./StaffPage.scss";
import { AddUserIcon } from "../util/SvgUtil";
import React, { useEffect, useState, useContext } from "react";
import CustomImage from "../generic-components/custom-image/CustomImage";
import WhskrPageHeader from "../page-header/WhskrPageHeader";
import CreateEditStaffDrawer from "./CreateEditStaffDrawer";
import StaffWorkingHoursModal from "./working-hours-staff-modal/StaffWorkingHoursModal";
import StaffServices from "../../services/StaffServices";
import { DAY_ORDER } from "./working-hours-staff-modal/Constant";
import { ArrowLeftOutlined } from "@ant-design/icons";
import StaffProfilePage from "./StaffProfilePage";
import { CommonContext } from "../../context/CommonContext";

const { Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

const StaffPage = (props) => {
  const [showStaffAddForm, setShowStaffAddForm] = useState(false);
  const [staffInitialData, setStaffInitialData] = useState([]);
  const [staffWorkingHrsData, setStaffWorkingHrsData] = useState(null);
  const [viewType, setViewType] = useState({ name: "list", value: null });
  const [staffTypeFilter, setStaffTypeFilter] = useState({
    filterValues: ["All"],
    selectedValue: "All",
  });
  const context = useContext(CommonContext);
  useEffect(() => {
    fetchAllStaffs();
  }, []);

  const fetchAllStaffs = () => {
    StaffServices.fetchStaff((data) => {
      let staffdata = data;
      if (context.userProfile.permission !== "LD") {
        staffdata = data.filter((k) => k.userId === context.userProfile.userId);
      }
      let filterValues = [...new Set(staffdata.map((k) => k.role))];
      setStaffInitialData(staffdata);
      setStaffTypeFilter({
        filterValues: ["All", ...filterValues],
        selectedValue: "All",
      });
    });
  };
  useEffect(() => {
    if (props.searchData) {
      setViewType({
        name: "staff",
        value: { staffId: props.searchData.staffId },
      });
    }
  }, [props.searchData]);

  const onSettingsButtonClick = (index, staffId) => {
    // StaffServices.fetchStaffById(staffId, setStaffData);
    // setShowStaffEditForm(staffInitialData.map((x) => false));

    // const newShowStaffEditForm = [...showStaffEditForm];
    // newShowStaffEditForm[index] = !newShowStaffEditForm[index]
    // setShowStaffEditForm(newShowStaffEditForm);
    setViewType({ name: "staff", value: { staffId } });
  };

  const onWorkingHrsButtonClick = (index, staff) => {
    StaffServices.fetchWorkingHrsById(staff.userId, (data) =>
      setStaffWorkingHrsData({ ...data, ...staff }),
    );
  };

  const onAddStaffButtonClick = () => {
    if (showStaffAddForm) {
      setShowStaffAddForm(false);
    } else {
      setShowStaffAddForm(true);
    }
  };

  return (
    <Layout className="staffPageMaster">
      {viewType.name === "list" && (
        <>
          <WhskrPageHeader
            title="Clinic Staff"
            requiredExtras={[
              <Col>
                SortBy:{" "}
                <Select
                  style={{ width: "12em" }}
                  value={staffTypeFilter.selectedValue}
                  onChange={(value) => {
                    setStaffTypeFilter((k) => ({ ...k, selectedValue: value }));
                  }}
                >
                  {staffTypeFilter.filterValues.map((k) => (
                    <Option value={k}>{k}</Option>
                  ))}
                </Select>{" "}
              </Col>,
            ]}
            buttonName="Create New"
          />
          {staffWorkingHrsData ? (
            <StaffWorkingHoursModal
              onClose={() => setStaffWorkingHrsData(null)}
              userId={staffWorkingHrsData.userId}
              onSuccess={() => {
                fetchAllStaffs();
                setStaffWorkingHrsData(null);
              }}
              staffName={
                staffWorkingHrsData.firstName +
                " " +
                staffWorkingHrsData.lastName
              }
              staffWorkingHrs={staffWorkingHrsData}
            />
          ) : null}
          {showStaffAddForm ? (
            <CreateEditStaffDrawer
              onClose={() => setShowStaffAddForm(false)}
              isEdit={false}
              onSuccessReturn={() => {
                setShowStaffAddForm(false);
                fetchAllStaffs();
              }}
            />
          ) : null}
          <Content className="masterContentPadding scollerMaster">
            <Row gutter={[24, 24]}>
              {context.userProfile.permission === "LD" && (
                <Col className="staff-page">
                  <div
                    className="staff-page-widget add-new-staff"
                    onClick={onAddStaffButtonClick}
                  >
                    <AddUserIcon className="addStaffIcon" />
                    <div className="add-new-staff-container">
                      <Text className="add-new-staff-text"> Add Staff</Text>
                    </div>
                  </div>
                </Col>
              )}
              {Array.from(staffInitialData)
                .sort((a, b) =>
                  a.role === staffTypeFilter.selectedValue ? -1 : 1,
                )
                .map((staff, index) => {
                  return (
                    <Col className="staff-page">
                      <div className="staff-page-widget">
                        <CustomImage
                          styling={{
                            width: "114px",
                            height: "114px",
                            showInfoIcon: false,
                            showOuterBorder: true,
                            toolTip: {
                              title: "",
                              placement: "top",
                            },
                            url: staff.image ? `url(` + staff.image + `)` : "",
                            fullName: staff.firstName + " " + staff.lastName,
                          }}
                        ></CustomImage>
                        <Row justify="center">
                          <Text className="text-default-500 font-size-20">
                            {staff.firstName} {staff.lastName}
                          </Text>
                        </Row>
                        <Row justify="center">
                          <Text className="text-secondary-400">
                            {staff.role}
                          </Text>
                        </Row>
                        <Row justify="center" className="works">
                          <Text className="text-default-400 font-size-14">
                            Workdays
                          </Text>
                        </Row>
                        <Row justify="center" className="working-days">
                          {staff.workingDays
                            ?.sort((a, b) => DAY_ORDER[a] - DAY_ORDER[b])
                            .map((day) => {
                              return (
                                <Col>
                                  <Text className="text-secondary-400 days-circle">
                                    {day.toLowerCase().charAt(0).toUpperCase() +
                                      day.toLowerCase().slice(1, 2)}
                                  </Text>
                                </Col>
                              );
                            })}
                        </Row>
                        {context.userProfile.permission === "LD" && (
                          <Row justify="center" className="working-hours">
                            <Button
                              shape="round"
                              onClick={() =>
                                onWorkingHrsButtonClick(index, staff)
                              }
                            >
                              Working Hours
                            </Button>
                          </Row>
                        )}
                        <Row justify="center" className="settings">
                          <Button
                            shape="round"
                            onClick={() =>
                              onSettingsButtonClick(index, staff.userId)
                            }
                          >
                            View Profile
                          </Button>
                        </Row>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </Content>
        </>
      )}

      {viewType.name === "staff" && (
        <>
          <WhskrPageHeader
            title={
              <>
                <ArrowLeftOutlined
                  onClick={() => setViewType({ name: "list", value: null })}
                />
                &nbsp;&nbsp;<Text>Staff Profile </Text>
              </>
            }
            buttonName="Create New"
          />
          <StaffProfilePage
            staffId={viewType.value.staffId}
            onStaffDelete={() => {
              setViewType({ name: "list", value: null });
              fetchAllStaffs();
            }}
          />
        </>
      )}
    </Layout>
  );
};

export default StaffPage;
