import React from "react";
import { Card, Col, Popconfirm, Row, Typography } from "antd";
import { EditIcon, TrashIcon } from "../../util/SvgUtil";
import moment from "moment";
import "./Medication.scss";
import { localMoment, momentLocal } from "../../util/TimeUtil";

const { Text, Link } = Typography;
const MedicationCard = (props) => {
  const routedata = {
    1: "IV (Intravenous)",
    2: "IM (Intramuscular)",
    3: "Oral (Per OS)",
    4: "Subcutaneous",
    5: "Transdermal",
  };

  return (
    <Card bordered={false} className="medication-card">
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <Row>
            <Col>
              <Text strong className="font-size-16">
                {props.input.prodName}
              </Text>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col>
              <Text>Bottle #{props.input.bottle}</Text>
            </Col>
            <Col>
              <Text>Route: {routedata[props.input.route]}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="end" gutter={[16, 0]} align="middle">
            <Col>
              <Row justify="end">
                <Col>
                  <Text strong className="font-size-16">
                    {" "}
                    {props.input.dose} {props.input.doseUnitName}
                  </Text>
                </Col>
              </Row>
              <Row justify="end">
                <Col>
                  <Text>
                    By: Dr. {props.input.by}{" "}
                    {momentLocal(props.input.date).format("MM/DD/YYYY")}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row gutter={[8, 0]} justify="center" align="middle">
                <Col>
                  <Link onClick={props.onEdit}>
                    <EditIcon />
                  </Link>
                </Col>
                <Col>
                  <Popconfirm
                    title="Are you sure you want to delete this medicine?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={props.onDelete}
                  >
                    <Link>
                      <TrashIcon />
                    </Link>
                  </Popconfirm>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default MedicationCard;
