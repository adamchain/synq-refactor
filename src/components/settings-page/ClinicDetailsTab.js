import { GlobalOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Popconfirm,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { UploadIcon } from "../util/SvgUtil";
import SettingsServices from "./../../services/SettingsServices";
import { DAY_ORDER } from "./../staff-page/working-hours-staff-modal/Constant";
import DayHourSchedule from "./../staff-page/working-hours-staff-modal/DayHourSchedule";
import "./SettingsPage.scss";

import { message } from "antd";
import { CommonContext } from "../../context/CommonContext";
import LoginServices from "../../services/LoginServices";

const { Dragger } = Upload;
const { Text } = Typography;
const { Option } = Select;

const FormDaySchedule = ({ value = [], onChange }) => {
  let days = value.map((k) => ({
    day: k.workingDayCd,
    starttime: k.stTime ? moment(k.stTime, "hh:mm:ss").format("hh:mma") : null,
    endtime: k.endTime ? moment(k.endTime, "hh:mm:ss").format("hh:mma") : null,
    order: DAY_ORDER[k.workingDayCd],
  }));

  const setDays = (input) => {
    onChange(
      input.map((k) => {
        return {
          workingDayCd: k.day,
          stTime: k.starttime
            ? moment(k.starttime, "hh:mm a").format("HH:mm")
            : null,
          endTime: k.endtime
            ? moment(k.endtime, "hh:mm a").format("HH:mm")
            : null,
        };
      }),
    );
  };

  return (
    <DayHourSchedule
      days={days}
      limitedTimeOnly={false}
      setDays={setDays}
      workingHours={value}
    />
  );
};
const checkFileProps = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isLt2M;
};

