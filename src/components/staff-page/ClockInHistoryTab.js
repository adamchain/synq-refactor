import React, { useEffect, useState } from "react";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import {
  Row,
  Col,
  Typography,
  Select,
  TimePicker,
  Button,
  DatePicker,
  Popconfirm,
  Space,
  Tooltip,
} from "antd";
import {
  EditIcon,
  TrashIcon,
  SaveDiskIcon,
  CancelCircleIcon,
} from "../util/SvgUtil";
import update from "immutability-helper";
import moment from "moment";
import "./StaffPage.scss";
import { localToUtc, momentLocal, utcToLocal } from "../util/TimeUtil";
import ClockInOutServices from "../../services/ClockInOutServices";
import { CSVLink } from "react-csv";

const { Link, Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const dateFormat = "MM/DD/YYYY";

const datasource = [
  {
    id: 1,
    date: "09/10/2020",
    clockIn: "08:05 AM",
    clockOut: "08:30 AM",
    inOption: 2,
    outOption: 1,
    isEdit: false,
  },
  {
    id: 2,
    date: "09/10/2020",
    clockIn: "09:25 AM",
    clockOut: "10:30 PM",
    inOption: 3,
    outOption: 5,
    isEdit: false,
  },
];

const descriptions = {
  1: { name: "Shift Start", value: 1 },
  2: { name: "Shift End", value: 2 },
  4: { name: "Break Return", value: 4 },
  3: { name: "Break Start", value: 3 },
  5: { name: "Appt", value: 5 },
  6: { name: "Other", value: 6 },
};

const ClockInHistoryTab = (props) => {
  const [staffInOutHistory, setStaffInOutHistory] = useState([]);
  const [clockData, setClockData] = useState({});
  const [timeRange, setTimeRange] = useState([
    momentLocal().subtract(60, "d"),
    momentLocal(),
  ]);

  const fetchStaffHistory = (startdate, enddate) => {
    ClockInOutServices.getClockHistoryByEmpId(
      props.staffId,
      startdate,
      enddate,
      (data) => {
        setStaffInOutHistory(
          data.map((k) => {
            let inTime = k.inTime
              ? utcToLocal(k.inTime, "YYYY-MM-DDTHH:mm:ss")
              : null;
            let outTime = k.outTime
              ? utcToLocal(k.outTime, "YYYY-MM-DDTHH:mm:ss")
              : null;
            let total =
              inTime && outTime ? outTime.diff(inTime, "minutes") : null;
            total = total
              ? ((total / 60) | 0) + "hrs " + (total % 60 | 0) + "mins"
              : "-";
            return {
              ...k,
              inTime,
              outTime,
              //clockIn:inTime?inTime.format("hh:mm A"):null,
              //clockOut:outTime?outTime.format("hh:mm A"):null,
              //inDate: inTime?inTime.format("MM/DD/YYYY"):null,
              //outDate:outTime?outTime.format("MM/DD/YYYY"):null,
              total,
            };
          }),
        );
        setClockData({});
      },
    );
  };

  useEffect(() => {
    fetchStaffHistory(
      timeRange[0].format("YYYY-MM-DD"),
      timeRange[1].format("YYYY-MM-DD"),
    );
  }, []);

  const crudOperation = (type, tempData, record) => {
    let data = { ...record, ...tempData };
    let inputData = {
      historyId: data.historyId,
      empId: props.staffId,
      inOption: data.inOption,
      outOption: data.outOption,
      inTime: data.inTime
        ? localToUtc(data.inTime).format("YYYY-MM-DDTHH:mm:ss")
        : null,
      outTime: data.outTime
        ? localToUtc(data.outTime).format("YYYY-MM-DDTHH:mm:ss")
        : null,

      //"inTime": momentLocal(data.inDate,"MM/DD/YYYY").format("YYYY-MM-DD")+"T"+localToUtc(momentLocal(data.clockIn,"hh:mm A")).format("HH:mm:ss"),
      //"outTime": momentLocal(data.outDate,"MM/DD/YYYY").format("YYYY-MM-DD")+"T"+localToUtc(momentLocal(data.clockOut,"hh:mm A")).format("HH:mm:ss")
    };
    if (type === "add") {
      ClockInOutServices.clockIn(inputData, fetchStaffHistory);
    } else if (type === "edit") {
      ClockInOutServices.updateItemInClockHostory(
        data.historyId,
        inputData,
        fetchStaffHistory,
      );
    } else if (type === "delete") {
      ClockInOutServices.deleteItemInClockHistory(
        data.historyId,
        fetchStaffHistory,
      );
    }
  };
  const columns = (setStaffInOutHistory) => [
    // {
    //  title:"In Date",
    //  dataIndex: "inDate",
    //  render : (text,row) => {
    //     return row.isEdit? <DatePicker onSelect={(value)=>{setClockData(k=>({...k,[row.historyId]:{...k[row.historyId],inDate:value.format("MM/DD/YYYY")}}))}} defaultValue={text?momentLocal(text,"MM/DD/YYYY"):""} format="MM/DD/YYYY" /> : <Row gutter={[24,0]}><Col>{text}</Col></Row>
    // }
    // },
    {
      title: "Clock-In",
      width: "220px",
      dataIndex: "inTime",
      render: (text, row) => {
        // return row.isEdit? <TimePicker onSelect={(value)=>{setClockData(k=>({...k,[row.historyId]:{...k[row.historyId],clockIn:value.format("hh:mm A")}}))}} defaultValue={text?momentLocal(text,"hh:mm A" ):""} format="hh:mm A" /> : <Row gutter={[24,0]}><Col>{text}</Col></Row>
        return row.isEdit ? (
          <DatePicker
            showTime
            onChange={(value) =>
              setClockData((k) => ({
                ...k,
                [row.historyId]: { ...k[row.historyId], inTime: value },
              }))
            }
            showTime={{ format: "hh:mm A" }}
            format="MM/DD/YYYY hh:mm A"
            use12Hours
            defaultValue={text}
            minuteStep={15}
          />
        ) : (
          <Row gutter={[24, 0]}>
            <Col>{text ? text.format("MM/DD/YYYY hh:mm A") : "-"}</Col>
          </Row>
        );
      },
    },
    {
      title: "Note",
      dataIndex: "inOption",
      width: "150px",
      render: (text, row) =>
        row.isEdit ? (
          <Select
            onChange={(value) => {
              setClockData((k) => ({
                ...k,
                [row.historyId]: { ...k[row.historyId], inOption: value },
              }));
            }}
            placehoder="Select type"
            style={{ width: "150px" }}
            value={text}
          >
            {Object.values(descriptions).map((k) => (
              <Option value={k.value}>{k.name}</Option>
            ))}
          </Select>
        ) : (
          descriptions[text]?.name
        ),
    },
    // {
    //     title:"Out Date",
    //     dataIndex: "outDate",
    //     render : (text,row) => {
    //        return row.isEdit? <DatePicker onSelect={(value)=>{setClockData(k=>({...k,[row.historyId]:{...k[row.historyId],outDate:value.format("MM/DD/YYYY")}}))}} defaultValue={text?momentLocal(text,"MM/DD/YYYY"):""} format="MM/DD/YYYY" /> : <Row gutter={[24,0]}><Col>{text}</Col></Row>
    // }
    // }   ,
    {
      title: "Clock-Out",
      dataIndex: "outTime",
      width: "220px",
      render: (text, row) => {
        //return row.isEdit? <TimePicker onSelect={(value)=>{setClockData(k=>({...k,[row.historyId]:{...k[row.historyId],clockOut:value.format("hh:mm A")}}))}} defaultValue={text?momentLocal(text,"hh:mm A"):"" } format="hh:mm A" /> : <Row gutter={[24,0]}><Col>{text}</Col></Row>
        return row.isEdit ? (
          <DatePicker
            showTime
            onChange={(value) =>
              setClockData((k) => ({
                ...k,
                [row.historyId]: { ...k[row.historyId], outTime: value },
              }))
            }
            showTime={{ format: "hh:mm A" }}
            format="MM/DD/YYYY hh:mm A"
            use12Hours
            defaultValue={text}
            minuteStep={15}
          />
        ) : (
          <Row gutter={[24, 0]}>
            <Col>{text ? text.format("MM/DD/YYYY hh:mm A") : "-"}</Col>
          </Row>
        );
      },
    },
    {
      title: "Note",
      dataIndex: "outOption",
      width: "150px",
      render: (text, row) =>
        row.isEdit ? (
          <Select
            onChange={(value) => {
              setClockData((k) => ({
                ...k,
                [row.historyId]: { ...k[row.historyId], outOption: value },
              }));
            }}
            placehoder="Select type"
            style={{ width: "150px" }}
            value={text}
          >
            {Object.values(descriptions).map((k) => (
              <Option value={k.value}>{k.name}</Option>
            ))}
          </Select>
        ) : (
          descriptions[text]?.name
        ),
    },
    {
      title: "Total",
      dataIndex: "total",
      width: "150px",
    },
    {
      title: "Action",
      width: "120px",
      key: "operation",
      fixed: "right",
      render: (text, record) => {
        return (
          <Row gutter={[0, 0]}>
            {record.isEdit ? (
              <>
                <Space size={[16, 16]}>
                  <Tooltip title="Save">
                    <Link
                      onClick={() => {
                        let keysSet = Object.keys(clockData).filter(
                          (v) =>
                            v !== record.historyId ?? "undefined".toString(),
                        );
                        if (record.isAdd) {
                          crudOperation("add", clockData[record.historyId], {});
                        } else {
                          crudOperation(
                            "edit",
                            clockData[record.historyId],
                            record,
                          );
                        }
                        //setStaffInOutHistory(k=>update(k,{[k.findIndex(i=>i.historyId===record.historyId)]:a=>({...a,isEdit:false,...clockData[record.historyId]??{}})}));
                        setClockData((k) => {
                          return keysSet.length > 0
                            ? keysSet.reduce((total, current) => {
                                total[current] = k[current];
                                return total;
                              }, {})
                            : {};
                        });
                      }}
                    >
                      <SaveDiskIcon />{" "}
                    </Link>{" "}
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <Link
                      onClick={() => {
                        setClockData((k) => {
                          let keysSet = Object.keys(k).filter(
                            (v) => v !== record.historyId.toString(),
                          );
                          return keysSet.length > 0
                            ? keysSet.reduce((total, current) => {
                                total[current] = k[current];
                                return total;
                              }, {})
                            : {};
                        });
                        if (record.historyId) {
                          setStaffInOutHistory((k) =>
                            update(k, {
                              [k.findIndex(
                                (i) => i.historyId === record.historyId,
                              )]: (a) => ({ ...a, isEdit: false }),
                            }),
                          );
                        } else {
                          setStaffInOutHistory((k) =>
                            k.filter((v) => v.historyId),
                          );
                        }
                      }}
                    >
                      {" "}
                      <CancelCircleIcon />
                    </Link>
                  </Tooltip>
                </Space>
              </>
            ) : (
              <>
                <Space size={[16, 16]}>
                  <Link
                    onClick={() =>
                      setStaffInOutHistory((k) =>
                        update(k, {
                          [k.findIndex(
                            (i) => i.historyId === record.historyId,
                          )]: (a) => ({ ...a, isEdit: true }),
                        }),
                      )
                    }
                  >
                    <Tooltip title="Edit">
                      {" "}
                      <EditIcon />
                    </Tooltip>
                  </Link>
                  <Popconfirm
                    title="Are you sure you want to delete this record?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => crudOperation("delete", record, record)}
                  >
                    <Tooltip title="Delete">
                      <Link>
                        <TrashIcon />
                      </Link>
                    </Tooltip>
                  </Popconfirm>
                </Space>
              </>
            )}
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
            style={{ margin: "1em" }}
            justify="space-between"
            align="middle"
          >
            <Col>
              <Title level={5}>Clock-In History</Title>
            </Col>
            <Col>
              <Row gutter={[16, 0]}>
                <Col>
                  <RangePicker
                    defaultValue={timeRange}
                    format={dateFormat}
                    style={{ borderRadius: "50px" }}
                    onChange={(k) => {
                      k
                        ? fetchStaffHistory(
                            localToUtc(k[0]).format("YYYY-MM-DD"),
                            localToUtc(k[1]).format("YYYY-MM-DD"),
                          )
                        : fetchStaffHistory();
                    }}
                  />
                </Col>
                <Col>
                  <Button
                    style={{ minWidth: "150px" }}
                    ghost
                    shape="round"
                    size="small"
                    type="primary"
                  >
                    <CSVLink
                      filename={"ClockInOutHitoryReport.csv"}
                      data={staffInOutHistory.map((k) => ({
                        "In Date": k.inDate,
                        "Clock In": k.clockIn,
                        "In Note": descriptions[k.inOption]?.name,
                        "Out Date": k.outDate,
                        "Clock Out": k.clockOut,
                        "Out Note": descriptions[k.outOption]?.name,
                        Total: k.total,
                      }))}
                    >
                      Download
                    </CSVLink>
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{ minWidth: "150px" }}
                    ghost
                    shape="round"
                    size="small"
                    type="primary"
                    onClick={() =>
                      setStaffInOutHistory((k) => [
                        {
                          clockIn: null,
                          clockOut: null,
                          isEdit: true,
                          isAdd: true,
                        },
                        ...k,
                      ])
                    }
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <AdvancedTable
                scroll={{ x: 800 }}
                columns={columns(setStaffInOutHistory)}
                dataSource={staffInOutHistory}
                rowKey="historyId"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ClockInHistoryTab;
