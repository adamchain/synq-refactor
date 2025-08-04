import React, { useContext, useState } from "react";
import { Button, Drawer, Typography, Row, Col } from "antd";
import CustomImage from "../generic-components/custom-image/CustomImage";

import EstimateDetail from "./EstimateDetail";
import "../../../src/";
import PriceUtil from "./../util/PriceUtil";
import EstimateServices from "../../services/EstimateServices";
import EstimateSummary from "./EstimateSummary";
import { CommonContext } from "../../context/CommonContext";
import BillingUtil from "./BillingUtil";
import ExtraItemOps from "./ExtraItemOps";

const { Text } = Typography;
const EstimateDrawer = (props) => {
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
    ...props.estimateData,
    items: formatBillingItem(props.estimateData?.items),
    ...formatDiscount(props.estimateData),
  });

  // setEstimateData({statusId:1,name:"",tax: 4.33,priceVariance: 6.2,
  //     discount: 6.1,items:[]});

  const onClose = () => props.onClose();
  const handleSubmit = (submitData) => {
    let { subTotal, total } = BillingUtil.submitTotal(
      estimateData,
      commonContext.defaultBranch.sTaxSFee === true,
    );

    let inputData = { ...estimateData, total, subTotal };
    inputData.items.forEach((k) => {
      if (!k.itemPrice) {
        k.itemPrice = k.originalPrice;
      }
      k.price = k.calPrice;
    });
    //alert(JSON.stringify({...estimateData,total,subTotal}))
    // if(props.id){
    //     EstimateServices.updateEstimate({...estimateData , id : props.id},props.onSuccessReturn);
    // } else {
    if (props.isEdit) {
      EstimateServices.updateEstimate(inputData, props.onSuccess);
    } else {
      EstimateServices.createEstimate(inputData, props.onSuccess);
    }
    // }
  };

  let subTotal = BillingUtil.calculateSubTotal(estimateData.items);
  let isPaid = estimateData.statusId === 3 || estimateData.statusId === 2;
  let isPartialPaid = estimateData.statusId === 2;

  return (
    <Drawer
      className="estimate-drawer"
      title={props.isEdit ? "Edit Estimate" : "Add Estimate"}
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
              onClick={handleSubmit}
              shape="round"
              size="large"
              type="primary"
            >
              {props.isEdit ? "Update" : "Save Estimate"}
            </Button>
          </Col>
        </Row>
      }
    >
      <Row justify="start" align="middle" gutter={[16, 0]}>
        {/* <Col >
                    <CustomImage styling={{
                    width: '65px',
                    height: '65px',
                    showOuterBorder: true,
                    url: `url(`+props.petData?.image+`)`,
                    fullName: '' // pass dynamic full name
                }} /></Col> */}
        <Col>
          <Row>
            <Col>
              <Text className="addEstimateName">
                {props.patientName + " " + props.clientLastName}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text type="secondary">{props.petData?.breedName}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <EstimateDetail
        isPaid={isPaid}
        isEdit={props.isEdit}
        setEstimateData={setEstimateData}
        estimateData={estimateData}
        isEstimate={true}
      />
      <ExtraItemOps
        estimateData={estimateData}
        updateBillingDetails={() => {}}
        parentProps={props}
      />

      <EstimateSummary
        isPaid={isPaid}
        isPartialPaid={isPartialPaid}
        subTotal={subTotal}
        isEstimate={true}
        estimateSummary={estimateData}
        handleSubmit={handleSubmit}
        setEstimateSummary={setEstimateData}
      />
    </Drawer>
  );
};
export default EstimateDrawer;
