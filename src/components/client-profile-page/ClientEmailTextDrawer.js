import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Button,
  Drawer,
  Typography,
  Row,
  Col,
  Form,
  Select,
  Input,
  message,
  Upload,
} from "antd";
import ClientServices from "../../services/ClientServices";
import "./ClientProfile.scss";
import ClientEmailContent from "./ClientEmailContent";
import { CommonContext } from "../../context/CommonContext";

const { Text, Link } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ClientEmailTextDrawer = (props) => {
  const onClose = () => props.onClose();
  const commonContext = useContext(CommonContext);
  const [previewData, setPreviewData] = useState({
    clientId: props.inputData.clientId,
    patientId: props.inputData.patientId,
    message: "",
    isPreviewOpen: false,
    template: "ET",
    subject: "",
    clientFirstName: "",
  });
  const [clientData, setClientData] = useState([]);
  const uploadRef = useRef();

  const branchObject = {
    branchName: commonContext.defaultBranch?.name,
    branchAddress: `${(commonContext.defaultBranch?.address1 ?? "") + " " + (commonContext.defaultBranch?.address2 ?? "")}, ${commonContext.defaultBranch?.city + " ," + commonContext.allStates[commonContext.defaultBranch?.stateId]?.stateCd + " " + commonContext.defaultBranch?.zipCode}`,
    branchMobile: commonContext.defaultBranch?.mobile
      ? commonContext.defaultBranch?.mobile
      : commonContext.defaultBranch?.phone,
    branchEmail: commonContext.defaultBranch?.email,
    branchWebsite: commonContext.defaultBranch?.website,
  };
  useEffect(() => {
    ClientServices.getAllClients((data) => {
      setClientData(
        data.map((k) => (
          <Option clientObject={k} key={k.clientId} value={k.clientId}>
            {k.primary?.firstName + " " + k.primary?.lastName}
          </Option>
        )),
      );
      let selectedData = data.find(
        (k) => k.clientId === props.inputData.clientId,
      );
      if (selectedData) {
        updateValues("clientFirstName", selectedData?.primary?.firstName);
      }
    });
  }, []);
  const handleSubmit = () => {
    let submitData = {
      message: previewData.message,
      subject: previewData.subject,
      clientId: previewData.clientId,
      patientId: previewData.patientId,
    };
    ClientServices.sendClientEmail(
      submitData,
      uploadRef.current.fileList.map((k) => k.originFileObj),
      onClose,
    );
  };

  const updateValues = (key, value) => {
    setPreviewData((k) => ({ ...k, [key]: value }));
  };
  return (
    <>
      <Drawer
        className="client-email-text-drawer"
        title={`Send ${props.inputData.type === "email" ? "Email" : "Text"}`}
        width={480}
        onClose={onClose}
        visible={true}
        bodyStyle={{ paddingBottom: 50 }}
        footer={
          <Row justify="end">
            <Col>
              <Button
                onClick={onClose}
                size="large"
                shape="round"
                style={{ marginRight: 16 }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              {" "}
              <Button
                onClick={handleSubmit}
                shape="round"
                size="large"
                type="primary"
              >
                Send
              </Button>
            </Col>
          </Row>
        }
      >
        <Row justify="start" align="middle" gutter={[16, 0]}>
          <Col span={24}>
            <Row style={{ marginBottom: "8px" }}>
              <Col>
                <Text>To Client</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: "24px" }}>
              {" "}
              <Col span={24}>
                <Select
                  style={{ width: "100%" }}
                  showSearch={true}
                  value={previewData.clientId}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  onChange={(value, option) => {
                    setPreviewData((k) => ({
                      ...k,
                      clientId: value,
                      clientFirstName: option.clientObject?.primary?.firstName,
                    }));
                  }}
                >
                  {clientData}
                </Select>
              </Col>
            </Row>
            {props.inputData.type === "email" && (
              <>
                <Row style={{ marginBottom: "8px" }} justify="space-between">
                  <Col>
                    <Text>Template</Text>
                  </Col>
                  <Col>
                    <Link onClick={() => updateValues("isPreviewOpen", true)}>
                      Preview
                    </Link>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "24px" }}>
                  <Col span={24}>
                    {" "}
                    <Select
                      style={{ width: "100%" }}
                      showSearch={true}
                      disabled={true}
                      value={previewData.template}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentElement
                      }
                    >
                      <Option value="ET"> General Email</Option>
                    </Select>
                  </Col>
                </Row>

                <Row style={{ marginBottom: "8px" }}>
                  <Col>
                    <Text>Subject</Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "24px" }}>
                  <Col span={24}>
                    <Input
                      onChange={(k) => updateValues("subject", k.target.value)}
                      value={previewData.subject}
                    />
                  </Col>
                </Row>
              </>
            )}
            <Row style={{ marginBottom: "8px" }}>
              <Col>
                <Text>Message</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: "24px" }}>
              <Col span={24}>
                <TextArea
                  placeholder="Add a personalized Message"
                  value={previewData.message}
                  onChange={(e) => {
                    updateValues("message", e.target.value);
                  }}
                  rows={4}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {props.inputData.type === "email" && (
          <Row>
            <Col span={24}>
              <Upload
                ref={uploadRef}
                name="file"
                customRequest={({ file, onSuccess, onProgress }) => {
                  onSuccess("done");
                }}
              >
                <Button size="small" style={{ marginBottom: 12 }} shape="round">
                  Attach Files{" "}
                </Button>
              </Upload>
            </Col>
          </Row>
        )}
        <Drawer
          title="Preview"
          width={600}
          closable={false}
          onClose={() => updateValues("isPreviewOpen", false)}
          visible={previewData.isPreviewOpen}
        >
          <ClientEmailContent
            previewData={{
              ...previewData,
              branchObject,
              staffName:
                commonContext.userProfile.firstName +
                " " +
                commonContext.userProfile.lastName,
            }}
          />
        </Drawer>
      </Drawer>
    </>
  );
};

export default ClientEmailTextDrawer;
