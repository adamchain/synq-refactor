import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import "./EstimatePreview.scss";
import { PrinterOutlined } from "@ant-design/icons";

import EstimateEmailContent from "./EstimateEmailContent";
import EstimateServices from "../../../services/EstimateServices";
import BillingUtil from "../BillingUtil";
import BillingServices from "../../../services/BillingServices";

const EstimatePreview = (props) => {
  // const [previewData,setPreviewData] = useState({});
  let previewData = JSON.parse(
    localStorage.getItem(
      props.isEstimate ? "whskr-print-estimate" : "whskr-print-invoice",
    ),
  );
  document.title =
    (props.isEstimate ? "ESTIMATE_" : "INVOICE_") + previewData.id;
  useEffect(() => {
    //     if(props.isEstimate){
    //        EstimateServices.getEstimateById(props.uniqueId,(data)=>{
    //         setPreviewData(data);
    //        })
    //     }else {
    //         BillingServices.getBillingById(props.uniqueId,(data)=>{
    //             setPreviewData(data);
    //         })
    //     }
    setTimeout(() => window.print(), 1000);
  }, []);

  return (
    <>
      <EstimateEmailContent
        isEstimate={props.isEstimate}
        previewData={{ ...previewData }}
      />
      {/* <Button type="primary" size="large" onClick = {()=>window.print()} style={{float:"right",marginTop:"10px"}} className="no-print-view"  icon={<PrinterOutlined />} >Print</Button> */}
    </>
  );
};

export default EstimatePreview;
