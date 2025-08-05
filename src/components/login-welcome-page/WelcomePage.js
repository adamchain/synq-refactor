import React, { useContext } from "react";
import "./WelcomePage.scss";
import { Button, Col, Row, Popover } from "antd";
import Text from "antd/es/typography/Text";
import { RightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { CommonContext } from "../../context/CommonContext";
import LoginServices from "../../services/LoginServices";

const WelcomePage = () => {
  const commonContext = useContext(CommonContext);
  let history = useHistory();

  const clinicMessage = (
    <div>
      <Text>
        You may want to contact <br /> the clinic's management to ensure <br />
        your profile is active
      </Text>
    </div>
  );

  return (
    <Row className="welcome-page">
      <Col xs={24}>
        <Row justify="start">
          <Text className="text-default-500 welcome-name">
            {`Welcome ${commonContext.userProfile.firstName}!`}
          </Text>
        </Row>
        <Row justify="start">
          <Text className="text-default-400 choose-clinic">
            You are associated with multiple clinics. <br />
            Choose which clinic you are logging into below:
          </Text>
        </Row>

        {commonContext.branchDetails.map((clinic, index) => {
          return (
            <Row
              justify="start"
              key={index}
              onClick={() => {
                LoginServices.updateDefaultBranch(clinic.branchId, (data) => {
                  commonContext.updateStateFields({ defaultBranch: clinic });
                  LoginServices.getLoggedInUserDetails((userProfile) => {
                    if (userProfile) {
                      commonContext.updateStateFields({ userProfile });
                    }
                  });
                  history.push("/main");
                });
              }}
              className="clinic-list"
            >
              <Button className="clinic-btn">
                <div className="clinic-name-address">
                  <Text className="text-default-500 font-size-15 clinic-name">
                    {clinic.name}
                  </Text>
                  <Row>
                    <Col span={24}>
                      <Text className="text-default-300 clinic-address">{`${(clinic.address1 ?? "") + " " + (clinic.address2 ?? "")} `}</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Text className="text-default-300 clinic-address">{`${clinic.city + " ," + commonContext.allStates[clinic.stateId]?.stateCd + " " + clinic.zipCode}`}</Text>
                    </Col>
                  </Row>
                  {/* <Text className="text-default-300 clinic-address">
                                
                                </Text> */}
                </div>
                <div>
                  <RightOutlined />
                </div>
              </Button>
            </Row>
          );
        })}
        <Row justify="center">
          <Popover content={clinicMessage} trigger="hover">
            <Text className="text-default-400 font-size-16 no-clinic">
              I don’t see my clinic
            </Text>
          </Popover>
        </Row>
        <Row justify="center">
          <a className="font-size-16" onClick={() => LoginServices.logout()}>
            Logout
          </a>
        </Row>
      </Col>
    </Row>
  );
};

export default WelcomePage;
