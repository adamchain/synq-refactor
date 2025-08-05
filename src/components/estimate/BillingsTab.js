import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Typography, Button, Input, Modal, Divider, Tag } from "antd";
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
import ExtraItemOps from "./ExtraItemOps";
import CommonUtil from "../util/CommonUtil";

const { Text } = Typography;
const { Title } = Typography;

// const RabiesTagModal = (tempProps) => {
//     const [rabiesTag,setRabiesTag] = useState(tempProps.rabiesTag??"");

//     return(<Modal
//     onCancel={tempProps.onClose}
//     footer={null}
//     visible = {true}
//     title = "Rabies Tag Number">
//     <Row style={{marginBottom: 16}} ><Col><Text>Please enter the rabies tag number as seen on the metal tag</Text></Col></Row>
//     <Row style={{marginBottom: 16}}><Col span={24}> <Input placeholder="YYYY-###" value={rabiesTag} onChange={(e)=>{let value = e.target.value;setRabiesTag(value)}}/></Col></Row>
//     <Row style={{marginBottom: 16}} ><Col><Text>For better record keeping we recommend following the YYYY-### format</Text></Col></Row>

//     <Divider/>
//       <Row justify="space-between" gutter={[16,0]}>
//           <Col span={12}> <Button onClick={tempProps.onClose}
//                 shape="round"
//                 size="large"
//                 block>
//                 Cancel
//                 </Button></Col><Col span={12}><Button
//                 type="primary"
//                 size="large"
//                 shape="round"
//                 disabled = {!rabiesTag}
//                 block
//                 onClick={()=>tempProps.onSave(rabiesTag)}
//                 >Save & Print
//                 </Button></Col></Row>
//     </Modal>);
// }

