import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Popconfirm,
  AutoComplete,
  Card,
  InputNumber,
  Divider,
  Button,
  Tooltip,
  Dropdown,
  Menu,
  Modal,
  Space,
} from "antd";
import Search from "antd/lib/transfer/search";
import { SearchOutlined } from "@ant-design/icons";
import { MoreOutlined } from "@ant-design/icons";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import { TrashIcon, UserDecline } from "../util/SvgUtil";
import EstimateSummary from "./EstimateSummary";
import CustomAutoComplete from "./../generic-components/custom-auto-complete/CustomAutoComplete";
import BillingServices from "../../services/BillingServices";
import { ESTIMATE_STATUS } from "./EstimateHelper";
import InventoryServices from "../../services/InventoryServices";
import AppointmentServices from "../../services/AppointmentServices";
import PriceUtil from "../util/PriceUtil";
import BillingUtil from "./BillingUtil";
import _ from "lodash";

const { Text, Title, Link } = Typography;
const { Option } = Select;

const estimateStatusArray = Object.values(ESTIMATE_STATUS);
const columns = (
  onUserDeclineAction,
  onDeleteAction,
  onUpdateQuantity,
  setModalOpen,
  isPaid,
  onDeletePackageItem,
  apptId,
) => [
  {
    title: "Service Name",
    width: 300,
    dataIndex: "name",
    key: "name",
    className: "external-lab-column",
    render: (text, row) =>
      row.type === 4 ? (
        <Tooltip placement="topLeft" title="External Lab" arrowPointAtCenter>
          <Text className={row.declined ? "estimate-action-strike" : ""}>
            {text}
          </Text>
        </Tooltip>
      ) : (
        <Text className={row.declined ? "estimate-action-strike" : ""}>
          {text}
        </Text>
      ),
  },
  ...[
    apptId
      ? {
          title: "Provider",
          width: 120,
          dataIndex: "providerId",
          render: (text, row) =>
            row.isChildren
              ? ""
              : row.providerId
                ? ((row.providerFirstName
                    ? row.providerFirstName?.charAt(0)
                    : "") +
                    " " +
                    row.providerLastName ?? "")
                : "-",
        }
      : {},
  ],
  {
    title: "Qty",
    width: 90,
    dataIndex: "qty",
    key: "qty",
    render: (text, row) => (
      <Input
        disabled={isPaid}
        onChange={(e) => {
          onUpdateQuantity(row.id, !row.isChildren, e.target.value, row);
        }}
        style={{ width: "50px" }}
        value={text}
        className={row.declined ? "estimate-action-strike" : ""}
      />
    ),
  },
  {
    title: "Price",
    width: 100,
    dataIndex: "calPrice",
    key: "calPrice",
    render: (text, row) => {
      // if(row.isChildren){return "";}
      // else {
      if (row.declined) {
        return (
          <Text className={row.declined ? "estimate-action-strike" : ""}>
            {text ? PriceUtil.dollarValue(text) : "$0.00"}
          </Text>
        );
      } else {
        let strikethrough = BillingUtil.findStrikeThrough(row);
        return (
          <>
            <Row>
              <Col>
                <Text>{text ? PriceUtil.dollarValue(text) : "$0.00"}</Text>
              </Col>
            </Row>
            {strikethrough.allow && (
              <Row>
                <Col>
                  <Text className={"estimate-action-strike"}>
                    {strikethrough.value
                      ? PriceUtil.dollarValue(strikethrough.value)
                      : "$0.00"}
                  </Text>
                </Col>
              </Row>
            )}
          </>
        );

        // }
      }
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    fixed: "right",
    width: 110,
    render: (text, row) => {
      return row.isChildren ? (
        <Space size={[10, 10]} align="center">
          <div style={{ width: "1.75em" }}></div>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this item?"
              okText="Yes"
              cancelText="No"
              disabled={isPaid}
              onConfirm={() => onDeletePackageItem(row.id, row.packageId)}
            >
              <Link disabled={isPaid}>
                <TrashIcon />
              </Link>
            </Popconfirm>
          </Tooltip>
        </Space>
      ) : row.isParent || row.isParent === undefined ? (
        <Space size={[10, 10]} align="center">
          <Tooltip title="Customer Decline">
            <Link
              disabled={isPaid}
              onClick={() => onUserDeclineAction(row.id, !row.declined)}
            >
              <UserDecline />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this item?"
              okText="Yes"
              cancelText="No"
              disabled={isPaid}
              onConfirm={() => onDeleteAction(row.id)}
            >
              <Link disabled={isPaid}>
                <TrashIcon />
              </Link>
            </Popconfirm>
          </Tooltip>
          {apptId && (
            <Dropdown
              disabled={isPaid}
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() =>
                      setModalOpen({
                        type: "provider",
                        data: {
                          doctorId: row.providerId,
                          itemId: row.id,
                          type: row.type,
                          inventoryId: row.inventoryId,
                        },
                      })
                    }
                  >
                    {" "}
                    Change Provider
                  </Menu.Item>
                </Menu>
              }
            >
              <Tooltip title="More Options">
                <MoreOutlined style={{ fontSize: "20px", color: "black" }} />
              </Tooltip>
            </Dropdown>
          )}
        </Space>
      ) : (
        ""
      );
    },
  },
];

