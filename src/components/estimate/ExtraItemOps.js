import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Typography, Button, Input, Modal, Divider } from "antd";
import "./Estimate.scss";
import BillingDetail from "./BillingDetail";
import ImportEstimateModal from "./ImportEstimateModal";
import EstimateServices from "../../services/EstimateServices";
import BillingServices from "../../services/BillingServices";
import PriceUtil from "../util/PriceUtil";
import EstimateSummary from "./EstimateSummary";
import PrintLabelDrawer from "../labels/PrintLabelDrawer";
import PaymentDrawer from "./PaymentDrawer";
import PatientServices from "../../services/PatientServices";
import BillingUtil from "./BillingUtil";
import MedicationServices from "../../services/MedicationServices";
import { CommonContext } from "../../context/CommonContext";

const { Text } = Typography;
const { Title } = Typography;
const RabiesTagModal = (tempProps) => {
  const [rabiesTag, setRabiesTag] = useState(tempProps.rabiesTag ?? "");

  return (
    <Modal
      onCancel={tempProps.onClose}
      footer={null}
      visible={true}
      title="Rabies Tag Number"
    >
      <Row style={{ marginBottom: 16 }}>
        <Col>
          <Text>
            Please enter the rabies tag number as seen on the metal tag
          </Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={24}>
          {" "}
          <Input
            placeholder="YYYY-###"
            value={rabiesTag}
            onChange={(e) => {
              let value = e.target.value;
              setRabiesTag(value);
            }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col>
          <Text>
            For better record keeping we recommend following the YYYY-### format
          </Text>
        </Col>
      </Row>

      <Divider />
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
            disabled={!rabiesTag}
            block
            onClick={() => tempProps.onSave(rabiesTag)}
          >
            Save & Print
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
const ExtraItemOps = ({ updateBillingDetails, estimateData, parentProps }) => {
  let props = parentProps;
  const [isRabiesTag, setIsRabiesTag] = useState(null);
  const [isOpenPrintLabel, setIsOpenPrintLabel] = useState(null);

  const MicrochipNumber = (tempprops) => {
    const [microchip, setMicrochip] = useState(tempprops.microchip);

    return (
      <Input
        placeholder="Enter Microchip #"
        prefix="#"
        onBlur={(e) => {
          let inputjson = {
            patientId: tempprops.patientId,
            microchip: microchip,
          };
          PatientServices.updateMicrochipByPatientId(inputjson);
        }}
        value={microchip}
        onChange={(e) => {
          let { value } = e.target;
          setMicrochip(value);
        }}
      />
    );
  };

  let showItems = [
    ...estimateData.items,
    ...estimateData.items
      .filter((k) => k.children && k.children.length > 0)
      .flatMap((k) => k.children),
  ];

  return (
    <>
      {showItems.some(
        (k) => k.rxPrescription && !k.declined && !k.isRabies && !k.isMicrochip,
      ) && (
        <>
          <Row
            justify="space-between"
            className="labelsSection"
            align="middle"
            gutter={[0, 16]}
          >
            <Col span={24}>
              <Row
                justify="space-between"
                className="labelsTitleArea"
                align="middle"
                gutter={[0, 16]}
              >
                <Col>
                  <Row align="middle">
                    <Col>
                      <Title level={5}>Labels</Title>
                    </Col>
                  </Row>
                  <Row align="middle">
                    <Col>
                      <Text>Get labels for dispensable items</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {showItems
                .filter(
                  (k) =>
                    k.rxPrescription &&
                    !k.declined &&
                    !k.isRabies &&
                    !k.isMicrochip,
                )
                .map((k) => (
                  <Row
                    className="item-label-card"
                    onClick={() => {
                      //k.medId = 9630;

                      if (k.medId) {
                        MedicationServices.getMedicationLabelDetails(
                          k.medId,
                          (firstData) => {
                            MedicationServices.getMedicationLabelDetailsForPrint(
                              k.inventoryId,
                              props.apptId ?? estimateData.id,
                              props.patientId,
                              !!props.apptId,
                              (secondData) => {
                                let refillData = {
                                  ...k,
                                  ...firstData,
                                  ...secondData,
                                };
                                refillData.refills =
                                  refillData.refills ??
                                  refillData.refillRemaining;
                                refillData.rxInstructions =
                                  refillData.rxInstructions
                                    ? refillData.rxInstructions
                                    : refillData.instructions;
                                setIsOpenPrintLabel(refillData);
                              },
                            );
                          },
                        );
                      } else {
                        MedicationServices.getMedicationLabelDetailsForPrint(
                          k.inventoryId,
                          props.apptId ?? estimateData.id,
                          props.patientId,
                          !!props.apptId,
                          (data) => {
                            setIsOpenPrintLabel({ ...data, ...k });
                          },
                        );
                      }
                    }}
                    justify="space-between"
                    align="middle"
                  >
                    <Col>
                      <Text>{k.name}</Text>
                    </Col>
                    <Col>
                      <Typography.Link>Print</Typography.Link>
                    </Col>
                  </Row>
                ))}
            </Col>
          </Row>
        </>
      )}

      {showItems.some((k) => k.isRabies && !k.declined) && (
        <>
          <Row
            justify="space-between"
            className="labelsSection"
            align="middle"
            gutter={[0, 16]}
          >
            <Col span={24}>
              <Row
                justify="space-between"
                className="labelsTitleArea"
                align="middle"
                gutter={[0, 16]}
              >
                <Col>
                  <Row align="middle">
                    <Col>
                      <Title level={5}>Rabies Certificate</Title>
                    </Col>
                  </Row>
                  <Row align="middle">
                    <Col>
                      <Text>
                        Save and Print Rabies Certificate for this Patient
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {showItems
                .filter((k) => k.isRabies && !k.declined)
                .map(
                  (k) => (
                    <Row
                      className="item-label-card"
                      onClick={() =>
                        setIsRabiesTag({
                          patientId: props.patientId,
                          itemId: k.id,
                          rabiesTag: k.rabiesTag,
                        })
                      }
                      justify="space-between"
                      align="middle"
                    >
                      <Col>
                        <Text>{k.name}</Text>
                      </Col>

                      <Col>
                        <Text>{k.rabiesTag ?? ""}</Text>
                        <Typography.Link style={{ marginLeft: "25px" }}>
                          Print
                        </Typography.Link>
                      </Col>
                    </Row>
                  ), //onClick={(e) => {e.stopPropagation();BillingUtil.downloadRabiesCertificate(k.id)}}
                )}
            </Col>
          </Row>
        </>
      )}
      {showItems.some((k) => k.isMicrochip && !k.declined) && (
        <>
          <Row
            justify="space-between"
            className="labelsSection"
            align="middle"
            gutter={[0, 16]}
          >
            <Col span={24}>
              <Row
                justify="space-between"
                className="labelsTitleArea"
                align="middle"
                gutter={[0, 16]}
              >
                <Col>
                  <Row align="middle">
                    <Col>
                      <Title level={5}>Microchip</Title>
                    </Col>
                  </Row>
                  <Row align="middle">
                    <Col>
                      <Text>Add Microchip Number to Patient Record</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {showItems
                .filter((k) => k.isMicrochip && !k.declined)
                .map((k) => (
                  <Row
                    className="item-label-card"
                    justify="space-between"
                    align="middle"
                  >
                    <Col>
                      <Text>Microchip Number</Text>
                    </Col>
                    <Col>
                      {" "}
                      <MicrochipNumber
                        microchip={k.microchip}
                        patientId={props.patientId}
                      />
                    </Col>
                  </Row>
                ))}
            </Col>
          </Row>
        </>
      )}
      {isOpenPrintLabel && (
        <PrintLabelDrawer
          onClose={() => setIsOpenPrintLabel(null)}
          itemData={{
            ...isOpenPrintLabel,
            patientName: props.patientName,
            clientId: props.clientId,
            apptId: props.apptId,
            patientId: props.patientId,
          }}
          billingId={estimateData.id}
        />
      )}
      {isRabiesTag && (
        <RabiesTagModal
          rabiesTag={isRabiesTag.rabiesTag}
          onClose={() => setIsRabiesTag(null)}
          onSave={(rabiesTag) =>
            BillingServices.updateRabiesTag(
              {
                rabiesTag,
                patientId: isRabiesTag.patientId,
              },
              () => {
                BillingUtil.downloadRabiesCertificate(isRabiesTag.itemId);
                updateBillingDetails();
                setIsRabiesTag(null);
              },
            )
          }
        />
      )}
    </>
  );
};

export default ExtraItemOps;
