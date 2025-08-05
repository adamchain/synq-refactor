import {
  Col,
  Form,
  Row,
  Modal,
  Typography,
  Button,
  Divider,
  Input,
  Popconfirm,
  Card,
  Image,
  Switch,
  Tag,
  InputNumber,
} from "antd";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { CommonContext } from "../../context/CommonContext";
import SettingsServices from "../../services/SettingsServices";
import { CheckCircleOutlined } from "@ant-design/icons";
import { FiservLogo, TrashIcon } from "../util/SvgUtil";
import { DeviceRegistrationEmpty } from "../util/EmptySvgUtil";
import { PlusCircleOutlined } from "@ant-design/icons";
import { DEVICE_IMAGES } from "../util/DeviceUtil";
import "./SettingsPage.scss";
import CommonUtil from "../util/CommonUtil";

const { Text, Link } = Typography;

const ConnectModal = (props) => {
  return (
    <Modal
      width="450px"
      title="Connect"
      visible={true}
      onCancel={props.onClose}
      footer={null}
    >
      <Row
        justify="center"
        style={{ padding: 10, marginBottom: 16 }}
        gutter={[0, 8]}
      >
        <Col> {props.logo}</Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col>
          <Text>Merchant Account Number</Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <Form.Item name={["fiservPayment", "merchantId"]}>
            <Input size="large" placeholder="Merchant Account Number" />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col>
          <Text>Email Address</Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <Form.Item name={["fiservPayment", "userName"]}>
            <Input size="large" placeholder="Email Address" />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col>
          <Text>Password</Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: "10em" }}>
        <Col span={24}>
          <Form.Item name={["fiservPayment", "password"]}>
            <Input type="password" size="large" placeholder="Password" />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={12}>
          {" "}
          <Button onClick={props.onClose} shape="round" size="large" block>
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            onClick={() => props.onConnect()}
          >
            Connect
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
const AddPaymentModal = (props) => {
  const [deviceData, setDeviceData] = useState({
    hsn: props.data.hsn ?? "",
    name: props.data.name ?? "",
    devicetype: props.data.deviceType ?? "",
    status: props.data.isEdit ? !!props.data.deviceStatus : true,
  });

  return (
    <Modal
      width="450px"
      title={(props.data.isEdit ? "Edit" : "Add") + " Payment Device"}
      visible={true}
      onCancel={props.onClose}
      footer={null}
    >
      {props.data.isEdit && (
        <Row style={{ marginBottom: 24 }}>
          <Col flex="auto" className="deviceImageCol">
            <Image
              className="deviceImageCheckout"
              preview={false}
              src={
                DEVICE_IMAGES[
                  Object.keys(DEVICE_IMAGES).find((l) =>
                    l
                      .toLowerCase()
                      .includes(deviceData.devicetype?.toLowerCase()),
                  )
                ]
              }
            />
          </Col>
          <Col flex="auto">
            <Text strong style={{ fontSize: "18px" }}>
              {deviceData.devicetype} <br />
            </Text>

            <Text>SN:{deviceData.hsn}</Text>
          </Col>
          <Col flex="auto">
            <Switch
              checked={deviceData.status}
              onChange={(e) => {
                setDeviceData((k) => ({ ...k, status: e }));
              }}
            />
          </Col>
        </Row>
      )}
      <Row style={{ marginBottom: 8 }}>
        <Col>
          <Text>Device Name</Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <Input
            value={deviceData.name}
            onChange={(e) => {
              let name = e.target.value;
              setDeviceData((k) => ({ ...k, name }));
            }}
            size="large"
            placeholder="Enter Device Name"
          />
        </Col>
      </Row>
      {!props.data.isEdit && (
        <>
          <Row style={{ marginBottom: 8 }}>
            <Col>
              <Text>Serial Number</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: "10em" }}>
            <Col span={24}>
              <Input
                onChange={(e) => {
                  let hsn = e.target.value;
                  setDeviceData((k) => ({ ...k, hsn }));
                }}
                value={deviceData.hsn}
                size="large"
                placeholder="Enter Serial Number"
              />
            </Col>
          </Row>
        </>
      )}
      <Divider />
      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={12}>
          {" "}
          <Button onClick={props.onClose} shape="round" size="large" block>
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            onClick={() => props.onAdd(deviceData, !props.data.isEdit)}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
const PaymentsTab = (props) => {
  const context = useContext(CommonContext);
  const [connectData, setConnectData] = useState({
    type: "",
    data: { fiserv: { isConnected: false, logo: <FiservLogo />, id: null } },
  });
  const [form] = Form.useForm();
  const [paymentData, setPaymentsData] = useState({});
  const [paymentDevice, setPaymentDevice] = useState(null);

  const onConnectOrDisconnect = (isConnect, tempForm, setConnectData) => {
    let inputdata = null;

    if (isConnect) {
      inputdata = tempForm.getFieldsValue("fiservPayment");
    } else {
      inputdata = {
        service: "fiservPayment",
      };
    }

    SettingsServices.updateBranchPayment(inputdata, isConnect, () => {
      getAllPaymentsSettings();
      setConnectData((k) => ({ ...k, type: "" }));
    });
  };

  const onAddOrUpdateDevice = (data, isAdd) => {
    SettingsServices.updatePaymentDevice(data, isAdd, () => {
      getAllPaymentsSettings();
      setPaymentDevice(null);
    });
  };
  useEffect(() => {
    getAllPaymentsSettings();
  }, []);

  useEffect(() => {
    let fiservPayemnt = { merchantId: "", userName: "", password: "" };

    form.setFieldsValue({
      fiservPayment: paymentData?.fiservPayment ?? fiservPayemnt,
    });
  }, [paymentData]);

  const getAllPaymentsSettings = () => {
    SettingsServices.getBranchPaymentSettings((data) => {
      setPaymentsData(data);
    });
  };

  return (
    <Form id="clinic-details-form-id" onFinish={() => {}} form={form}>
      <Row>
        <Col span={24}>
          <Row
            className="each-row-item"
            style={{ paddingBottom: "24px", paddingTop: "24px" }}
          >
            <Col span={7}>
              <Row style={{ marginBottom: "8px" }}>
                <Col>
                  {" "}
                  <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                    Merchant ID
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text className="settingsDescriptions">
                    Enter the merchant ID associated to your Fiserv account
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={14} offset={3}>
              {/* {connectData.data.zoetis.isConnected &&<Row style={{marginBottom:16}}><Col><CheckCircleOutlined className="integrate-connected" /><Text className="integrate-connected">Connected</Text></Col></Row>} */}
              <Row gutter={[0, 24]}>
                {paymentData.fiservPayment?.merchantId && (
                  <Col span={8}>
                    <Row>
                      <Col>
                        <CheckCircleOutlined className="integrate-connected" />
                        <Text className="integrate-connected">Connected</Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text className="paymentUsrInfo">
                          {paymentData.fiservPayment?.userName}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text className="paymentUsrInfo" type="secondary">
                          ID#{paymentData.fiservPayment?.merchantId}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                )}

                <Col span={16}>
                  <Button
                    style={{
                      minWidth: "150px",
                      marginRight: "12px",
                      marginBottom: "12px",
                    }}
                    onClick={() => {
                      setConnectData((k) => ({ ...k, type: "fiserv" }));
                    }}
                    shape="round"
                    type="ghost"
                  >
                    {paymentData.fiservPayment?.merchantId ? "Edit" : "Connect"}
                  </Button>
                  {paymentData.fiservPayment?.merchantId ? (
                    <Popconfirm
                      title="Are you sure you want to delete the Fiserv Account?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        onConnectOrDisconnect(false, {}, setConnectData)
                      }
                    >
                      <Button
                        style={{ minWidth: "150px" }}
                        shape="round"
                        type="ghost"
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  ) : null}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />

          <Row
            className="each-row-item"
            style={{ paddingBottom: "24px", paddingTop: "24px" }}
          >
            <Col span={7}>
              <Row style={{ marginBottom: "8px" }}>
                <Col>
                  {" "}
                  <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                    Register Devices
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text className="settingsDescriptions">
                    Add the card reader devices at this clinic. These must be in
                    association to the CardPointe / Fiserv account.{" "}
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: "8px" }}>
                <Col>
                  <Text className="settingsDescriptions">
                    Click the “Check for Devices” button to add devices from
                    your account
                  </Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: "8px" }}>
                <Col>
                  <Button
                    shape="round"
                    onClick={() => {
                      SettingsServices.refreshPaymentDevice(() =>
                        getAllPaymentsSettings(),
                      );
                    }}
                  >
                    Refresh Device List
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link target="_blanl" href="https://shop.cardconnect.com/">
                    Purchase Devices
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col span={14} offset={3}>
              {/* {connectData.data.zoetis.isConnected &&<Row style={{marginBottom:16}}><Col><CheckCircleOutlined className="integrate-connected" /><Text className="integrate-connected">Connected</Text></Col></Row>} */}
              {paymentData.fiservPayment?.merchantId ? (
                <Row justify="center" align="middle">
                  <Col span={24}>
                    {/* <Row style={{ marginBottom: 16 }} ><Col span={24} style={{paddingRight:"24px"}}><Button size="large" onClick={()=>setPaymentDevice({})} icon={<PlusCircleOutlined/>} className="addPayDeviceButton" type="dashed">Add Payment Device</Button></Col></Row> */}
                    {paymentData.fiservPayment?.terminals?.map((k) => (
                      <Row style={{ marginBottom: 16 }}>
                        <Col span={24} style={{ paddingRight: "24px" }}>
                          <Card
                            className="regDevicesButton"
                            onClick={() => {
                              setPaymentDevice({ isEdit: true, ...k });
                            }}
                            title={null}
                          >
                            <Row align="middle" justify="start">
                              <Col span={24} className="DeviceCont">
                                <Row align="middle">
                                  <Col flex="15%" className="deviceImageCol">
                                    <Image
                                      className="deviceImage"
                                      preview={false}
                                      src={
                                        DEVICE_IMAGES[
                                          Object.keys(DEVICE_IMAGES).find((l) =>
                                            l
                                              .toLowerCase()
                                              .includes(
                                                k.deviceType.toLowerCase(),
                                              ),
                                          )
                                        ]
                                      }
                                    />
                                  </Col>
                                  <Col flex="auto">
                                    <Text strong style={{ fontSize: "18px" }}>
                                      {k.name ?? "Untitled"} <br />
                                    </Text>
                                    <Text strong>
                                      {k.deviceType}
                                      <br />
                                    </Text>
                                    <Text>{k.hsn}</Text>
                                  </Col>
                                  <Col flex="15%" className="deleteDevice">
                                    <Tag
                                      style={{
                                        borderRadius: "4px",
                                        width: "115px",
                                        textAlign: "center",
                                        backgroundColor:
                                          CommonUtil.STATUS_OBJECT_BG_COLOR[
                                            k.deviceStatus
                                              ? "ACTIVE"
                                              : "INACTIVE"
                                          ],
                                        border:
                                          " 1px solid " +
                                          CommonUtil.STATUS_OBJECT_COLOR[
                                            k.deviceStatus
                                              ? "ACTIVE"
                                              : "INACTIVE"
                                          ],
                                      }}
                                      color={
                                        CommonUtil.STATUS_OBJECT_COLOR[
                                          k.deviceStatus ? "ACTIVE" : "INACTIVE"
                                        ]
                                      }
                                    >
                                      <Text
                                        style={{
                                          color:
                                            CommonUtil.STATUS_OBJECT_COLOR[
                                              k.deviceStatus
                                                ? "ACTIVE"
                                                : "INACTIVE"
                                            ],
                                        }}
                                      >
                                        {k.deviceStatus ? "ACTIVE" : "INACTIVE"}
                                      </Text>
                                    </Tag>

                                    {/* <Popconfirm
                                            title="Are you sure you want to delete this Device?"
                                            okText="Yes"
                                            cancelText="No"
                                            onCancel={(e=>e.stopPropagation())}
                                            onConfirm={(e=>{e.stopPropagation(); SettingsServices.deletePaymentDevices({"hsn":k.hsn}); getAllPaymentsSettings();})}><Link onClick={e=>{e.stopPropagation()}}><TrashIcon/></Link></Popconfirm> */}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              ) : (
                <>
                  <Row justify="center" align="middle">
                    <Col>
                      <DeviceRegistrationEmpty />
                    </Col>
                  </Row>
                  <Row justify="center" align="middle">
                    <Col>
                      <Text className="empty-text">Devices Unavailable</Text>
                    </Col>
                  </Row>
                  <Row justify="center" align="middle">
                    <Col>
                      <Text className="empty-text">
                        Please add a valid merchant ID
                      </Text>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          <Divider />
        </Col>
      </Row>
      {connectData.type ? (
        <ConnectModal
          onConnect={() => {
            onConnectOrDisconnect(true, form, setConnectData);
          }}
          onClose={() => setConnectData((k) => ({ ...k, type: "" }))}
          logo={connectData.data[connectData.type].logo}
          id={connectData.data[connectData.type].id}
        />
      ) : null}
      {paymentDevice ? (
        <AddPaymentModal
          data={paymentDevice}
          onAdd={(data, isAdd) => onAddOrUpdateDevice(data, isAdd)}
          onClose={() => setPaymentDevice(null)}
        />
      ) : null}
    </Form>
  );
};

export default PaymentsTab;
