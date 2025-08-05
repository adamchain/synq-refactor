import { Button, Col, Layout, Row, Tabs, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import LabServices from "../../services/LabServices";
import UploadsTab from "../appointment-details/upload/UploadsTab";
import ClientEmailTextDrawer from "../client-profile-page/ClientEmailTextDrawer";
import CustomImage from "../generic-components/custom-image/CustomImage";
import PatientHistory from "../history/PatientHistory";
import LabsTab from "../labs/LabsTab";
import RemindersPatientTab from "../reminders/RemindersPatientTab";
import TreatmentsTab from "../treatments/TreatmentsTab";
import CommonUtil from "../util/CommonUtil";
import { EmailIcon } from "../util/SvgUtil";
import PatientServices from "./../../services/PatientServices";
import TreatmentServices from "./../../services/TreatmentServices";
import EstimateTab from "./../estimate/EstimateTab";
import CreateEditPatientDrawer from "./CreateEditPatientDrawer";
import "./PatientProfile.scss";
import PatientProfileInformation from "./PatientProfileInformation";

const { Text, Link } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const customImageStyling = (patientData) => ({
  width: "131px",
  height: "131px",
  className: "clientPatientAvatar",
  showInfoIcon: patientData?.freeForm?.BA ? true : false,
  showOuterBorder: true,
  toolTip: {
    title: (patientData?.freeForm ?? {}).BA,
    placement: "bottom",
  },
  url: patientData?.image ? `url(` + patientData?.image + `)` : "",
  fullName: patientData?.patientName + " " + patientData?.clientLastName,
  ringColor: CommonUtil.genderBasedColor(patientData?.sexCd),
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

const vaccines = [
  {
    key: "1",
    name: "AAU Canine - Bordetella",
    administered: "09/03/2020",
    expiration: "09/03/2020",
  },
  {
    key: "2",
    name: "Joe Black",
    administered: "09/03/2021",
    expiration: "09/03/2020",
  },
  {
    key: "3",
    name: "Jim Green",
    administered: "09/03/2022",
    expiration: "09/03/2025",
  },
];
const monitoring = [
  {
    key: "1",
    name: "AAU Canine - Bordetella",
    administered: "09/03/2020",
    expiration: "09/03/2020",
  },
  {
    key: "2",
    name: "VX-DAPP Vaccine (3 Year)",
    administered: "09/03/2021",
    expiration: "09/03/2020",
  },
  {
    key: "3",
    name: "Canine Rabies Vaccine (3 Year)",
    administered: "09/03/2022",
    expiration: "09/03/2025",
  },
];
const medications = [
  {
    key: "1",
    name: "Vetropolycin Ophth Ointment 1/8 Oz",
    administered: "09/03/2020",
    expiration: "09/03/2020",
  },
];

const tableRemindersProps = {
  tableName: "clientProfile",
  tableData: {
    vaccines: vaccines,
    monitoring: monitoring,
    medications: medications,
  },
};

const PatientProfilePage = (props) => {
  const [patientData, setPatientData] = useState(null);
  const [patientLabData, setPatientLabData] = useState([]);
  const [treatmentsData, setTreatmentsData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [requiredInputData, setRequiredInputData] = useState({
    statusList: [],
    familyList: [],
  });
  const [emailTextDrawer, setEmailTextDrawer] = useState(null);
  const context = useContext(CommonContext);

  useEffect(() => {
    getPatientDetails();
    PatientServices.fetchPatientStatus((data) =>
      setRequiredInputData((k) => ({ ...k, statusList: data })),
    );
    PatientServices.fetchAnimalFamily((data) =>
      setRequiredInputData((k) => ({ ...k, familyList: data })),
    );
  }, []);

  const onButtonClick = () => {
    setShowDrawer(true);
  };
  const getPatientDetails = () => {
    PatientServices.fetchPatientById(props.patientId, setPatientData);
  };

  const openEmailDrawer = () => {
    setEmailTextDrawer({
      type: "email",
      clientId: props.clientData.clientId,
      patientId: props.patientId,
    });
  };

  const onTabChange = (tabname) => {
    if (tabname === "4") {
      LabServices.getLabsForPatient(props.patientId, setPatientLabData);
    }
    if (tabname === "3" && props.patientId) {
      TreatmentServices.getMedicationAndVaccineByPatientId(
        props.patientId,
        setTreatmentsData,
      );
    }
  };

  const onSuccessLabTest = () => {
    LabServices.getLabsForPatient(props.patientId, setPatientLabData);
  };

  return (
    <Content className="masterContentPadding iPadScroller">
      {emailTextDrawer && (
        <ClientEmailTextDrawer
          onClose={() => setEmailTextDrawer(null)}
          inputData={emailTextDrawer}
        />
      )}
      {showDrawer ? (
        <CreateEditPatientDrawer
          onClose={() => setShowDrawer(false)}
          onSuccessReturn={() => {
            getPatientDetails();
            props.onPatientUpdate();
          }}
          patientData={patientData}
          isEdit={true}
          patientDelete={() => {
            props.onClientProfileCLick();
            setShowDrawer(false);
          }}
          clientLastName=""
        />
      ) : null}
      <Row gutter={[24, 24]} className="client-profile">
        <Col xs={24} lg={24} xxl={9} className="client-profile-info">
          <div className="client-profile-widget">
            <Row justify="center" className="page-header">
              <Col span={24}>
                <Col className="text-email-client">
                  {/* <div className="profileSendAction"  onClick = {()=>setEmailTextDrawer({type:"text",clientId:props.clientData.clientId,patientId:props.patientId})}><Row justify="center">
                                        <Button type="text"
                                                icon={<TextIcon
                                                    className='text-client-icon'/>}/>
                                    </Row>
                                    <Row justify="center">
                                        <Text className='text-client text-default-500 font-size-12'>
                                            Send Text
                                        </Text>
                                    </Row>
                                    </div> */}
                  {/* <div className="profileSendAction"><Row justify="center">
                                        <Button type="text"
                                                icon={<TextIcon
                                                    className='text-client-icon'/>}/>
                                    </Row>
                                    <Row justify="center">
                                        <Text className='text-client text-default-500 font-size-12'>
                                            Send Text
                                        </Text>
                                    </Row>
                                    </div> */}
                  <div
                    onClick={() =>
                      setEmailTextDrawer({
                        type: "email",
                        clientId: props.clientData.clientId,
                        patientId: props.patientId,
                      })
                    }
                    className="profileSendAction"
                  >
                    <Row justify="center">
                      <Button
                        type="text"
                        icon={<EmailIcon className="email-client-icon" />}
                      />
                    </Row>
                    <Row justify="center">
                      <Text className="email-client text-default-500 font-size-12">
                        Send Email
                      </Text>
                    </Row>
                  </div>
                  {/* <div className="profileSendAction"><Row justify="center">
                                        <Button type="text"
                                                icon={<EmailIcon
                                                    className='email-client-icon'/>}/>
                                    </Row>
                                    <Row justify="center">
                                        <Text className='email-client text-default-500 font-size-12'>
                                            Send Email
                                        </Text>
                                    </Row>
                                    </div> */}
                </Col>
                <CustomImage
                  styling={customImageStyling(patientData)}
                ></CustomImage>
                <Row justify="center">
                  <Col span={18}>
                    <Text className="text-default-500">
                      {patientData?.patientName +
                        " " +
                        patientData?.clientLastName}
                    </Text>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={24}>
                    <Text className="text-secondary-400">
                      {patientData?.breedName}
                    </Text>
                  </Col>
                </Row>
                <Row className="editProfileContainer">
                  <Col span={24}>
                    <Button
                      shape="round"
                      type="primary"
                      className="edit-profile"
                      ghost
                      onClick={onButtonClick}
                    >
                      Edit Profile
                    </Button>
                  </Col>
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

            {!props.osType && (
              <PatientProfileInformation
                onSearch={props.onSearch}
                key={props.patientId}
                clientData={props.clientData}
                allStates={props.allStates}
                patientData={patientData}
                allPets={props.allPets}
                openEmailDrawer={openEmailDrawer}
                onClientProfileCLick={props.onClientProfileCLick}
                onPatientUpdate={props.onPatientUpdate}
                onPatientProfileClick={props.onPatientProfileClick}
                viewAppointment={props.viewAppointment}
              />
            )}
          </div>
        </Col>
        <Col xl={24} xxl={15}>
          <div className="client-profile-details-tabs client-profile-widget">
            <Tabs
              defaultActiveKey={props.osType ? "7" : "1"}
              onChange={onTabChange}
              destroyInactiveTabPane={true}
              className="patient-profile-tabs"
            >
              {props.osType && (
                <TabPane className="tab-reminders" tab="Patient Info" key="7">
                  <PatientProfileInformation
                    onSearch={props.onSearch}
                    key={props.patientId}
                    clientData={props.clientData}
                    allStates={props.allStates}
                    patientData={patientData}
                    allPets={props.allPets}
                    openEmailDrawer={openEmailDrawer}
                    onClientProfileCLick={props.onClientProfileCLick}
                    onPatientUpdate={props.onPatientUpdate}
                    onPatientProfileClick={props.onPatientProfileClick}
                    viewAppointment={props.viewAppointment}
                  />
                </TabPane>
              )}
              <TabPane className="tab-history" tab="History" key="1">
                <PatientHistory
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
                  patientId={props.patientId}
                  patient={{
                    id: props.patientId,
                    name:
                      patientData?.patientName +
                      " " +
                      patientData?.clientLastName,
                    image: patientData?.image,
                    breed: patientData?.breedName,
                  }}
                  clientId={props.clientData.clientId}
                />
              </TabPane>
              <TabPane className="tab-reminders" tab="Reminders" key="2">
                <RemindersPatientTab
                  onSearch={props.onSearch}
                  patientId={props.patientId}
                />
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
                    patientId={props.patientId}
                    patientName={
                      patientData?.patientName +
                      " " +
                      patientData?.clientLastName
                    }
                    data={treatmentsData}
                  />
                </TabPane>
              )}
              {context.defaultBranch.branchTypeId != 2 && (
                <TabPane tab="Labs" key="4">
                  <LabsTab
                    showNewLabs={false}
                    inputIds={{}}
                    labsData={patientLabData}
                    onSuccessLabTest={onSuccessLabTest}
                  />
                </TabPane>
              )}
              <TabPane className="tab-estimates" tab="Estimates" key="5">
                <EstimateTab
                  clientId={props.clientData.clientId}
                  patientId={props.patientId}
                  patientName={patientData?.patientName}
                  clientLastName={props.clientData.primary?.lastName}
                  petData={props.allPets.find(
                    (k) => k.patientId === props.patientId,
                  )}
                  allPets={props.allPets}
                />
              </TabPane>
              <TabPane tab="Uploads" key="6">
                <UploadsTab patientId={props.patientId} />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default PatientProfilePage;
