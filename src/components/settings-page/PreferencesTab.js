import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import LoginServices from "../../services/LoginServices";
import StaffServices from "../../services/StaffServices";
import SettingsServices from "./../../services/SettingsServices";
import "./SettingsPage.scss";

const { Text, Title } = Typography;
const { Option } = Select;

const PreferencesTab = () => {
  const [form] = Form.useForm();
  const [staffs, setStaffs] = useState([]);
  const context = useContext(CommonContext);

  const options = [
    {
      label: context.defaultBranch.branchTypeId != 2 ? "Front Desk" : "Groomer",
      name: "frontDesk",
      value: false,
    },
    { label: "Vet Tech", name: "vettech", value: false },
    { label: "Doctors", name: "doctors", value: false },
    { label: "Leadership", name: "leadership", value: false },
  ];

  useEffect(() => {
    SettingsServices.getBranchPreferences((data) => {
      data.clockIn = Object.keys(data.clockIn).filter((k) => data.clockIn[k]);
      form.setFieldsValue({ ...data });
    });
    StaffServices.fetchStaff((data) =>
      setStaffs((k) =>
        data.map((v) => ({
          ...v,
          displayName: v.firstName + " " + v.lastName,
        })),
      ),
    );
  }, []);

  const onFinish = (input) => {
    let submitData = {
      ...input,
      clockIn: [...input.clockIn].reduce((total, current) => {
        total[current] = true;
        return total;
      }, {}),
    };
    //SettingsServices.updateBranchPreference(submitData,message.success("Updated Successfully"))
    SettingsServices.updateBranchPreference(submitData, () => {
      let branchId = context.defaultBranch.branchId;
      LoginServices.getLoggedInUserBranchDetails((branchDetails) => {
        context.updateStateFields({ branchDetails });
        let defaultBranch = branchDetails.find((k) => k.branchId === branchId);
        context.updateStateFields({ defaultBranch });
      });
    });
  };
  return (
    <Form id="preferences-form-id" onFinish={onFinish} form={form}>
      <Row>
        <Col span={24}>
          <Row align="middle" gutter={[24, 24]} className="each-row-item">
            <Col span={7}>
              <Row style={{ marginBottom: 16, marginTop: 16 }}>
                <Col>
                  {" "}
                  <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                    Timecards
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row align="middle" gutter={[24, 16]} className="each-row-item">
            <Col span={7}>
              <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                <Col>
                  <Text className="settingsTitles">Enable Clock-In</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    Enable clock-ins by role for your clinic
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={7} offset={3}>
              <Row gutter={[0, 16]}>
                <Col>
                  <Form.Item name="clockIn">
                    <Checkbox.Group>
                      {options.map((k) => (
                        <>
                          <Checkbox value={k.name}>{k.label}</Checkbox>
                          <br />
                        </>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />
        </Col>

        <Col span={24}>
          <Row align="middle" gutter={[24, 24]} className="each-row-item">
            <Col span={7}>
              <Row style={{ marginBottom: 16 }}>
                <Col>
                  {" "}
                  <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                    Inventory
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row align="middle" gutter={[24, 16]} className="each-row-item">
            <Col span={7}>
              <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                <Col>
                  <Text className="settingsTitles">
                    Default Low Stock Trigger
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    At what on-hands amount should we the trigger for the "Low
                    Inventory" warning for ALL your products by default?
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={7} offset={3}>
              <Row>
                <Col>
                  <Form.Item name="inventoryAlert">
                    <Input
                      size="large"
                      style={{ width: "100px" }}
                      suffix="Left"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row align="middle" gutter={[24, 16]} className="each-row-item">
            <Col span={7}>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions" italic>
                    *Helpful Tip: This can also be adjusted manually on each
                    product in your inventory.
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row align="middle" gutter={[24, 16]} className="each-row-item">
            <Col span={7}>
              <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                <Col>
                  <Text className="settingsTitles">Lot Expiration Warning</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    How many days befores a lot expires should items be shown on
                    the lots expiration widget
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={7} offset={3}>
              <Row>
                <Col>
                  <Form.Item name="lotExpiryWarning">
                    <Input
                      size="large"
                      style={{ width: "100px" }}
                      suffix="Days"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider />

          <Row align="middle" gutter={[24, 24]} className="each-row-item">
            <Col span={7}>
              <Row style={{ marginBottom: 16 }}>
                <Col>
                  {" "}
                  <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                    Labs
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row align="middle" gutter={[24, 16]} className="each-row-item">
            <Col span={7}>
              <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                <Col>
                  <Text className="settingsTitles">
                    Additional Result Notifications
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    By Default,any notification about lab results are only sent
                    to the provider. You can add additional Personelle to ensure
                    visibility of those results here.
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={7} offset={3}>
              <Row>
                <Col span={24}>
                  <Form.Item name="labNotification">
                    <Select
                      size="large"
                      showSearch={true}
                      filterOption={(input, option) =>
                        option.extra
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      placeholder={<Text>Select an Employee</Text>}
                      style={{ width: "100%", marginBottom: "24px" }}
                    >
                      {staffs.map((k) => (
                        <Option
                          key={k.userId}
                          firstName={k.firstName}
                          value={k.userId}
                        >
                          {k.displayName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default PreferencesTab;
