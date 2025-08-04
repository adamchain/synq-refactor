import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Tabs, Button, Layout, Card } from "antd";
import "./PatientProfile.scss";
import {
  BehaviorAlertIcon,
  TextIcon,
  EmailIcon,
  UserIcon,
} from "../util/SvgUtil";
import CustomImage from "../generic-components/custom-image/CustomImage";
import TreatmentsTab from "../treatments/TreatmentsTab";
import {
  ClientPrimaryConfig,
  ClientSecondaryConfig,
  PatientProfileConfig,
} from "./PatientViewConfig";
import CreateEditPatientDrawer from "./CreateEditPatientDrawer";
import PatientServices from "./../../services/PatientServices";
import Title from "antd/es/typography/Title";
import EstimateTab from "./../estimate/EstimateTab";
import LabsTab from "../labs/LabsTab";
import LabServices from "../../services/LabServices";
import RemindersPatientTab from "../reminders/RemindersPatientTab";
import UploadsTab from "../appointment-details/upload/UploadsTab";
import TreatmentServices from "./../../services/TreatmentServices";
import PatientHistory from "../history/PatientHistory";
import WeightTrend from "../appointment-details/WeightTrend";
import ClientEmailTextDrawer from "../client-profile-page/ClientEmailTextDrawer";

