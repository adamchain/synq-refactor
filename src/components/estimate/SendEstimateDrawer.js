import React, { useState, useEffect, useContext } from "react";
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
} from "antd";
import "../../../src/";
import PriceUtil from "./../util/PriceUtil";
import EstimateServices from "../../services/EstimateServices";
import EstimateEmailContent from "./preview/EstimateEmailContent";
import ClientServices from "../../services/ClientServices";
import { CommonContext } from "../../context/CommonContext";

const { Text, Link } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const SendEstimateDrawer = (props) => {
  const onClose = () => props.onClose();
  const commonContext = useContext(CommonContext);
  const [estimateData, setEstimateData] = useState({});

  const [previewData, setPreviewData] = useState({
    toList: [props.inputData.clientId],
    message: "",
    isPreviewOpen: false,
    template: "ET",
    subject: `Estimate for ${props.inputData.patientName} Visit`,
  });
  const [clientData, setClientData] = useState([]);
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
          <Option key={k.clientId} value={k.clientId}>
            {k.primary?.firstName + " " + k.primary?.lastName}
          </Option>
        )),
      );
    });
    EstimateServices.getEstimateById(props.inputData.estimateId, (response) => {
      setEstimateData(response);
    });
  }, []);
  const handleSubmit = () => {
    EstimateServices.sendEstimateEmail(
      props.inputData.estimateId,
      {
        //"to" : [props.inputData.clientId],
        patientId: props.inputData.patientId,
        clientId: props.inputData.clientId,
        subject: previewData.subject,
        message: previewData.message,
      },
      () => {
        onClose();
        props.onSuccess();
      },
    );
  };

  const updateValues = (key, value) => {
    setPreviewData((k) => ({ ...k, [key]: value }));
  };
  return (
    <>
      <Drawer
        title={"Send Estimate"}
        className="estimate-drawer"
        width={520}
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
                  mode="multiple"
                  value={previewData.toList}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  onChange={(value) => {
                    updateValues("toList", value);
                  }}
                >
                  {clientData}
                </Select>
              </Col>
            </Row>

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
                  value={previewData.template}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                >
                  <Option value="ET">Estimate Template</Option>
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

            <Row style={{ marginBottom: "8px" }}>
              <Col>
                <Text>Personalized Message (Optional)</Text>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <TextArea
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
        <Drawer
          title="Preview"
          width={600}
          closable={false}
          onClose={() => updateValues("isPreviewOpen", false)}
          visible={previewData.isPreviewOpen}
        >
          <EstimateEmailContent
            isEstimate={true}
            previewData={{ ...estimateData, branchObject }}
          />
        </Drawer>
      </Drawer>
    </>
  );
};

export default SendEstimateDrawer;
