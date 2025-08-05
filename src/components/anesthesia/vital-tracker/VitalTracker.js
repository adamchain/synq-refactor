import React, { useState, useEffect } from "react";
import AdvancedTable from "../../generic-components/advanced-table/AdvancedTable";
import {
  Row,
  Col,
  Typography,
  Button,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import VitalDrawer from "./VitalDrawer";
import { EditIcon, TrashIcon } from "../../util/SvgUtil";
import "./Vital.scss";
import VitalServices from "../../../services/VitalServices";
import { localToUtc, utcToLocal } from "../../util/TimeUtil";
const { Title } = Typography;
const formColumn = (title, dataIndex) => ({
  title,
  dataIndex,
  render: (text) => text || "-",
});

const VitalTracker = (props) => {
  let statusObject = {
    1: "Induction",
    2: "Before Surgery",
    3: "During Surgery",
    4: "End Surgery",
  };
  const [openVitalDrawer, setOpenVitalDrawer] = useState(null);
  const [vitalTrackerData, setVitalTrackerData] = useState([]);

  useEffect(() => {
    VitalServices.getVitalsByApptId(props.apptId, setVitalTrackerData);
  }, []);

  const submitVitalData = (values) => {
    let clonedValues = { ...values };
    clonedValues.attr = Object.keys(clonedValues.attr)
      .filter((k) => clonedValues.attr[k])
      .map((k) => ({ id: k, value: clonedValues.attr[k] }));
    clonedValues.stTime = localToUtc(clonedValues.stTime).format("HH:mm");
    clonedValues.apptId = props.apptId;
    clonedValues.patientId = props.patientId;

    if (values.id) {
      clonedValues.id = values.id;
      VitalServices.updateVitals(clonedValues, (data) => {
        VitalServices.getVitalsByApptId(props.apptId, setVitalTrackerData);
      });
    } else
      VitalServices.createVitals(clonedValues, (data) => {
        VitalServices.getVitalsByApptId(props.apptId, setVitalTrackerData);
      });
  };

  const columns = [
    {
      ...formColumn("Status", "status"),
      width: 250,
      render: (text) => statusObject[text],
    },
    {
      ...formColumn("Time", "stTime"),
      width: 100,
      render: (text) => utcToLocal(text, "HH:mm A").format("hh:mm A"),
    },
    { ...formColumn("Heart Rate", ["attr", 1]), width: 110 },
    { ...formColumn("SP O2", ["attr", 2]), width: 100 },
    formColumn("BP-SYST", ["attr", 3]),
    formColumn("BP-DIAST", ["attr", 4]),
    formColumn("MAP", ["attr", 5]),
    formColumn("Temp", ["attr", 6]),
    formColumn("IV Fluid Rate", ["attr", 7]),
    formColumn("Gas Level", ["attr", 8]),
    formColumn("Vent Rate", ["attr", 9]),
    { ...formColumn("MM Color", ["attr", 10]), width: 200 },
    formColumn("PI", ["attr", 11]),
    formColumn("PVI", ["attr", 12]),
    formColumn("Mas SP O2", ["attr", 13]),
    formColumn("Doppler", ["attr", 14]),
    formColumn("ETCO2", ["attr", 15]),
    {
      title: "Actions",
      dataIndex: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => {
        return (
          <Row justify="left" align="middle" gutter={[16, 0]}>
            <Col>
              <Typography.Link
                onClick={() =>
                  setOpenVitalDrawer({ isEdit: true, data: record })
                }
              >
                <Tooltip title="Edit">
                  <EditIcon />{" "}
                </Tooltip>
              </Typography.Link>
            </Col>
            <Col>
              <Popconfirm
                title="Are you sure you want to delete this vital?"
                okText="Yes"
                cancelText="No"
                onConfirm={() =>
                  setVitalTrackerData((k) =>
                    [...k].filter((j) => j.id !== record.id),
                  )
                }
              >
                <Typography.Link>
                  <Tooltip title="Delete">
                    <TrashIcon />{" "}
                  </Tooltip>
                </Typography.Link>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
    },
  ];
  return (
    <>
      <Row>
        <Col span={24}>
          <Row
            className="table-title-top"
            justify="space-between"
            align="middle"
            gutter={[0, 16]}
          >
            <Col>
              <Title level={5}>Vital Tracker</Title>
            </Col>
            <Col>
              <Button
                ghost
                shape="round"
                size="small"
                type="primary"
                onClick={() => {
                  setOpenVitalDrawer({ isEdit: false, data: null });
                }}
              >
                Add Vitals
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <AdvancedTable
            id="vital-tracker-table"
            sticky
            columns={columns}
            dataSource={vitalTrackerData}
            scroll={{ x: 2300 }}
            rowKey={"id"}
          />
        </Col>
      </Row>

      {openVitalDrawer && (
        <VitalDrawer
          onAdd={(values) => submitVitalData(values)}
          onEdit={(data) => submitVitalData(data)}
          onClose={() => setOpenVitalDrawer(null)}
          inputData={openVitalDrawer}
        />
      )}
    </>
  );
};

export default VitalTracker;
