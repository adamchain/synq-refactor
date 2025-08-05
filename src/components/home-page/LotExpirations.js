import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Select, Space, Tag, Tooltip, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";

import "./HomePage.scss";

import { BuyIcon, EditIcon } from "../util/SvgUtil";

import moment from "moment";
import { CommonContext } from "../../context/CommonContext";
import InventoryServices from "../../services/InventoryServices";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import InventoryCreateEditDrawer from "../inventory-page/inventory-create-edit/InventoryCreateEditDrawer";
import CommonUtil from "../util/CommonUtil";
import { momentLocal } from "../util/TimeUtil";
import HomePageEmptyBlock from "./HomePageEmptyBlocks";
const { Text } = Typography;

const { Option } = Select;

const LotExpirations = (props) => {
  const [lotData, setLotData] = useState(null);
  const [filterValue, setFilterValue] = useState(0);
  const [editCreateObject, setEditCreateObject] = useState(null);
  const context = useContext(CommonContext);

  useEffect(() => {
    InventoryServices.getExpiredLots(setLotData);
    //setLotData([{productName:"Deramaxx 25mg",manufacturer:"MWI Inventory",lotNumber:1011234,qty:2,expiryDate:"12/12/2021",sellable:"Available"}])
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      width: 300,
      isSearchRequired: true,
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      width: 220,
      isSearchRequired: true,
      render: (text) => <Text> {text ? text : "-"}</Text>,
    },

    {
      title: "Lot #",
      dataIndex: "lotNumber",
      width: 80,
      render: (text) => <Text> {text ? text : "-"}</Text>,
      fixed: "right",
    },

    {
      title: "On Hand",
      dataIndex: "qty",
      width: 120,
      render: (text) => <Text> {text ? text : "-"}</Text>,
      fixed: "right",
    },
    {
      title: "Expires",
      dataIndex: "expiryDate",
      width: 140,

      render: (text) => (
        <Text
          className="lotExpirationDate"
          style={{ color: moment().isAfter(moment(text)) ? "red" : "#ff9900" }}
        >
          {" "}
          {text ? momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY") : "-"}
        </Text>
      ),
    },
    {
      title: "Sellable",
      dataIndex: "sellable",
      width: 120,

      render: (text, record) => {
        let status = moment().isAfter(moment(record.expiryDate))
          ? "Blocked"
          : "Available";

        return (
          <>
            <Tag
              style={{
                borderRadius: "4px",
                width: "8em",
                textAlign: "center",
                backgroundColor:
                  CommonUtil.STATUS_OBJECT_BG_COLOR[status?.toUpperCase()],
                border:
                  " 1px solid " +
                  CommonUtil.STATUS_OBJECT_COLOR[status?.toUpperCase()],
              }}
              color={CommonUtil.STATUS_OBJECT_COLOR[status?.toUpperCase()]}
            >
              <Text
                style={{
                  color: CommonUtil.STATUS_OBJECT_COLOR[status?.toUpperCase()],
                }}
              >
                {status}
              </Text>
            </Tag>
          </>
        );
      },
      fixed: "right",
      // onFilter: (value, record) =>
      // (record["status"]
      //                ? "Available" : "Blocked")
      //                    .toString()
      //                    .toLowerCase()
      //                    .includes(value.toLowerCase())
      //                ,
      //                filters: [
      //                 {
      //                   text: 'Available',
      //                   value: true,
      //                 },
      //                 {
      //                   text: 'Blocked',
      //                   value: false,
      //                 },
      //               ],
      //               onFilter: (value, record) => record.status === value,
    },

    {
      title: "Actions",
      dataIndex: "operation",
      width: 120,
      fixed: "right",
      render: (_, record) => {
        // const editable = isEditing(record);
        return (
          <Space size={[12, 16]}>
            {context.userProfile.permission !== "FD" && (
              <Tooltip title="Edit Item">
                <Typography.Link
                  onClick={() => {
                    InventoryServices.getInventoryById(
                      record.inventoryId,
                      (data) =>
                        setEditCreateObject({
                          isEdit: true,
                          record: { ...data, id: record.inventoryId },
                        }),
                    );
                    //edit(record)
                  }}
                >
                  <EditIcon />
                </Typography.Link>
              </Tooltip>
            )}
            {(context.userProfile.permission === "LD" ||
              context.userProfile.permission === "DR") && (
              <Tooltip
                title={record.type !== 1 ? "Buy Unavailable" : "Buy Product"}
              >
                <Typography.Link
                  disabled={record.type !== 1}
                  onClick={() =>
                    window.open(
                      "https://sandbox.test.vetcove.com/react/search/?q=" +
                        record.productName,
                      "_blank",
                      "noreferrer",
                    )
                  }
                >
                  <BuyIcon fillcolor={record.type !== 1 ? "gray" : "black"} />
                </Typography.Link>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        style={{ minHeight: "700px", borderRadius: "16px" }}
        title={
          <>
            <Text>Expirations</Text> &nbsp;
            <Tooltip title="Expired medications are blocked from selling. This widget will let you know when items are reaching expiration so they can be quickly updated or purchased.">
              <QuestionCircleOutlined className="questionIcon" />
            </Tooltip>
          </>
        }
        bordered={false}
        className="UAWidget lotExpirationWidget"
      >
        {lotData && lotData.length > 0 ? (
          <AdvancedTable
            id="lot-expirations-table"
            columns={columns}
            dataSource={lotData}
            rowKey={"id"}
          />
        ) : (
          HomePageEmptyBlock.displayEmptyLotExpirations()
        )}
      </Card>
      {editCreateObject && (
        <InventoryCreateEditDrawer
          isEdit={editCreateObject.isEdit}
          inventoryData={editCreateObject.record}
          onClose={() => setEditCreateObject(null)}
          onSuccessReturn={() => {
            InventoryServices.getExpiredLots(setLotData);
            setEditCreateObject(null);
            props.onCallBack();
          }}
        />
      )}
    </div>
  );
};

export default LotExpirations;
