import React, { useContext } from "react";
import { Row, Col, Typography } from "antd";
import { BehaviorAlertIcon } from "../util/SvgUtil";

import Title from "antd/es/typography/Title";

import { StaffViewConfig } from "./StaffViewConfig";

import { CommonContext } from "../../context/CommonContext";

const { Text } = Typography;

const STAFF_ROLES = {
  FD: "Front Desk",
  TN: "Technician",
  DR: "Doctor",
  LD: "Leadership",
};

const StaffInformation = (props) => {
  const context = useContext(CommonContext);

  return (
    <Row className="staff-information">
      <Col span={24} className="staff-profile-config">
        <Title level={4}>Employee Information</Title>
        <Row span={24} className="staff-more-info">
          {StaffViewConfig({
            ...props.staffData,
            STAFF_ROLES,
            STATES: context.allStates,
          }).map((config, index) => {
            return (
              <Col className="staff-details" span={12}>
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
                {config.name === "address" ? (
                  <>
                    <Row>
                      <Col span={24}>
                        <Text>{`${(config.value?.address1 ?? "") + " " + (config.value?.address2 ?? "")} `}</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text>{`${config.value?.city + ", " + context.allStates[config.value?.stateId]?.stateCd + " " + config.value?.zip}`}</Text>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <div>
                    {config.name === "active" ? (
                      config.value === "A" ? (
                        <Text style={{ color: "green" }}>Yes </Text>
                      ) : (
                        <Text style={{ color: "red" }}>No </Text>
                      )
                    ) : (
                      <Text
                        className={
                          config.name === "allergies"
                            ? "text-default-400 dangerColor"
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
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default StaffInformation;
