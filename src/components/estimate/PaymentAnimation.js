import { Button } from "antd";
import React from "react";
import "./PaymentAnimation.scss";
const PaymentAnimation = ({ type, onRetry, paymentType }) => {
  let loadingMessage =
    paymentType === "credit-card" ? "Awaiting Card Reader" : "Loading...";

  if (type === "await" || type === "processing") {
    return (
      <div style={{ marginTop: "90px" }} align="center">
        <span className="marker"></span>
        <div
          style={{
            marginTop: "90px",
            color: "rgba(0, 0, 0, 0.7)",
            fontSize: "22px",
          }}
        >
          <span>
            {type === "await" ? loadingMessage : "Processing Payment"}
          </span>
        </div>
      </div>
    );
  } else if (type === "complete") {
    return (
      <>
        <div
          style={{ marginTop: "20px" }}
          align="center"
          className="success-pay-checkmark"
        >
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
        <div align="center" className="paymentStatusText">
          <span>Payment Complete</span>
        </div>
      </>
    );
  } else if (type === "error") {
    return (
      <>
        <div
          style={{ marginTop: "40px" }}
          align="center"
          class="error-x-container"
        >
          <div class="error-x-mark">
            <span class="icon-line line-left"></span>
            <span class="icon-line line-right"></span>
            <div class="error-circle"></div>
          </div>
        </div>
        <div
          align="center"
          style={{ color: "rgba(242, 116, 116, 0.9)", fontSize: "22px" }}
        >
          <span>Payment Error</span>
        </div>
        <div align="center" style={{ marginTop: "32px" }}>
          <Button
            // disabled={!props.subTotal > 0}
            shape="round"
            type="primary"
            size="large"
            block
            onClick={onRetry}
          >
            {"Retry Payment"}
          </Button>
        </div>
      </>
    );
  } else return null;
};

export default PaymentAnimation;
