import React, { Fragment } from "react";

import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentServices from "./../../services/AppointmentServices";
import AppointmentInfoModal from "./AppointmentInfoModal";
import "./CalendarPage.scss";

import { Col, Layout, Popover, Row, Typography } from "antd";

import CustomImage from "../generic-components/custom-image/CustomImage";
import CommonUtil from "../util/CommonUtil";
import { localToUtc, momentLocal } from "../util/TimeUtil";
import CustomDayView from "./CustomDayView";
//import { NONE } from 'react-big-calendar/lib/utils/Resources';

import { CommonContext } from "../../context/CommonContext";
import AppointmentBlockOffInfoModal from "./AppointmentBlockOffInfoModal";
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const { Text } = Typography;
const { Content } = Layout;
// const resourceMap = [
//   { resourceId: 1, resourceTitle: 'Dr Carla Politte' },
//   { resourceId: 2, resourceTitle: 'Dr Tony Stark' },
//   { resourceId: 3, resourceTitle: 'Dr Walter White' },
//   { resourceId: 4, resourceTitle: 'Dr Jack Ryan' },
// ]

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDragItemInCell: true,
      appointmentDetails: null,
    };

    // this.moveEvent = this.moveEvent.bind(this)
    // this.newEvent = this.newEvent.bind(this)
  }
  static contextType = CommonContext;

  componentDidMount() {
    console.log("contextType", CommonContext);
    document.querySelector(
      "#innerCalendar > main > main > div > div.rbc-toolbar > span:nth-child(3) > button:nth-child(3)",
    ).innerText =
      this.context.defaultBranch.branchTypeId != 2 ? "Doctor" : "Provider";
  }

  handleDragStart = (event) => {
    this.setState({ draggedEvent: event });
  };

  dragFromOutsideItem = () => {
    return this.state.draggedEvent;
  };

  onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent } = this.state;

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    };

    this.setState({ draggedEvent: null });
    this.moveEvent({ event, start, end });
  };

  moveEvent = (eventprops) => {
    let { event, start, end, isAllDay: droppedOnAllDaySlot } = eventprops;
    AppointmentServices.updateAppointmentTimeById(
      event.apptId,
      {
        providerId: eventprops.resourceId,
        stTime: localToUtc(momentLocal(start)).format("yyyy-MM-DDTHH:mm"),
      },
      this.props.getEventsForCalendar,
    );
    // const { events } = this.state

    // let allDay = event.allDay

    // if (!event.allDay && droppedOnAllDaySlot) {
    //   allDay = true
    // } else if (event.allDay && !droppedOnAllDaySlot) {
    //   allDay = false
    // }

    // const nextEvents = events.map(existingEvent => {
    //   return existingEvent.id === event.id
    //     ? { ...existingEvent, start, end }
    //     : existingEvent
    // })

    // this.setState({
    //   events: nextEvents,
    // })

    // alert(`${event.title} was dropped onto ${start}-${end}`)
  };

  // resizeEvent = ({ event, start, end }) => {
  //   const { events } = this.state

  //   const nextEvents = events.map(existingEvent => {
  //     return existingEvent.id === event.id
  //       ? { ...existingEvent, start, end }
  //       : existingEventa
  //   })

  //   this.setState({
  //     events: nextEvents,
  //   })

  //   alert(`${event.title} was resized to ${start}-${end}`)
  // }

  // handleStatusChange = (value)=> {
  //   //console.log(" val ==>",value);
  //   AppointmentServices.updateAppointmentStatus(this.state.appointmentDetails.apptId,
  //      value === "Confirmed" ? "confirm" : "unconfirm",
  //      () => this.setState({ appointmentDetails: { ...this.state.appointmentDetails, status: value } }));

  // }

  customEvent = (eventdata) => {
    return {
      event: <span>{eventdata.title}</span>,
    };
  };

  showAppointmentTooltip = ({ event: eventdata }) => {
    return (
      <div>
        <Row justify="space-around" className="space-padding">
          <Col>
            <CustomImage
              styling={{
                width: "80px",
                height: "80px",
                showInfoIcon: eventdata?.alert === "N" ? false : true,
                showOuterBorder: true,
                toolTip: {
                  title: "",
                  placement: "top",
                },
                fullName:
                  eventdata.type === "Block Off"
                    ? "Dr" +
                      " " +
                      eventdata.providerFirstName +
                      " " +
                      eventdata.providerLastName
                    : eventdata.firstname + " " + eventdata.lastname,
                url: eventdata?.image ? `url(` + eventdata?.image + `)` : "",
                ringColor: CommonUtil.genderBasedColor(eventdata?.sexCd),
              }}
            ></CustomImage>
          </Col>
        </Row>
        <Row justify="space-around popOverTime">
          <Col>
            <Text>{eventdata?.displaytime}</Text>
          </Col>
        </Row>
        {eventdata.displayday && (
          <Row justify="space-around popOverTime">
            <Col>
              <Text>{eventdata?.displayday}</Text>
            </Col>
          </Row>
        )}
        <Row justify="space-around">
          <Col>
            <Text className="popOverName">
              {eventdata.type === "Block Off"
                ? "Dr" +
                  " " +
                  eventdata.providerFirstName +
                  " " +
                  eventdata.providerLastName
                : eventdata?.tooltipTitle}
            </Text>
          </Col>
        </Row>

        <Row justify="space-around" className="space-padding">
          <Col>
            <div
              className={
                eventdata.type === "Block Off"
                  ? `blockPopTag`
                  : `${eventdata?.type.toLowerCase()}PopTag`
              }
            >
              {eventdata?.type}
            </div>
          </Col>
        </Row>
        <Row className="space-padding">
          <Col>
            <Text className="popOverNotesTitle">Reason for Visit</Text>
          </Col>
        </Row>
        <Row className="space-padding popOverNotes">
          <Col>
            <Text>{eventdata?.notes}</Text>
          </Col>
        </Row>
      </div>
    );
  };

  newEvent(event) {
    this.props.apptModalOpenForCalendar();
  }

  render() {
    let resourceViewProps = this.props.doctorView.isVisible
      ? {
          resources: this.props.doctorView.resourceList,
          resourceIdAccessor: "resourceId",
          resourceTitleAccessor: "doctorName",
        }
      : {};
    return (
      <Fragment>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,

            margin: "1.5em",
            marginTop: "-1em",
            minHeight: 280,
            borderRadius: "20px",
          }}
        >
          <DragAndDropCalendar
            selectable
            draggableAccessor={(e) =>
              !(e.type === "Lunch Break" || e.type === "Block Off")
            }
            localizer={localizer}
            events={this.props.events}
            onEventDrop={this.moveEvent}
            resizable={false}
            // onEventResize={this.resizeEvent}
            onSelectSlot={(event) => this.props.apptModalOpenForCalendar()}
            // onDragStart={console.log}
            view={this.props.calendarObject.calendarView}
            onView={this.props.calendarObject.setCalendarView}
            views={{
              week: true,
              day: true,
              doctor: CustomDayView,
            }}
            onSelectEvent={(event) =>
              event.type === "Lunch Break"
                ? {}
                : this.setState({ appointmentDetails: event })
            }
            eventPropGetter={(event) => ({
              style: {
                borderRadius: "0px",
                color: "#012729",
                ...event.colObj,
                borderTop: "0px",
                borderBottom: "0px",
                borderRight: "0px",
              },
            })}
            popup={true}
            // dragFromOutsideItem={
            //   this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
            // }
            min={momentLocal(
              this.context.defaultBranch?.stTime,
              "h:mma",
            ).toDate()}
            max={momentLocal(
              this.context.defaultBranch?.endTime,
              "h:mma",
            ).toDate()}
            //step={15}        // duration of the slot
            //timeslots={4}
            tooltipAccessor={null}
            date={this.props.calvalue}
            onNavigate={(date, dayType, nextButton) => {
              this.props.onCalChange(date);
            }}
            components={{
              event: (e) => (
                <Popover
                  title={() => (
                    <div
                      style={{
                        backgroundColor:
                          CommonUtil.APPOINTMENT_STATUS[e.event.status]?.color,
                      }}
                      className="appointment-popover-title"
                    >
                      {e.event.status}
                    </div>
                  )}
                  overlayClassName="tooltip-custom"
                  placement="right"
                  content={this.showAppointmentTooltip(e)}
                >
                  <span
                    style={{
                      pointerEvents:
                        e.event.type === "Lunch Break" ? "none" : "allow",
                    }}
                  >
                    {e.title}
                  </span>
                </Popover>
              ),
            }}
            // onDropFromOutside={this.onDropFromOutside}
            // handleDragStart={this.handleDragStart}
            {...resourceViewProps}
          />
        </Content>

        {/* {this.props.isModalVisible && <AppointmentModal onClose={() => this.props.onModalClose()} />} */}

        {this.state.appointmentDetails?.type === "Block Off" && (
          <AppointmentBlockOffInfoModal
            onSearch={this.props.onSearch}
            appointmentDetails={this.state.appointmentDetails}
            handleStatusChange={(value) =>
              this.setState({
                appointmentDetails: {
                  ...this.state.appointmentDetails,
                  status: value,
                },
              })
            }
            onClose={() => {
              this.setState({ appointmentDetails: null });
              this.props.getEventsForCalendar();
            }}
            viewAppointment={this.props.viewAppointment}
          />
        )}
        {this.state.appointmentDetails &&
          this.state.appointmentDetails?.type !== "Block Off" && (
            <AppointmentInfoModal
              onSearch={this.props.onSearch}
              appointmentDetails={this.state.appointmentDetails}
              handleStatusChange={(value) =>
                this.setState({
                  appointmentDetails: {
                    ...this.state.appointmentDetails,
                    status: value,
                  },
                })
              }
              onClose={() => {
                this.setState({ appointmentDetails: null });
                this.props.getEventsForCalendar();
              }}
              viewAppointment={this.props.viewAppointment}
            />
          )}
      </Fragment>
    );
  }
}

export default Dnd;
