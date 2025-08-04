import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  DatePicker,
  Typography,
  Dropdown,
  Radio,
  Select,
  Tag,
  Button,
  Popconfirm,
  Space,
  Menu,
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
import NoteServices from "../../services/NoteServices";
import { localToUtc, momentLocal } from "../util/TimeUtil";
import { DownOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import InvoiceDrawer from "../billings-page/InvoiceDrawer";
import BillingUtil from "../estimate/BillingUtil";
import { CommonContext } from "../../context/CommonContext";
import CommunicationModal from "./CommunicationModal";
import PatientServices from "../../services/PatientServices";
import AppointmentServices from "../../services/AppointmentServices";

const { Title, Text, Link } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const PatientHistory = (props) => {
  const [historyData, setHistoryData] = useState({
    Appointments: [],
    Communications: [],
    Billing: [],
    Notes: [],
  });
  const [historyType, setHistoryType] = useState("Appointments");
  const [isNotesModalVisible, setIsNotesModalVisible] = useState(false);
  const [apptServices, setApptServices] = useState({});
  const [extraData, setExtraData] = useState({ type: "", data: null });
  const [patientDetails, setPatientDetails] = useState([]);
  const commonContext = useContext(CommonContext);

  const showModal = () => {
    setIsNotesModalVisible({ data: null });
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
    NoteServices.createNote(
      { ...data, patientId: props.patientId, clientId: props.clientId },
      () => getAllNotes(),
    );
  };

  const editNotes = (data) => {
    NoteServices.updateNote(
      { ...data, patientId: props.patientId, clientId: props.clientId },
      () => getAllNotes(),
    );
  };
  const deleteNotes = (data) => {
    NoteServices.deleteNotes(
      { ...data, patientId: props.patientId, clientId: props.clientId },
      () => getAllNotes(),
    );
  };

  const getAllNotes = (url = "") => {
    NoteServices.getNoteByPatientId(url, props.patientId, (data) => {
      setHistoryData((k) => ({ ...k, Notes: data }));
    });
  };

  const getApptHistory = (url = "") => {
    HistoryServices.getAppointmentHistoryByPatientId(
      url,
      props.patientId,
      (data) => {
        setHistoryData((k) => ({ ...k, Appointments: data }));
      },
    );
  };

  const getBillingHistory = (url = "") => {
    HistoryServices.getBillingHistoryByPatientId(
      url,
      props.patientId,
      (data) => {
        setHistoryData((k) => ({ ...k, Billing: data }));
      },
    );
  };

  const getCommHistory = (url = "") => {
    HistoryServices.getCommunicationsHistoryByPatientId(
      url,
      props.patientId,
      (data) => {
        setHistoryData((k) => ({ ...k, Communications: data }));
      },
    );
  };

  const getPatientMedicalHistory = (url = "") => {
    HistoryServices.getPatientMedicalHistoryByPatientId(url, props.patientId);
  };

  useEffect(() => {
    //getApptHistory();
    PatientServices.fetchAllPatients((data) => setPatientDetails(data));

    //getBillingHistory();
    ///getCommHistory();
    //getAllNotes();
  }, [props.patientId]);

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
                onClick={() => getPatientMedicalHistory()}
              >
                {" "}
                Download
                {/* <CSVLink
              filename={"AppointmentHistoryReport.csv"}
              data={downloadData.map(k=>({"Date":k.date.format("MM/DD/YYYY"),"Type":k.type, "Provider":k.provider,"Status":k.status}))}
              
            >Download</CSVLink> */}
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
                    data: { patientId: props.patientId, isEdit: false },
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
            {/* <Col> 
                  
                  <Dropdown overlay={()=><Menu>
                    <Menu.Item>Pay Invoice</Menu.Item>
                    <Menu.Item>  <CSVLink
              filename={"BillingHistoryReport.csv"}
              data={downloadData.map(k=>({ 'InvoiceId':k.id,'Doctor':k.doctorName,'Date':momentLocal(k.date,"YYYY-MM-DD").format("MM/DD/YYYY"),'Total': k.total,'Status':k.status}))}
              
            >Download</CSVLink></Menu.Item>
                    <Menu.Item>Delete Invoices</Menu.Item></Menu>}>
                  <Button className="setWidthTableButtons" ghost shape="round" size="small" type="primary" >
        Actions <DownOutlined />
      </Button>
    </Dropdown></Col> */}
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
            render: (text) => text.format("MM/DD/YYYY"),
          },
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
                <Row gutter={[16, 0]}>
                  <Col>
                    <Tooltip title="View/Edit">
                      <Link
                        onClick={() =>
                          tempProps.viewAppointment(
                            record.id,
                            record.patientId,
                            record.providerId,
                            record.clientId,
                            record.patient,
                          )
                        }
                      >
                        <EditIcon />
                      </Link>
                    </Tooltip>
                  </Col>
                  <Col>
                    <Popconfirm
                      title="Are you sure you want to delete this appointment?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        AppointmentServices.deleteAppointmentById(
                          record.id,
                          () => getApptHistory(),
                        );
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
          { title: "Type", dataIndex: "type" },
          { title: "Purpose", dataIndex: "purpose" },
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
                    <Tooltip title="Edit / View">
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
          { title: "Doctor", dataIndex: "doctorName" },
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
                <Row gutter={[8, 0]}>
                  {/* <Col><Link onClick={()=>{
                              BillingServices.getBillingById(record.id,(billingsData)=>{
                                setExtraData({type:"invoice",data:{billingsData,isEdit:true,record:{patientId:props.patientId ,patient:{...props.patient},client:{id:props.clientId}}}});                              }
                              
                              )

                              }}><EditIcon /></Link></Col> */}
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
                  {/* <Col><Link><TrashIcon /></Link></Col> */}
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
          onClose={() => setIsNotesModalVisible(false)}
          saveNotes={saveNotes}
          editNotes={editNotes}
          inputdata={isNotesModalVisible.data}
        />
      )}
      <div>
        <Col span={24} style={{ padding: 0 }}>
          <Row
            justify="space-between"
            className="table-title-top"
            align="middle"
            gutter={[0, 16]}
          >
            <Col>
              <Title level={5}>Patient History</Title>
            </Col>
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
                <Radio.Button value="Communications">
                  {" "}
                  Communications
                </Radio.Button>
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
          {/* <Row>
            <Col span={24}>
              <Table
                className="patient-history-main-table"
                columns={columns}
                pagination={false}
                bordered={false}
                expandable={{ expandedRowRender }}
                dataSource={data || []}
              />
            </Col>
          </Row> */}
        </Col>
      </div>
      {/* {extraData.type === "invoice" && <InvoiceDrawer
            inputData ={extraData.data.billingsData} 
            record ={extraData.data.record}
            isEdit = {extraData.data.isEdit}
            onSuccessReturn = {()=>{getBillingHistory();setExtraData({type:null,data:{}})}}
            onClose ={()=>setExtraData({type:null,data:{}})}/>} */}
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

export default PatientHistory;
