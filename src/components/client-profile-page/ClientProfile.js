import React, { useState, useContext } from "react";
import { Row, Col, Typography, Tabs, Button, Layout, Popover } from "antd";
import "./ClientProfile.scss";
import CustomImage from "../generic-components/custom-image/CustomImage";

import { TextIcon, EmailIcon } from "../util/SvgUtil";

import Pets from "./Pets";

import CreatEditClientDrawer from "../client-profile-page/CreateEditClientDrawer";
import CreateEditPatientDrawer from "../patient-profile-page/CreateEditPatientDrawer";
import EstimateTab from "./../estimate/EstimateTab";
import { CommonContext } from "../../context/CommonContext";
import ClientHistoryTab from "./../history/ClientHistoryTab";
import ClientEmailTextDrawer from "./ClientEmailTextDrawer";
import ClientProfileInformation from "./ClientProfileInformation";
import TreatmentsTab from "../treatments/TreatmentsTab";
import RemindersPatientTab from "../reminders/RemindersPatientTab";
import TreatmentServices from "../../services/TreatmentServices";
import UploadsTab from "../appointment-details/upload/UploadsTab";

const { Text } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;
const customImageStyling = (fullname, alerts) => ({
  width: "131px",
  height: "131px",
  showInfoIcon: alerts ? true : false,
  showOuterBorder: true,
  toolTip: {
    title: alerts,
    placement: "bottom",
  },
  url: "",
  fullName: fullname, // pass dynamic full name
});
const soapHistory = [
  {
    date: "December 13th 2020",
    doctorName: "Dr. Pollite",
    status: "Full",
  },
  {
    date: "November 13th 2020",
    doctorName: "Dr. Pollite",
    status: "Full",
  },
  {
    date: "March 13th 2020",
    doctorName: "Dr. Pollite",
    status: "Quick",
  },
  {
    date: "January 13th 2020",
    doctorName: "Dr. Pollite",
    status: "Full",
  },
];

// const vaccines = [
//     {
//         key: '1',
//         name: 'AAU Canine - Bordetella',
//         administered: '09/03/2020',
//         expiration: '09/03/2020',
//     },
//     {
//         key: '2',
//         name: 'Joe Black',
//         administered: '09/03/2021',
//         expiration: '09/03/2020',
//     },
//     {
//         key: '3',
//         name: 'Jim Green',
//         administered: '09/03/2022',
//         expiration: '09/03/2025',
//     }
// ];
// const monitoring = [
//     {
//         key: '1',
//         name: 'AAU Canine - Bordetella',
//         administered: '09/03/2020',
//         expiration: '09/03/2020',
//     },
//     {
//         key: '2',
//         name: 'VX-DAPP Vaccine (3 Year)',
//         administered: '09/03/2021',
//         expiration: '09/03/2020',
//     },
//     {
//         key: '3',
//         name: 'Canine Rabies Vaccine (3 Year)',
//         administered: '09/03/2022',
//         expiration: '09/03/2025',
//     }
// ];
// const medications = [
//     {
//         key: '1',
//         name: 'Vetropolycin Ophth Ointment 1/8 Oz',
//         administered: '09/03/2020',
//         expiration: '09/03/2020',
//     }
// ];

// const [values, setValues] = useState({name: '', quantity: 0, unitCost: 0})

