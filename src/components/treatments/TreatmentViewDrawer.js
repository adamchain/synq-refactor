import React, { useState, useEffect, useContext } from "react";
import { Button, Drawer, Typography, Row, Col, Form, Modal } from "antd";
import "./Treatments.scss";

import TreatmentFormViewConfig from "./TreatmentFormViewConfig";
import TreatmentServices from "../../services/TreatmentServices";
import InvoiceDrawer from "../billings-page/InvoiceDrawer";
import PatientServices from "../../services/PatientServices";
import BillingServices from "../../services/BillingServices";
import InventoryServices from "../../services/InventoryServices";
import BillingUtil from "../estimate/BillingUtil";
import NewInvoiceDrawer from "../billings-page/NewInvoiceDrawer";
import { CommonContext } from "../../context/CommonContext";
import PriceUtil from "../util/PriceUtil";

const { Text } = Typography;

const CustomItem = ({ field }) => {
  return (
    <Col span={field.span} style={{ marginBottom: "16px" }}>
      <Row>
        <Col>
          <Text className="text-default-400" strong>
            {field.label}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text className="text-default-400">{field.value}</Text>
        </Col>
      </Row>
    </Col>
  );
};

const TreatmentViewDrawer = ({
  inputData,
  onClose,
  onSuccess,
  onPrintLabel,
}) => {
  const commonContext = useContext(CommonContext);

  const [form] = Form.useForm();
  const [treatmentData, setTreatmentData] = useState({});
  const [invoiceDrawer, setInvoiceDrawer] = useState(null);

  useEffect(() => {
    if (inputData.data) {
      //form.setFieldsValue({ ...inputData.data });
      if (inputData.type === "Vaccine")
        TreatmentServices.getVaccineById(inputData.data.id, setTreatmentData);
      else {
        TreatmentServices.getMedicationById(
          inputData.data.id,
          setTreatmentData,
        );
      }
    }
    // setTreatmentData({
    //     name: "Vetropolycin Ophth Ointment 1/8 Oz",
    //     lab: "Zoetis Laboratories",
    //     active:"true",
    //     administered:"03/03/2021",
    //     started:"03/03/2021",
    //     expirationPeriod:"1 Year",
    //     expirationDate:"03/03/2022",
    //     vaccineType:"Killed",
    //     vaccineSerial:"12345",
    //     rabiesTag:"215534",
    //     strength:"100mg",
    //     doseType:"initial",
    //     refills:"3",
    //     refillExpiration:"1 Year",
    //     lotNumber:"KL9318",
    //     rxNumber:"WH10001",
    //     rxInstructions:"Mix the contents of 1 packet in good tasting food daily until gone.",
    //     prescribedBy:"Dr Carla Politte"
    // })
  }, [inputData.data]);

  return (
    <Drawer
      className="treatment-drawer"
      title={
        (inputData.type === "Vaccine" ? "Vaccine" : "Medication") + " Details"
      }
      width={492}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <div className="footer-button">
          <Button onClick={onClose} shape="round" style={{ marginRight: 16 }}>
            Cancel
          </Button>
          {/* <Button
                        htmlType = "submit"
                        type="primary"
                        form="treatment-form-id"
                        size="large"
                        shape="round"
                        >Save
                        </Button> */}
        </div>
      }
    >
      <Form id="treatment-view-form-id" form={form} onFinish={(values) => {}}>
        <Row gutter={[24, 0]} style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Text className="treatmentName" strong>
              {treatmentData?.name}
            </Text>
          </Col>
          {/* <Col span={24}><Text className='treatmentsecondary'>{treatmentData?.lab??"#TODO"}</Text></Col>  */}
          <Col span={24}>
            <Text className="treatmentsecondary">
              {treatmentData?.strength ?? ""}
            </Text>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          {(inputData.type === "Vaccine"
            ? TreatmentFormViewConfig.vaccine(treatmentData)[0]
            : TreatmentFormViewConfig.medication(treatmentData)[0]
          ).map((field, index) => (
            <CustomItem field={field} />
          ))}

          {/* <Row style={{ marginBottom: "32px",marginTop:"8px" }}><Col><Text className='text-default-500 font-size-16'>
                    Additional Information
                </Text></Col></Row> */}

          {/* {(inputData.type === "Vaccine" ? TreatmentFormViewConfig.vaccine(treatmentData)[1] : TreatmentFormViewConfig.medication(treatmentData)[1]).map((field, index) =>  <CustomItem field = {field}/>)} */}
          {inputData.type === "Vaccine" && treatmentData.rabiesTag && (
            <Col span={12}>
              <Button
                shape="round"
                block
                onClick={() => {
                  TreatmentServices.getRabiesCertificateByVaccineId(
                    inputData.data.id,
                    (data) => {
                      localStorage.setItem(
                        "whskr-print-rabiescertificate",
                        JSON.stringify({ ...data }),
                      );

                      window.open("/rabies/preview", "_blank", "noreferrer");
                    },
                  );
                }}
              >
                Rabies Certificate
              </Button>
            </Col>
          )}
        </Row>

        {inputData.type === "Vaccine" ? null : (
          <Row gutter={[24, 0]} justify="space-between">
            <Col span={12}>
              <Button
                disabled={!treatmentData.refillRemaining}
                shape="round"
                onClick={() => {
                  PatientServices.fetchPatientById(
                    inputData.patientId,
                    (data) => {
                      InventoryServices.getInventoryById(
                        treatmentData.inventoryId,
                        (temp) => {
                          let originalPrice = temp.price;
                          let price =
                            temp.discountType && temp.discount
                              ? temp.discountType === "$"
                                ? originalPrice - temp.discount
                                : PriceUtil.discountCalculate(
                                    originalPrice,
                                    temp.discount,
                                  )
                              : originalPrice;
                          let onHand = temp.detail?.useLots
                            ? temp?.lots?.find((k) => k.active)?.qty
                            : temp.detail?.onHand;
                          let rxPrescription = Object.values(
                            temp.rxPrescription,
                          ).some((k) => !!k);
                          let client = {
                            id: data.clientId,
                            lastName: data.clientLastName,
                          };

                          if (onHand > 0) {
                            let inputjson = {
                              client: {
                                id: data.clientId,
                              },
                              patient: {
                                id: inputData.patientId,
                              },

                              items: [
                                {
                                  categoryId: temp.categoryId,
                                  discount: temp.discount,
                                  discountType: temp.discountType,
                                  code: temp.code,
                                  declined: false,
                                  id: temp.id,
                                  inventoryId: treatmentData.inventoryId,
                                  maxPrice: temp.maxPrice,
                                  minPrice: temp.minPrice,
                                  name: temp.pName,
                                  onHand,
                                  originalPrice,
                                  itemPrice: originalPrice,
                                  pName: temp.pName,
                                  patient: {
                                    id: inputData.patientId,
                                  },
                                  medId: inputData.data.id,
                                  price: price.toFixed(2),
                                  qty: 1,
                                  rxPrescription,
                                  sFee: temp.sFee,
                                  sTax: temp.sTax,
                                  tax: temp.sTax
                                    ? commonContext.defaultBranch.taxRate
                                    : 0.0,
                                  type: temp.type,
                                },
                              ],
                            };
                            BillingServices.addBillingItem(
                              inputjson,
                              ({ billingId }) => {
                                BillingServices.getBillingById(
                                  billingId,
                                  (billingsData) => {
                                    setInvoiceDrawer({
                                      billingsData,
                                      record: {
                                        patientId: data.patientId,
                                        patient: {
                                          id: data.patientId,
                                          name:
                                            data.patientName +
                                            " " +
                                            data.clientLastName,
                                          breed: data.breedName,
                                        },
                                        client,
                                      },
                                      isEdit: true,
                                    });
                                  },
                                );
                              },
                            );
                          } else {
                            Modal.warning({
                              title: "Order Refill cant be processed",
                              content:
                                "Items are out of stock, please comeback once replenished.",
                            });
                          }
                        },
                      );
                    },
                  );
                }}
                block
              >
                Order Refill
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={() => onPrintLabel(inputData.data.id)}
                shape="round"
                block
              >
                Reprint Label
              </Button>
            </Col>
          </Row>
        )}
      </Form>
      {invoiceDrawer && (
        <NewInvoiceDrawer
          inputData={invoiceDrawer.billingsData}
          record={invoiceDrawer.record}
          isEdit={true}
          onRefresh={(invoiceId) =>
            BillingServices.getBillingById(invoiceId, (data) =>
              setInvoiceDrawer((k) => ({ ...k, billingsData: data })),
            )
          }
          onSuccessReturn={() => {
            setInvoiceDrawer(null);
          }}
          onClose={() => setInvoiceDrawer(null)}
        />
      )}
    </Drawer>
  );
};
export default TreatmentViewDrawer;
