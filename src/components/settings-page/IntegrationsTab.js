import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Divider,
  Input,
  Typography,
  Upload,
  Form,
  Image,
  Button,
  Modal,
  List,
} from "antd";
import "./SettingsPage.scss";
import SettingsServices from "./../../services/SettingsServices";
import { message } from "antd";
import {
  ZoetisLogo,
  AntechLogo,
  IdexxLogo,
  ZoetisRefLogo,
} from "../util/SvgUtil";
import { CheckCircleOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { useForm } from "antd/lib/form/Form";
const { Text } = Typography;

const ConnectModal = (props) => {
  const [form] = useForm();
  const [disableConnect, setDisableConnect] = useState(true);

  useEffect(() => {
    form.setFieldsValue({ id: props.id });
  }, []);

  const onFormValueChange = (value, allValues) => {
    let type = props.type;
    if (type === "zoetisRefLab") {
      type = "zoetisExternal";
    }
    setDisableConnect(!Object.values(allValues[type]).every((k) => k));
  };

  const onFinish = (values) => {
    props.onConnect(values);
  };
  return (
    <Modal
      width="450px"
      title="Connect"
      visible={true}
      onCancel={props.onClose}
      footer={null}
    >
      <Form
        id="integration-connect-form"
        onFinish={onFinish}
        onValuesChange={onFormValueChange}
      >
        <Row
          justify="center"
          style={{ padding: 10, marginBottom: 16 }}
          gutter={[0, 8]}
        >
          <Col> {props.logo}</Col>
        </Row>

        {integrationConfigs(props.type).map((field) => {
          return (
            <>
              <Row>
                <Col>
                  <Text>{field.label}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name={field.name}>
                    <Input
                      style={{ marginBottom: 24 }}
                      size="large"
                      placeholder={field.label}
                      type={field.type}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          );
        })}

        {/* <Row style={{marginBottom: 8}}><Col><Text>Authorization Token</Text></Col></Row>
    <Row style={{marginBottom: "10em"}}><Col span={24}><Form.Item name="clientId"><Input size="large" placeholder="Authorization Token"/></Form.Item></Col></Row> */}
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
              disabled={disableConnect}
              type="primary"
              size="large"
              shape="round"
              block
              htmlType="submit"
              form="integration-connect-form"
            >
              Connect
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
const integrationConfigs = (type) => {
  let config = [];
  switch (type) {
    case "zoetisInternal":
      config = [{ label: "Client Id", name: ["zoetisInternal", "clientId"] }];
      break;
    case "zoetisRefLab":
      config = [{ label: "Clinic Id", name: ["zoetisExternal", "clinicId"] }];
      break;
    case "idexx":
      config = [
        { label: "User Name", name: ["idexx", "userName"], type: "" },
        { label: "Password", name: ["idexx", "password"], type: "password" },
        { label: "Lims Id", name: ["idexx", "limsId"], type: "" },
      ];
      break;
    case "antech":
      config = [
        { label: "Clinic Id", name: ["antech", "clinicId"], type: "" },
        { label: "User Name", name: ["antech", "userName"], type: "" },
        { label: "Password", name: ["antech", "password"], type: "password" },
        { label: "Lab Id", name: ["antech", "labId"], type: "" },
      ];
      break;
    default:
      config = [];
      break;
  }
  return config;
};
const ZoetisRefLabModal = (props) => {
  return (
    <Modal
      width="550px"
      title="ZRL Clinic Confirmation"
      visible={true}
      onCancel={props.onClose}
      footer={null}
    >
      <Row style={{ marginBottom: 16 }}>
        <Col>
          <Text>
            To ensure correct clinic listings, please confirm if you recognize
            the staff members below?
          </Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <List
            pagination={{ defaultPageSize: 5 }}
            itemLayout="horizontal"
            dataSource={props.confirmStaffs.map((k) => ({
              name: k.firstName + k.lastName,
              email: "",
              avatar: k.firstName[0] + k.lastName[0],
            }))}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ justify: "middle" }}>{item.avatar}</Avatar>
                  }
                  title={item.name}
                  description={item.email}
                />
              </List.Item>
            )}
          />
          ,
        </Col>
      </Row>
      {/* <Row style={{marginBottom: 8}}><Col><Text>Authorization Token</Text></Col></Row>
    <Row style={{marginBottom: "10em"}}><Col span={24}><Form.Item name="clientId"><Input size="large" placeholder="Authorization Token"/></Form.Item></Col></Row> */}
      <Divider />
      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={12}>
          {" "}
          <Button onClick={props.onClose} shape="round" size="large" block>
            No
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            onClick={() => {
              props.onConnect();
              props.onClose();
            }}
          >
            Yes, it's My Clinic
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
const IntegrationsTab = () => {
  const [connectData, setConnectData] = useState({
    type: "",
    showZoetisRefLab: false,
    clinicId: null,
    confirmStaffs: [],
    data: {
      antech: {
        isConnected: false,
        logo: <AntechLogo />,
        id: null,
        type: "antech",
        description: "Connect to enable Antech Lab Services in WHSKR",
      },
      idexx: {
        isConnected: false,
        logo: <IdexxLogo />,
        id: null,
        type: "idexx",
        description:
          "Connect to enable IDEXX in-house and Reference Lab Services in WHSKR",
      },
      zoetisInternal: {
        isConnected: false,
        logo: <ZoetisLogo />,
        id: null,
        type: "zoetisInternal",
        description:
          "Connect to enable Zoetis in-house lab capabilities in Whskr.",
      },
      zoetisRefLab: {
        isConnected: false,
        id: null,
        logo: <ZoetisRefLogo />,
        type: "zoetisRefLab",
        description:
          "Connect to enable Zoetis Reference Lab capabilities in Whskr",
      },
    },
  });
  const [form] = Form.useForm();

  useEffect(() => {
    getAllBranchIntegration();
  }, []);

  const getAllBranchIntegration = () => {
    SettingsServices.getBranchIntegration((data) => {
      //form.setFieldsValue({...data});
      let internalClientId = data?.zoetisInternal?.clientId;
      let externalClinicId = data?.zoetisExternal?.clinicId;
      let antechVal = data?.antech ?? null;
      let idexxVal = data?.idexx ?? null;

      setConnectData((k) => ({
        showZoetisRefLab: false,
        clinicId: null,
        confirmStaffs: [],
        type: "",
        data: {
          ...k.data,
          zoetisInternal: {
            ...k.data.zoetisInternal,
            isConnected: !!internalClientId,
            id: internalClientId,
          },
          zoetisRefLab: {
            ...k.data.zoetisRefLab,
            isConnected: !!externalClinicId,
            id: externalClinicId,
          },
          antech: { ...k.data.antech, isConnected: !!antechVal, id: antechVal },
          idexx: { ...k.data.idexx, isConnected: !!idexxVal, id: idexxVal },
        },
      }));
    });
  };

  const onConnectOrDisconnect = (isConnect, type, data) => {
    let inputdata = null;
    let { id } = data;
    if (isConnect) {
      inputdata = { service: type, ...data };
      if (inputdata.service === "zoetisInternal") {
        inputdata.service = "zoetis";
      }
    } else {
      if (type === "zoetisInternal") {
        inputdata = {
          service: "zoetis",
        };
      } else {
        inputdata = { service: type };
      }
    }

    SettingsServices.updateBranchIntegration(
      inputdata,
      isConnect,
      getAllBranchIntegration,
    );
  };

  // const onFinish = (input) => {
  //     SettingsServices.updateBranchIntegration(input,message.success("Updated Successfully"))
  // }
  // const disconnectLab = () => {
  //     SettingsServices.disableBranchIntegration();
  //     setConnectData(k=>({...k,type:"",data:{...k.data,zoetis:{isConnected:false}}}))
  // }
  const getConfirmationClinicStaffs = (clinicId) => {
    setConnectData((k) => ({ ...k, type: "" }));
    SettingsServices.getConfirmationClinicStaffs(clinicId, (data) => {
      if (data) {
        setConnectData((k) => ({
          ...k,
          type: "",
          showZoetisRefLab: true,
          confirmStaffs: data,
          clinicId,
        }));
      }
    });
  };
  return (
    <>
      <Row>
        <Col span={24}>
          {/* <Row align="middle" gutter={[24,0]} className="each-row-item">
                <Col span={7}>
                    <Row gutter={[0,8]}><Col> <Image width="150px" src="/images/VetCove Logo.png"/></Col></Row>
                    <Row ><Col><Text className="settingsDescriptions">Enter your login information to Vetcove to enable the ability to quickly buy supplies from your preferred vendors right from Whskr’s Inventory Pages</Text></Col></Row>
                </Col>
                <Col span={7} offset={3}>
                    <Row style={{marginBottom: 16, paddingTop:24}}><Col span={24}><Input size="large" placeholder="Email"/></Col></Row>
                    <Row><Col span={24}><Input size="large" placeholder="Password"/></Col></Row>

                </Col>
                <Col span ={7}>
                <CheckCircleOutlined className="integrate-connected" /><Text className="integrate-connected">Connected</Text>
                </Col></Row>
            <Divider/> */}
          {Object.values(connectData.data).map((k) => {
            return (
              <>
                {" "}
                <Row align="middle" gutter={[24, 0]} className="each-row-item">
                  <Col span={7}>
                    <Row style={{ marginBottom: 16 }} gutter={[0, 8]}>
                      <Col> {k.logo}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text className="settingsDescriptions">
                          {k.description}{" "}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={7} offset={3}>
                    {k.isConnected && (
                      <Row style={{ marginBottom: 16 }}>
                        <Col>
                          <CheckCircleOutlined className="integrate-connected" />
                          <Text className="integrate-connected">Connected</Text>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col>
                        <Button
                          style={{ minWidth: "150px" }}
                          onClick={() =>
                            k.isConnected
                              ? onConnectOrDisconnect(false, k.type, k.id)
                              : setConnectData((v) => ({ ...v, type: k.type }))
                          }
                          shape="round"
                          type="ghost"
                        >
                          {k.isConnected ? "Disconnect" : "Connect"}
                        </Button>
                      </Col>
                    </Row>

                    {/* <Row style={{marginBottom: 16, paddingTop:24}} gutter={[0,16]}><Col span={24}><Input size="large" placeholder="Clinic ID"/></Col></Row> */}
                    {/* <Row><Col span={24}><Form.Item name="zoetisClientId"><Input size="large" placeholder="Authorization Token"/></Form.Item></Col>
                 </Row>  */}
                  </Col>
                  {/* <Col span ={7}>
                <CheckCircleOutlined className="integrate-connected" /><Text className="integrate-connected">Connected</Text>
                </Col> */}
                </Row>
                <Divider />
              </>
            );
          })}
          {/* <Row align="middle" gutter={[24,0]} className="each-row-item">
                <Col span={7}>
                    <Row style={{marginBottom: 16}} gutter={[0,8]}><Col> <ZoetisLogo/></Col></Row>
                    <Row><Col><Text className="settingsDescriptions">Enter your login information to enable in-house and reference lab capabilities in Whskr.  Once logged in you can select, kick-off and view labs with ease. </Text> 

                </Col></Row>
                </Col>
                <Col span={7} offset={3}>
                {connectData.data.zoetis.isConnected &&<Row style={{marginBottom:16}}><Col><CheckCircleOutlined className="integrate-connected" /><Text className="integrate-connected">Connected</Text></Col></Row>}
                <Row><Col><Button style={{minWidth:"150px"}} onClick ={()=> connectData.data.zoetis.isConnected? onConnectOrDisconnect(false,"zoetis",connectData.data.zoetis.id):setConnectData(k=>({...k,type:"zoetis"}))} shape="round" type="ghost">{connectData.data.zoetis.isConnected ?"Disconnect":"Connect"}</Button></Col></Row>
               </Col>
                </Row>
            <Divider/> */}

          {/* <Row align="middle" gutter={[24,0]} className="each-row-item">
                <Col span={7}>
                    <Row style={{marginBottom: 16}}><Col> <Image width="100px" src="/images/zoetis_reflabs_logo.png"/></Col></Row>
                    <Row ><Col><Text className="settingsDescriptions">Enter your login information to enable in-house and reference lab capabilities in Whskr.  Once logged in you can use Zoetis’s external labs fo</Text></Col></Row>
                </Col>
                <Col span={7} offset={3}>
                {connectData.data.zoetisRefLab.isConnected &&<Row style={{marginBottom:16}}><Col><CheckCircleOutlined className="integrate-connected" /><Text className="integrate-connected">Connected</Text></Col></Row>}
                <Row><Col><Button style={{minWidth:"150px"}} onClick ={()=> connectData.data.zoetisRefLab.isConnected? onConnectOrDisconnect(false,"zoetisRefLab",connectData.data.zoetisRefLab.id):setConnectData(k=>({...k,type:"zoetisRefLab"}))} shape="round" type="ghost">{connectData.data.zoetisRefLab.isConnected ?"Disconnect":"Connect"}</Button></Col></Row>

                </Col></Row>
            <Divider/> */}
          {connectData.type ? (
            <ConnectModal
              onConnect={(data) => {
                if (connectData.type === "zoetisRefLab") {
                  getConfirmationClinicStaffs(data.zoetisExternal.clinicId);
                } else {
                  onConnectOrDisconnect(true, connectData.type, data);
                }
                setConnectData((k) => ({ ...k, type: "" }));
              }}
              onClose={() => setConnectData((k) => ({ ...k, type: "" }))}
              logo={connectData.data[connectData.type].logo}
              type={connectData.type}
              id={connectData.data[connectData.type].id}
            />
          ) : null}
          {connectData.showZoetisRefLab ? (
            <ZoetisRefLabModal
              confirmStaffs={connectData.confirmStaffs}
              onConnect={() => {
                onConnectOrDisconnect(true, "zoetisRefLab", {
                  zoetisExternal: { clinicId: connectData.clinicId },
                });
                setConnectData((k) => ({
                  ...k,
                  type: "",
                  confirmStaffs: [],
                  clinicId: null,
                  showZoetisRefLab: false,
                }));
              }}
              onClose={() =>
                setConnectData((k) => ({
                  ...k,
                  type: "",
                  confirmStaffs: [],
                  clinicId: null,
                  showZoetisRefLab: false,
                }))
              }
            />
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default IntegrationsTab;