const NoEstimatesAdded = () => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={24}>
          {" "}
          <Title style={{ color: "unset" }} level={4}>
            No Items on Invoice
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24}>Add Billable’s or Import an Estimate</Col>
      </Row>
    </>
  );
};

const ProviderChangeModal = (tempProps) => {
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [selectedDoctor, setSeletedDoctor] = useState(tempProps.doctorId);
  useEffect(() => {
    AppointmentServices.fetchAllVets((data) => setDoctorDetails(data));
  }, []);

  return (
    <Modal
      onCancel={tempProps.onClose}
      footer={null}
      visible={true}
      title="Change Item Provider"
    >
      <Row style={{ marginBottom: 8 }}>
        <Col>
          <Text>
            Changing the provider will ensure the proper person is attributed
            with the billed item.
          </Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          {" "}
          <Select
            showSearch={true}
            value={selectedDoctor}
            filterOption={(input, option) =>
              option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value, option) => {
              setSeletedDoctor(value);
            }}
            placeholder={<Text>Select a Doctor Name</Text>}
            style={{ width: "100%", marginBottom: "24px" }}
          >
            {doctorDetails.map((k) => (
              <Option key={k.userId} value={k.userId}>
                {"Dr. "}
                {k.fullName}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Divider />
      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={12}>
          {" "}
          <Button onClick={tempProps.onClose} shape="round" size="large" block>
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            shape="round"
            disabled={!selectedDoctor}
            block
            onClick={() =>
              BillingServices.updateProviderDetails(
                {
                  id: tempProps.itemId,
                  providerId: selectedDoctor,
                  apptId: tempProps.apptId,
                  inventoryId: tempProps.inventoryId,
                  type: tempProps.type,
                },
                tempProps.onSuccess,
              )
            }
          >
            Save
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

const BillingDetail = (props) => {
  const [itemData, setItemData] = useState([]);
  const [modalOpen, setModalOpen] = useState({ type: null, data: {} });

  useEffect(() => {
    InventoryServices.searchAllItems(setItemData);
  }, []);

  const onUserDeclineAction = (id, declined) => {
    BillingServices.approveOrDeclineBillingItem(
      id,
      declined ? "decline" : "approve",
    );
    props.setEstimateData((k) => ({
      ...k,
      items: [...k.items].map((u) => {
        if (u.id === id) {
          let tempData = { ...u, declined: !u.declined };
          if (tempData.children) {
            tempData = {
              ...tempData,
              children: [
                ...u.children.map((v) => ({ ...v, declined: !u.declined })),
              ],
            };
          }
          return tempData;
        } else {
          return { ...u };
        }
      }),
    }));
  };

  const onUpdateQuantity = (id, isParent, value, row) => {
    let qty = value.match(/^[-+]?\d*\.?\d*$/);

    if (value) {
      if (row.isChildren) {
        let inputdata = {
          id: row.packageId,
          inventoryId: row.inventoryId,
          qty: qty ? qty[0] : 1,
        };
        inputdata.price = BillingUtil.formulateCalPrice({
          ...row,
          qty: inputdata.qty,
        });
        BillingServices.updatePackageBillingItemQty(
          inputdata,
          props.refreshData,
        );

        //update whole Package..

        let rowClone = {
          items: [
            {
              ...JSON.parse(
                JSON.stringify(
                  props.estimateData.items.find((k) => k.id === row.packageId),
                ),
              ),
            },
          ],
        };
        rowClone.items[0].packageItems.forEach((k) => {
          if (k.inventoryId === row.inventoryId) {
            k.qty = inputdata.qty;
          }
        });
        BillingUtil.frameInvoiceResponse(rowClone);
        let packageInputJson = {
          id: rowClone.id,
          qty: rowClone.items[0].qty,
          price: rowClone.items[0].calPrice,
        };
        BillingServices.updateBillingItemQty(
          packageInputJson,
          props.refreshData,
        );
      } else {
        let inputdata = {
          id: id,
          qty: qty ? qty[0] : 1,
        };
        if (row.type === 5) {
          let rowClone = {
            items: [{ ...JSON.parse(JSON.stringify(row)), qty: inputdata.qty }],
          };
          BillingUtil.frameInvoiceResponse(rowClone);
          inputdata.price = rowClone.items[0].calPrice;
        } else {
          inputdata.price = BillingUtil.formulateCalPrice({
            ...row,
            qty: inputdata.qty,
          });
        }
        BillingServices.updateBillingItemQty(inputdata, props.refreshData);
      }
    }
    props.setEstimateData((k) => ({
      ...k,
      items: [...k.items].map((u) => {
        let tempData = { ...u };
        if (isParent) {
          if (u.id === id) {
            qty = qty ? qty[0] : 1;
            // let calPrice = BillingUtil.formulateCalPrice({...tempData,qty});

            tempData = { ...tempData, qty };
          }
        } else {
          if (u.id === row.packageId) {
            tempData = {
              ...tempData,
              children: tempData.children.map((v) =>
                v.id === id ? { ...v, qty: qty ? qty[0] : 1 } : v,
              ),
            };
          }
        }
        return tempData;
      }),
    }));
  };

  const onDeleteAction = (id) => {
    BillingServices.deleteBillingItem(id);
    props.setEstimateData((k) => ({
      ...k,
      items: [...k.items].filter((u) => !(u.id === id)),
    }));
  };
  const onDeletePackageItem = (inventoryId, packageId) => {
    BillingServices.deleteBillingPackageItem(packageId, inventoryId, () => {
      props.refreshData();
    });
    // props.setEstimateData(k=>({...k,items:[...k.items].filter(u=>!(u.id === id))}));
  };

  // let subTotal = (props.estimateData.items??[]).filter(k=>!k.declined).reduce((total,current)=>total+Number.parseFloat(current.price)*Number(current.qty),0);
  return (
    <>
      {props.isEstimate && (
        <>
          <Row
            justify="space-between"
            style={{ marginTop: "24px", marginBottom: "12px" }}
            gutter={[0, 8]}
          >
            <Col>
              <Text>Estimate Name</Text>
            </Col>
            <Col>
              <Text>Estimate Status</Text>
            </Col>
          </Row>
          <Row
            style={{ marginBottom: "24px" }}
            justify="space-between"
            gutter={[0, 24]}
          >
            <Col span={12}>
              {" "}
              <Input
                value={props.estimateData.name}
                onChange={(e) => {
                  let name = e.target.value;
                  props.setEstimateData((k) => ({ ...k, name }));
                }}
                size="large"
                placeholder="Enter Estimate Name"
              />
            </Col>
            <Col offset={6} span={6}>
              <Select
                style={{ width: "100%", fontSize: "12px", fontWeight: "600" }}
                size="large"
                placeholder={"Select Status"}
                labelInValue={true}
                onChange={(status) =>
                  props.setEstimateData((k) => ({
                    ...k,
                    statusId: status.value,
                  }))
                }
                value={{
                  value: props.estimateData.statusId,
                  label: (
                    <Text
                      style={{
                        color: estimateStatusArray.find(
                          (k) => k.statusId === props.estimateData.statusId,
                        ).color,
                      }}
                    >
                      {
                        estimateStatusArray.find(
                          (k) => k.statusId === props.estimateData.statusId,
                        ).desc
                      }
                    </Text>
                  ),
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {estimateStatusArray.map((k) => (
                  <Option key={k.desc} value={k.statusId}>
                    {k.desc}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </>
      )}
      <CustomAutoComplete
        disabled={props.isPaid}
        placeholder="Search Package, Item or Code"
        dropDownData={itemData}
        dataFields={{
          description: "pName",
          shortForm: "code",
          price: "price",
          id: "id",
          labVendor: "labVendor",
        }}
        onSelect={(option) =>
          props.onAddItemsToBilling(null, option.dataObject)
        }
      />

      <Row style={{ marginBottom: "24px" }} gutter={[0, 24]}>
        <Col span={24}>
          <AdvancedTable
            id="estimate-detail-table"
            rowClassName={(record, index) =>
              record.type == "4" ? "is-external-lab" : ""
            }
            columns={columns(
              onUserDeclineAction,
              onDeleteAction,
              onUpdateQuantity,
              setModalOpen,
              props.isPaid,
              onDeletePackageItem,
              props.apptId,
            )}
            pagination={false}
            scroll={{ x: 680, y: 700 }}
            // footer={() => {
            //     return <Row justify="space-between" >
            //         <Col><Text strong>Subtotal</Text></Col>
            //         <Col><Text strong>${subTotal.toFixed(2)}</Text></Col>
            //     </Row>
            // }}
            dataSource={props.estimateData.items}
            rowKey={"id"}
            locale={{
              emptyText: props.isEstimate ? null : <NoEstimatesAdded />,
            }}
          />
        </Col>
      </Row>

      {modalOpen.type === "provider" && (
        <ProviderChangeModal
          apptId={props.apptId}
          inventoryId={modalOpen.data.inventoryId}
          type={modalOpen.data.type}
          itemId={modalOpen.data.itemId}
          doctorId={modalOpen.data.doctorId}
          onClose={() => setModalOpen({ type: null, data: {} })}
          onSuccess={() => {
            props.refreshData();
            setModalOpen({ type: null, data: {} });
          }}
        />
      )}
    </>
  );
};

export default BillingDetail;