const { Text, Link } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const PatientProfileInformation = (props) => {
  const [requiredInputData, setRequiredInputData] = useState({
    statusList: [],
    familyList: [],
  });

  useEffect(() => {
    //getPatientDetails();
    PatientServices.fetchPatientStatus((data) =>
      setRequiredInputData((k) => ({ ...k, statusList: data })),
    );
    PatientServices.fetchAnimalFamily((data) =>
      setRequiredInputData((k) => ({ ...k, familyList: data })),
    );
  }, []);

  let patientData = props.patientData;

  return (
    <Row gutter={[0, 0]} className="client-profile">
      <Col xl={24} className="client-profile-info">
        <Row className="patient-information">
          <Col span={24} className="patient-profile-config">
            <Title level={4}>Patient Information</Title>
            <Row span={24} className="patient-more-info">
              {PatientProfileConfig(patientData, requiredInputData).map(
                (config, index) => {
                  let style = {};
                  if (
                    config.value === "Active" ||
                    config.value === "Inactive" ||
                    config.value === "PassedAway" ||
                    config.value === "Euthanized"
                  ) {
                    style = {
                      color: config.value === "Active" ? "green" : "red",
                    };
                  }
                  return (
                    <Col className="patient-details" span={12}>
                      <Text
                        className={
                          config.name !== "behaviorAlerts"
                            ? "text-default-500 font-size-14"
                            : "text-default-500 font-size-14 behavior-alerts"
                        }
                      >
                        {config.name === "behaviorAlerts" ? (
                          <BehaviorAlertIcon className="behaviorAlertIcon" />
                        ) : null}
                        {config.label}
                      </Text>

                      <div>
                        <Text
                          className={
                            config.name === "allergies"
                              ? "text-default-400 dangerColor"
                              : "text-default-400 text-color"
                          }
                          style={style}
                        >
                          {config.value}
                        </Text>
                      </div>
                    </Col>
                  );
                },
              )}
              <Col span={24}>
                <div style={{ width: "100%", height: 200 }}>
                  {patientData?.patientId && (
                    <WeightTrend
                      key={patientData?.weight}
                      chartType="area"
                      isChartOnly={true}
                      patientId={patientData?.patientId}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="client-primary-config">
            <Row justify="space-between">
              <Col>
                <Title level={4}>Client Information</Title>
              </Col>
              <Col>
                <Typography.Link onClick={props.onClientProfileCLick}>
                  View Profile
                </Typography.Link>
              </Col>
            </Row>
            <Row span={24} className="title">
              <Title level={5}> Primary Contact </Title>
            </Row>
            <Row span={24} className="client-more-info">
              {ClientPrimaryConfig(props.clientData, props.allStates).map(
                (config, index) => {
                  return (
                    <Col
                      className="client-details"
                      span={index === 0 ? "24" : 12}
                    >
                      <Text className="text-default-500 font-size-14">
                        {config.label}
                      </Text>
                      {config.name === "address" ? (
                        <>
                          <Row>
                            <Col span={24}>
                              <Text>{`${(config.value?.address1 ?? "") + " " + (config.value?.address2 ?? "")} `}</Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Text>{`${config.value?.city + ", " + props.allStates[config.value?.stateId]?.stateCd + " " + config.value?.zipCode}`}</Text>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <div
                          onClick={
                            config.name === "email" ? props.openEmailDrawer : ""
                          }
                        >
                          {config.value === "-" ? (
                            <Text type="secondary">-</Text>
                          ) : (
                            <Text
                              className={
                                config.name === "email"
                                  ? "text-default-400 email-color"
                                  : "text-default-400 text-color"
                              }
                            >
                              {config.value}
                            </Text>
                          )}
                        </div>
                      )}
                      {/* {config.name === 'address' ? 
                                                    <>
                                                    <Row><Col span={24}><Text>{`${(config.value?.address1??'')+" "+(config.value?.address2??'')} `}</Text></Col></Row>
                                                    <Row><Col ><Text>{`${config.value?.city+" ,"+ props.allStates[config.value?.stateId]?.stateCd+" "+config.value?.zipCode}`}</Text></Col></Row>
                                                    </>:
                                                <div>
                                                    <Text
                                                        className={config.name === 'email' ? 'text-default-400 email-color' : 'text-default-400 primaryText'}>
                                                        {config.value?config.value:"-"}
                                                    </Text>
                                                </div>
                                                } */}
                    </Col>
                  );
                },
              )}
            </Row>
          </Col>
          {Object.keys(props.clientData?.secondary ?? {}).length > 0 && (
            <Col span={24} className="client-secondary-config">
              <Row span={24}>
                <Title level={5}> Secondary Contact </Title>
              </Row>
              <Row span={24} className="client-more-info">
                {ClientSecondaryConfig(props.clientData).map(
                  (config, index) => {
                    return (
                      <Col
                        className="client-details"
                        span={index === 0 ? "24" : 12}
                      >
                        <Text className="text-default-500 font-size-14">
                          {config.label}
                        </Text>
                        <div>
                          <Text
                            className={
                              config.name === "email"
                                ? "text-default-400 email-color"
                                : "text-default-400 text-color"
                            }
                          >
                            {config.value}
                          </Text>
                        </div>
                      </Col>
                    );
                  },
                )}
              </Row>
            </Col>
          )}
          <Col span={24} className="client-related-config">
            <Row className="table-title-top" gutter={[0, 24]}>
              <Col>
                <Title level={4}>Related Patients </Title>
              </Col>
            </Row>
            <Row className="client-more-info">
              {props.allPets
                .filter(
                  (k) =>
                    k?.patientId !== patientData?.patientId &&
                    k?.status === "Active",
                )
                .map((pet, index) => {
                  return (
                    <Row
                      className="relatedPatientsContainer"
                      justify="space-between"
                      gutter={[0, 16]}
                    >
                      <Col span={24}>
                        <Link
                          onClick={() =>
                            props.onPatientProfileClick(pet.patientId)
                          }
                        >
                          <Row className="relatedPatientsCard" align="middle">
                            {/* <Row justify="space-between" align="middle" >
                                                    <Col span={24}> */}
                            {/* <Row justify="start" align="middle" gutter={[16,0]}> */}
                            <Col span={5}>
                              <CustomImage
                                styling={{
                                  width: "85px",
                                  height: "85px",
                                  showInfoIcon: false,
                                  showOuterBorder: false,
                                  url: `url(` + pet?.image + `)`,
                                  fullName: "", // pass dynamic full name
                                }}
                              />
                            </Col>
                            <Col
                              sm={15}
                              xl={15}
                              style={{
                                paddingLeft: "12px",
                                paddingRight: "12px;",
                              }}
                            >
                              <Row justify="space-between">
                                <Col>
                                  <Text
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {pet.patientName +
                                      " " +
                                      patientData?.clientLastName}
                                  </Text>
                                </Col>
                              </Row>
                              <Row
                                style={{ marginTop: "-5px" }}
                                justify="space-between"
                                align="middle"
                              >
                                <Col>
                                  <Text type="secondary">{pet.breedName}</Text>
                                </Col>
                              </Row>
                            </Col>
                            <Col
                              sm={3}
                              xl={4}
                              style={{
                                textAlign: "right",
                                paddingRight: "12px",
                              }}
                            >
                              <Link
                                onClick={() =>
                                  props.onPatientProfileClick(pet.patientId)
                                }
                              >
                                View
                              </Link>
                            </Col>
                          </Row>
                        </Link>
                      </Col>
                    </Row>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PatientProfileInformation;