const BillingsTab = (props) => {
  const commonContext = useContext(CommonContext);
  const [estimateData, setEstimateData] = useState({
    statusId: null,
    tax: commonContext.defaultBranch.taxRate,
    id: 0,
    items: [],
  });
  const [estimateList, setEstimateList] = useState([]);

  const [importEstimate, setImportEstimate] = useState(false);
  // const [isOpenPrintLabel, setIsOpenPrintLabel] = useState(null);
  const [paymentDrawer, setPaymentDrawer] = useState(null);
  // const [isRabiesTag,setIsRabiesTag] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    setUnsavedChanges(true);
  }, [estimateData]);
  // useEffect(() => {
  //     if (props.patientId) {
  //         EstimateServices.searchEstimateByPatientId(props.patientId, setEstimateList)
  //     }
  // }, [props.patientId])

  const formatBillingItem = (inputItems = []) => {
    return inputItems.map((k) => {
      if (k.packageItems && k.packageItems.length > 0) {
        let children = [...k.packageItems].map((v) => ({
          ...v,
          isChildren: true,
          packageId: k.id,
          providerFirstName: k.providerFirstName,
          providerLastName: k.providerLastName,
          providerId: k.providerId,
        }));
        return { ...k, children };
      } else return { ...k };
    });
  };

  const formatDiscount = (inputBillingData = {}) => {
    let discountObject = {};
    if (
      !inputBillingData.discount &&
      !(inputBillingData.statusId === 2 || inputBillingData.statusId === 3) &&
      inputBillingData?.client?.discountAmount
    ) {
      discountObject = {
        discount: inputBillingData.client.discountAmount,
        discountType: inputBillingData.client.discountType,
      };
    }
    return discountObject;
  };

  useEffect(() => {
    if (props.billingsData) {
      // setEstimateData(k => ({ ...k, items: [ ...props.billingsData.items] }))
      setEstimateData((k) => ({
        ...k,
        ...props.billingsData,
        items: [...formatBillingItem(props.billingsData.items)],
        ...formatDiscount(props.billingsData),
      }));
    }
  }, [props.billingsData.items]);

  const updateBillingDetails = () => {
    if (props.apptId) {
      BillingServices.getBillingForAppointment(props.apptId, (billingsData) =>
        setEstimateData((k) => ({
          ...k,
          items: [...formatBillingItem(billingsData.items)],
          id: billingsData.id,
          ...formatDiscount(billingsData),
        })),
      );
    } else if (estimateData.id) {
      BillingServices.getBillingById(estimateData.id, (billingsData) =>
        setEstimateData((k) => ({
          ...k,
          items: [...formatBillingItem(billingsData.items)],
          id: billingsData.id,
          ...formatDiscount(billingsData),
        })),
      );
    } else {
      //create Invoice
    }
  };

  const onAddItemsToBilling = (estimateId, itemObj) => {
    if (itemObj && (itemObj.type === 3 || itemObj.type === 4)) {
      props.showBadge(true);
    }
    if (estimateId) {
      let inputjson = {
        apptId: props.apptId,
        estimateId: estimateId,
      };
      BillingServices.importEstimateInToBilling(
        inputjson,
        updateBillingDetails,
      );
    } else {
      let itemData = {
        ...itemObj,
        itemPrice: itemObj.originalPrice,
        inventoryId: itemObj.id,
        declined: false,
        name: itemObj.pName,
        qty: 1,
        tax: itemObj.sTax ? estimateData.tax : 0.0,
        patient: {
          id: props.patientId,
        },
      };

      itemData.price = BillingUtil.calculateCalPriceForEachItem(itemData);

      let inputjson = {
        apptId: props.apptId,
        client: {
          id: props.clientId,
        },
        patient: {
          id: props.patientId,
        },
        updatedProviderId: props.doctorId,
        apptTypeId: props.apptTypeId,
        items: [{ ...itemData }],
      };

      //    if(!props.apptId && !estimateData.id){
      //          BillingServices.createInvoice(inputjson,(invoiceId)=>{
      //             BillingServices.getBillingById(invoiceId,(billingsData)=>setEstimateData(k => ({ ...k, items: [...formatBillingItem(billingsData.items)] , id: billingsData.id,...formatDiscount(billingsData)})))
      //          });
      //    }else {
      if (!props.apptId) {
        delete inputjson.apptId;
        if (estimateData.id) {
          inputjson.billingId = estimateData.id;
        }
      }
      if (!props.apptId && !estimateData.id) {
        BillingServices.addBillingItem(inputjson, ({ billingId }) => {
          BillingServices.getBillingById(billingId, (billingsData) =>
            setEstimateData((k) => ({
              ...k,
              items: [...formatBillingItem(billingsData.items)],
              id: billingsData.id,
              ...formatDiscount(billingsData),
            })),
          );
        });
      } else {
        BillingServices.addBillingItem(inputjson, updateBillingDetails);
      }
      //}
    }
  };

  // const MicrochipNumber = (tempprops) => {
  //     const [microchip, setMicrochip] = useState(tempprops.microchip);

  //     return <Input placeholder="Enter Microchip #" prefix="#" onBlur={ (e) => {

  //         let inputjson=  {
  //             "patientId" : tempprops.patientId,
  //             "microchip" : microchip
  //         }
  //         PatientServices.updateMicrochipByPatientId(inputjson);
  //     }
  //     } value={microchip} onChange={
  //         (e) => {
  //             let { value } = e.target;
  //             setMicrochip(value)
  //         }
  //      }/>

  // }

  const handleSubmit = (isDrawerOpen) => {
    let { subTotal, total } = BillingUtil.submitTotal(
      estimateData,
      commonContext.defaultBranch.sTaxSFee === true,
    );

    estimateData.items.forEach(function (element) {
      element.patient = {
        id: props.patientId,
      };
      element.price = element.calPrice;
    });

    let inputData = {
      ...estimateData,
      total,
      subTotal,
      client: { id: props.clientId },
      apptId: props.apptId,
    };

    if (props.billingsData?.id) {
      inputData = { ...inputData, id: props.billingsData.id };
    } else {
      inputData = { ...inputData, id: estimateData.id };
    }
    let serviceFee = BillingUtil.calculateServiceFee(estimateData.items);
    let taxedAmount = BillingUtil.calculateTax(
      estimateData.items,
      commonContext.defaultBranch.sTaxSFee === true,
      estimateData.tax,
    );
    inputData.taxTotal = taxedAmount;
    inputData.serviceFee = serviceFee;

    if (!(inputData.statusId === 2 || inputData.statusId === 3)) {
      if (inputData.id || inputData.apptId) {
        let tempInput = { ...inputData };
        delete tempInput.statusId;
        BillingServices.updateBillingById(tempInput);
      }
    }

    if (isDrawerOpen) {
      setPaymentDrawer({
        zeroBalance: !~~total,
        billingsData: {
          ...inputData,
          patientId: props.patientId,
          serviceFee,
          taxedAmount,
        },
      });
    }
  };

  let subTotal = BillingUtil.calculateSubTotal(estimateData.items);
  let isPaid = estimateData.statusId === 3 || estimateData.statusId === 2;
  let isPartialPaid = estimateData.statusId === 2;
  let statusText =
    estimateData.statusId === 3
      ? "PAID"
      : estimateData.statusId === 2
        ? "PARTIAL"
        : estimateData.statusId === 1
          ? "UNPAID"
          : "UNKNOWN";
  // let showItems = [...estimateData.items,...estimateData.items.filter(k=>k.children && k.children.length>0).flatMap(k=>k.children)];
  return (
    <>
      {paymentDrawer && (
        <PaymentDrawer
          isPartialPaid={isPartialPaid}
          inputData={paymentDrawer}
          clientId={props.clientId}
          onRefresh={() => {
            updateBillingDetails();
            props.refreshData(estimateData.id);
          }}
          onClose={() => setPaymentDrawer(false)}
          onSuccess={() => setPaymentDrawer(false)}
        />
      )}
      <Row
        onBlur={(e) => {
          if (unsavedChanges) {
            setTimeout(() => {
              setUnsavedChanges(false);
              handleSubmit(false);
            }, 500);
          }
        }}
      >
        <Col span={24}>
          {props.apptId && (
            <>
              <Row
                justify="space-between"
                className="invoiceTitleArea"
                align="middle"
                gutter={[0, 16]}
              >
                <Col>
                  <Row gutter={[16, 0]} align="middle">
                    <Col>
                      <Title level={5}>Invoice</Title>{" "}
                    </Col>
                    {statusText === "UNKNOWN" ? null : (
                      <Col>
                        <Tag
                          style={{
                            borderRadius: "4px",
                            width: "8em",
                            textAlign: "center",
                            backgroundColor:
                              CommonUtil.STATUS_OBJECT_BG_COLOR[statusText],
                            border:
                              " 1px solid " +
                              CommonUtil.STATUS_OBJECT_COLOR[statusText],
                          }}
                          color={CommonUtil.STATUS_OBJECT_COLOR[statusText]}
                        >
                          <Text
                            style={{
                              color: CommonUtil.STATUS_OBJECT_COLOR[statusText],
                            }}
                          >
                            {statusText}
                          </Text>
                        </Tag>
                      </Col>
                    )}
                  </Row>
                  <Row align="middle">
                    <Col>
                      <Text>Get your client checked out</Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button
                    ghost
                    shape="round"
                    disabled={isPaid}
                    size="small"
                    type="primary"
                    onClick={() => {
                      if (estimateList.length > 0) {
                        setImportEstimate(true);
                      } else {
                        EstimateServices.searchEstimateByPatientId(
                          props.patientId,
                          (data) => {
                            setEstimateList(data);
                            setImportEstimate(true);
                          },
                        );
                      }
                    }}
                  >
                    Import Estimate
                  </Button>
                </Col>
              </Row>
            </>
          )}
          <BillingDetail
            isPaid={isPaid}
            estimateData={estimateData}
            apptId={props.apptId}
            setEstimateData={setEstimateData}
            onAddItemsToBilling={onAddItemsToBilling}
            refreshData={updateBillingDetails}
          />
          <ExtraItemOps
            estimateData={estimateData}
            updateBillingDetails={updateBillingDetails}
            parentProps={props}
          />
          {/* {showItems.some(k => k.type === 1 && !k.declined && !k.isRabies && !k.isMicrochip) &&
                    <><Row justify="space-between" className="labelsSection" align="middle" gutter={[0, 16]}>
                        <Col span={24}>
                        <Row justify="space-between" className="labelsTitleArea" align="middle" gutter={[0, 16]}><Col>
                            <Row align="middle"><Col><Title level={5}>Labels</Title></Col></Row>
                            <Row align="middle"><Col><Text>Get labels for dispensable items</Text></Col></Row>
                            </Col></Row>

                            {showItems.filter(k => k.type === 1 && !k.declined && !k.isRabies && !k.isMicrochip ).map(k =>
                                <Row className="item-label-card" onClick={() => { 
                                    MedicationServices.getMedicationLabelDetailsForPrint(k.inventoryId, props.apptId,props.patientId,(data)=>{
                                        setIsOpenPrintLabel({...data,...k});

                                    })
                                    }} justify="space-between" align="middle">
                                    <Col ><Text>{k.name}</Text>
                                    </Col><Col><Typography.Link>Print</Typography.Link></Col></Row>
                            )}

                        </Col></Row></>}

                        {showItems.some(k => k.isRabies && !k.declined) &&
                    <><Row justify="space-between" className="labelsSection" align="middle" gutter={[0, 16]}>
                        <Col span={24}>
                        <Row justify="space-between" className="labelsTitleArea" align="middle" gutter={[0, 16]}><Col>
                            <Row align="middle"><Col><Title level={5}>Rabies Certificate</Title></Col></Row>
                            <Row align="middle"><Col><Text>Save and Print Rabies Certificate for this Patient</Text></Col></Row>
                            </Col></Row>

                            {showItems.filter(k => k.isRabies && !k.declined).map(k =>

                                <Row className="item-label-card" onClick={()=>setIsRabiesTag({patientId:props.patientId,itemId:k.id,rabiesTag:k.rabiesTag})} justify="space-between" align="middle">
                                    <Col><Text>{k.name}</Text></Col>
                                   
                            <Col><Text >{k.rabiesTag??""}</Text>
                                    <Typography.Link style={{marginLeft:'25px'}}>Print</Typography.Link></Col></Row> //onClick={(e) => {e.stopPropagation();BillingUtil.downloadRabiesCertificate(k.id)}}
                            )}

                        </Col></Row></>}
                        {showItems.some(k => k.isMicrochip && !k.declined) &&
                    <><Row justify="space-between" className="labelsSection" align="middle" gutter={[0, 16]}>
                        <Col span={24}>
                        <Row justify="space-between" className="labelsTitleArea" align="middle" gutter={[0, 16]}><Col>
                            <Row align="middle"><Col><Title level={5}>Microchip</Title></Col></Row>
                            <Row align="middle"><Col><Text>Add Microchip Number to Patient Record</Text></Col></Row>
                            </Col></Row>

                            {showItems.filter(k => k.isMicrochip && !k.declined).map(k =>
                                <Row className="item-label-card" justify="space-between" align="middle">
                                    <Col><Text>Microchip Number</Text>
                            </Col><Col> <MicrochipNumber microchip={k.microchip} patientId={props.patientId}/></Col></Row>
                            )}

                        </Col></Row></>} */}
          <EstimateSummary
            subTotal={subTotal}
            isEstimate={false}
            estimateSummary={estimateData}
            handleSubmit={(value) => {
              handleSubmit(value);
            }}
            isPaid={isPaid}
            isPartialPaid={isPartialPaid}
            setEstimateSummary={setEstimateData}
          />
        </Col>
      </Row>
      {importEstimate && (
        <ImportEstimateModal
          estimateList={estimateList}
          onEstimateClick={(estimateId) => {
            onAddItemsToBilling(estimateId, null);
            setImportEstimate(false);
          }}
          onClose={() => setImportEstimate(false)}
        />
      )}
      {/* {isOpenPrintLabel && <PrintLabelDrawer onClose={() => setIsOpenPrintLabel(null)} 
                itemData={{ ...isOpenPrintLabel, patientName: props.patientName,clientId:props.clientId , apptId: props.apptId,patientId:props.patientId}} />}
            {isRabiesTag && <RabiesTagModal 
                                rabiesTag={isRabiesTag.rabiesTag} 
                                onClose={()=>setIsRabiesTag(null)}
                                onSave={(rabiesTag) => BillingServices.updateRabiesTag(
                                        {
                                            rabiesTag,
                                            "patientId" : isRabiesTag.patientId
                                        },() => {
                                            BillingUtil.downloadRabiesCertificate(isRabiesTag.itemId);
                                            updateBillingDetails();
                                            setIsRabiesTag(null);})}/>} */}
    </>
  );
};

export default BillingsTab;
