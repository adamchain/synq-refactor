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

import "../../../src/";
import PriceUtil from "./../util/PriceUtil";

import EstimateSummary from "../estimate/EstimateSummary";
import EstimateDetail from "../estimate/EstimateDetail";

import BillingServices from "../../services/BillingServices";
import PatientServices from "../../services/PatientServices";
import { CommonContext } from "../../context/CommonContext";
import PaymentDrawer from "../estimate/PaymentDrawer";
import BillingUtil from "../estimate/BillingUtil";
import ExtraItemOps from "../estimate/ExtraItemOps";

const { Text } = Typography;
const { Option } = Select;

const SelectPatientModal = (tempProps) => {
  const [patientData, setPatientData] = useState({ id: null });

  return (
    <Modal
      onCancel={tempProps.onClose}
      footer={null}
      visible={true}
      title="Choose Client"
    >
      <Row style={{ marginBottom: 24 }}>
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
            disabled={!patientData.id}
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

const InvoiceDrawer = (props) => {
  const [paymentDrawer, setPaymentDrawer] = useState(false);
  const commonContext = useContext(CommonContext);
  const formatBillingItem = (inputItems = []) => {
    return inputItems.map((k) => {
      if (k.packageItems && k.packageItems.length > 0) {
        let children = [...k.packageItems].map((v) => ({
          ...v,
          isChildren: true,
          providerFirstName: k.providerFirstName,
          providerLastName: k.providerLastName,
          providerId: k.providerId,
        }));
        return { ...k, children };
      } else if (k.type === 5) {
        return { ...k, children: [] };
      } else return { ...k };
    });
  };

  const formatDiscount = (inputBillingData = {}) => {
    let discountObject = {};
    if (
      !inputBillingData.discount &&
      inputBillingData?.client?.discountAmount
    ) {
      discountObject = {
        discount: inputBillingData.client.discountAmount,
        discountType: inputBillingData.client.discountType,
      };
    }
    return discountObject;
  };

  const [estimateData, setEstimateData] = useState({
    name: "",
    statusId: 1,
    tax: commonContext.defaultBranch.taxRate,
    ...props.inputData,
    items: formatBillingItem(props.inputData?.items),
    ...formatDiscount(props.inputData),
  });
  const [extraData, setExtraData] = useState({
    record: props.record ?? {},
    patientDetails: [],
  });
  // setEstimateData({statusId:1,name:"",tax: 4.33,priceVariance: 6.2,
  //     discount: 6.1,items:[]});

  useEffect(() => {
    if (!props.isEdit && !props.record?.patientId) {
      PatientServices.fetchAllPatients((data) =>
        setExtraData((k) => ({ ...k, patientDetails: data })),
      );
    }
  }, [props.record, props.isEdit]);
  const onClose = () => props.onClose();

  const updateBillingDetails = (invoiceId) => {
    BillingServices.getBillingById(
      invoiceId ? invoiceId : props.inputData.id,
      (billingsData) => {
        setEstimateData((k) => ({
          ...k,
          items: [
            ...billingsData.items.map((v) => ({
              ...v,
              ...(v.type === 5 ? { children: [] } : {}),
            })),
          ],
        }));
        if (invoiceId) {
          setTimeout(() => handleSubmit(false, invoiceId), 1000);
        }
      },
    );
  };

  // const onAddItemsToBilling = (estimateId,itemObj) => {

  //         let inputjson ={
  //             "client": {
  //                 "id": props.record.client.id
  //             },
  //             "items" : [{...itemObj,"declined":false,"name":itemObj.pName,"qty":1,
  //             "patient": {
  //                 "id": props.record.patient.id
  //             }
  //         }]
  //         }

  //     }

  const handleSubmit = (isClose, invoiceId) => {
    let { subTotal, total } = BillingUtil.submitTotal(
      estimateData,
      commonContext.defaultBranch.sTaxSFee === true,
    );
    estimateData.items.forEach(function (element) {
      element.patient = {
        id: extraData.record.patientId, //TODO remove check once patientId is updated in invoice
      };
    });

    let inputData = {
      ...estimateData,
      total,
      subTotal,
      client: { id: extraData.record.client.id },
      patient: { id: extraData.record.patientId },
    };
    let taxedAmount = BillingUtil.calculateTax(
      estimateData.items,
      commonContext.defaultBranch.sTaxSFee === true,
      estimateData.tax,
    );
    let serviceFee = BillingUtil.calculateServiceFee(estimateData.items);
    inputData.taxTotal = taxedAmount;
    inputData.serviceFee = serviceFee;
    let callPayDrawer = (invoiceId) =>
      setPaymentDrawer({
        zeroBalance: !~~total,
        billingsData: {
          ...inputData,
          patientId: extraData.record?.patientId,
          billingIds: [invoiceId ? invoiceId : props.inputData.id],
          serviceFee,
          taxedAmount,
        },
      });

    if (props.isEdit) {
      BillingServices.updateBillingById(
        { ...inputData, id: props.inputData.id },
        () => (isClose ? props.onSuccessReturn() : callPayDrawer(null)),
      );
    } else {
      if (invoiceId) {
        callPayDrawer(invoiceId);
      } else {
        BillingServices.createInvoice(inputData, (invoiceId) => {
          isClose ? props.onSuccessReturn() : updateBillingDetails(invoiceId);
        });
      }
    }
  };

  let subTotal = BillingUtil.calculateSubTotal(estimateData.items);
  let isPaid = estimateData.statusId === 3 || estimateData.statusId === 2;
  let isPartialPaid = estimateData.statusId === 2;

  return (
    <>
      {!props.isEdit && !extraData.record?.patientId ? (
        <SelectPatientModal
          setExtraData={setExtraData}
          patientDetails={extraData.patientDetails}
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
                  disabled={isPaid}
                  onClick={() => handleSubmit(true)}
                  shape="round"
                  size="large"
                  type="primary"
                >
                  {props.isEdit ? "Update" : "Save"}
                </Button>
              </Col>
            </Row>
          }
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
          {/* <BillingsTab
                            onSuccessReturn = {props.onSuccessReturn}
                            billingsData = {props.inputData}
                            patientId={null}
                            apptId= {null}
                            clientId= {props.record.clientId}
                            patientName={props.record.patientName}/> */}
          <EstimateDetail
            isPaid={isPaid}
            setEstimateData={setEstimateData}
            estimateData={estimateData}
            isEstimate={false}
          />
          <ExtraItemOps
            estimateData={estimateData}
            updateBillingDetails={updateBillingDetails}
            parentProps={props}
          />

          <EstimateSummary
            isPaid={isPaid}
            isPartialPaid={isPartialPaid}
            subTotal={subTotal}
            isEstimate={false}
            estimateSummary={estimateData}
            handleSubmit={() => handleSubmit()}
            setEstimateSummary={setEstimateData}
          />

          {paymentDrawer && (
            <PaymentDrawer
              isPartialPaid={isPartialPaid}
              clientId={
                props.isEdit
                  ? props.record.client.id
                  : extraData.record.client.id
              }
              inputData={paymentDrawer}
              onRefresh={props.onRefresh}
              onClose={() => setPaymentDrawer(false)}
              onSuccess={() => {
                setPaymentDrawer(false);
                props.onSuccessReturn();
              }}
            />
          )}
        </Drawer>
      )}
    </>
  );
};
export default InvoiceDrawer;
