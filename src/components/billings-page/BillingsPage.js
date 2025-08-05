import {
  Button,
  Card,
  DatePicker,
  Layout,
  Popconfirm,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import WhskrPageHeader from "../page-header/WhskrPageHeader";
import "./BillingsPage.scss";

import { DownloadIcon, EditIcon, TrashIcon } from "../util/SvgUtil";

import { CommonContext } from "../../context/CommonContext";
import BillingServices from "../../services/BillingServices";
import PatientServices from "../../services/PatientServices";
import BillingUtil from "../estimate/BillingUtil";
import CommonUtil from "../util/CommonUtil";
import PriceUtil from "../util/PriceUtil";
import { localToUtc, momentLocal } from "../util/TimeUtil";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import NewInvoiceDrawer from "./NewInvoiceDrawer";

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Text, Link } = Typography;
const { Option } = Select;
const dateFormat = "MM/DD/YYYY";

const BillingsPage = (props) => {
  const [data, setData] = useState({});
  const [invoiceAction, setInvoiceAction] = useState({
    type: null,
    requiredData: {},
  });
  const [requiredInputData, setRequiredInputData] = useState({
    patientDetails: [],
  });
  const [showRows, setShowRows] = useState([]);
  const commonContext = useContext(CommonContext);

  const getBillingData = (url) => {
    setShowRows([]);
    BillingServices.getAllBillingInfo(url, (data) =>
      setData(
        data.reduce((total, current) => {
          total[current.id] = current;
          return total;
        }, {}),
      ),
    );
  };
  useEffect(() => {
    console.log("grooming", commonContext.defaultBranch.branchTypeId === 2);
    // PatientServices.fetchAllPatients((data) => setRequiredInputData(k=>({...k,patientDetails:data})));
    getBillingData();
  }, []);
  const deleteInvoice = (id) => {
    BillingServices.deleteInvoice(id, () => getBillingData());
  };
  const onCreateOrEditInvoice = (
    patientId,
    setInvoiceAction,
    isEdit,
    billingsData,
  ) => {
    PatientServices.fetchPatientById(patientId, (data) => {
      let client = { id: data.clientId, lastName: data.clientLastName };
      setInvoiceAction({
        type: "invoice",
        requiredData: {
          billingsData,
          record: {
            patientId,
            patient: {
              id: patientId,
              breed: data.breedName,
              name: data.patientName + " " + data.clientLastName,
              image: data.image,
            },
            client,
          },
          isEdit,
        },
      });
    });
  };

  const refreshItems = (id) => {
    BillingServices.getBillingItemsById(id, (data) => {
      setData((k) => ({ ...k, [id]: { ...k[id], items: data } }));
    });
  };

  const columns = (setInvoiceAction, onSearch, currentContext) => [
    {
      title: "Date",
      dataIndex: "date",

      sorter: (a, b) => {
        return momentLocal(a.date, "YYYY-MM-DD").diff(
          momentLocal(b.date, "YYYY-MM-DD"),
        );
      },
      render: (text) => momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY"),
      width: 150,
    },

    {
      title: "Invoice ID",
      dataIndex: "id",
      isSearchRequired: true,
      width: 150,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      isSearchRequired: true,
      width: 210,
      render: (text, record) => (
        <Link
          onClick={() =>
            onSearch("Clients", { type: "C", id: record.clientId })
          }
        >
          {text}
        </Link>
      ),
    },
    // {
    //   title: 'Patient',
    //   dataIndex: 'patientName',
    //   isSearchRequired :true,
    //   width: 175,
    //   render:(text,record) =>
    //   (
    //     text ?
    //   <Link
    //   onClick = {()=>onSearch("Clients",{type:"P",id:record.patientId,clId:record.clientId})}
    //   >
    //   {text}
    // </Link> : "Unknown"
    //   )
    // },
    {
      title: "Stylist",
      dataIndex: "doctorName",
      isSearchRequired: true,
      width: 175,
    },
    {
      title: "Provider",
      dataIndex: "providerName",
      isSearchRequired: true,
      width: 175,
    },
    {
      title: "Total",
      dataIndex: "total",

      width: 175,

      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
    },
    {
      title: "Remain",
      dataIndex: "balance",

      width: 175,

      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
    },
    {
      // title: () => <Text style={{color: 'red'}}> Tip</Text>,
      title: "Tip",
      dataIndex: "tip",

      width: 175,
      hidden: !(commonContext.defaultBranch.branchTypeId === 2),

      render: (text) => <Text> {PriceUtil.dollarValue(text, 2, true)}</Text>,
    },
    // {
    //   title: 'Service Date',
    //   dataIndex: 'date',
    //   sorter: true

    // },
    {
      title: "Status",
      dataIndex: "status",
      width: 175,
      render: (text, record) => (
        <Tag
          style={{
            borderRadius: "4px",
            width: "8em",
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
      filters: [
        {
          text: "Paid",
          value: "Paid",
        },
        {
          text: "Unpaid",
          value: "Unpaid",
        },
        {
          text: "Partial",
          value: "Partial",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },

    {
      title: "Method",
      dataIndex: "customPaymentMethod",
      width: 175,
      render: (text) => <Text> {BillingUtil.paymentMethodValue(text)}</Text>,
      filters: [
        {
          text: "Credit",
          value: "Credit",
        },
        {
          text: "Credit NPS",
          value: "Write-In",
        },
        {
          text: "Multiple",
          value: ",",
        },
        {
          text: "Cash",
          value: "Cash",
        },
        {
          text: "Other",
          value: "Other",
        },
      ],
      onFilter: (value, record) => record.customPaymentMethod.includes(value),
    },

    {
      title: "Actions",
      dataIndex: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => {
        return (
          <Space size={[16, 16]}>
            <Typography.Link
              onClick={() => {
                BillingServices.getBillingById(record.id, (response) => {
                  onCreateOrEditInvoice(
                    record.patientId,
                    setInvoiceAction,
                    true,
                    response,
                  );

                  // setInvoiceAction({type:"invoice", requiredData:{billingsData:response,record:{...record,patient:{},client:{id:record.clientId,lastName:record.clientName}},isEdit:true}})
                });
              }}
            >
              <Tooltip title="View / Edit">
                <EditIcon />{" "}
              </Tooltip>
            </Typography.Link>

            <Typography.Link
              onClick={() =>
                BillingUtil.downloadInvoice(record.id, currentContext)
              }
            >
              <Tooltip title="Download Invoice">
                <DownloadIcon />{" "}
              </Tooltip>
            </Typography.Link>

            <Popconfirm
              title="Are you sure you want to delete this Invoice?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteInvoice(record.id);
              }}
            >
              <Tooltip title="Delete Invoice">
                <Link disabled={record.status !== "Unpaid"}>
                  <TrashIcon />
                </Link>
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const secondaryColumns = [
    {
      title: "Service Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Provider",
      dataIndex: "providerId",
      render: (text, record) =>
        record.providerFirstName + " " + record.providerLastName,
      sorter: true,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
      sorter: true,
    },
  ];
  return (
    <Layout id="billing-page">
      <WhskrPageHeader title="Billing" buttonName="Create New" />
      <Content className="masterContentPadding">
        <Card
          className="lab-list-card pageCardContainer"
          title="Billing Overview"
          bordered={false}
          extra={
            <>
              <RangePicker
                format={dateFormat}
                onChange={(k) =>
                  k &&
                  getBillingData(
                    "?stDate=" +
                      localToUtc(k[0]).format("YYYY-MM-DD") +
                      "&endDate=" +
                      localToUtc(k[1]).format("YYYY-MM-DD"),
                  )
                }
              />{" "}
              <Button
                style={{ marginLeft: 12 }}
                onClick={() =>
                  setInvoiceAction({ type: "invoice", requiredData: {} })
                }
                size="small"
                shape="round"
              >
                Create Invoice
              </Button>
            </>
          }
        >
          <AdvancedTable
            dataSource={Object.values(data).sort((a, b) => {
              return a.date && b.date
                ? momentLocal(b.date, "YYYY-MM-DD").diff(
                    momentLocal(a.date, "YYYY-MM-DD"),
                  )
                : 0;
            })}
            rowKey="id"
            expandable={{
              expandedRowRender: (record) => (
                <AdvancedTable
                  rowKey="id"
                  columns={secondaryColumns}
                  dataSource={record.items ?? []}
                />
              ),
              rowExpandable: () => true,
              expandedRowKeys: showRows,
              onExpandedRowsChange: setShowRows,
            }}
            onExpand={(expanded, record) =>
              expanded ? refreshItems(record.id) : {}
            }
            columns={columns(
              setInvoiceAction,
              props.onSearch,
              commonContext,
            ).filter((k) => {
              console.log(k.title + ": " + k.hidden);
              return !k.hidden;
            })}
            scroll={{ x: 1500, y: "calc(100vh - 370px)" }}
          />
        </Card>
      </Content>

      {invoiceAction.type === "invoice" && (
        <NewInvoiceDrawer
          inputData={invoiceAction.requiredData.billingsData}
          record={invoiceAction.requiredData.record}
          isEdit={invoiceAction.requiredData.isEdit}
          onRefresh={(invoiceId) =>
            BillingServices.getBillingById(invoiceId, (data) =>
              setInvoiceAction((k) => ({
                ...k,
                requiredData: { ...k.requiredData, billingsData: data },
              })),
            )
          }
          onSuccessReturn={() => {
            getBillingData();
            setInvoiceAction({ type: null, requiredData: {} });
          }}
          onClose={() => {
            getBillingData();
            setInvoiceAction({ type: null, requiredData: {} });
          }}
        />
      )}
    </Layout>
  );
};

export default BillingsPage;