const ClinicDetailsTab = (props) => {
  const context = useContext(CommonContext);
  const [form] = Form.useForm();
  const [branchSettings, setBranchSettings] = useState({ logo: "" });
  let allStates = context.allStates;
  const [serviceFeeChecked, setServiceFeeChecked] = useState(false);

  const getLogo = () => {
    SettingsServices.getBranchSettings((data) => {
      setBranchSettings({ logo: data.logo });
    });
  };
  useEffect(() => {
    SettingsServices.getBranchSettings((data) => {
      setBranchSettings({ logo: data.logo });
      setServiceFeeChecked(data.sTaxSFee);
      form.setFieldsValue({ ...data });
    });
  }, []);
  const onChange = (e) => {
    setServiceFeeChecked(e.target.checked);
  };

  const onFinish = (input) => {
    input = { ...input, sTaxSFee: serviceFeeChecked };
    SettingsServices.updateSettings(input, () => {
      let branchId = context.defaultBranch.branchId;
      LoginServices.getLoggedInUserBranchDetails((branchDetails) => {
        context.updateStateFields({ branchDetails });
        let defaultBranch = branchDetails.find((k) => k.branchId === branchId);
        context.updateStateFields({ defaultBranch });
      });
    });
  };
  const clinicLable =
    context.defaultBranch.branchTypeId != 2 ? "Clinic" : "Business";

  const clinicLableLowerCase =
    context.defaultBranch.branchTypeId != 2 ? "clinic" : "business";

  return (
    <Form id="clinic-details-form-id" onFinish={onFinish} form={form}>
      <Row>
        <Col span={24} style={{ padding: 24 }}>
          <Row align="middle" gutter={[24, 0]} className="each-row-item">
            <Col sm={24} lg={7}>
              <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                <Col>
                  {" "}
                  <Text className="settingsTitles">{clinicLable} Name</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  {" "}
                  <Text className="settingsDescriptions">
                    Enter the name of your {clinicLableLowerCase}. This will be
                    used on communications and invoices throughout the
                    application
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col sm={24} lg={14} xl={{ span: 11, offset: 3 }}>
              <Form.Item name="name">
                <Input size="large" placeholder={clinicLable + " Name"} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[24, 0]} className="each-row-item">
            <Col sm={24} lg={7}>
              <Row gutter={[0, 16]} style={{ marginBottom: 8 }}>
                <Col>
                  {" "}
                  <Text className="settingsTitles">
                    {clinicLable + " Address"}
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    Enter the address of your {clinicLableLowerCase}. This will
                    be used on communications and invoices. This will also be
                    used to connect Timezones and Sales Tax to your application.
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col align="middle" sm={24} lg={14} xl={{ span: 11, offset: 3 }}>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  {" "}
                  <Form.Item name="address1">
                    <Input size="large" placeholder="Street Address" />
                  </Form.Item>{" "}
                </Col>
              </Row>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  {" "}
                  <Form.Item name="address2">
                    <Input size="large" placeholder="Apt, Site, Bld" />
                  </Form.Item>{" "}
                </Col>
              </Row>
              {/* <Row gutter={[0,16]}><Col span={24}> <Form.Item name="phone"><Input size="large" placeholder="Phone"/></Form.Item></Col></Row> */}
              <Row gutter={[8, 0]}>
                <Col span={10}>
                  <Form.Item name="city">
                    <Input size="large" placeholder="City" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item name="stateId">
                    <Select
                      size="large"
                      showSearch={true}
                      align="left"
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentElement
                      }
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {Object.values(allStates).map((option) => {
                        return (
                          <Option value={option["stateId"]}>
                            {option["stateCd"]}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>{" "}
                </Col>
                <Col span={8}>
                  <Form.Item name="zipCode">
                    <Input size="large" placeholder="ZipCode" />
                  </Form.Item>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[24, 0]} className="each-row-item">
            <Col sm={24} lg={7}>
              <Row gutter={[0, 16]} style={{ marginBottom: 8 }}>
                <Col>
                  {" "}
                  <Text className="settingsTitles">
                    {clinicLable + " Contact"}
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    Enter your clinics primary phone number and email
                    address.This will be shown in outgoing email to customers
                    for connecting with your {clinicLableLowerCase}.
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col align="middle" sm={24} lg={14} xl={{ span: 11, offset: 3 }}>
              <Row gutter={[0, 16]}>
                <Col span={10}>
                  {" "}
                  <Form.Item name="phone">
                    <Input
                      size="large"
                      placeholder="Enter Phone Number"
                      prefix={
                        <PhoneOutlined
                          style={{ color: "rgba(0,0,0,.65)", marginRight: 8 }}
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[0, 16]}>
                <Col span={10}>
                  {" "}
                  <Form.Item name="email">
                    <Input
                      size="large"
                      placeholder="woof@email.com"
                      prefix={
                        <MailOutlined
                          style={{ color: "rgba(0,0,0,.65)", marginRight: 8 }}
                        />
                      }
                    />
                  </Form.Item>{" "}
                </Col>
              </Row>
              <Row gutter={[0, 16]}>
                <Col span={10}>
                  {" "}
                  <Form.Item name="website">
                    <Input
                      size="large"
                      placeholder="https://www.domain.com"
                      prefix={
                        <GlobalOutlined
                          style={{ color: "rgba(0,0,0,.65)", marginRight: 8 }}
                        />
                      }
                    />
                  </Form.Item>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[24, 0]} className="each-row-item">
            <Col sm={24} lg={7}>
              <Row gutter={[0, 16]} style={{ marginBottom: 8 }}>
                <Col>
                  {" "}
                  <Text className="settingsTitles">{clinicLable} Tax Rate</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    Enter the tax rate for your {clinicLableLowerCase}. This
                    percentage will be applied to all taxable items on your
                    invoices. <br />
                    <br /> To find out if sales tax applies to service fees in
                    your state please check your state guidelines.
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col align="middle" sm={24} lg={14} xl={{ span: 11, offset: 3 }}>
              <Row gutter={[0, 16]}>
                <Col span={8}>
                  {" "}
                  <Form.Item name="taxRate">
                    <Input size="large" placeholder="Tax Rate" suffix="%" />
                  </Form.Item>{" "}
                </Col>
              </Row>
              <Row gutter={[0, 15]}>
                <Col span={9} style={{ textAlign: "left" }}>
                  {" "}
                  <Form.Item name="sTaxSFee">
                    <Checkbox checked={serviceFeeChecked} onChange={onChange}>
                      Sales Tax Applies to Service Fees
                    </Checkbox>
                  </Form.Item>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[24, 0]} className="each-row-item">
            <Col sm={24} lg={7}>
              <Row gutter={[0, 16]} style={{ marginBottom: 8 }}>
                <Col>
                  {" "}
                  <Text className="settingsTitles">
                    Cash and Check Discount
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    Apply a discount to customers who pay in cash or check
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col align="middle" sm={24} lg={14} xl={{ span: 11, offset: 3 }}>
              <Row gutter={[0, 16]}>
                <Col span={8}>
                  {" "}
                  <Form.Item name="cachCheckoutDiscount">
                    <Input
                      size="large"
                      placeholder="Cash / Check Discount"
                      suffix="%"
                    />
                  </Form.Item>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[24, 0]} className="each-row-item">
            <Col sm={24} lg={7}>
              <Row style={{ marginBottom: 8 }} gutter={[0, 8]}>
                <Col>
                  <Text className="settingsTitles">
                    {clinicLable + " Logo"}
                  </Text>
                </Col>
              </Row>
              <Row gutter={[0, 16]}>
                <Col>
                  <Text className="settingsDescriptions">
                    Upload the logo for your {clinicLableLowerCase}. This will
                    be used on communications and invoices throughout the
                    application. <br />
                    <br />
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text
                    className="settingsDescriptions"
                    style={{ fontStyle: "italic" }}
                  >
                    *Helpful Tip: Use Transparent Backgrounds (.PNG) on Logos to
                    help with clients who have Dark Mode Enabled on their
                    Devices.
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col
              sm={24}
              lg={14}
              xl={{ span: 14, offset: 3 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Row align="middle" gutter={[24, 0]} style={{ width: "100%" }}>
                {branchSettings.logo ? (
                  <Col md={24} lg={24}>
                    <Row gutter={[12, 0]}>
                      <Col>
                        <Image
                          className="settingsClinicLogo"
                          src={branchSettings.logo}
                        />
                      </Col>
                      <Col>
                        {" "}
                        <Upload
                          accept=".jpg,.png,.JPEG,.jpeg,.JPG,.PNG"
                          name="file"
                          beforeUpload={checkFileProps}
                          showUploadList={false}
                          customRequest={({ file, onSuccess, onProgress }) => {
                            SettingsServices.updateBranchLogo(file, () => {
                              getLogo();
                              onSuccess("done");
                            });
                          }}
                        >
                          <Button
                            size="small"
                            style={{ marginBottom: 12 }}
                            shape="round"
                          >
                            Change Logo{" "}
                          </Button>
                        </Upload>
                        <Row
                          style={{ marginBottom: "-5px", marginLeft: "5px" }}
                        >
                          <Col>
                            <Text type="secondary" className="font-size-12">
                              JPG or PNG.
                            </Text>
                          </Col>
                        </Row>
                        <Row style={{ marginLeft: "5px" }}>
                          <Col>
                            <Text type="secondary" className="font-size-12">
                              Max size of 2MB
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Popconfirm
                          title="Are you sure you want to delete the logo?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => {
                            SettingsServices.deleteBranchLogo(() => getLogo());
                          }}
                        >
                          <Button size="small" shape="round">
                            Delete Photo{" "}
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Col>
                ) : (
                  <Col md={12}>
                    <Dragger
                      name="file"
                      customRequest={({ file, onSuccess, onProgress }) => {
                        SettingsServices.updateBranchLogo(file, () => {
                          getLogo();
                          onSuccess("done");
                        });
                      }}
                      style={{ padding: "1em" }}
                    >
                      <UploadIcon className="settingsUploadIcon" />
                      <p className="ant-upload-text">
                        Drop your files here, or browse
                      </p>
                      <p className="ant-upload-hint">
                        Supports JPG & PNG
                        <br />
                        Max filesize: 800KB
                      </p>
                    </Dragger>
                  </Col>
                )}
                <Col></Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[24, 0]} className="each-row-item">
            <Col sm={24} lg={7}>
              <Row gutter={[0, 8]} style={{ marginBottom: 8 }}>
                <Col>
                  {" "}
                  <Text className="settingsTitles">"{clinicLable}. Hours"</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <Text className="settingsDescriptions">
                    Enter the hours of operation for your {clinicLableLowerCase}
                    . This will allow our calendars to understand your schedule
                    and give more of a tailored experience.
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col align="middle" sm={24} lg={14} xl={{ span: 11, offset: 3 }}>
              <Form.Item name="workingHours">
                <FormDaySchedule />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
        </Col>
      </Row>
    </Form>
  );
};

export default ClinicDetailsTab;
