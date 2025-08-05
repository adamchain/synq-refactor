import React, { useContext } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Card,
  Radio,
  Tooltip,
  Popconfirm,
  Modal,
} from "antd";
import {
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import PriceUtil from "../util/PriceUtil";
import BillingUtil from "./BillingUtil";
import { CommonContext } from "../../context/CommonContext";

const { Text } = Typography;
const { confirm } = Modal;

const EstimateSummary = (props) => {
  const commonContext = useContext(CommonContext);

  const onValueChange = (input, dataIndex) => {
    props.setEstimateSummary((k) => ({
      ...k,
      [dataIndex]: PriceUtil.allowfloat(input),
    }));
  };

  const confirmDiscount = (clientDiscountApplied, updateMethod) => {
    if (clientDiscountApplied) {
      confirm({
        title: "Do you want to modify existing client Discount?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        cancelText: "No",
        onOk() {
          updateMethod();
        },
      });
    } else {
      updateMethod();
    }
  };

  const checkIfClientDiscountApplied = () => {
    return (
      props.estimateSummary.client?.discountAmount &&
      props.estimateSummary.discountType ===
        props.estimateSummary.client?.discountType &&
      props.estimateSummary.discount ==
        props.estimateSummary.client?.discountAmount
    );
  };
  let discountValueProps =
    props.estimateSummary.discountType === "$"
      ? { prefix: "$" }
      : { suffix: "%" };
  let clientDiscountApplied = checkIfClientDiscountApplied();
  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Text className="estimateSummaryHeader">
            {props.isEstimate ? "Estimate Summary" : "Invoice Summary"}
          </Text>
          <Row className="subtotalLineItems" gutter={[0, 24]}>
            <Col>
              <Text>
                {props.isEstimate
                  ? "Finalize your estimate"
                  : "Get your finalized invoice"}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row
                className="subtotalLineItems"
                justify="space-between"
                gutter={[0, 16]}
              >
                <Col>
                  <Text>Subtotal</Text>
                </Col>
                <Col>
                  <Text>{PriceUtil.dollarValue(props.subTotal)}</Text>
                </Col>
              </Row>
              <Row
                className="subtotalLineItems"
                justify="space-between"
                gutter={[0, 16]}
              >
                <Col>
                  <Text>Service Fee</Text>
                </Col>
                <Col>
                  <Text>
                    {PriceUtil.dollarValue(
                      BillingUtil.calculateServiceFee(
                        props.estimateSummary.items,
                      ),
                    )}
                  </Text>
                </Col>
              </Row>
              <Row
                className="subtotalLineItems"
                justify="space-between"
                gutter={[0, 16]}
              >
                <Col>
                  <Text>{`Taxes (${props.estimateSummary.tax}%)`}</Text>
                </Col>
                <Col>
                  <Text>
                    {" "}
                    {PriceUtil.dollarValue(
                      BillingUtil.calculateTax(
                        props.estimateSummary.items,
                        commonContext.defaultBranch.sTaxSFee === true,
                        props.estimateSummary.tax,
                      ),
                    )}
                  </Text>
                </Col>
              </Row>
              {props.isEstimate && (
                <Row
                  className="subtotalLineItems"
                  justify="space-between"
                  gutter={[0, 16]}
                >
                  <Col span={16}>
                    <Text>Price Variance </Text>
                    <Tooltip title="Enable a ranged price by adding percentage to the base price">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Col>
                  <Col span={8}>
                    <Input
                      value={props.estimateSummary.priceVariance}
                      onChange={(e) =>
                        onValueChange(e.target.value, "priceVariance")
                      }
                      suffix="%"
                    />
                  </Col>
                </Row>
              )}
              {props.isPartialPaid && (
                <Row
                  className="subtotalLineItems"
                  justify="space-between"
                  gutter={[0, 16]}
                >
                  <Col>
                    <Text>Paid</Text>
                  </Col>
                  <Col>
                    <Text>
                      {PriceUtil.dollarValue(
                        props.estimateSummary.total -
                          props.estimateSummary.balance,
                      )}
                    </Text>
                  </Col>
                </Row>
              )}
              <Row
                className="subtotalLineItems"
                justify="space-between"
                gutter={[0, 16]}
                align="middle"
              >
                <Col span={16}>
                  <Row>
                    <Col>
                      <Text>Discount</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Popconfirm
                        title="Are you sure you want to delete this medicine?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={props.onDelete}
                      >
                        <Radio.Group
                          disabled={props.isPaid}
                          value={props.estimateSummary.discountType}
                          onChange={(e) => {
                            let val = e.target.value;
                            confirmDiscount(clientDiscountApplied, () =>
                              props.setEstimateSummary((k) => ({
                                ...k,
                                discountType: val,
                              })),
                            );
                          }}
                        >
                          <Radio value="$">$ Off</Radio>
                          <Radio value="%"> % Off</Radio>
                        </Radio.Group>
                      </Popconfirm>
                    </Col>
                  </Row>
                  {clientDiscountApplied && (
                    <Row>
                      <Col>
                        <Text>*Client Discount Applied</Text>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col span={8}>
                  <Input
                    {...discountValueProps}
                    value={props.estimateSummary.discount}
                    onChange={(e) => {
                      let val = e.target.value;
                      confirmDiscount(clientDiscountApplied, () =>
                        onValueChange(val, "discount"),
                      );
                    }}
                    disabled={
                      props.isPaid
                        ? true
                        : props.estimateSummary.discountType
                          ? false
                          : true
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Card className="estimateTotalCard" bordered={false}>
            <Row
              style={{ textAlign: "center", paddingBottom: "12px" }}
              gutter={[0]}
            >
              <Col span={24}>
                <Text className="font-size-14">
                  {props.isEstimate
                    ? "Estimate Total"
                    : props.isPartialPaid
                      ? "Remaining"
                      : "Total Due"}
                </Text>
              </Col>
              <Col span={24}>
                {" "}
                <Text strong className="estimateTotalText">
                  {props.isPartialPaid
                    ? PriceUtil.dollarValue(props.estimateSummary.balance)
                    : BillingUtil.calculateTotal(
                        props.isEstimate,
                        props.subTotal,
                        props.estimateSummary,
                        commonContext.defaultBranch.sTaxSFee === true,
                      )}
                </Text>
              </Col>
            </Row>
            {!props.isEstimate && (
              <>
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <Button
                      // disabled={!props.subTotal > 0}
                      shape="round"
                      disabled={props.isPaid && !props.isPartialPaid}
                      size="large"
                      type="primary"
                      block
                      onClick={() => props.handleSubmit(true)}
                    >
                      {props.isPartialPaid
                        ? "Pay"
                        : props.isPaid
                          ? "Paid"
                          : "Checkout"}
                    </Button>
                  </Col>
                  <Col span={24}>
                    <Button
                      disabled={!props.estimateSummary.id}
                      shape="round"
                      size="large"
                      block
                      onClick={() => {
                        props.handleSubmit(false);
                        BillingUtil.downloadInvoice(
                          props.estimateSummary.id,
                          commonContext,
                        );
                      }}
                    >
                      Download Invoice
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EstimateSummary;
