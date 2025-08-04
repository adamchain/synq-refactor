import { LeftOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";
import { CommonContext } from "../../context/CommonContext";
import AppointmentServices from "../../services/AppointmentServices";
import AppointmentDetailsPage from "../appointment-details/Appointments";
import CustomReactCalendar from "../generic-components/custom-react-calendar/CustomReactCalendar";
import { callUnSavedModal } from "../generic-components/un-saved-modal/UnSavedModal";
import AnyCreateModal from "../page-header/any-create-modal/AnyCreateModal";
import WhskrPageHeader from "../page-header/WhskrPageHeader";
import { momentLocal } from "../util/TimeUtil";
import DNDCalendar from "./DndCalendar";

const { Content, Sider } = Layout;
const { Text } = Typography;
const CalendarPage = (props) => {
  const [events, setEvents] = useState([]);
  const [pageType, setPageType] = useState({ type: "calendar", data: null });
  const [isModalVisible, setisModalVisible] = useState(false);
  const [calvalue, onCalChange] = useState(new Date());
  const [calendarView, setCalendarView] = useState("doctor");
  const [doctorView, setDoctorView] = useState({
    isVisible: false,
    resourceList: [],
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const context = useContext(CommonContext);
  const getEventsForCalendar = () => {
    if (
      momentLocal(calvalue).isSame(new Date(), "day") &&
      calendarView === "week"
    ) {
      AppointmentServices.getAppointmentForCalendar(null, "week", setEvents);
    } else {
      AppointmentServices.getAppointmentForCalendar(
        calvalue,
        calendarView,
        setEvents,
      );
    }
  };
  useEffect(() => {
    getEventsForCalendar();
  }, [calvalue, calendarView]);

  useEffect(() => {
    //remove later
    if (events.length > 0) {
      let resourceMap = events
        .filter((k) => k.resourceId)
        .reduce((total, current) => {
          let doctorName = "";
          if (current.providerName) {
            doctorName = current.providerName;
          } else if (current.providerFirstName && current.providerLastName) {
            doctorName =
              current.providerFirstName + " " + current.providerLastName;
          }

          if (doctorName) {
            total[current.resourceId] = {
              resourceId: current.resourceId,
              doctorName,
            };
          }

          return total;
        }, {});
      setDoctorView((k) => ({
        ...k,
        resourceList: Object.values(resourceMap),
      }));
    }
  }, [events]);

  useEffect(() => {
    setDoctorView((k) => ({ ...k, isVisible: calendarView === "doctor" }));
  }, [calendarView]);
  const apptModalOpenForCalendar = () => {
    setIsCreateModalOpen(true);
  };

  const filterEvents = (tempevents, type) => {
    if (type === "day" || type === "week") {
      return tempevents.filter(
        (k) => k.providerId === context.userProfile.userId,
      );
    } else {
      return tempevents;
    }
  };

  return (
    <Layout className="calContainer">
      <WhskrPageHeader
        title={
          pageType.type === "calendar" ? (
            "Calendar"
          ) : (
            <>
              <ArrowLeftOutlined
                onClick={() => {
                  let disRegard = () => {
                    setPageType({ type: "calendar", data: null });
                    context.updateStateFields({ callUnSavedModal: false });
                  };
                  if (context.callUnSavedModal) {
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
        buttonName={pageType.type === "calendar" ? "Create New" : "Save"}
        buttonCallBack={() =>
          AppointmentServices.getAppointmentForCalendar(null, "week", setEvents)
        }
        extra={
          pageType.type === "calendar"
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
                    className="topActionButton"
                  >
                    {" "}
                    Save Appointment
                  </Button>,
                ]
        }
      />
      <Content id="calendarLayout" className="calendarContainer">
        {pageType.type === "calendar" && (
          <>
            <Layout id="innerCalendar">
              <Sider
                className="calendar-sider"
                width={275}
                collapsible={true}
                collapsedWidth={0}
                defaultCollapsed={false}
                trigger={
                  <Button
                    shape="circle"
                    type="default"
                    className="calendarToggle"
                    icon={<LeftOutlined />}
                  ></Button>
                }
              >
                <CustomReactCalendar
                  fullscreen={false}
                  calendarType="US"
                  onChange={onCalChange}
                  activeStartDate={calvalue}
                  onActiveStartDateChange={({ activeStartDate, value, view }) =>
                    onCalChange(activeStartDate)
                  }
                  value={calvalue}
                />
              </Sider>
              <Content>
                <DNDCalendar
                  getEventsForCalendar={getEventsForCalendar}
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
                  calvalue={calvalue}
                  onCalChange={onCalChange}
                  events={filterEvents(events, calendarView)}
                  doctorView={doctorView}
                  apptModalOpenForCalendar={apptModalOpenForCalendar}
                  onSearch={props.onSearch}
                  calendarObject={{
                    calendarView,
                    setCalendarView: (view) => {
                      setCalendarView(view);
                      // if(view !== "doctor"){
                      //   setCalendarView(view);}
                      //   else {
                      //     let element = document.querySelector("#innerCalendar > main > main > div > div.rbc-toolbar > span:nth-child(3) > button:nth-child(3)");

                      //     setDoctorView(k=>{
                      //       if(!k.isVisible){
                      //         element.classList.add("rbc-active")
                      //       }else {
                      //         element.classList.remove("rbc-active");

                      //       }
                      //       return{...k,isVisible:!k.isVisible}});
                      //   }
                    },
                  }}
                />
              </Content>
            </Layout>
          </>
        )}
        {isCreateModalOpen && (
          <AnyCreateModal
            isCalendar={true}
            onClose={() => setIsCreateModalOpen(false)}
            onButtonClick={(type) => {
              context.openCreateEditAny({
                type,
                callback: () =>
                  AppointmentServices.getAppointmentForCalendar(
                    null,
                    "week",
                    setEvents,
                  ),
              });
              setIsCreateModalOpen(false);
            }}
          />
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

export default CalendarPage;
