import React, { Fragment, useEffect } from "react";
import { Row, Col, Typography, Card, Button, Divider } from "antd";
import "./PrintLabelPreview.scss";
import { PrinterOutlined } from "@ant-design/icons";

import { momentLocal } from "../util/TimeUtil";
import NewPrintLabelHtml from "./NewPrintLabelHtml";
const { Text } = Typography;

const labelDataTemp = {
  // companyName:"Trusted Friend Animal Clinic",
  // addressLine:"5975 Roswell Rd.,Ste C309, Sandy Springs, GA 30328 - (404) 907 1404",
  // patientName: "Archer (Canine)",
  dateFilled: momentLocal().format("MM/DD/YYYY"),
  quantity: 1,
  // refillExpirationDate:momentLocal().format("MM/DD/YYYY"),
  // lotNumber:"",
  // dispensableName:"Simplicef Tablet 100mg",
  // rxInstructions:"Test Test",
  // veterinarian:"Dr.Carla Polite,D.V.M",
  // refills:0,
  // rxNumber: 20410,
  extra: "Keep out of reach of children - for veterinary use only",
};

// const SingleRow = (props)=>{
//     return(<Row justify={props.customJustify?props.customJustify:"start"}><Col span={props.customSpan?props.customSpan:24}>{props.value}</Col></Row>);
// }

// const formattedDate = () => {
//     const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//     let current_datetime = new Date()
//     let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
//     return formatted_date;
// }
const PrintLabelPreview = (props) => {
  let labelData = {
    ...labelDataTemp,
    ...JSON.parse(localStorage.getItem("whskr-print-label")),
  };
  document.title = "Label_Med"; //TODO hardcoded lable title
  useEffect(() => {
    setTimeout(() => window.print(), 2000);
  }, []);

  const allReplace = (str, obj) => {
    let invoiceData = {
      "##companyName": obj.companyName,
      "##addressLine": obj.addressLine,
      "##mobile": obj.mobile,
      "##patientName": obj.patientName,
      "##doctorName": obj.doctorName,
      "##clientAddress": obj.clientAddress,
      "##dateFilled": obj.dateFilled,
      "##quantity": obj.quantity,
      "##refillExpirationDate": obj.refillExpirationDate,
      "##lotNumber": obj.lotNumber,
      "##dispensableName": obj.dispensableName,
      "##rxInstructions": obj.rxInstructions,
      "##veterinarian": obj.veterinarian,
      "##refills": obj.refills,
      "##rxNumber": obj.rxNumber,
      "##animalFamily": obj.animalFamily ? "(" + obj.animalFamily + ")" : "",
      "##clientName": obj.clientName,
      "##extra": obj.extra?.toUpperCase(),
    };

    for (let x in invoiceData) {
      str = str.replaceAll(x, invoiceData[x]);
    }
    return str;
  };
  //let tempHtml = ClientEmailHtml.getHtml();

  let tempHtml = allReplace(NewPrintLabelHtml.getHtml(), labelData);

  return (
    <div
      className="estimate-preview"
      dangerouslySetInnerHTML={{ __html: tempHtml }}
    />
  );

  //     return ( <Fragment>
  //         <Card  id="print-lable-preview-card"  className = "print-view" style={{width:"530px"}}>

  //         <Row align="middle" justify="center"><Col><Text strong>{labelData.companyName??""}</Text></Col></Row>
  //         <Row align="middle" justify="center"><Col><Typography.Paragraph style={{margin:0,textAlign:"center"}} strong>{labelData.addressLine??""}</Typography.Paragraph></Col></Row>
  //         <Row align="middle" justify="center"><Col><Text style={{margin:0,textAlign:"center"}} strong>{labelData.mobile??""}</Text></Col></Row>

  //         <Divider style={{margin:0,borderTopWidth:'5px',borderColor:"black"}}/>
  //         <Row justify="space-between">
  //         <Col span={12}>
  //         <Row align="middle"><Col><Text>{labelData.patientName??""}</Text></Col></Row>
  //         </Col>
  //         <Col span={12}>
  //         <Row align="middle"><Col><Text>{labelData.doctorName??""}</Text></Col></Row>
  //         <Row align="middle"><Col><Text>{labelData.clientAddress??""}</Text></Col></Row>
  // </Col>
  //         </Row>
  //         <Row justify="space-between">
  //         <Col span={12}>
  //         <Row align="middle"><Col><Text>Date Filled: {labelData.dateFilled??""}</Text></Col></Row>
  //         </Col>
  //         <Col span={12}>
  //         <Row align="middle"><Col><Text>Qty: {labelData.quantity??""}</Text></Col></Row>
  // </Col>
  //         </Row>
  //         <Row justify="space-between">
  //         <Col span={12}>
  //         <Row align="middle"><Col><Text>Exp: {labelData.refillExpirationDate??""}</Text></Col></Row>
  //         </Col>
  //         <Col span={12}>
  //         <Row align="middle"><Col><Text>Lot: {labelData.lotNumber??""}</Text></Col></Row>
  // </Col>
  //         </Row>
  //         <Divider style={{margin:0,borderTopWidth:'5px',borderColor:"black"}}/>
  //         <Row align="middle" justify="start"><Col><Text >{labelData.dispensableName??""}</Text></Col></Row>
  //         <Row align="middle" justify="start"><Col><Text >{labelData.rxInstructions??""}</Text></Col></Row>
  //         <Row align="middle" justify="start"><Col><Text >{labelData.veterinarian}</Text></Col></Row>
  //         <Divider style={{margin:0,borderTopWidth:'5px',borderColor:"black"}}/>
  //         <Row justify="space-between">
  //         <Col span={12}>
  //         <Row align="middle"><Col><Text>Refills: {labelData.refills??""}</Text></Col></Row>
  //         </Col>
  //         <Col span={12}>
  //         <Row align="middle"><Col><Text>Rx Number: {labelData.rxNumber??""}</Text></Col></Row>
  // </Col>
  //         </Row>
  //         <Divider style={{margin:0,borderTopWidth:'5px',borderColor:"black"}}/>
  //         <Row align="middle" justify="start"><Col><Text strong >{labelData.extra?.toUpperCase()}</Text></Col></Row>
  //         <Divider style={{margin:0,borderTopWidth:'5px',borderColor:"black"}}/>

  //     <Button type="primary" size="large" onClick = {()=>window.print()} style={{float:"right",marginTop:"10px"}} className="no-print-view"  icon={<PrinterOutlined />} >Print</Button>

  // </Card>
  // </Fragment>
  //     );
};

export default PrintLabelPreview;
