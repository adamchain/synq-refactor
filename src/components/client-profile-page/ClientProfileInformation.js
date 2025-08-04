import React, { useState } from "react";
import { Row, Col, Typography, Tabs, Button, Layout } from "antd";
import "./ClientProfile.scss";
import CustomImage from "../generic-components/custom-image/CustomImage";

import { TextIcon, EmailIcon } from "../util/SvgUtil";

import Pets from "./Pets";

import CreatEditClientDrawer from "../client-profile-page/CreateEditClientDrawer";
import {
  ClientPrimaryConfig,
  ClientSecondaryConfig,
  ClientDiscounts,
} from "./ViewConfig";
import CreateEditPatientDrawer from "../patient-profile-page/CreateEditPatientDrawer";
import EstimateTab from "./../estimate/EstimateTab";

import ClientHistoryTab from "./../history/ClientHistoryTab";
import ClientEmailTextDrawer from "./ClientEmailTextDrawer";

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

// const [values, setValues] = useState({name: '', quantity: 0, unitCost: 0})

const ClientProfileInformation = (props) => {
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [addPatient, setAddPatient] = useState(false);
  const [emailTextDrawer, setEmailTextDrawer] = useState(null);

  return (
    <Row gutter={[24, 24]} className="client-profile">
      <Col xl={24} className="client-profile-info">
        <div className="client-profile-widget">
          <Row className="client-information">
            <Col span={24}>
              <Text
                style={{ fontWeight: 600 }}
                className="text-default-500 font-size-18"
              >
                Client Information
              </Text>
              <Row span={24} className="client-more-info">
                {ClientPrimaryConfig(props.clientData, props.allStates).map(
                  (config, index) => {
                    return (
                      <Col className="client-details" span={12}>
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
                              config.name === "email"
                                ? props.openEmailDrawer
                                : ""
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
                      </Col>
                    );
                  },
                )}
              </Row>
            </Col>
            {Object.keys(props.clientData?.secondary ?? {}).length > 0 && (
              <Col span={24}>
                <Row span={24}>
                  <Text
                    className="text-default-500 font-size-18"
                    style={{ fontWeight: 600 }}
                  >
                    {" "}
                    Secondary Contact{" "}
                  </Text>
                </Row>
                <Row span={24} className="client-more-info">
                  {ClientSecondaryConfig(props.clientData).map(
                    (config, index) => {
                      return (
                        <Col
                          className="client-details"
                          span={
                            config.name === "fullName" ||
                            config.name === "email"
                              ? "24"
                              : 12
                          }
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
            <Col span={24}>
              <Row span={24}>
                <Text
                  className="text-default-500 font-size-18"
                  style={{ fontWeight: 600 }}
                >
                  {" "}
                  Discounts
                </Text>
              </Row>
              <Row span={24} className="client-more-info">
                {ClientDiscounts(props.clientData).map((config, index) => {
                  return (
                    <Col
                      className="client-details"
                      span={config.name === "taxExempt" ? "24" : 12}
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
                })}
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ClientProfileInformation;
