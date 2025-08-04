import React, { useContext, useEffect, useState } from "react";
import WhskrPageHeader from "../page-header/WhskrPageHeader";

import {
  Button,
  Card,
  Col,
  Form,
  Layout,
  Popconfirm,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";

import {
  BuyIcon,
  EditIcon,
  InvLabsIcon,
  InvProceduresIcon,
  OutStockItemsIcon,
  TotalItemsIcon,
  TrashIcon,
} from "../util/SvgUtil";

import { CommonContext } from "../../context/CommonContext";
import InventoryServices from "../../services/InventoryServices";
import PatientServices from "../../services/PatientServices";
import PriceUtil from "../util/PriceUtil";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import InventoryCreateEditDrawer from "./inventory-create-edit/InventoryCreateEditDrawer";
import "./InventoryDetails.scss";
import AppointmentServices from "../../services/AppointmentServices";

const { Content } = Layout;
const { Text } = Typography;

// const factData = [
//     {id:"TI",title:"Total Items",count:"-" ,color:"#012729", icon:<TotalItemsIcon customStyle ={{width:"2em",height:"1.7em"}}/>},
//     {id:"A",title:"Available",count:"-" ,color:"#027d02",icon:<AvailableItemsIcon customStyle ={{width:"2em"}}/>},
//     {id:"LS",title:"Low Stock",count:"-",color:"#f59a23",icon:<LowStockItemsIcon customStyle ={{width:"2em"}}/>},
//     {id:"OOS",title:"Out of Stock",count:"-" ,color:"#e83151",icon:<OutStockItemsIcon customStyle ={{width:"2em"}}/>}];

const DashCard = (dashProps) => (
  <Col xs={24} sm={12} lg={6}>
    <Card
      bordered={false}
      onClick={() =>
        dashProps.setDashItemsObject((k) => ({
          ...k,
          selectedDash: dashProps.id,
        }))
      }
      style={{ "--bc": dashProps.color }}
      className={
        "dash-card " +
        (dashProps.dashItemsObject.selectedDash === dashProps.id
          ? "dash-card-selected"
          : "")
      }
    >
      <Row justify="space-between" align="start">
        <Col sm={16} lg={16} md={16} xxl={18}>
          <Row className="InvFilterIconBox" gutter={[16, 0]} align="middle">
            <Col>
              <div className="dash-icon">{dashProps.icon}</div>
            </Col>
            <Col sm={24} md={17} lg={24} xl={24} xxl={17}>
              <Row>
                <Col span={24}>
                  <Text className="font-size-16 InvFilterTitle">
                    {dashProps.title}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="InvFilterCount" md={8} lg={8} xl={8} xxl={6}>
          <Row className="InvFilterNumber" justify="end" align="top">
            <Col>
              <Text className="dash-count">
                {dashProps.dashItemsObject[dashProps.id]}
              </Text>
            </Col>
          </Row>
          <Row justify="end" className="dash-row InvFilterNumLabel">
            <Col>
              <Text className="inventoryStatsItems">Items</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  </Col>
);

const originData = [];

for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    type: `IL`,
    category: "Heartworm Medications",
    product: `Flea/HW-Trifexis 5-10# PINK BOX of 6`,
    cost: "$5.00",
    price: "$12.49",
    servicefee: "$3.00",
    onHand: 3,
    alertqty: i % 2 === 0 ? i : null,
  });
}

