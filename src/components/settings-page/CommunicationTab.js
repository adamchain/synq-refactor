import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Input, Typography, Switch, Form } from "antd";
import "./SettingsPage.scss";
import SettingsServices from "../../services/SettingsServices";
import { message } from "antd";

const { Text, Title } = Typography;

const CommunicationTab = () => {
  const [form] = Form.useForm();
  const [hideStates, setHideStates] = useState({
    vacAndAptEmailsHide: false,
    textRemindersHide: false,
  });

  useEffect(() => {
    SettingsServices.getBranchAlerts((data) => {
      form.setFieldsValue({ ...data.notification });
      onFormValueChange({ automatedEmail: data.notification.automatedEmail });
      onFormValueChange({ automatedText: data.notification.automatedText });
    });
  }, []);

  const onFinish = (input) => {
    SettingsServices.updateBranchAlerts(
      { notification: input },
      message.success("Updated Successfully"),
    );
  };

  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];
    if (key === "automatedEmail") {
      setHideStates((k) => ({ vacAndAptEmailsHide: !formValue[key] }));
    }
    if (key === "automatedText") {
      setHideStates((k) => ({ textRemindersHide: !formValue[key] }));
    }
  };
  return (
    <Form
      id="communications-form-id"
      onFinish={onFinish}
      form={form}
      onValuesChange={onFormValueChange}
    >
      <Row>
        <Col span={24}>
          <Row align="middle" gutter={[24, 24]} className="each-row-item">
            <Col span={7}>
              <Row style={{ marginBottom: 16 }}>
                <Col>
                  {" "}
                  <Title level={5}>Automated Client Messages</Title>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row align="middle" gutter={[24, 16]} className="each-row-item">
            <Col span={7}>
              <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                <Col>
                  <Text className="settingsTitles">Automated Emails</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    Enable automated emails for upcoming appointments and
                    vaccine remidners
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={7} offset={3}>
              <Row gutter={[0, 16]}>
                <Col>
                  <Form.Item valuePropName="checked" name="automatedEmail">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          {!hideStates.vacAndAptEmailsHide && (
            <>
              <Divider />
              <Row align="middle" gutter={[24, 16]} className="each-row-item">
                <Col span={7}>
                  <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                    <Col>
                      <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                        Vaccine Expiration Emails
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 24 }}>
                    <Col>
                      <Text className="settingsDescriptions">
                        When a patients vaccines are expiring, Whskr sends the
                        client an email to get their appointment scheduled. Set
                        the cadence below: (Enter 0 to disable)
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={7} offset={7}></Col>
              </Row>

              <Row align="middle" gutter={[24, 16]} className="each-row-item">
                <Col span={7}>
                  <Row style={{ marginBottom: 8 }} gutter={[0, 8]}>
                    <Col>
                      <Text className="settingsTitles">
                        First Vaccine Reminder Email
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 24 }}>
                    <Col>
                      <Text className="settingsDescriptions">
                        How many days before the expiration date should we send
                        the first email reminder?
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={7} offset={3}>
                  <Row>
                    <Col>
                      <Form.Item name="vaccineReminderEmailF">
                        <Input
                          size="large"
                          style={{ width: "120px" }}
                          suffix="Days"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row align="middle" gutter={[24, 48]} className="each-row-item">
                <Col span={7}>
                  <Row style={{ marginBottom: 8 }} gutter={[0, 8]}>
                    <Col>
                      <Text className="settingsTitles">
                        Second Vaccine Reminder Email
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 24 }}>
                    <Col>
                      <Text className="settingsDescriptions">
                        How many days before the expiration date should we send
                        the second email reminder?{" "}
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={7} offset={3}>
                  <Row>
                    <Col>
                      <Form.Item name="vaccineReminderEmailS">
                        <Input
                          size="large"
                          style={{ width: "120px" }}
                          suffix="Days"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Divider />

              <Row align="middle" gutter={[24, 16]} className="each-row-item">
                <Col span={7}>
                  <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                    <Col>
                      <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                        Appointment Emails
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 24 }}>
                    <Col>
                      <Text className="settingsDescriptions">
                        When an appointment is setup, Whskr sends the client
                        communications to remind them of their upcoming
                        appointment.Setup the details below (Enter 0 to disable)
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={7} offset={7}></Col>
              </Row>

              <Row align="middle" gutter={[24, 16]} className="each-row-item">
                <Col span={7}>
                  <Row style={{ marginBottom: 8 }} gutter={[0, 8]}>
                    <Col>
                      <Text className="settingsTitles">
                        Appointment Reminder
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 24 }}>
                    <Col>
                      <Text className="settingsDescriptions">
                        How many days from the appointment should we send a soft
                        reminder of their upcoming appointment?
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={7} offset={3}>
                  <Row>
                    <Col>
                      <Form.Item name="apptReminderEmail">
                        <Input
                          size="large"
                          style={{ width: "120px" }}
                          suffix="Days"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row align="middle" gutter={[24, 48]} className="each-row-item">
                <Col span={7}>
                  <Row style={{ marginBottom: 8 }} gutter={[0, 8]}>
                    <Col>
                      <Text className="settingsTitles">
                        Appointment Confirmation Email
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 24 }}>
                    <Col>
                      <Text className="settingsDescriptions">
                        How many days from the appointment should we send the
                        appointment confirmation email?
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={7} offset={3}>
                  <Row>
                    <Col>
                      <Form.Item name="apptConfirmationEmail">
                        <Input
                          size="large"
                          style={{ width: "120px" }}
                          suffix="Days"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}

          {/* <Divider/>
                <Row align="middle" gutter={[24,16]} className="each-row-item">
                <Col span={7}>
                    <Row style={{marginBottom: 8}} gutter={[0,8]}><Col><Text style={{fontSize:"16px", fontWeight:500}}>Automated Texts</Text></Col></Row>
                    <Row style={{marginBottom: 24}}><Col><Text className="settingsDescriptions">Setup automated texts. These are sent with critical information or actions and should be used less than email.</Text></Col></Row>
                </Col>
                <Col span={7} offset={3}>
                <Row gutter={[0,16]}><Col><Form.Item valuePropName="checked" name="automatedText"><Switch /></Form.Item></Col></Row>

                </Col></Row>
                {!hideStates.textRemindersHide && <>
                <Row align="middle" gutter={[24,16]} className="each-row-item">
                <Col span={7}>
                    <Row style={{marginBottom: 8}} gutter={[0,8]}><Col><Text className="settingsTitles">Vaccine Expiration</Text></Col></Row>
                    <Row style={{marginBottom: 24}}><Col><Text className="settingsDescriptions">How many days before the patient’s vaccine expires should we send the text reminder? </Text>

                </Col></Row>
                </Col>
                <Col span={7} offset={3}>
                    <Row><Col><Form.Item name="vaccineExpirationText"><Input size="large" style={{width:"120px"}} suffix="Days"/></Form.Item></Col></Row>

                </Col></Row>

                <Row align="middle" gutter={[24,16]} className="each-row-item">
                <Col span={7}>
                    <Row style={{marginBottom: 8}} gutter={[0,8]}><Col><Text className="settingsTitles">Appointment Confirmation</Text></Col></Row>
                    <Row style={{marginBottom: 24}}><Col><Text className="settingsDescriptions">How many days from the appointment should we send the text reminder?</Text></Col></Row>
                </Col>
                <Col span={7} offset={3}>
                    <Row><Col><Form.Item name="apptConfirmationText"><Input size="large" style={{width:"120px"}} suffix="Days"/></Form.Item></Col></Row>

                </Col></Row>
                </>} */}
        </Col>
      </Row>
    </Form>
  );
};

export default CommunicationTab;