const ClientProfilePage = (props) => {
  const [showEditComponent, setShowEditComponent] = useState(false);
  // const [showAddComponent, setShowAddComponent] = useState(false);
  const [addPatient, setAddPatient] = useState(false);
  const [emailTextDrawer, setEmailTextDrawer] = useState(null);
  const [treatmentsData, setTreatmentsData] = useState([]);
  const context = useContext(CommonContext);
  // const [allPets , setAllPets] = useState([]);
  // useEffect(() => {
  //     if(props.clientData.clientId)
  //         ClientServices.fetchPatientByClientId(props.clientData.clientId,setAllPets);

  // },[props.clientData.clientId]);

  const onButtonClick = () => {
    if (showEditComponent) {
      setShowEditComponent(false);
    } else {
      setShowEditComponent(true);
    }

    //ClientServices.fetchClientById(11,setClientData);
  };
  const onTabChange = (tabname) => {
    if (tabname === "3" && props.clientData.clientId) {
      TreatmentServices.getMedicationAndVaccineByPatientId(
        props.clientData.clientId,
        setTreatmentsData,
      );
    }
  };

  // const onRightButtonClick = () => {
  //     if (showAddComponent) {
  //         setShowAddComponent(false)
  //     } else {
  //         setShowAddComponent(true)
  //     }
  // };

  return (
    <Layout>
      <Content className="masterContentPadding iPadScroller">
        {emailTextDrawer && (
          <ClientEmailTextDrawer
            onClose={() => setEmailTextDrawer(null)}
            inputData={emailTextDrawer}
          />
        )}
        {showEditComponent ? (
          <CreatEditClientDrawer
            onClose={() => setShowEditComponent(false)}
            clientData={props.clientData}
            isEdit={true}
            allStates={props.allStates}
            onSuccessReturn={(isSuccess, showlist) => {
              props.onSuccessReturn(isSuccess, showlist);
              setShowEditComponent(false);
            }}
          />
        ) : null}
        <Row gutter={[24, 24]} className="client-profile">
          <Col xs={24} lg={24} xl={24} xxl={9} className="client-profile-info">
            <div className="client-profile-widget">
              <Row justify="center" className="page-header">
                <Col span={24}>
                  <Col className="text-email-client">
                    {/* <div  className="profileSendAction"  onClick = {props.clientData?.allowText ? ()=> setEmailTextDrawer({type:"text",clientId:props.clientData.clientId}):()=>{}}><Row justify="center">
                                    <Popover content={!props.clientData?.allowText ? "Customer opted out" : ""}  trigger="hover"> <Button type="text"
                                                disabled={!props.clientData?.allowText}
                                                icon={<TextIcon
                                                    className='text-client-icon'/>}/></Popover>
                                    </Row>
                                    <Row justify="center">
                                        <Text  disabled={!props.clientData?.allowText} className='text-client text-default-500 font-size-12'>
                                            Send Text
                                        </Text>
                                    </Row>
                                    </div> */}
                    <div
                      onClick={
                        props.clientData?.allowEmail
                          ? () =>
                              setEmailTextDrawer({
                                type: "email",
                                clientId: props.clientData.clientId,
                              })
                          : () => {}
                      }
                      className="profileSendAction"
                    >
                      <Row justify="center">
                        <Popover
                          content={
                            !props.clientData?.allowEmail
                              ? "Customer opted out"
                              : ""
                          }
                          trigger="hover"
                        >
                          <Button
                            type="text"
                            disabled={!props.clientData?.allowEmail}
                            icon={<EmailIcon className="email-client-icon" />}
                          />
                        </Popover>
                      </Row>
                      <Row justify="center">
                        <Text
                          disabled={!props.clientData?.allowEmail}
                          className="email-client text-default-500 font-size-12"
                        >
                          Send Email
                        </Text>
                      </Row>
                    </div>
                  </Col>
                  <CustomImage
                    styling={customImageStyling(
                      props.clientData?.primary?.firstName +
                        " " +
                        props.clientData?.primary?.lastName,
                      props.clientData?.clientAlerts,
                    )}
                  ></CustomImage>
                  <Row justify="center">
                    <Col span={18}>
                      <Text className="text-default-500">
                        {props.clientData?.primary?.firstName +
                          " " +
                          props.clientData?.primary?.lastName}
                      </Text>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col span={24}>
                      <Text
                        className="text-secondary-400"
                        style={{
                          color: props.clientData?.balance ? "red" : " ",
                        }}
                      >
                        Current Balance:{" "}
                        {props.clientData?.balance
                          ? "$" + props.clientData?.balance
                          : "$0.00"}
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button
                        shape="round"
                        type="primary"
                        className="edit-profile"
                        onClick={onButtonClick}
                        ghost
                      >
                        Edit Profile
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {!props.osType && (
                <Row className="client-information">
                  <ClientProfileInformation
                    key={props.clientData.clientId}
                    clientData={props.clientData}
                    onPatientProfileClick={props.onPatientProfileClick}
                    openEmailDrawer={() =>
                      setEmailTextDrawer({
                        type: "email",
                        clientId: props.clientData.clientId,
                      })
                    }
                    allStates={props.allStates}
                    allPets={props.allPets}
                    onSuccessReturn={props.onSuccessReturn}
                    onTabChange={props.onTabChange}
                    onPatientUpdate={props.onPatientUpdate}
                    viewAppointment={props.viewAppointment}
                  />
                </Row>
              )}
            </div>
          </Col>
          <Col lg={24} xxl={15}>
            <div className="client-profile-details-tabs client-profile-widget">
              <Tabs
                defaultActiveKey="1"
                onChange={() => {
                  if (props.onTabChange) props.onTabChange();
                  onTabChange();
                }}
                className="client-profile-tabs"
                destroyInactiveTabPane={true}
              >
                {props.osType && (
                  <TabPane className="tab-reminders" tab="Client Info" key="1">
                    <ClientProfileInformation
                      key={props.clientData.clientId}
                      clientData={props.clientData}
                      onPatientProfileClick={props.onPatientProfileClick}
                      openEmailDrawer={() =>
                        setEmailTextDrawer({
                          type: "email",
                          clientId: props.clientData.clientId,
                        })
                      }
                      allStates={props.allStates}
                      allPets={props.allPets}
                      onSuccessReturn={props.onSuccessReturn}
                      onTabChange={props.onTabChange}
                      onPatientUpdate={props.onPatientUpdate}
                      viewAppointment={props.viewAppointment}
                    />
                  </TabPane>
                )}
                {/* <TabPane className="tab-pets"
                                       
                                         tab="Pets"
                                         key="Pets">
                                    <Pets historyData={soapHistory} onAddPetClick={()=>setAddPatient(true)}  onPatientProfileClick={props.onPatientProfileClick} clientId = {props.clientData.clientId} allPets={props.allPets} clientLastName={props.clientData?.primary?.lastName}/>
                                </TabPane> */}
                {/* <TabPane className="tab-reminders"
                                        
                                         tab="Reminders"
                                         key="Reminders">
                                    <MedicalDetailsTable data={tableRemindersProps}/>
                                </TabPane> */}

                <TabPane className="tab-reminders" tab="Reminders" key="2">
                  <RemindersPatientTab patientId={props.clientData.clientId} />
                </TabPane>
                {context.defaultBranch.branchTypeId != 2 && (
                  <TabPane
                    className="tab-medical-details"
                    tab={
                      context.defaultBranch.branchTypeId != 2
                        ? "Treatments"
                        : "Services"
                    }
                    key="3"
                  >
                    <TreatmentsTab
                      clientId={props.clientData.clientId}
                      patientId={props.clientData.clientId}
                      patientName={
                        props.clientData?.primary?.firstName +
                        " " +
                        props.clientData?.primary?.lastName
                      }
                      data={treatmentsData}
                    />
                  </TabPane>
                )}
                <TabPane
                  className="tab-estimates"
                  tab="Estimates"
                  key="Estimates"
                >
                  <EstimateTab
                    patientName={props.clientData?.primary?.firstName}
                    clientId={props.clientData.clientId}
                    allPets={props.allPets}
                    patientId={props.clientData.clientId}
                    clientLastName={props.clientData?.primary?.lastName}
                    isClient={false}
                  />
                </TabPane>
                <TabPane className="tab-history" tab="History" key="History">
                  <ClientHistoryTab
                    viewAppointment={(
                      apptId,
                      patientId,
                      providerId,
                      clientId,
                      patientName,
                    ) =>
                      props.viewAppointment(
                        apptId,
                        patientId,
                        providerId,
                        clientId,
                        patientName,
                      )
                    }
                    clientId={props.clientData.clientId}
                  />
                </TabPane>
                <TabPane tab="Uploads" key="6">
                  <UploadsTab patientId={props.clientData.clientId} />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
        {/* {addPatient && <CreateEditPatientDrawer onClose={()=>setAddPatient(false)} isEdit={false} onSuccessReturn={props.onPatientUpdate} clientId = {props.clientData.clientId} clientEmail={props.clientData?.primary?.email} clientLastName={props.clientData?.primary?.lastName}/>} */}
      </Content>
    </Layout>
  );
};

export default ClientProfilePage;