const InventoryDetails = () => {
  const context = useContext(CommonContext);
  var factData = [];
  if (context.defaultBranch.branchTypeId == 2) {
    factData = [
      {
        id: "I",
        title: "Inventory",
        count: "-",
        color: "#008489",
        icon: <TotalItemsIcon customStyle={{ height: "23px" }} />,
      },
      {
        id: "P",
        title: "Services",
        count: "-",
        color: "#9966FE",
        icon: <InvProceduresIcon customStyle={{ height: "23px" }} />,
      },
      // {id:"LD",title:"Lab Diagnostics",count:"-",color:"#36A3EB",icon:<InvLabsIcon customStyle ={{height:"23px"}}/>},
      {
        id: "LOOS",
        title: "Low / Out of Stock",
        count: "-",
        color: "#e83151",
        icon: <OutStockItemsIcon customStyle={{ height: "23px" }} />,
      },
    ];
  } else {
    factData = [
      {
        id: "I",
        title: "Inventory",
        count: "-",
        color: "#008489",
        icon: <TotalItemsIcon customStyle={{ height: "23px" }} />,
      },
      {
        id: "P",
        title: "Procedures",
        count: "-",
        color: "#9966FE",
        icon: <InvProceduresIcon customStyle={{ height: "23px" }} />,
      },
      {
        id: "LD",
        title: "Lab Diagnostics",
        count: "-",
        color: "#36A3EB",
        icon: <InvLabsIcon customStyle={{ height: "23px" }} />,
      },
      {
        id: "LOOS",
        title: "Low / Out of Stock",
        count: "-",
        color: "#e83151",
        icon: <OutStockItemsIcon customStyle={{ height: "23px" }} />,
      },
    ];
  }

  const [form] = Form.useForm();
  const [data, setData] = useState();
  // const [editingKey, setEditingKey] = useState('');
  const [editCreateObject, setEditCreateObject] = useState(null);
  // const isEditing = (record) => record.key === editingKey;
  const [requiredInputData, setRequiredInputData] = useState({
    speciesList: [],
  });
  const commonContext = useContext(CommonContext);
  // const [dashItemsObject,setDashItemsObject] = useState( {"TI":0,"A":0,"LS":0,"OOS":0,selectedDash:"TI"});
  const [dashItemsObject, setDashItemsObject] = useState({
    I: 0,
    P: 0,
    LD: 0,
    LOOS: 0,
    selectedDash: "I",
  });

  useEffect(() => {
    fetchInventory();
    PatientServices.fetchAnimalFamily((data) =>
      setRequiredInputData((k) => ({ ...k, speciesList: data })),
    );
  }, []);

  const fetchInventory = () => {
    InventoryServices.getAllInventory((data) => {
      //let dashCounts = {"TI":0,"A":0,"LS":0,"OOS":0}
      // data.forEach(k=>{
      //     dashCounts["TI"] = dashCounts["TI"]+1;
      //     dashCounts["A"] =  dashCounts["A"]+(( k.status === true &&   ((k.type == "1" && k.onHand>0) || k.type != "1") )? 1: 0);

      //     let aqty = k.onHand < k.alertqty || k.onHand < commonContext.defaultBranch.inventoryAlert ;
      //     dashCounts["LS"] =  dashCounts["LS"]+((k.status === true && aqty) ? 1: 0);
      //     dashCounts["OOS"] =  dashCounts["OOS"]+( k.onHand  ? 0: ([1].includes (k.type) ? 1 : 0) );

      // })

      let dashCounts = { I: 0, P: 0, LD: 0, LOOS: 0 };
      data.forEach((k) => {
        dashCounts["I"] = dashCounts["I"] + ([1].includes(k.type) ? 1 : 0);
        dashCounts["P"] = dashCounts["P"] + ([2].includes(k.type) ? 1 : 0);
        dashCounts["LD"] = dashCounts["LD"] + ([3, 4].includes(k.type) ? 1 : 0);

        let aqty =
          k.alertqty === 0
            ? 0
            : k.alertqty
              ? k.onHand <= k.alertqty
              : k.onHand <= commonContext.defaultBranch.inventoryAlert;
        dashCounts["LOOS"] =
          dashCounts["LOOS"] +
          ((k.status === true && aqty) ||
          (k.onHand ? false : [1].includes(k.type) ? true : false)
            ? 1
            : 0);
      });
      setDashItemsObject((k) => ({ ...k, ...dashCounts }));
      setData(data);
    });
  };
  // const filterTableData = (selectedDash,tableData) => {
  //     if(selectedDash === "A") {
  //         return tableData.filter(k=> { return ( k.status === true &&   ((k.type == "1" && k.onHand>0) || k.type != "1") ) });
  //     }else if(selectedDash === "LS") {

  //         return tableData.filter(k=>{
  //             let aqty = k.onHand < k.alertqty || k.onHand < commonContext.defaultBranch.inventoryAlert ;

  //             return ( k.status === true && aqty)});
  //     }else if(selectedDash === "OOS") {
  //         return tableData.filter(k=> !k.onHand && [1].includes (k.type));
  //     }else {
  //         return tableData;
  //     }

  // };
  const filterTableData = (selectedDash, tableData = []) => {
    if (selectedDash === "I") {
      return tableData.filter((k) => [1].includes(k.type));
    } else if (selectedDash === "P") {
      return tableData.filter((k) => [2].includes(k.type));
    } else if (selectedDash === "LD") {
      return tableData.filter((k) => [3, 4].includes(k.type));
    } else if (selectedDash === "LOOS") {
      return tableData.filter((k) => {
        let aqty =
          k.alertqty === 0
            ? 0
            : k.alertqty
              ? k.onHand <= k.alertqty
              : k.onHand <= commonContext.defaultBranch.inventoryAlert;
        return (k.status === true && aqty) ||
          (k.onHand ? false : [1].includes(k.type) ? true : false)
          ? true
          : false;
      });
    }
  };

  // const edit = (record) => {
  //     form.setFieldsValue({
  //         name: '',
  //         age: '',
  //         address: '',
  //         ...record,
  //     });
  //     setEditingKey(record.key);
  // };

  // const cancel = () => {
  //     setEditingKey('');
  // };

  // const save = async (key) => {
  //     try {
  //         const row = await form.validateFields();
  //         const newData = [...data];
  //         const index = newData.findIndex((item) => key === item.key);

  //         if (index > -1) {
  //             const item = newData[index];
  //             newData.splice(index, 1, { ...item, ...row });
  //             setData(newData);
  //             setEditingKey('');
  //         } else {
  //             newData.push(row);
  //             setData(newData);
  //             setEditingKey('');
  //         }
  //     } catch (errInfo) {
  //         console.log('Validate Failed:', errInfo);
  //     }
  // };
  const SERVICE_TYPE = {
    1: "Inventory",
    2: context.defaultBranch.branchTypeId == 2 ? "Service" : "Procedure",
    3: "Internal Lab",
    4: "External Lab",
    5: "Package",
  };
  const columns = [
    {
      title: "Product",
      dataIndex: "pName",
      width: 150,
      isSearchRequired: true,
      fixed: "left",
    },
    {
      title: "Code",
      dataIndex: "code",
      width: 50,
      render: (text) => <Text> {text ? text : "-"}</Text>,
      isSearchRequired: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 150,
      isSearchRequired: true,
    },
    // {
    //     title: 'Vendor',
    //     dataIndex: 'vendor',
    //     width: 220,
    //     render:(text) => <Text > {text? text : '-'}</Text>,
    //     isSearchRequired : true
    // },
    // {
    //     title: 'MFR',
    //     dataIndex: 'mfr',
    //     width: 200,
    //     isSearchRequired : true,
    //     render:(text) => <Text > {text? text : '-'}</Text>
    // },
    {
      title: "Type",
      dataIndex: "type",
      width: 65,
      render: (text) => SERVICE_TYPE[text] ?? "Unknown",
      // onFilter: (value, record) =>
      //         record["type"]
      //             ? (SERVICE_TYPE[record["type"]] ?? "Unknown")
      //                 .toString()
      //                 .toLowerCase()
      //                 .includes(value.toLowerCase())
      //             : "" ,
      // isSearchRequired : true

      // filters: [
      //     {
      //       text: 'Inventory',
      //       value: 1,
      //     },
      //     {
      //       text: 'Procedure',
      //       value: 2,
      //     },
      //     {
      //         text: 'Internal Lab',
      //         value: 3,
      //       },
      //       {
      //         text: 'External Lab',
      //         value: 4,
      //       },
      //     //   {
      //     //     text: 'Package',
      //     //     value: 5,
      //     //   },
      //   ],
      //   onFilter: (value, record) => record.type === value,
    },
    {
      title: "Service Fee",
      dataIndex: "sFee",
      width: 55,
      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      width: 50,
      sorter: (a, b) => a.cost - b.cost,
      render: (text) => <Text> {PriceUtil.dollarValue(text)}</Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 50,
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => {
        if (record.originalPrice !== text) {
          return (
            <>
              <Row>
                <Col>
                  <Text> {PriceUtil.dollarValue(text)}</Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text style={{ textDecoration: "line-through" }}>
                    {" "}
                    {PriceUtil.dollarValue(record.originalPrice)}
                  </Text>
                </Col>
              </Row>
            </>
          );
        } else {
          return <Text> {PriceUtil.dollarValue(text)}</Text>;
        }
      },
    },

    {
      title: "On Hand",
      dataIndex: "onHand",
      width: 45,
      render: (text) => (
        <Text
          style={{
            color:
              text <= 0
                ? "red"
                : dashItemsObject.selectedDash === "LOOS"
                  ? "#F59A23"
                  : "",
            fontWeight:
              text <= 0 || dashItemsObject.selectedDash === "LOOS"
                ? "bold"
                : "",
          }}
        >
          {" "}
          {text}{" "}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",

      width: 50,
      render: (text) => (
        <Tag
          style={{ width: "90px", textAlign: "center" }}
          color={text ? "green" : "red"}
        >
          {text ? "Active" : "Inactive"}
        </Tag>
      ),

      onFilter: (value, record) =>
        (record["status"] ? "Active" : "Inactive")
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Inactive",
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },

    {
      title: "Actions",
      dataIndex: "operation",
      width: 60,
      fixed: "right",
      render: (_, record) => {
        // const editable = isEditing(record);
        return (
          <Space size={[12, 16]}>
            {commonContext.userProfile.permission !== "FD" && (
              <Tooltip title="Edit Item">
                <Typography.Link
                  onClick={() => {
                    InventoryServices.getInventoryById(record.id, (data) =>
                      setEditCreateObject({
                        isEdit: true,
                        record: { ...data, id: record.id },
                      }),
                    );
                    //edit(record)
                  }}
                >
                  <EditIcon />
                </Typography.Link>
              </Tooltip>
            )}
            {(commonContext.userProfile.permission === "LD" ||
              commonContext.userProfile.permission === "DR") && (
              <Tooltip
                title={record.type !== 1 ? "Buy Unavailable" : "Buy Product"}
              >
                <Typography.Link
                  disabled={record.type !== 1}
                  onClick={() =>
                    window.open(
                      "https://sandbox.test.vetcove.com/react/search/?q=" +
                        record.pName,
                      "_blank",
                      "noreferrer",
                    )
                  }
                >
                  <BuyIcon fillcolor={record.type !== 1 ? "gray" : "black"} />
                </Typography.Link>
              </Tooltip>
            )}
            {commonContext.userProfile.permission !== "FD" && (
              <Popconfirm
                title="Are you sure you want to delete this inventory item?"
                placement="topRight"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  InventoryServices.deleteInventoryById(record.id, () =>
                    fetchInventory(),
                  );
                  AppointmentServices.deleteApptType(
                    { apptTypeName: record.pName, apptLength: record.duration },
                    (res) => console.log("appt type deleted-", res),
                  );
                }}
              >
                <Tooltip title="Delete Item">
                  <Typography.Link>
                    <TrashIcon />
                  </Typography.Link>
                </Tooltip>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];
  // const mergedColumns = columns.map((col) => {
  //     if (!col.editable) {
  //         return col;
  //     }

  //     return {
  //         ...col,
  //         onCell: (record) => ({
  //             record,
  //             inputType: col.dataIndex === 'onhand' ? 'number' : 'text',
  //             dataIndex: col.dataIndex,
  //             title: col.title,
  //             editing: isEditing(record),
  //         }),
  //     };
  // });
  return (
    <Layout id="inventoryDetailOverivew">
      <WhskrPageHeader title="Inventory" buttonName="Create New" />
      <Content className="masterContentPadding">
        <Row
          className="inventoryStats"
          justify="space-between"
          gutter={[16, 24]}
        >
          {factData.map((k) => {
            let tempProps = { ...k, dashItemsObject, setDashItemsObject };
            return <DashCard {...tempProps} />;
          })}
        </Row>
        <Row>
          <Col span={24}>
            <Card
              className="pageCardContainer"
              title="Item Management"
              bordered={false}
              extra={
                commonContext.userProfile.permission !== "FD" && (
                  <Button
                    type="primary"
                    size="small"
                    ghost
                    shape="round"
                    onClick={() => {
                      setEditCreateObject({ isEdit: false });
                    }}
                  >
                    Add New Item
                  </Button>
                )
              }
            >
              <AdvancedTable
                dataSource={filterTableData(dashItemsObject.selectedDash, data)}
                columns={columns}
                scroll={{ x: 1600, y: "calc(100vh - 450px)" }}
                rowKey="id"
                className="inventoryListTable"
              />
            </Card>
          </Col>
        </Row>
        {editCreateObject && (
          <InventoryCreateEditDrawer
            oldPName={editCreateObject?.record?.pName}
            staticInvData={data}
            isEdit={editCreateObject.isEdit}
            inventoryData={editCreateObject.record}
            allSpecies={requiredInputData}
            onClose={() => setEditCreateObject(null)}
            onSuccessReturn={() => {
              setEditCreateObject(null);
              fetchInventory();
            }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default InventoryDetails;
