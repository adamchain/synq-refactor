import React, { useContext } from "react";
import {
  Button,
  Col,
  Typography,
  Row,
  Tag,
  Popconfirm,
  Space,
  Tooltip,
} from "antd";

import "./Treatments.scss";
import { useState, useEffect } from "react";
import TreatmentDrawer from "./TreatmentDrawer";
import TreatmentServices from "./../../services/TreatmentServices";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import { TrashIcon, ViewIcon } from "../util/SvgUtil";
import TreatmentViewDrawer from "./TreatmentViewDrawer";
import { momentLocal } from "../util/TimeUtil";
import MedicationServices from "../../services/MedicationServices";
import { CommonContext } from "../../context/CommonContext";
import LabelUtil from "../labels/LabelUtil";
import StaffServices from "../../services/StaffServices";

const { Title, Link, Text } = Typography;

const getTable = (data, type, refreshTreatmentData, onView) => {
  return (
    <AdvancedTable
      locale={{
        emptyText:
          type === "med" ? "No Medication History" : "No Vaccine History",
      }}
      columns={columns(type, refreshTreatmentData, onView)}
      dataSource={data || []}
      pagination={{ defaultPageSize: 6 }}
    />
  );
};
const columns = (type, refreshTreatmentData, onView) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "60%",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Administered",
    dataIndex: "administered",
    key: "administered",
    render: (text) =>
      text ? momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY") : "-",
    width: "20%",
    sorter: (a, b) => {
      return momentLocal(a.administered, "YYYY-MM-DD").diff(
        momentLocal(b.administered, "YYYY-MM-DD"),
      );
    },
  },
  ...(type === "med"
    ? [
        {
          title: "Refills",
          dataIndex: "refillRemaining",
          key: "refillRemaining",
          width: "20%",
          render: (text) => (text ? text : "-"),
        },
      ]
    : []),
  type === "vac"
    ? {
        title: "Expiration",
        dataIndex: "expiry",
        key: "expiry",
        width: "20%",
        defaultSortOrder: "descend",
        sorter: (a, b) => {
          return momentLocal(a.expiry, "YYYY-MM-DD").diff(
            momentLocal(b.expiry, "YYYY-MM-DD"),
          );
        },
        render: (text) => {
          if (text) {
            let expiry = momentLocal(text, "YYYY-MM-DD");
            return (
              <Text
                style={expiry.diff(momentLocal()) < 0 ? { color: "red" } : {}}
              >
                {expiry.format("MM/DD/YYYY")}
              </Text>
            );
          } else return "";
        },
      }
    : {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "20%",
        sorter: true,
        render: (text) => (
          <Tag
            style={{ width: "90px", textAlign: "center" }}
            color={text === "I" ? "red" : "green"}
          >
            {" "}
            {text === "I" ? "Inactive" : "Active"}
          </Tag>
        ),
      },
  {
    title: "Actions",
    width: "25%",
    render: (text, record) => (
      <Row gutter={[12, 0]}>
        <Space size={[12, 16]}>
          <Tooltip title="View Details">
            <Link onClick={() => onView(record)}>
              <ViewIcon />
            </Link>
          </Tooltip>

          <Popconfirm
            title="Are you sure you want to delete this treatment?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              record.type === "vac"
                ? TreatmentServices.deleteVaccine(
                    record.id,
                    refreshTreatmentData,
                  )
                : TreatmentServices.deleteMedication(
                    record.id,
                    refreshTreatmentData,
                  );
            }}
          >
            <Tooltip title="Delete">
              <Link>
                <TrashIcon />
              </Link>
            </Tooltip>
          </Popconfirm>
        </Space>
      </Row>
    ),
  },
];

const TreatmentsTab = (props) => {
  const [openTreatment, setOpenTreatment] = useState(null);
  const [treatmentsData, setTreatmentsData] = useState([]);
  const [viewTreatment, setViewTreatment] = useState(null);
  const context = useContext(CommonContext);
  const refreshTreatmentData = () => {
    if (props.patientId)
      TreatmentServices.getMedicationAndVaccineByPatientId(
        props.patientId,
        setTreatmentsData,
      );
  };
  useEffect(() => {
    if (props.data) {
      setTreatmentsData(props.data);
    }
  }, [props.data]);

  const onViewTreatment = (data, type) => {
    setViewTreatment({ isEdit: true, data, type });
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Row
            justify="space-between"
            className="table-title-top"
            align="middle"
            gutter={[0, 16]}
          >
            <Col>
              <Title level={5}>Vaccines</Title>
            </Col>
            {context.userProfile.permission !== "FD" && (
              <Col>
                <Button
                  className="setWidthTableButtons"
                  ghost
                  shape="round"
                  size="small"
                  type="primary"
                  onClick={() =>
                    setOpenTreatment({
                      isEdit: false,
                      data: null,
                      type: "Vaccine",
                    })
                  }
                >
                  Add Vaccine
                </Button>
              </Col>
            )}
          </Row>
          <Row gutter={[0, 24]} style={{ marginBottom: "36px" }}>
            <Col span={24}>
              {getTable(
                treatmentsData.filter((k) => k.type === "vac"),
                "vac",
                refreshTreatmentData,
                (data) => onViewTreatment(data, "Vaccine"),
              )}
            </Col>
          </Row>
          <Row
            justify="space-between"
            align="middle"
            className="table-title-top"
            gutter={[0, 16]}
          >
            <Col>
              <Title level={5}>Medications</Title>
            </Col>
            {context.userProfile.permission !== "FD" && (
              <Col>
                <Button
                  className="setWidthTableButtons"
                  ghost
                  shape="round"
                  size="small"
                  type="primary"
                  onClick={() =>
                    setOpenTreatment({
                      isEdit: false,
                      data: null,
                      type: "Medication",
                    })
                  }
                >
                  Add Medication
                </Button>
              </Col>
            )}
          </Row>
          <Row>
            <Col span={24}>
              {getTable(
                treatmentsData.filter(
                  (k) =>
                    k.type === "med" &&
                    !k.name.toLowerCase().includes("microchip"),
                ),
                "med",
                refreshTreatmentData,
                (data) => onViewTreatment(data, "Medication"),
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {openTreatment && (
        <TreatmentDrawer
          inputData={{
            ...openTreatment,
            patientId: props.patientId,
            apptId: props.apptId,
          }}
          onClose={() => setOpenTreatment(null)}
          onSuccess={refreshTreatmentData}
        />
      )}
      {viewTreatment && (
        <TreatmentViewDrawer
          inputData={{
            ...viewTreatment,
            patientId: props.patientId,
            apptId: props.apptId,
          }}
          onClose={() => {
            setViewTreatment(null);
            refreshTreatmentData();
          }}
          onPrintLabel={(id) => {
            MedicationServices.getMedicationLabelDetails(id, (data) => {
              StaffServices.fetchStaffById(id.providerid, (v) => {
                let providerName = "Dr." + v.firstName + " " + v.lastName;
                LabelUtil.printLabel(
                  data,
                  props.patientName,
                  providerName,
                  context,
                );
              });
            });
            setViewTreatment(null);
          }}
        />
      )}
    </>
  );
};

export default TreatmentsTab;
