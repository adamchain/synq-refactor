import { Col, Layout, Menu, Row, Typography } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { withRouter } from "react-router-dom";
import { CommonContext } from "../../context/CommonContext";
import BillingsPage from "../billings-page/BillingsPage";
import CalendarPage from "../calendar-page/CalendarPage";
import ClientDetailsListPage from "../client-profile-page/ClientDetailsList";
import { callUnSavedModal } from "../generic-components/un-saved-modal/UnSavedModal";
import HomePage from "../home-page/HomePage";
import InventoryPage from "../inventory-page/InventoryDetails";
import LabsPage from "../labs/LabsPage";
import ReportsPage from "../reports-page/ReportsPage";
import StaffPage from "../staff-page/StaffPage";
import {
  BillingIcon,
  CalendarIcon,
  ClientsIcon,
  HomeIcon,
  InventoryIcon,
  LabsIcon,
  ReportsIcon,
  SettingsIcon,
  StaffIcon,
} from "../util/SvgUtil";
import MainHeader from "./../main-header/MainHeader";
import PackagesPage from "./../packages-page/PackagesPage";
import SettingsPage from "./../settings-page/SettingsPage";
import "./Landing.scss";

const { Sider } = Layout;
const { Text } = Typography;

const menuItemsObject = (onContentValueChange) => ({
  Home: {
    icon: <HomeIcon />,
    name: "Home",
    component: (
      <HomePage
        onSearch={(type, data) => {
          onContentValueChange(type, { searchData: data });
        }}
      />
    ),
  },
  Calendar: {
    icon: <CalendarIcon />,
    name: "Calendar",
    component: (
      <CalendarPage
        onSearch={(type, data) => {
          onContentValueChange(type, { searchData: data });
        }}
      />
    ),
  },
  // { icon: <BoardIcon />, name: "Board", component: <DashboardTimeline /> },
  Clients: {
    icon: <ClientsIcon />,
    name: "Clients",
    component: (
      <ClientDetailsListPage
        onSearch={(type, data) => {
          onContentValueChange(type, { searchData: data });
        }}
      />
    ),
  },
  Labs: {
    icon: <LabsIcon />,
    name: "Labs",
    component: (
      <LabsPage
        onSearch={(type, data) => {
          onContentValueChange(type, { searchData: data });
        }}
      />
    ),
  },
  Inventory: {
    icon: <InventoryIcon />,
    name: "Inventory",
    component: <InventoryPage />,
  },
  Packages: {
    icon: <InventoryIcon />,
    name: "Packages",
    component: <PackagesPage />,
  },
  Billing: {
    icon: <BillingIcon />,
    name: "Billing",
    component: (
      <BillingsPage
        onSearch={(type, data) => {
          onContentValueChange(type, { searchData: data });
        }}
      />
    ),
  },
  Reports: {
    icon: <ReportsIcon />,
    name: "Reports",
    component: <ReportsPage />,
  },
  Staff: { icon: <StaffIcon />, name: "Staff", component: <StaffPage /> },
  Settings: {
    icon: <SettingsIcon />,
    name: "Settings",
    component: <SettingsPage />,
  },
});

var menuItemsArray = [
  "Home",
  "Calendar",
  "Clients",
  "Labs",
  "Inv-Submenu",
  "Billing",
  "Reports",
  "Staff",
  "Settings",
];

class Landing extends React.Component {
  static contextType = CommonContext;
  state = {
    contentValue: "Home",
    searchData: null,
    contentKey: 0,
  };

  onMenuChange = (contentValue, extras) => {
    let tempExtras = extras ? extras : { searchData: null };
    this.setState({
      contentValue,
      ...tempExtras,
      contentKey: this.state.contentKey + 1,
    });
  };
  onContentValueChange = (contentValue, extras) => {
    if (this.context.isApptFormTouched) {
      let onDisregard = () => {
        this.context.updateStateFields({ isApptFormTouched: false });
        this.onMenuChange(contentValue, extras);
      };
      callUnSavedModal(onDisregard, () => {});
      //this.setState({unSavedModal:{input:{contentValue,extras}}});
    } else {
      this.onMenuChange(contentValue, extras);
    }
  };

  render() {
    if (this.context.defaultBranch.branchTypeId == 2) {
      menuItemsArray = [
        "Home",
        "Calendar",
        "Clients",
        "Inv-Submenu",
        "Billing",
        "Reports",
        "Staff",
        "Settings",
      ];
    }
    return (
      <Layout id="landing-page">
        <MainHeader
          onSearch={(type, data) => {
            /**do this for avoid same search */
            this.onContentValueChange(type, { searchData: null });
            setTimeout(
              () => this.onContentValueChange(type, { searchData: data }),
              200,
            );
          }}
        />

        <Layout className="site-layout">
          <Sider width={"78px"}>
            <Menu id="landing-page-menu" theme="light">
              {menuItemsArray
                .filter(
                  (k) =>
                    !(
                      this.context?.userProfile?.permission !== "LD" &&
                      k === "Settings"
                    ),
                )
                .map((k, index) => {
                  if (k === "Inv-Submenu") {
                    let fillcolor =
                      this.state.contentValue === "Inventory" ||
                      this.state.contentValue === "Packages"
                        ? "#008489"
                        : "#484848";
                    return (
                      <>
                        <SubMenu
                          key="sub1"
                          title={
                            <Row justify="space-around">
                              {React.cloneElement(
                                menuItemsObject(this.onContentValueChange)[
                                  "Inventory"
                                ].icon,
                                { fillcolor },
                              )}
                              <Text
                                className="sideNavText"
                                style={{ color: fillcolor }}
                              >
                                Inventory
                              </Text>
                            </Row>
                          }
                        >
                          <Menu.Item
                            key="Inventory"
                            onClick={(k) =>
                              this.onContentValueChange("Inventory")
                            }
                          >
                            Inventory
                          </Menu.Item>
                          <Menu.Item
                            key="Packages"
                            onClick={(k) =>
                              this.onContentValueChange("Packages")
                            }
                          >
                            Packages
                          </Menu.Item>
                        </SubMenu>
                      </>
                    );
                  } else {
                    let fillcolor =
                      this.state.contentValue === k ? "#008489" : "#484848";

                    return (
                      <Menu.Item
                        key={k}
                        onClick={() => this.onContentValueChange(k)}
                      >
                        <Row justify="space-around">
                          <Col>
                            {React.cloneElement(
                              menuItemsObject(this.onContentValueChange)[k]
                                .icon,
                              { fillcolor, key: k + this.state.contentKey },
                            )}
                          </Col>
                        </Row>
                        <Row justify="space-around">
                          <Col>
                            <Text
                              className="sideNavText"
                              style={{ color: fillcolor }}
                            >
                              {
                                menuItemsObject(this.onContentValueChange)[k]
                                  .name
                              }
                            </Text>{" "}
                          </Col>
                        </Row>
                      </Menu.Item>
                    );
                  }
                })}
            </Menu>
          </Sider>
          {["Clients", "Staff"].includes(this.state.contentValue)
            ? React.cloneElement(
                menuItemsObject(this.onContentValueChange)[
                  this.state.contentValue
                ]["component"],
                {
                  searchData: this.state.searchData,
                  key: this.state.contentValue + this.state.contentKey,
                },
              )
            : React.cloneElement(
                menuItemsObject(this.onContentValueChange)[
                  this.state.contentValue
                ]["component"],
                { key: this.state.contentValue + this.state.contentKey },
              )}
        </Layout>
        <div id="unsaved-modal-id"></div>
      </Layout>
    );
  }
}

export default withRouter(Landing);
