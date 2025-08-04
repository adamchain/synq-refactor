import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Typography,
  Image,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import FormComponents from "../generic-components/form-components/FormComponents";
import {
  ApplePaySvg,
  CreditCardSvg,
  GooglePaySvg,
  MoneyBillSvg,
  MoneyCheckDollarSvg,
  WriteInPay,
  SecureLock,
} from "../util/SvgUtil";
import "./Estimate.scss";
import PaymentFormConfig from "./PaymentFormConfig";
import { LeftOutlined, CreditCardOutlined } from "@ant-design/icons";
import PriceUtil from "../util/PriceUtil";
import BillingServices from "../../services/BillingServices";
import SettingsServices from "../../services/SettingsServices";
import { DEVICE_IMAGES } from "../util/DeviceUtil";
import PaymentAnimation from "./PaymentAnimation";
import { CommonContext } from "../../context/CommonContext";
import BillingUtil from "./BillingUtil";
import ClientServices from "../../services/ClientServices";

const { Text, Title } = Typography;

const PAYMENT_OPTIONS = {
  "credit-card": {
    name: "Credit Card",
    paymentType: "Card",
    desc: ["Use any major credit card or bank debit card"],
    icon: <CreditCardSvg customStyle={{ width: "5em" }} />,
  },
  // "manual-credit" : {name:"Manual Credit", desc:["Enter credit card information by hand"], icon:<MoneyCheckDollarSvg customStyle ={{width:"5em"}}/>},
  cash: {
    name: "Cash",
    paymentType: "Cash",
    desc: ["Payment is being made with cash"],
    icon: <MoneyBillSvg customStyle={{ width: "5em" }} />,
  },
  check: {
    name: "Check",
    paymentType: "Check",
    desc: ["Payment is being made with a check"],
    icon: <MoneyCheckDollarSvg customStyle={{ width: "5em" }} />,
  },
  "write-in": {
    name: "Write-In",
    paymentType: "Writein",
    desc: ["No payments system, no problem"],
    icon: <WriteInPay customStyle={{ width: "4.3em" }} />,
  },
};

const OptionCard = ({ inputData, setOpenForm }) => {
  return (
    <Card className="payment-item-card" onClick={setOpenForm}>
      <Row justify="center" align="middle" style={{ marginBottom: "8px" }}>
        <Col>{inputData.icon}</Col>
      </Row>
      <Row justify="center" align="middle" style={{ marginBottom: "8px" }}>
        <Col>
          <Text className="payment-name" strong>
            {inputData.name}
          </Text>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <p
            className="payment-name small-text"
            style={{ textAlign: "center" }}
          >
            {inputData.desc.join("")}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

const CardInput = ({ field }) => {
  return (
    <Col span={field.span}>
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
        size="large"
      >
        <Row justify="center">
          <Col span={15}>
            <Input
              style={{ borderRight: "none" }}
              className="text-default-400"
              prefix={<CreditCardOutlined />}
              placeholder="Card Number"
              type={field.inputType ?? "text"}
            />
          </Col>
          <Col span={5}>
            {" "}
            <Input
              style={{ borderRight: "none", borderLeft: "none" }}
              className="text-default-400"
              placeholder="MM/YY"
              type={"number"}
            />
          </Col>
          <Col span={4}>
            <Input
              style={{ borderLeft: "none" }}
              className="text-default-400"
              placeholder="CVV"
              type={"number"}
            />
          </Col>
        </Row>
      </Form.Item>
    </Col>
  );
};

const ZeroBalance = ({ billingsData, onClose, onSuccess }) => {
  return (
    <>
      <Row style={{ marginTop: "16px", marginBottom: "24px" }}>
        <Col span={24}>
          <Text>
            Your appointment does not have a balace to pay. If this is correct,
            mark the appointment complete below.
          </Text>
        </Col>
      </Row>

      <Row style={{ marginBottom: "24px" }}>
        <Col>
          <Title level={5}>Payment Summary</Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: "16px" }} justify="space-between">
        <Col span={12}>
          <Text>Subtotal:</Text>
        </Col>
        <Col span={12} align="end">
          <Text>{PriceUtil.dollarValue(billingsData.subTotal)}</Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: "16px" }} justify="space-between">
        <Col span={12}>
          <Text>{`Taxes (${billingsData.tax}%)`}</Text>
        </Col>
        <Col span={12} align="end">
          {PriceUtil.dollarValue(
            PriceUtil.discountCalculate(
              PriceUtil.convertFloat(billingsData.subTotal),
              PriceUtil.convertFloat(billingsData.tax),
            ),
          )}
        </Col>
      </Row>
      <Row style={{ marginBottom: "4em" }} justify="space-between">
        <Col span={12}>
          <Title level={5}>Total</Title>
        </Col>
        <Col span={12} align="end">
          <Title level={5}>{billingsData.total}</Title>
        </Col>
      </Row>

      <Row style={{ marginBottom: "16px" }}>
        <Col span={24}>
          <Button
            onClick={onSuccess}
            shape="round"
            size="large"
            type="primary"
            block
          >
            Complete Appointment
          </Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={24}>
          <Button onClick={onClose} shape="round" size="large" block>
            Cancel
          </Button>
        </Col>
      </Row>
    </>
  );
};

