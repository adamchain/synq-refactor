import { Button, Card, Col, Layout, Row, Tabs } from "antd";
import React, { useContext, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import WhskrPageHeader from "../page-header/WhskrPageHeader";
import ClinicDetailsTab from "./ClinicDetailsTab";
import CommunicationTab from "./CommunicationTab";
import IntegrationsTab from "./IntegrationsTab";
import PaymentsTab from "./PaymentsTab";
import PreferencesTab from "./PreferencesTab";
import SalonManager from "./ManagerTab";
import "./SettingsPage.scss";

const { Content } = Layout;
const { TabPane } = Tabs;

const SettingsPage = (props) => {
  const [tabKey, setTabKey] = useState("clinic-details");
  const context = useContext(CommonContext);

  return (
    <Layout>
      <WhskrPageHeader
        title="Settings"
        extra={[
          <Button
            className="createNewBTN"
            htmlType="submit"
            form={tabKey + "-form-id"}
            type="primary"
            size="large"
            shape="round"
          >
            Save
          </Button>,
        ]}
      />
      <Content className="masterContentPadding scollerMaster">
        <Row>
          <Col span={24} className="settingsPage">
            <Card className="pageCardContainer" bordered={false}>
              <Tabs
                id="settings-tabs"
                activeKey={tabKey}
                onChange={setTabKey}
                destroyInactiveTabPane={true}
              >
                <TabPane
                  tab={
                    context.defaultBranch.branchTypeId != 2
                      ? "Clinic Details"
                      : "Business Details"
                  }
                  key="clinic-details"
                >
                  <ClinicDetailsTab />
                </TabPane>
                {context.defaultBranch.branchTypeId != 2 && (
                  <TabPane tab="Integrations" key="integrations">
                    <IntegrationsTab />
                  </TabPane>
                )}
                <TabPane tab="Email" key="communications">
                  <CommunicationTab />
                </TabPane>
                <TabPane tab="Payments" key="payments">
                  <PaymentsTab />
                </TabPane>
                <TabPane tab="Preferences" key="preferences">
                  <PreferencesTab />
                </TabPane>
                <TabPane tab="Manager" key="Manager">
                  <SalonManager />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
