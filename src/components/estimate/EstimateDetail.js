import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Tooltip,
  Popconfirm,
  Space,
} from "antd";

import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import { TrashIcon, UserDecline } from "../util/SvgUtil";

import CustomAutoComplete from "./../generic-components/custom-auto-complete/CustomAutoComplete";

import { ESTIMATE_STATUS } from "./EstimateHelper";
import InventoryServices from "../../services/InventoryServices";
import PackageServices from "../../services/PackageServices";
import BillingUtil from "./BillingUtil";
import PriceUtil from "../util/PriceUtil";

const { Text, Title, Link } = Typography;
const { Option } = Select;

const estimateStatusArray = Object.values(ESTIMATE_STATUS);
const columns = (
  onUserDeclineAction,
  onDeleteAction,
  onUpdateQuantity,
  isPaid,
  isEdit,
) => [
  {
    title: "Service Name",
    className: "external-lab-column",
    dataIndex: "name",
    key: "name",
    render: (text, row) =>
      row.type === "EL" ? (
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
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
    render: (text, row) =>
      row.isChildren ? (
        row.qty
      ) : (
        <Input
          disabled={isPaid}
          readOnly={row.isChildren}
          bordered={!row.isChildren}
          onChange={(e) => {
            onUpdateQuantity(
              row.code,
              row.isParent === undefined || row.isParent,
              e.target.value,
            );
          }}
          style={{ width: "50px" }}
          value={text}
          className={
            (row.declined ? "estimate-action-strike" : "") +
            " .ant-form-item-has-warning"
          }
        />
      ),
  },
  {
    title: "Price",
    dataIndex: "calPrice",
    key: "calPrice",
    render: (text, row) => {
      if (row.isChildren) {
        return "";
      } else {
        if (row.declined) {
          return (
            <Text className={row.declined ? "estimate-action-strike" : ""}>
              {text ? PriceUtil.dollarValue(text) : "$0.00"}
            </Text>
          );
        } else {
          let strikethrough = row.originalPrice
            ? BillingUtil.findStrikeThrough({
                ...row,
                itemPrice: row.originalPrice,
                itemDiscountedPrice: BillingUtil.findDiscountedItemPrice(
                  row.originalPrice,
                  row.discount,
                  row.discountType,
                ),
              })
            : BillingUtil.findStrikeThrough(row);
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
        }
      }
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    width: 120,
    render: (text, row) => {
      return row.isChildren ? (
        ""
      ) : row.isParent || row.isParent === undefined ? (
        <Space size={[12, 16]}>
          <Tooltip title="Customer Decline">
            <Link
              disabled={isPaid}
              onClick={() => onUserDeclineAction(row.code)}
            >
              <UserDecline />
            </Link>
          </Tooltip>
          <Popconfirm
            disabled={isPaid}
            title="Are you sure you want to delete this item?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDeleteAction(row.code)}
          >
            <Tooltip title="Delete">
              <Typography.Link disabled={isPaid}>
                <TrashIcon />
              </Typography.Link>
            </Tooltip>
          </Popconfirm>
          {/* <Col>
            <Dropdown trigger={["click"]} 
                overlay={ <Menu><Menu.Item> Download</Menu.Item></Menu>}>
                <Tooltip title="More Options"><MoreOutlined style={{fontSize:"20px",color:"black"}} /></Tooltip>
              </Dropdown>
              </Col> */}
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

const EstimateDetail = (props) => {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    InventoryServices.searchAllItems(setItemData);
  }, []);

  const onUserDeclineAction = (code) => {
    props.setEstimateData((k) => ({
      ...k,
      items: [...k.items].map((u) => {
        if (u.code === code) {
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

  const onUpdateQuantity = (code, isParent, value) => {
    let qty = value.match(/^[-+]?\d*\.?\d*$/);
    props.setEstimateData((k) => ({
      ...k,
      items: [...k.items].map((u) => {
        let tempData = { ...u };
        if (isParent) {
          if (u.code === code) {
            qty = qty ? qty[0] : 1;
            tempData = { ...tempData, qty };
            let calPrice = tempData.originalPrice
              ? BillingUtil.calculateCalPriceForEachItem(tempData)
              : BillingUtil.formulateCalPrice(tempData);
            tempData = { ...tempData, calPrice };
          }
        } else {
          tempData = {
            ...tempData,
            children: tempData.children.map((v) =>
              v.code === code ? { ...v, qty: qty ? qty[0] : 1 } : v,
            ),
          };
        }
        return tempData;
      }),
    }));
  };

  const onDeleteAction = (code) => {
    props.setEstimateData((k) => ({
      ...k,
      items: [...k.items].filter((u) => !(u.code === code)),
    }));
  };
  let subTotal = BillingUtil.calculateSubTotal(props.estimateData.items ?? []);

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
          props.setEstimateData((k) => {
            let children = option.dataObject.type === 5 ? { children: [] } : {};
            return {
              ...k,
              items: [
                ...k.items,
                {
                  ...option.dataObject,
                  name: option.dataObject.pName,
                  qty: 1,
                  calPrice: BillingUtil.calculateCalPriceForEachItem({
                    ...option.dataObject,
                    qty: 1,
                  }),
                  isParent: true,
                  ...children,
                },
              ],
            };
          })
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
              props.isPaid,
            )}
            pagination={false}
            footer={
              props.isEstimate
                ? () => (
                    <Row justify="space-between">
                      <Col>
                        <Text strong>Subtotal</Text>
                      </Col>
                      <Col>
                        <Text strong>${subTotal.toFixed(2)}</Text>
                      </Col>
                    </Row>
                  )
                : null
            }
            onExpand={(expanded, record) => {
              if (expanded && record.children.length === 0) {
                PackageServices.getItemsForPackage(
                  record.inventoryId ?? record.id,
                  (response) => {
                    let tempItems = props.estimateData.items.map((k) => {
                      if (k.id === record.id && record.type === 5) {
                        let children = response.map((v) => ({
                          ...v,
                          isChildren: true,
                          providerFirstName: k.providerFirstName,
                          providerLastName: k.providerLastName,
                          providerId: k.providerId,
                        }));
                        return { ...k, children };
                      } else return { ...k };
                    });

                    props.setEstimateData((k) => ({
                      ...k,
                      items: [...tempItems],
                    }));
                  },
                );
              }
            }}
            dataSource={props.estimateData.items}
            rowKey={"code"}
            locale={{
              emptyText: props.isEstimate ? null : <NoEstimatesAdded />,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default EstimateDetail;
