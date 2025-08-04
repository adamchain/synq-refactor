import { Col, Collapse, Row, Tag, Typography } from "antd";
import React from "react";
import { CommonContext } from "../../context/CommonContext";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import CommonUtil from "../util/CommonUtil";
import { AptHistoryEmpty } from "../util/EmptySvgUtil";
import { momentLocal } from "../util/TimeUtil";
import AppointmentDetailsFormConfig from "./Config";
import { FORM_FIELDS } from "./Constant";
import { getGridSpan, getHistoryValue } from "./Shared";

const { Text, Link } = Typography;
const { Panel } = Collapse;
const { Title } = Typography;

const ServicesTable = ({ services = [] }) => {
  // let data = [{name:"Vetropolycin Ophth Ointment 1/8 Oz",qty:1,status:"APPROVED"},{name:"Enrofloxacin Tabs 136mg",qty:28,status:"DECLINED"}];
  let columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Qty", dataIndex: "qty" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        return (
          <Tag
            style={{
              borderRadius: "4px",
              width: "8em",
              textAlign: "center",
              backgroundColor:
                CommonUtil.STATUS_OBJECT_BG_COLOR[text.toUpperCase()],
              border:
                " 1px solid " +
                CommonUtil.STATUS_OBJECT_COLOR[text.toUpperCase()],
            }}
            color={CommonUtil.STATUS_OBJECT_COLOR[text.toUpperCase()]}
          >
            <Text
              style={{
                color: CommonUtil.STATUS_OBJECT_COLOR[text.toUpperCase()],
              }}
            >
              {text.toUpperCase()}
            </Text>
          </Tag>
        );
      },
    },
  ];
  return <AdvancedTable dataSource={services} columns={columns} />;
};
class AppointmentDetailsHistoryPage extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         data: this.props.historyData
  //     }
  // }

  static contextType = CommonContext;
  state = {
    data: this.props.historyData,
  };

  customExpandIcon(props) {
    return (
      <Row>
        <Col>
          <a>
            <Link className="text-primary-500">
              {props.isActive ? "View Less" : "View More"}
            </Link>
          </a>
        </Col>
      </Row>
    );
  }
  identifyStatusColor(value) {
    let textcolor = "black";
    if (value === "Normal") {
      textcolor = "green";
    } else if (value === "Abnormal") {
      textcolor = "red";
    }
    return (
      <Text style={{ color: textcolor }} strong>
        {value}
      </Text>
    );
  }

  render() {
    const { data } = this.state;
    let defaultKey = this.props.historyData.findIndex(
      (k) => k.apptId === this.props.apptId,
    );

    return (
      <Row>
        <Col span={24} className="appointment-tabs-title table-title-top">
          <Title level={5} style={{ lineHeight: "40px" }}>
            Appointment History
          </Title>
        </Col>
        <Col span={24}>
          {this.props.historyData && this.props.historyData.length > 0 ? (
            <Collapse
              accordion
              defaultActiveKey={defaultKey}
              bordered={false}
              ghost={true}
              expandIconPosition={"right"}
              expandIcon={(props) => this.customExpandIcon(props)}
            >
              {this.props.historyData.map((history, index) => {
                return (
                  <Panel
                    className="tab-header"
                    header={
                      <Col>
                        <div className="soapHistoryDate">
                          {momentLocal(
                            history.date,
                            "YYYY-MM-DDTHH:mm:ss",
                          ).format("LL")}
                        </div>
                        <div
                          className="text-secondary-400"
                          style={{
                            fontWeight: "400",
                            fontSize: "12px",
                          }}
                        >
                          Type:
                          <span
                            className="text-secondary-400"
                            style={{
                              fontWeight: "400",
                              fontSize: "12px",
                            }}
                          >
                            {history.type === "F"
                              ? " Full SOAP"
                              : " Quick SOAP"}
                          </span>
                        </div>
                      </Col>
                    }
                    showArrow={true}
                    extra={
                      <Row gutter={[20, 0]}>
                        <Col>
                          <Tag
                            style={{
                              borderRadius: "50px",
                              width: "105px",
                              textAlign: "center",
                              backgroundColor:
                                CommonUtil.STATUS_OBJECT_BG_COLOR[
                                  history.apptType?.toUpperCase() ?? "MIGRATED"
                                ],
                              border:
                                " 1px solid " +
                                CommonUtil.STATUS_OBJECT_COLOR[
                                  history.apptType?.toUpperCase() ?? "MIGRATED"
                                ],
                            }}
                            color={
                              CommonUtil.STATUS_OBJECT_COLOR[
                                history.apptType?.toUpperCase() ?? "MIGRATED"
                              ]
                            }
                          >
                            <Text
                              style={{
                                color:
                                  CommonUtil.STATUS_OBJECT_COLOR[
                                    history.apptType?.toUpperCase() ??
                                      "MIGRATED"
                                  ],
                              }}
                            >
                              {history.apptType?.toUpperCase() ?? "MIGRATED"}
                            </Text>
                          </Tag>
                        </Col>
                        <Col>
                          <div className="text-default-400 doctor-name">
                            <Text type="secondary">
                              {" "}
                              {history.providerDoctor ? "Dr." : " "}{" "}
                              {history.provider ? history.provider : "Unknown"}
                            </Text>
                          </div>
                        </Col>
                      </Row>
                    }
                    key={index + 1}
                  >
                    <Text style={{ fontSize: "16px" }} strong>
                      Exam Details
                    </Text>

                    {AppointmentDetailsFormConfig(
                      this.context.defaultBranch.branchTypeId,
                    )
                      .filter((k) =>
                        history.apptType?.toUpperCase() === "OTHER" ||
                        history.apptType?.toUpperCase() === "OTHERS"
                          ? k.mainLabel === "Services"
                          : true,
                      )
                      .filter(
                        (k) =>
                          (k.mainLabel === "Surgery Notes" &&
                            history.surgeryNote) ||
                          k.mainLabel !== "Surgery Notes",
                      )
                      .map((config) => {
                        return (
                          <>
                            <Row className="soap-exam" hidden={config.hidden}>
                              <Col className="main-icon" hidden={config.hidden}>
                                {config.maninIcon}
                              </Col>
                              <Col>
                                <Text
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    paddingLeft: 12,
                                  }}
                                >
                                  {config.mainLabel}
                                </Text>
                              </Col>
                            </Row>
                            <Row
                              className="aptHistorySoapDetails"
                              hidden={config.hidden}
                            >
                              {config.formFields.map((field, index) => {
                                if (field.label === "services") {
                                  return (
                                    <Col span={24} hidden={field.hidden}>
                                      <ServicesTable
                                        services={history.services}
                                      />
                                    </Col>
                                  );
                                } else if (
                                  field.label !== "Weight Unit" &&
                                  field.label !== "Weight Estimated?" &&
                                  field.label !== "Temperature Unit" &&
                                  !field.label.includes("Status")
                                ) {
                                  return (
                                    <Col
                                      hidden={field.hidden}
                                      span={getGridSpan(
                                        config,
                                        index,
                                        "history",
                                      )}
                                      offset={
                                        index === 15 &&
                                        config.mainLabel === FORM_FIELDS.VITALS
                                          ? "8"
                                          : config.mainLabel ===
                                              FORM_FIELDS.OBJECTIVE
                                            ? ""
                                            : ""
                                      }
                                      pull={
                                        index >= 15 &&
                                        config.mainLabel === FORM_FIELDS.VITALS
                                          ? "8"
                                          : config.mainLabel ===
                                              FORM_FIELDS.OBJECTIVE
                                            ? ""
                                            : ""
                                      }
                                      className="history-list"
                                    >
                                      <Row className="aptHistoryInLabels">
                                        <Col span={24}>
                                          {config.mainLabel !==
                                            FORM_FIELDS.ASSESSMENT &&
                                            config.mainLabel !==
                                              FORM_FIELDS.SUBJECTIVE &&
                                            config.mainLabel !==
                                              FORM_FIELDS.PLAN &&
                                            config.mainLabel !==
                                              "Surgery Notes" && (
                                              <Text strong>{field.label}</Text>
                                            )}
                                          <div className="status-text-align">
                                            {config.mainLabel ===
                                              FORM_FIELDS.OBJECTIVE && (
                                              <span>
                                                <Text strong>Status: </Text>
                                                <span>
                                                  {this.identifyStatusColor(
                                                    config.mainLabel ===
                                                      FORM_FIELDS.OBJECTIVE &&
                                                      config.formFields[
                                                        index + 1
                                                      ]?.label?.includes(
                                                        "Status",
                                                      )
                                                      ? getHistoryValue(
                                                          history,
                                                          config.formFields[
                                                            index + 1
                                                          ],
                                                        )
                                                      : "-",
                                                  )}
                                                </span>
                                              </span>
                                            )}
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row style={{ paddingBottom: 24 }}>
                                        <Col span={24}>
                                          <Text type="secondary">
                                            {getHistoryValue(history, field)}
                                          </Text>
                                        </Col>
                                      </Row>
                                    </Col>
                                  );
                                }
                              })}
                            </Row>
                          </>
                        );
                      })}
                  </Panel>
                );
              })}
            </Collapse>
          ) : (
            <div style={{ padding: "2em" }}>
              <Row justify="center" align="middle">
                <Col>
                  <AptHistoryEmpty />
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col>
                  <Text className="empty-text">No Appointment History</Text>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

export default AppointmentDetailsHistoryPage;