const PaySummary = ({
  billingsData: newBillingsData,
  paymentDeviceData,
  onClose,
  cardPayment,
  type,
  isPartialPaid,
  cashDiscount,
  updatePayableAmount,
  disablePay,
}) => {
  const [partialPayment, setPartialPayment] = useState({
    isChecked: false,
    amount: 0.0,
  });
  const [selectedDevice, setSelectedDevice] = useState(
    paymentDeviceData?.fiservPayment?.terminals?.[0]?.hsn,
  );

  let billingsData = { ...newBillingsData };

  if ((type === "cash" || type === "check") && cashDiscount) {
    billingsData.cashDiscount = PriceUtil.discountCalculate(
      billingsData.total,
      cashDiscount,
    );
    billingsData.total = billingsData.total - billingsData.cashDiscount;
  }
  let payableAmount = partialPayment.isChecked
    ? partialPayment.amount
    : isPartialPaid
      ? billingsData.balance
      : billingsData.total;

  useEffect(() => {
    let payamt = partialPayment.isChecked
      ? partialPayment.amount
      : isPartialPaid
        ? billingsData.balance
        : billingsData.total;

    updatePayableAmount(payamt);
  }, [partialPayment]);

  return (
    <Row className="payment-summary">
      <Col span={24}>
        {type === "credit-card" &&
        paymentDeviceData.fiservPayment?.terminals.length > 0 ? (
          <>
            <Row style={{ marginTop: "16px", marginBottom: "16px" }}>
              <Col span={24}>
                <Text> Select the device for this payment</Text>
              </Col>
            </Row>

            {type === "credit-card" &&
              paymentDeviceData.fiservPayment?.terminals?.map((k) => (
                <Row style={{ marginBottom: 16 }}>
                  <Col span={24} onClick={() => setSelectedDevice(k.hsn)}>
                    <Card
                      className="paymentDeviceSelect"
                      style={{
                        cursor: "pointer",
                        ...(k.hsn === selectedDevice
                          ? {
                              borderColor: "#012729",
                              backgroundColor: "#F1F5FA",
                            }
                          : {}),
                      }}
                      title={null}
                    >
                      <Row align="middle" justify="start">
                        <Col span={5} className="deviceImagePaymentCol">
                          <Image
                            className="deviceImagePayment"
                            preview={false}
                            src={
                              DEVICE_IMAGES[
                                Object.keys(DEVICE_IMAGES).find((l) =>
                                  l
                                    .toLowerCase()
                                    .includes(k.deviceType.toLowerCase()),
                                )
                              ]
                            }
                          />
                        </Col>
                        <Col span={17}>
                          <Row>
                            <Col>
                              <Text strong style={{ fontSize: "16px" }}>
                                {k.name}
                              </Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Text strong>{k.deviceType}</Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Text>SN: {k.hsn}</Text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              ))}
          </>
        ) : (
          <Row style={{ marginTop: "16px" }}>
            <Col span={24}></Col>
          </Row>
        )}
        <Row style={{ marginTop: "24px" }} justify="space-between">
          <Col span={18}>
            <Checkbox
              checked={partialPayment.isChecked}
              onChange={(e) => {
                let isChecked = e.target.checked;
                setPartialPayment((k) => ({ ...k, isChecked }));
              }}
              className="partial-payment"
            >
              Partial Payment
            </Checkbox>
          </Col>
          {partialPayment.isChecked && (
            <Col span={6}>
              {
                <FormComponents.CleaveNumber
                  value={partialPayment.amount}
                  field={{ prefix: "$" }}
                  onChange={(amount) =>
                    setPartialPayment((k) => ({ ...k, amount }))
                  }
                />
              }
            </Col>
          )}
        </Row>

        {/* <Row style={{marginBottom:"24px"}}><Col><Title level={5}>Payment Summary</Title></Col></Row> */}
        <Row style={{ marginBottom: "16px" }} justify="space-between">
          <Col span={12}>
            <Text>Subtotal:</Text>
          </Col>
          <Col span={12} align="end">
            <Text>{PriceUtil.dollarValue(billingsData.subTotal)}</Text>
          </Col>
        </Row>

        <Row style={{ marginBottom: "16px" }} justify="space-between">
          <Col span={12}>
            <Text>{`Taxes (${billingsData.tax}%)`}</Text>
          </Col>
          <Col span={12} align="end">
            {PriceUtil.dollarValue(billingsData.taxedAmount)}
          </Col>
        </Row>
        <Row style={{ marginBottom: "16px" }} justify="space-between">
          <Col span={12}>
            <Text>Service Fee:</Text>
          </Col>
          <Col span={12} align="end">
            <Text>{PriceUtil.dollarValue(billingsData.serviceFee)}</Text>
          </Col>
        </Row>
        {(type === "cash" || type === "check") && billingsData.cashDiscount && (
          <Row style={{ marginBottom: "16px" }} justify="space-between">
            <Col span={12}>
              <Text>{`Cash Discounts (${cashDiscount}%)`}</Text>
            </Col>
            <Col
              span={12}
              align="end"
            >{`- ${PriceUtil.dollarValue(billingsData.cashDiscount)}`}</Col>
          </Row>
        )}
        <Row style={{ marginBottom: "16px" }} justify="space-between">
          <Col span={12}>
            <Title level={5}>Total</Title>
          </Col>
          <Col span={12} align="end">
            <Title level={5}>{PriceUtil.dollarValue(billingsData.total)}</Title>
          </Col>
        </Row>
        {isPartialPaid && (
          <Row style={{ marginBottom: "16px" }} justify="space-between">
            <Col span={12}>
              <Title level={5}>Balance Paid</Title>
            </Col>
            <Col span={12} align="end">
              <Title level={5}>
                {PriceUtil.dollarValue(
                  billingsData.total - billingsData.balance,
                )}
              </Title>
            </Col>
          </Row>
        )}
        {partialPayment.isChecked && (
          <Row justify="space-between">
            <Col span={12}>
              <Text strong style={{ color: "red" }} level={5}>
                Remaining
              </Text>
            </Col>
            <Col span={12} align="end">
              <Text strong style={{ color: "red" }}>
                {PriceUtil.dollarValue(
                  (billingsData.balance
                    ? billingsData.balance
                    : billingsData.total) - partialPayment.amount,
                )}
              </Text>
            </Col>
          </Row>
        )}
        <Row style={{ marginTop: "4em" }} className="each-row">
          <Col span={24}>
            <Button
              onClick={() =>
                cardPayment(
                  partialPayment.isChecked ? partialPayment.amount : 0.0,
                  selectedDevice,
                )
              }
              disabled={
                (type === "write-in" && disablePay) ||
                !(parseFloat(payableAmount) > 0.0)
              }
              type="primary"
              block
              shape="round"
              size="large"
            >
              {" "}
              {`Pay ${PriceUtil.dollarValue(payableAmount)}`}
            </Button>
          </Col>
        </Row>
        <Row className="each-row">
          <Col span={24}>
            <Button block shape="round" size="large" onClick={onClose}>
              {" "}
              Cancel
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "24px" }} justify="center">
          <Col align="middle" span={24}>
            <SecureLock className="secureLock" />{" "}
            <Text type="secondary">
              {" "}
              &nbsp; Payments are secured and encrypted
            </Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
