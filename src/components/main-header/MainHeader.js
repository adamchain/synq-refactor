import {
  PoweroffOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Col,
  Drawer,
  Input,
  Layout,
  Menu,
  Row,
  Typography,
} from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { HeaderLogo, SecureLock } from "../util/SvgUtil";
import "./MainHeader.scss";

import CommonServices from "./../../services/CommonServices";
// import ChatDrawer from './ChatDrawer';
import { CommonContext } from "../../context/CommonContext";
import ClockInOutMenu from "./ClockInOutMenu";
import ProfileMenu from "./ProfileMenu";
import Rsocket from "./Rsocket";
const { Header } = Layout;
const { Text } = Typography;

const CustomOption = ({ data }) => {
  return (
    <Row style={{ padding: "0.5em" }} gutter={[16, 0]} align="middle">
      <Col>
        {data.image ? (
          <Avatar
            style={{
              backgroundColor: "#002729",
              fontWeight: 500,
              fontSize: "13px",
            }}
            src={data.image}
            size="large"
            shape="circle"
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: "#002729",
              fontWeight: 500,
              fontSize: "13px",
            }}
            size="large"
            shape="circle"
          >
            {data.name.charAt(0) + data.name.split(" ")[1].charAt(0)}
          </Avatar>
        )}
      </Col>
      <Col>
        <Row style={{ marginBottom: "-4px" }} align="middle">
          <Col>
            <Text style={{ fontWeight: 400, fontSize: "14px" }}>
              {data.name}
            </Text>
          </Col>
        </Row>
        <Row align="middle">
          <Col>
            <Text
              style={{ fontSize: "13px", color: "#767676", fontWeight: 400 }}
            >
              {data.breed ?? "Client"}
            </Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
const MainHeader = (props) => {
  const [searchText, setSearchText] = useState("");
  const [chatDrawer, setChatDrawer] = useState(false);

  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  const commonContext = useContext(CommonContext);

  // useEffect(()=>{
  //     CommonServices.getAllClientsAndPatients(commonContext.updateStateFields);
  // },[]);

  useEffect(() => {
    CommonServices.getAllClientsAndPatients(commonContext.updateStateFields);
    Promise.resolve(Rsocket.run()).then(
      () => {
        console.log("rsocket success");
      },
      (error) => {
        console.error(error.stack);
        {
          console.log("rsocket error");
        }
      },
    );
  }, []);

  const filterItems = () => {
    return searchText
      ? commonContext.clientPatientDetails
          .filter((k) =>
            k.name.toLowerCase().includes(searchText.toLowerCase()),
          )
          .map((k) => ({ data: k, value: <CustomOption data={k} /> }))
      : [];
  };

  return (
    <Fragment>
      <Header>
        <Row justify="space-between" style={{ height: "64px" }}>
          <Col flex="150px" className="appName">
            <HeaderLogo width="70" height="70" />
          </Col>
          <Col flex={2} className="main-header-search">
            <AutoComplete
              value={searchText}
              className="headerSearchBox"
              style={{ width: "100%" }}
              onSearch={(value) => {
                setSearchText(value);
              }}
              options={filterItems()}
              onSelect={(value, option) => {
                setSearchText("");
                props.onSearch("Clients", option.data);
              }}
            >
              {/* <Search size="large" 
                    className="headerSearchBox"
                    prefix={<SearchOutlined className="headerSearchIcon" />}
                    placeholder="Search for Clients or Patients"
                    onSearch={value => console.log(value)}/>  */}
              <Input
                size="large"
                prefix={<SearchOutlined className="headerSearchIcon" />}
                placeholder="Search for Clients"
              />
            </AutoComplete>
          </Col>
          <Col xs={12} className="main-header-right">
            {commonContext.defaultBranch.branchTypeId != 2 && (
              <ClockInOutMenu />
            )}
            {/* <div className='message' onClick={()=>{setChatDrawer(true)}}>
                    <ChatIcon />
                </div>
                <div className='bell'>
                    <NotificationIcon />
                </div> */}
            <ProfileMenu
              userProfile={commonContext.userProfile}
              onViewProfile={(data) =>
                props.onSearch("Staff", {
                  staffId: commonContext.userProfile.userId,
                })
              }
            />

            {/* <Tooltip placement="topLeft" title="User Profile Management">
                    <Avatar
                        className="profileIcon"
                        size="large"
                        onClick={()=>setIsRightDrawerOpen(true)}
                        icon={<UserOutlined />}
                    />
                </Tooltip>*/}
            {/* <Button
                style={{marginRight: '15px'}}
                type="primary"
                icon={<UserOutlined />}
                onClick={() => {
                  localStorage.setItem ('user-token', '');
                  this.props.history.push ('/login');
                }}
              >
                Logout{' '}
              </Button> */}
          </Col>
        </Row>
      </Header>
      <Drawer
        id="sideDrawer"
        size="large"
        title="User Profile"
        placement="right"
        closable={true}
        onClose={() => setIsRightDrawerOpen(false)}
        visible={isRightDrawerOpen}
        bodyStyle={{ padding: 0 }}
      >
        <Layout>
          <Row className="userProfile">
            <Col xs={8}>
              <Avatar className="avatarProfile">UN</Avatar>
            </Col>
            <Col xs={16}>
              <span className="userName">User Name</span>
              <span className="userRole">{}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <Menu mode={"vertical"} theme={"light"}>
                <Menu.Item key="1" icon={<SettingOutlined />}>
                  Settings
                </Menu.Item>
                <Menu.Item key="2" icon={<SecureLock />}>
                  Change Password
                </Menu.Item>
                <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
                  support@WHSKR.com
                </Menu.Item>
                {/* <Menu.Item key="3" icon={<FileDoneOutlined />}>
                    Change Log
                  </Menu.Item> */}
                <Menu.Item
                  key="4"
                  onClick={() => {
                    localStorage.setItem("user-token", "");
                    this.props.history.push("/login");
                  }}
                  icon={<PoweroffOutlined />}
                >
                  Log Out
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Layout>
      </Drawer>
      {/* {chatDrawer && <ChatDrawer/>} */}
    </Fragment>
  );
};

export default MainHeader;
