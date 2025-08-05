import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Typography,
  Row,
  Col,
  Modal,
  Select,
  Divider,
} from "antd";
import CustomImage from "../generic-components/custom-image/CustomImage";

import PatientServices from "../../services/PatientServices";
import { CommonContext } from "../../context/CommonContext";
import BillingsTab from "../estimate/BillingsTab";
import AppointmentServices from "../../services/AppointmentServices";

const { Text } = Typography;
const { Option } = Select;

const SelectPatientModal = (tempProps) => {
  const [patientData, setPatientData] = useState({ id: null });
  const [doctorData, setDoctorData] = useState({ userId: tempProps.userId });
  const [apptData, setApptData] = useState({ apptTypeId: null });

  return (
    <Modal
      onCancel={tempProps.onClose}
      footer={null}
      visible={true}
      title="Choose the below:"
    >
      <Row style={{ marginBottom: 12 }}>
        <Col>
          <Text>
            Choose the client that you'd like to create an invoice for
          </Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <Select
            showSearch={true}
            value={patientData.id}
            size="large"
            filterOption={(input, option) =>
              option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value, option) => {
              setPatientData(option.data);
            }}
            placeholder={<Text>Select a Client</Text>}
            style={{ width: "100%", marginBottom: "24px" }}
          >
            {tempProps.patientDetails.map((k) => (
              <Option key={k.id} value={k.id} data={k} extra={k.name}>
                <Row>
                  <Col>
                    {" "}
                    <Text style={{ fontWeight: 500, lineHeight: "14px" }}>
                      {" "}
                      {k.name} <br />
                    </Text>
                    <Text
                      className="font-size-12"
                      style={{ fontWeight: 400, lineHeight: "12px" }}
                      type="secondary"
                    >
                      {k.breed}
                    </Text>
                  </Col>
                </Row>
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <Col>
          <Text>Choose the stylist</Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <Select
            showSearch={true}
            value={doctorData.userId}
            size="large"
            filterOption={(input, option) =>
              option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value, option) => {
              setDoctorData(option.data);
            }}
            placeholder={<Text>Select a Stylist</Text>}
            style={{ width: "100%", marginBottom: "24px" }}
          >
            {tempProps.doctorDetails.map((k) => (
              <Option
                key={k.userId}
                value={k.userId}
                data={k}
                extra={k.fullName}
              >
                <Row>
                  <Col>
                    {" "}
                    <Text style={{ fontWeight: 500, lineHeight: "14px" }}>
                      {" "}
                      {k.fullName} <br />
                    </Text>
                    <Text
                      className="font-size-12"
                      style={{ fontWeight: 400, lineHeight: "12px" }}
                      type="secondary"
                    >
                      {k.title}
                    </Text>
                  </Col>
                </Row>
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row style={{ marginBottom: 12 }}>
        <Col>
          <Text>Choose the appointment type</Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          <Select
            showSearch={true}
            value={apptData.apptTypeId}
            size="large"
            filterOption={(input, option) =>
              option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value, option) => {
              setApptData(option.data);
            }}
            placeholder={<Text>Select a appointment type</Text>}
            style={{ width: "100%", marginBottom: "5px" }}
          >
            {tempProps?.apptTypes?.map((k) => (
              <Option
                key={k.apptTypeId}
                value={k.apptTypeId}
                data={k}
                extra={k.apptTypeName}
              >
                <Row>
                  <Col>
                    {" "}
                    <Text style={{ fontWeight: 500, lineHeight: "14px" }}>
                      {" "}
                      {k.apptTypeName} <br />
                    </Text>
                    <Text
                      className="font-size-12"
                      style={{ fontWeight: 400, lineHeight: "12px" }}
                      type="secondary"
                    >
                      {k.apptLength} mins
                    </Text>
                  </Col>
                </Row>
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider style={{ marginTop: "60px" }} />
      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={12}>
          {" "}
          <Button onClick={tempProps.onClose} shape="round" size="large" block>
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            shape="round"
            disabled={!patientData.id || !apptData.apptTypeId}
            block
            onClick={() => {
              PatientServices.fetchPatientById(patientData.id, (data) => {
                let client = {
                  id: data.clientId,
                  lastName: data.clientLastName,
                };
                // tempProps.setInvoiceAction({type:"invoice", requiredData:{billingsData:{},record:{patientId:patientData.id,patient:{...patientData,image:data.image},client},isEdit:false}})
                tempProps.setExtraData((k) => ({
                  ...k,
                  record: {
                    patientId: patientData.id,
                    doctorId: doctorData.userId,
                    apptTypeId: apptData.apptTypeId,
                    patient: { ...patientData, image: data.image },
                    client,
                  },
                }));
              });
              //onCreateOrEditInvoice(patientData.id,tempProps.setInvoiceAction,false,{});
            }}
          >
            Create Invoice
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

const NewInvoiceDrawer = (props) => {
  const commonContext = useContext(CommonContext);
  const [extraData, setExtraData] = useState({
    record: props.record ?? {},
    patientDetails: [],
    doctorDetails: [],
    apptTypes: [],
  });

  useEffect(() => {
    if (!props.isEdit && !props.record?.patientId) {
      PatientServices.fetchAllPatients((data) =>
        setExtraData((k) => ({ ...k, patientDetails: data })),
      );
      AppointmentServices.fetchAllVets((data) =>
        setExtraData((k) => ({ ...k, doctorDetails: data })),
      );
      AppointmentServices.fetchApptTypes((data) =>
        setExtraData((k) => ({ ...k, apptTypes: data })),
      );
    }
  }, [props.record, props.isEdit]);
  const onClose = () => props.onClose();
  return (
    <>
      {!props.isEdit && !extraData.record?.patientId ? (
        <SelectPatientModal
          userId={commonContext.userProfile.userId}
          setExtraData={setExtraData}
          patientDetails={extraData.patientDetails}
          doctorDetails={extraData.doctorDetails}
          apptTypes={extraData.apptTypes}
          onClose={onClose}
        />
      ) : (
        <Drawer
          className="estimate-drawer"
          title={
            props.isEdit ? "Invoice " + props.inputData.id : "Create Invoice"
          }
          width={800}
          onClose={onClose}
          visible={true}
          bodyStyle={{ paddingBottom: 50 }}
          footer={null}
        >
          <Row justify="start" align="middle" gutter={[16, 0]}>
            <Col>
              <CustomImage
                styling={{
                  width: "65px",
                  height: "65px",
                  showOuterBorder: true,
                  url: `url(` + extraData.record.patient?.image + `)`,
                  fullName: "", // pass dynamic full name
                }}
              />
            </Col>
            <Col>
              <Row>
                <Col>
                  <Text style={{ fontSize: "17px", fontWeight: 500 }}>
                    {extraData.record.patient?.name}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text type="secondary">
                    {extraData.record.patient?.breed}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <BillingsTab
            refreshData={(invoiceId) => props.onRefresh(invoiceId)}
            onSuccessReturn={props.onSuccessReturn}
            billingsData={props.inputData ?? { items: [] }}
            patientId={extraData.record.patient?.id}
            doctorId={extraData.record.doctorId}
            apptTypeId={extraData.record.apptTypeId}
            apptId={null}
            clientId={
              props.isEdit ? props.record.client.id : extraData.record.client.id
            }
            showBadge={(data) => {}}
            patientName={extraData.record.patient?.name}
          />
        </Drawer>
      )}
    </>
  );
};
export default NewInvoiceDrawer;
