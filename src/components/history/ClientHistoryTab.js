import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Typography,
  DatePicker,
  Radio,
  Tag,
  Button,
  Select,
  Space,
  Popconfirm,
  Tooltip,
} from "antd";
import "./History.scss";
import CommonUtil from "./../util/CommonUtil";
import { EditIcon, TrashIcon, DownloadIcon } from "../util/SvgUtil";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import HistoryServices from "./../../services/HistoryServices";
import BillingServices from "./../../services/BillingServices";
import PriceUtil from "./../util/PriceUtil";
import NotesModal from "./NotesModal";
import { localToUtc, momentLocal } from "../util/TimeUtil";
import NoteServices from "../../services/NoteServices";
import PatientServices from "../../services/PatientServices";
import CommunicationModal from "./CommunicationModal";
import BillingUtil from "../estimate/BillingUtil";
import { CommonContext } from "../../context/CommonContext";
import { CSVLink } from "react-csv";
import AppointmentServices from "../../services/AppointmentServices";

const { Title, Text, Link } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ClientHistoryTab = (props) => {
  const [historyType, setHistoryType] = useState("Appointments");
  const [historyData, setHistoryData] = useState({
    Appointments: [],
    Communications: [],
    Billing: [],
    Notes: [],
  });
  const [apptServices, setApptServices] = useState({});
  const [isNotesModalVisible, setIsNotesModalVisible] = useState(false);
  const [extraData, setExtraData] = useState({ type: "", data: null });
  const [patientDetails, setPatientDetails] = useState([]);
  const commonContext = useContext(CommonContext);

  const showModal = () => {
    setIsNotesModalVisible(true);
  };

  const saveCommunications = (data) => {
    HistoryServices.saveCommunicationsHistory(
      { ...data, clientId: props.clientId },
      () => getCommHistory(),
    );
  };
  const getCommById = (id) => {
    HistoryServices.getCommunicationsHistoryByCommId(id, (data) => {
      setExtraData({ type: "Communications", data: { ...data, isEdit: true } });
    });
  };

  const editCommunications = (data) => {
    HistoryServices.editCommunicationsHistory(
      { ...data, clientId: props.clientId },
      () => getCommHistory(),
    );
  };

  const deleteCommunications = (id) => {
    HistoryServices.deleteCommunicationsHistory(id, () => getCommHistory());
  };

  const saveNotes = (data) => {
    NoteServices.createNote({ ...data, clientId: props.clientId }, () =>
      getAllNotes(),
    );
  };

  const editNotes = (data) => {
    NoteServices.updateNote({ ...data, clientId: props.clientId }, () =>
      getAllNotes(),
    );
  };
  const deleteNotes = (data) => {
    NoteServices.deleteNotes({ ...data, clientId: props.clientId }, () =>
      getAllNotes(),
    );
  };

  const getAllNotes = (url = "") => {
    NoteServices.getNoteByClientId(url, props.clientId, (data) => {
      setHistoryData((k) => ({ ...k, Notes: data }));
    });
  };

  const getApptHistory = (url = "") => {
    HistoryServices.getAppointmentHistoryByClientId(
      url,
      props.clientId,
      (data) => {
        setHistoryData((k) => ({ ...k, Appointments: data }));
      },
    );
  };

  const getBillingHistory = (url = "") => {
    HistoryServices.getBillingHistoryByClientId(url, props.clientId, (data) => {
      setHistoryData((k) => ({ ...k, Billing: data }));
    });
  };

  const getCommHistory = (url = "") => {
    HistoryServices.getCommunicationsHistoryByClientId(
      url,
      props.clientId,
      (data) => {
        setHistoryData((k) => ({ ...k, Communications: data }));
      },
    );
  };

  useEffect(() => {
    getApptHistory();
    // HistoryServices.getAppointmentHistoryByClientId(props.clientId,(data)=>{setHistoryData(k=>({...k,"Appointments":data}))});
    // HistoryServices.getBillingHistoryByClientId(props.clientId,(data)=>{setHistoryData(k=>({...k,"Billing":data}))});
    // HistoryServices.getCommunicationsHistoryByClientId(props.clientId,(data)=>{setHistoryData(k=>({...k,"Communications":data}))});
    // getAllNotes();
    PatientServices.fetchAllPatients((data) => setPatientDetails(data));
  }, [props.clientId]);

  useEffect(() => {
    switch (historyType) {
      case "Appointments":
        getApptHistory();
        break;
      case "Communications":
        getCommHistory();
        break;
      case "Billing":
        getBillingHistory();
        break;
      case "Notes":
        getAllNotes();
        break;
    }
  }, [historyType]);

  const tabActions = (type, downloadData) => {
    switch (type) {
      case "Appointments":
        return (
          <Row style={{ marginBottom: "24px" }} justify="space-between">
            <Col>
              <RangePicker
                key={type}
                onChange={(k) =>
                  k
                    ? getApptHistory(
                        "?stDate=" +
                          localToUtc(k[0]).format("YYYY-MM-DD") +
                          "&endDate=" +
                          localToUtc(k[1]).format("YYYY-MM-DD"),
                      )
                    : getApptHistory()
                }
                format="MM/DD/YYYY"
              />
            </Col>
            <Col>
              {" "}
              <Button
                className="setWidthTableButtons"
                ghost
                shape="round"
                size="small"
                type="primary"
                disabled={historyData[historyType].length === 0}
              >
                <CSVLink
                  filename={"AppointmentHistoryReport.csv"}
                  data={downloadData.map((k) => ({
                    Date: k.date.format("MM/DD/YYYY"),
                    Type: k.type,
                    Provider: k.provider,
                    Status: k.status,
                  }))}
                >
                  Download
                </CSVLink>
              </Button>
            </Col>
          </Row>
        );
      case "Communications":
        return (
          <Row style={{ marginBottom: "24px" }} justify="space-between">
            <Col>
              <RangePicker
                key={type}
                onChange={(k) =>
                  k
                    ? getCommHistory(
                        "?stDate=" +
                          localToUtc(k[0]).format("YYYY-MM-DD") +
                          "&endDate=" +
                          localToUtc(k[1]).format("YYYY-MM-DD"),
                      )
                    : getCommHistory()
                }
                format="MM/DD/YYYY"
              />
            </Col>
            <Col>
              {" "}
              <Button
                onClick={() => {
                  setExtraData({
                    type: "Communications",
                    data: { clientId: props.clientId, isEdit: false },
                  });
                }}
                className="setWidthTableButtons"
                ghost
                shape="round"
                size="small"
                type="primary"
              >
                Add Communication
              </Button>
            </Col>
          </Row>
        );
      case "Billing":
        return (
          <Row style={{ marginBottom: "24px" }} justify="space-between">
            <Col>
              <RangePicker
                key={type}
                onChange={(k) =>
                  k
                    ? getBillingHistory(
                        "?stDate=" +
                          localToUtc(k[0]).format("YYYY-MM-DD") +
                          "&endDate=" +
                          localToUtc(k[1]).format("YYYY-MM-DD"),
                      )
                    : getBillingHistory()
                }
                format="MM/DD/YYYY"
              />
            </Col>
          </Row>
        );
      case "Notes":
        return (
          <Row justify="space-between" style={{ marginBottom: "24px" }}>
            <Col>
              <RangePicker
                key={type}
                format="MM/DD/YYYY"
                onChange={(k) =>
                  k
                    ? getAllNotes(
                        "?stDate=" +
                          localToUtc(k[0]).format("YYYY-MM-DD") +
                          "&endDate=" +
                          localToUtc(k[1]).format("YYYY-MM-DD"),
                      )
                    : getAllNotes()
                }
              />
            </Col>
            <Col>
              <Button
                className="setWidthTableButtons"
                ghost
                shape="round"
                size="small"
                type="primary"
                onClick={showModal}
              >
                Add Note
              </Button>
            </Col>
          </Row>
        );
    }
  };

  const getApptServices = (apptId, notes) => {
    BillingServices.getBillingForAppointment(apptId, (data) =>
      setApptServices((k) => ({
        ...k,
        [apptId]: [...(data.items ?? []), notes],
      })),
    );
  };
  const SERVICE_TYPE = {
    1: "Inventory",
    2: "Procedure",
    3: "Internal Lab",
    4: "External Lab",
    5: "Package",
    99: "Notes",
  };

  const apointmentSecondaryColumns = [
    {
      title: "Type",
      dataIndex: "type",
      render: (text) => SERVICE_TYPE[text],
    },
    {
      title: "Description",
      dataIndex: "name",
    },
    {
      title: "Provider",
      dataIndex: "providerId",
      render: (text, row) =>
        row.providerFirstName
          ? row.providerFirstName + " " + row.providerLastName
          : "-",
    },
  ];

  const columns = (type, tempProps) => {
    switch (type) {
      case "Appointments":
        return [
          {
            title: "Date",
            dataIndex: "date",
            sorter: true,
            sorter: (a, b) => {
              return momentLocal(a.date, "YYYY-MM-DD").diff(
                momentLocal(b.date, "YYYY-MM-DD"),
              );
            },
            render: (text) =>
              momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY"),
          },
          // {title: 'Pet', dataIndex: 'patient' , isSearchRequired: true},
          { title: "Type", dataIndex: "type" },
          { title: "Provider", dataIndex: "provider" },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => (
              <Tag
                style={{
                  borderRadius: "4px",
                  width: "115px",
                  textAlign: "center",
                  backgroundColor:
                    CommonUtil.STATUS_OBJECT_BG_COLOR[text?.toUpperCase()],
                  border:
                    " 1px solid " +
                    CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()],
                }}
                color={CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()]}
              >
                <Text
                  style={{
                    color: CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()],
                  }}
                >
                  {text}
                </Text>
              </Tag>
            ),
          },
          {
            title: "Action",
            key: "operation",
            render: (text, record) => {
              return (
                <Space size={[16, 16]}>
                  <Tooltip title="View / Edit">
                    <Link
                      onClick={() => {
                        tempProps.viewAppointment(
                          record.id,
                          record.patientId,
                          record.providerId,
                          record.clientId,
                          record.patient,
                        );
                      }}
                    >
                      <EditIcon />
                    </Link>
                  </Tooltip>
                  <Popconfirm
                    title="Are you sure you want to delete this appointment?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      AppointmentServices.deleteAppointmentById(record.id, () =>
                        getApptHistory(),
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
              );
            },
          },
        ];

      case "Communications":
        return [
          {
            title: "Date",
            dataIndex: "date",
            sorter: true,
            sorter: (a, b) => {
              return momentLocal(a.date, "YYYY-MM-DD").diff(
                momentLocal(b.date, "YYYY-MM-DD"),
              );
            },
            render: (text) =>
              momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY"),
          },
          // {title: 'Pet', dataIndex: 'patient'},
          { title: "Type", dataIndex: "type" },
          { title: "Purpose", dataIndex: "purpose" },
          {
            title: "Creator",
            dataIndex: "lastName",
            render: (text, row) =>
              row.lastName
                ? row.firstName.charAt(0) + " " + row.lastName
                : "System",
          },
          // {title: 'Status', dataIndex: 'status', key: 'status', render:(text)=>
          //   <Tag style={{width:"120px",textAlign:"center"}}color={CommonUtil.STATUS_OBJECT_COLOR[(text??"").toUpperCase()]}> {text.toUpperCase()}</Tag>
          // },
          {
            title: "Action",
            key: "operation",
            render: (text, record) => {
              return (
                <Row gutter={[16, 0]}>
                  <Col>
                    <Tooltip title="Edit">
                      <Link onClick={() => getCommById(record.id)}>
                        <EditIcon />
                      </Link>
                    </Tooltip>
                  </Col>
                  <Col>
                    <Popconfirm
                      title="Are you sure you want to delete this communication history?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        deleteCommunications(record.id);
                      }}
                    >
                      <Tooltip title="Delete">
                        <Link>
                          <TrashIcon />
                        </Link>
                      </Tooltip>
                    </Popconfirm>
                  </Col>
                </Row>
              );
            },
          },
        ];

      case "Billing":
        return [
          { title: "Invoice ID", dataIndex: "id" },
          // {title: 'Patient', dataIndex: 'patientName', render:(text, record) => text??"Unknown"},
          { title: "Staff", dataIndex: "doctorName" },
          {
            title: "Date",
            dataIndex: "date",
            sorter: true,
            sorter: (a, b) => {
              return momentLocal(a.date, "YYYY-MM-DD").diff(
                momentLocal(b.date, "YYYY-MM-DD"),
              );
            },
            render: (text) =>
              momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY"),
          },
          {
            title: "Total",
            dataIndex: "total",
            render: (text) => PriceUtil.dollarValue(text),
          },
          {
            title: "Remaining",
            dataIndex: "balance",
            render: (text) => PriceUtil.dollarValue(text),
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
              <Tag
                style={{
                  borderRadius: "4px",
                  width: "115px",
                  textAlign: "center",
                  backgroundColor:
                    CommonUtil.STATUS_OBJECT_BG_COLOR[text?.toUpperCase()],
                  border:
                    " 1px solid " +
                    CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()],
                }}
                color={CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()]}
              >
                <Text
                  style={{
                    color: CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()],
                  }}
                >
                  {text ?? "Unknown"}
                </Text>
              </Tag>
            ),
          },
          {
            title: "Action",
            key: "operation",
            render: (text, record) => {
              return (
                <Row gutter={[8, 0]}>
                  <Col>
                    <Link
                      onClick={() =>
                        BillingUtil.downloadInvoice(record.id, commonContext)
                      }
                    >
                      <Tooltip title="Download Invoice">
                        <DownloadIcon />{" "}
                      </Tooltip>
                    </Link>
                  </Col>
                  {/* <Col><Link><EditIcon /></Link></Col>
                                  <Col><Link><TrashIcon /></Link></Col> */}
                </Row>
              );
            },
          },
        ];

      case "Notes":
        return [
          {
            title: "Date",
            dataIndex: "createdTime",
            width: 120,
            render: (text) =>
              momentLocal(text, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY"),
          },
          { title: "Title", dataIndex: "title", width: 250 },
          { title: "Description", dataIndex: "description", ellipsis: true },
          // {title: 'Status', dataIndex: 'status', key: 'status', render:(text)=>
          //   <Tag style={{width:"120px",textAlign:"center"}}color={CommonUtil.STATUS_OBJECT_COLOR[(text??"").toUpperCase()]}> {text.toUpperCase()}</Tag>
          // },
          {
            title: "Action",
            key: "operation",
            width: 120,
            fixed: "right",
            render: (text, record) => {
              return (
                <Space size={[16, 16]}>
                  <Tooltip title="Edit Note">
                    <Link
                      onClick={() => {
                        setIsNotesModalVisible({ data: record });
                      }}
                    >
                      <EditIcon />
                    </Link>
                  </Tooltip>

                  <Popconfirm
                    title="Are you sure you want to delete this note?"
                    okText="Yes"
                    placement="topRight"
                    okButtonProps={{ shape: "round" }}
                    cancelButtonProps={{ shape: "round" }}
                    cancelText="No"
                    onConfirm={() => {
                      NoteServices.deleteNotes(record.noteId, () =>
                        getAllNotes(),
                      );
                    }}
                  >
                    <Tooltip title="Delete Note">
                      <Link>
                        <TrashIcon />
                      </Link>
                    </Tooltip>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ];
    }
  };

  return (
    <>
      {isNotesModalVisible && (
        <NotesModal
          clientId={props.clientId}
          onClose={() => setIsNotesModalVisible(false)}
          saveNotes={saveNotes}
          editNotes={editNotes}
          inputdata={isNotesModalVisible.data}
        />
      )}
      <Row
        justify="space-between"
        className="table-title-top"
        align="middle"
        gutter={[0, 16]}
      >
        <Col>
          <Title level={5}>Client History</Title>
        </Col>
        <Col></Col>
      </Row>
      <Row
        style={{ marginBottom: "24px" }}
        justify="space-between"
        align="middle"
        gutter={[0, 16]}
      >
        <Col>
          <Radio.Group
            className="history-radio-group"
            value={historyType}
            onChange={(e) => setHistoryType(e.target.value)}
          >
            <Radio.Button value="Appointments">Appointments</Radio.Button>
            <Radio.Button value="Communications"> Communications</Radio.Button>
            <Radio.Button value="Billing">Billing</Radio.Button>
            <Radio.Button value="Notes">Notes</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {tabActions(historyType, historyData[historyType])}
      <AdvancedTable
        key={historyType}
        dataSource={historyData[historyType]}
        columns={columns(historyType, props)}
        rowKey="id"
        expandable={
          historyType === "Communications"
            ? {
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.text}</p>
                ),
                rowExpandable: (record) => record.text,
              }
            : {
                expandedRowRender: (record) => (
                  <AdvancedTable
                    rowKey="id"
                    columns={apointmentSecondaryColumns}
                    dataSource={apptServices[record.id] ?? []}
                  />
                ),
                rowExpandable: (record) => historyType === "Appointments",
                onExpand: (expanded, record) =>
                  expanded && !apptServices.hasOwnProperty(record.id)
                    ? getApptServices(record.id, {
                        type: 99,
                        name: record.notes,
                        providerFirstName: record.provider,
                        providerLastName: "",
                      })
                    : {},
              }
        }
      />

      {extraData.type === "Communications" && (
        <CommunicationModal
          onClose={() => setExtraData({ type: null, data: {} })}
          saveCommunication={saveCommunications}
          editCommunication={editCommunications}
          inputdata={extraData.data}
          patientDetails={patientDetails}
        />
      )}
    </>
  );
};

export default ClientHistoryTab;
