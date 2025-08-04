import React, { useState } from "react";
import { Dropdown, Menu, Col, Row, Typography } from "antd";
import CustomImage from "../generic-components/custom-image/CustomImage";
import {
  UserIcon,
  SupportIcon,
  LogoutIcon,
  ChangeLogIcon,
  SecureLock,
} from "../util/SvgUtil";
import "./MainHeader.scss";
import LoginServices from "../../services/LoginServices";
import ChangePasswordModal from "../login/ChangePassword";

const { Text } = Typography;

const STAFF_ROLES = {
  FD: "Front Desk",
  TN: "Technician",
  DR: "Doctor",
  LD: "Leadership",
};
const ProfileMenu = (props) => {
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const showModal = () => {
    setIsChangePasswordVisible(true);
  };
  const menu = (
    <Menu className="profile-dropdown-menu">
      <Row className="profile-name">
        <Col>
          <Row>
            <Col>
              <Text className="profileDDName">
                {props.userProfile?.firstName +
                  " " +
                  props.userProfile?.lastName}
              </Text>
            </Col>
          </Row>
          <Row style={{ padding: 0, marginTop: "-5px" }}>
            <Col>
              <Text style={{ fontSize: "13px" }}>
                {STAFF_ROLES[props.userProfile?.permission] ?? "-"}
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>

      <Menu.Item
        key="1"
        icon={<UserIcon />}
        onClick={() => {
          props.onViewProfile();
        }}
      >
        View Profile
      </Menu.Item>
      <Menu.Item key="1" icon={<SecureLock />} onClick={showModal}>
        Change Password
      </Menu.Item>
      {/* <Menu.Item key="1" icon={<SupportIcon />}>
                Support    </Menu.Item>
            <Menu.Item key="1" icon={<ChangeLogIcon />}>
                Changelog
            </Menu.Item>  */}

      <Menu.Item
        key="1"
        icon={<LogoutIcon />}
        onClick={() => LoginServices.logout()}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {isChangePasswordVisible && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordVisible(false)}
        />
      )}

      <Dropdown className="profile-dropdown" overlay={menu} trigger="click">
        <div className="userProfileCont">
          <CustomImage
            className="userProfile"
            styling={{
              width: "45px",
              height: "45px",
              showInfoIcon: false,
              showOuterBorder: false,
              fullName:
                props.userProfile?.firstName +
                " " +
                props.userProfile?.lastName,
              url: props.userProfile?.image
                ? `url(` + props.userProfile?.image + `)`
                : "",
            }}
          ></CustomImage>
        </div>
      </Dropdown>
    </>
  );
};

export default ProfileMenu;