const PaymentDrawer = (props) => {
  const context = useContext(CommonContext);

  const [openForm, setOpenForm] = useState({ type: "", data: {} });
  const [paymentDeviceData, setPaymentDeviceData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState({ status: null });
  const [form] = Form.useForm();
  const [tempPayableAmt, setTempPayableAmt] = useState(0);
  const [disablePay, setDisablePay] = useState(true);

  useEffect(() => {
    let changeToBeGiven = form.getFieldValue("cashReceived")
      ? form.getFieldValue("cashReceived") - tempPayableAmt
      : 0;
    form.setFieldsValue({
      changeGiven: changeToBeGiven > 0 ? changeToBeGiven : 0,
    });
  }, [tempPayableAmt]);

  useEffect(() => {
    if (paymentStatus.status === "complete") {
      props.onRefresh();
    }
  }, [paymentStatus.status]);
  const onSuccess = (type) => {
    if (type === "credit-card") {
      setPaymentStatus({ status: "processing" });

      setTimeout(() => {
        setPaymentStatus({ status: "complete" });
      }, 2000);
    } else {
      if (type === "zero") {
        setPaymentStatus({ status: "complete" });
      } else {
        props.onSuccess();
      }
    }
  };
  useEffect(() => {
    SettingsServices.getBranchPaymentSettings((data) => {
      setPaymentDeviceData(data);
    });
    ClientServices.fetchClientById(props.clientId, (data) => {
      let address = "";
      address += data.primary?.address1 ? data.primary?.address1 : "";
      address += data.primary?.address2 ? +" ," + data.primary?.address1 : "";
      form.setFieldsValue({
        firstName: data.primary?.firstName,
        lastName: data.primary?.lastName,
        billingAddress: address,
        state: data.primary?.stateId,
        zip: data.primary?.zipCode,
      });
    });
  }, []);

  useEffect(() => {
    let devices = paymentDeviceData.fiservPayment?.terminals ?? [];
    if (openForm.type === "credit-card" && devices.length === 0) {
      setOpenForm((k) => ({ ...k, type: "write-in" }));
    }
  }, [openForm.type, paymentDeviceData]);

  const zeroPayment = () => {
    let submitData = {
      total: 0.0,
      tax: 0.0,
      discount: 0.0,
      subTotal: 0.0,
    };
    submitData.patientId = props.inputData?.billingsData.patientId;

    if (props.inputData?.billingsData?.apptId) {
      submitData.apptId = props.inputData?.billingsData.apptId;
    }
    if (props.inputData?.billingsData?.id) {
      submitData.billingIds = [props.inputData?.billingsData.id];
    }
    BillingServices.billingPayment(submitData, () => onSuccess("zero"));
  };

  const cardPayment = (partialAmount, hsn) => {
    let billingsData = props.inputData?.billingsData;
    let paymentType = PAYMENT_OPTIONS[openForm.type].paymentType;

    let submitData = {
      total: billingsData?.total,
      tax: billingsData?.tax,
      discount: billingsData?.discount,
      discountType: billingsData?.discountType,
      subTotal: billingsData?.subTotal,
      payment: partialAmount > 0.0 ? partialAmount : billingsData.total,
      paymentType: paymentType,
    };
    if (hsn) submitData.hsn = hsn;

    submitData.patientId = props.inputData?.billingsData.patientId;

    if (props.inputData?.billingsData?.apptId && billingsData.statusId !== 2) {
      submitData.apptId = props.inputData?.billingsData.apptId;
    }
    if (props.inputData?.billingsData?.id) {
      submitData.billingIds = [props.inputData?.billingsData?.id];
    }

    if (["Cash", "Check", "Writein"].includes(paymentType)) {
      let formData = form.getFieldsValue();
      let firstName = formData.firstName;
      let lastName = formData.lastName;
      let depositeDate = formData.depositeDate?.format("YYYY-MM-DD");

      if (paymentType === "Cash") {
        submitData.cash = {
          firstName,
          lastName,
          cashReceived: formData.cashReceived,
          changeGiven: formData.changeGiven,
          depositeDate,
        };
      }
      if (paymentType === "Check") {
        submitData.check = {
          firstName,
          lastName,
          checkNumber: formData.checkNumber,
          depositeDate,
        };
      }
      if (paymentType === "Writein") {
        submitData.writeIn = {
          firstName,
          lastName,
          billingAddress: formData.billingAddress,
          state: formData.state,
          zip: formData.zip,
          cardType: formData.cardType,
        };
      }
    }
    setPaymentStatus({ status: "await" });
    BillingServices.billingPayment(submitData, (data) =>
      data ? onSuccess("credit-card") : setPaymentStatus({ status: "error" }),
    );
  };
  return (
    <Drawer
      id="paymentDrawer"
      className={
        openForm.type === "credit-card"
          ? "payment-drawer credit-card"
          : "payment-drawer"
      }
      title={
        props.inputData.zeroBalance ? (
          "Zero Balance Completion"
        ) : openForm.type ? (
          <>
            <LeftOutlined
              style={{ paddingRight: "15px", fontSize: "0.9em" }}
              onClick={() => {
                if (paymentStatus.status === "error") {
                  setPaymentStatus({ status: null });
                } else {
                  setOpenForm({ type: "", data: {} });
                }
              }}
            />
            {openForm.type === "credit-card"
              ? "Pay by Card Summary"
              : "Payment Details"}{" "}
          </>
        ) : (
          "Payment Options"
        )
      }
      width={492}
      onClose={props.onClose}
      visible={true}
      // footerStyle ={openForm.type?{border:"none",boxShadow:"none"}:{}}
      footer={null}
    >
      {paymentStatus.status ? (
        <>
          <PaymentAnimation
            type={paymentStatus.status}
            onRetry={() => setPaymentStatus({ status: null })}
            paymentType={openForm.type}
          />
          {paymentStatus.status === "complete" && (
            <>
              {/* <Row style={{marginTop:"24px", marginBottom:"16px"}}><Col span={24}><Button onClick={props.onClose} shape="round" size='large' type="primary" block>Mark Patient as Checked Out</Button></Col></Row> */}
              <Row style={{ marginBottom: "16px" }}>
                <Col span={24}>
                  <Button
                    onClick={props.onClose}
                    shape="round"
                    size="large"
                    block
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </>
      ) : (
        <>
          {props.inputData.zeroBalance ? (
            <ZeroBalance
              onClose={props.onClose}
              billingsData={props.inputData.billingsData}
              onSuccess={() => zeroPayment()}
            />
          ) : openForm.type ? (
            openForm.type !== "credit-card" && (
              <>
                <Row
                  style={{ paddingBottom: "15px" }}
                  className={
                    openForm.type === "credit-card" ? "credit-card" : ""
                  }
                >
                  <Col>
                    <Text>Complete checkout by providing payment details</Text>
                  </Col>
                </Row>
                <Form
                  id="payment-form-id"
                  form={form}
                  size="large"
                  onFinish={(values) => {
                    props.onClose();
                  }}
                  onValuesChange={(formValue) => {
                    let key = Object.keys(formValue)[0];
                    if (key === "cashReceived") {
                      let changeToBeGiven = formValue[key] - tempPayableAmt;
                      form.setFieldsValue({
                        changeGiven: changeToBeGiven > 0 ? changeToBeGiven : 0,
                      });
                    }
                    if (key === "cardType") {
                      setDisablePay(false);
                    }
                  }}
                >
                  <Row gutter={[24, 0]}>
                    {PaymentFormConfig(context.allStates)
                      .filter(
                        (k) =>
                          !k.allowFilter ||
                          k.allowFilter.includes(openForm.type),
                      )
                      .map((field) =>
                        field.type === "card" ? (
                          <CardInput field={field} size="large" />
                        ) : (
                          FormComponents.getFormItem(field)
                        ),
                      )}
                  </Row>
                </Form>
              </>
            )
          ) : (
            <Row gutter={[16, 0]}>
              {Object.keys(PAYMENT_OPTIONS)
                .filter((k) => k != "write-in")
                .map((k) => (
                  <Col span={12} style={{ marginBottom: "16px" }}>
                    <OptionCard
                      setOpenForm={() =>
                        setOpenForm((v) => ({ ...v, type: k }))
                      }
                      inputData={PAYMENT_OPTIONS[k]}
                    />
                  </Col>
                ))}
            </Row>
          )}
          {openForm.type && (
            <PaySummary
              disablePay={disablePay}
              updatePayableAmount={(val) => setTempPayableAmt(val)}
              type={openForm.type}
              cardPayment={cardPayment}
              billingsData={props.inputData.billingsData}
              paymentDeviceData={paymentDeviceData}
              onClose={props.onClose}
              cashDiscount={context.defaultBranch?.cachCheckoutDiscount}
              isPartialPaid={props.isPartialPaid}
            />
          )}
        </>
      )}
    </Drawer>
  );
};

export default PaymentDrawer;
