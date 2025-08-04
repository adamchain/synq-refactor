import React from "react";
import { Col, Row, Card, Typography, Button, Modal } from "antd";

import {
  CalendarPlusIcon,
  UserPlusIcon,
  BlockOutIcon,
  NewInvoiceIcon,
  HomeIcon,
  TaskPlusIcon,
} from "../../util/SvgUtil";

import "./AnyCreateModal.scss";
const { Text } = Typography;

const AnyCreateModal = (props) => {
  return (
    <Modal
      visible={true}
      onCancel={() => props.onClose(false)}
      title={props.isCalendar ? "New Event" : "Create New"}
      className="any-create-modal"
      footer={null}
    >
      {props.isCalendar && (
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            What type of event are you trying to add to the calendar{" "}
          </Col>
        </Row>
      )}
      <Row
        justify="center"
        align="middle"
        className="createNewModalBody"
        gutter={[16, 16]}
      >
        <Col
          onClick={() => props.onButtonClick("appointment")}
          className="any-create-button"
          span={12}
        >
          <Card style={{ padding: "10px" }}>
            <Row justify="center" align="middle">
              <Col style={{ marginBottom: "4px" }}>
                <CalendarPlusIcon customStyle={{ height: "37px" }} />
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Col>
                <Text className="any-create-button-text">Appointment</Text>
              </Col>
            </Row>
          </Card>
        </Col>
        {!props.isCalendar && (
          <Col
            onClick={() => props.onButtonClick("client")}
            className="any-create-button"
            span={12}
          >
            <Card style={{ padding: "10px" }}>
              <Row justify="center" align="middle">
                <Col style={{ marginBottom: "4px" }}>
                  <UserPlusIcon customStyle={{ height: "37px" }} />
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Text className="any-create-button-text">Client</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
        {/* {!props.isCalendar && <Col onClick = {()=>props.onButtonClick("reminder")} className="any-create-button" span={12}><Card style={{padding:'10px'}}><Row justify="center" align="middle"><Col style={{marginBottom:'4px'}}><TaskPlusIcon customStyle={{height:"37px"}}/></Col></Row><Row justify="center" align="middle"><Col><Text className="any-create-button-text">Reminder</Text></Col></Row></Card></Col>} */}
        {!props.isCalendar && (
          <Col
            onClick={() => props.onButtonClick("invoice")}
            className="any-create-button"
            span={12}
          >
            <Card style={{ padding: "10px" }}>
              <Row justify="center" align="middle">
                <Col style={{ marginBottom: "4px" }}>
                  <NewInvoiceIcon customStyle={{ height: "37px" }} />
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Text className="any-create-button-text">Invoice</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
        {/* <Col onClick = {()=>props.onButtonClick("boarding")} className="any-create-button" span={12}><Card style={{padding:'10px'}}><Row justify="center" align="middle"><Col style={{marginBottom:'4px'}}><TaskPlusIcon customStyle={{height:"37px"}}/></Col></Row><Row justify="center" align="middle"><Col><Text className="any-create-button-text">Boarding</Text></Col></Row></Card></Col> */}

        <Col
          className="any-create-button"
          onClick={() => props.onButtonClick("block-off")}
          span={12}
        >
          <Card style={{ padding: "10px" }}>
            <Row justify="center" align="middle">
              <Col style={{ marginBottom: "4px" }}>
                <BlockOutIcon customStyle={{ height: "37px" }} />
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Col>
                <Text className="any-create-button-text">Block Off</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button shape="round" onClick={() => props.onClose(false)} block>
            Cancel
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default AnyCreateModal;
