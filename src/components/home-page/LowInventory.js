import React, { useContext, useEffect, useState } from "react";

import { Card, Space, Tooltip, Typography } from "antd";
import { CommonContext } from "../../context/CommonContext";
import InventoryServices from "../../services/InventoryServices";
import PatientServices from "../../services/PatientServices";
import InventoryCreateEditDrawer from "../inventory-page/inventory-create-edit/InventoryCreateEditDrawer";
import { BuyIcon, EditIcon } from "../util/SvgUtil";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import "./HomePage.scss";
import HomePageEmptyBlock from "./HomePageEmptyBlocks";

const { Text } = Typography;

const LowInventory = (props) => {
  const [data, setData] = useState([]);
  const [editCreateObject, setEditCreateObject] = useState(null);
  const [requiredInputData, setRequiredInputData] = useState({
    speciesList: [],
  });
  const context = useContext(CommonContext);

  useEffect(() => {
    //InventoryServices.getLowInventoryData(setData)   ;
    PatientServices.fetchAnimalFamily((data) =>
      setRequiredInputData((k) => ({ ...k, speciesList: data })),
    );
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      isSearchRequired: true,
    },

    {
      title: "On Hand",
      dataIndex: "onHand",
      width: 100,
      render: (text) => (
        <Text style={{ fontWeight: 500, color: text > 0 ? "#ff9900" : "red" }}>
          {" "}
          {text}
        </Text>
      ),
    },
    {
      title: "Actions",
      dataIndex: "operation",
      width: 130,

      render: (_, record) => {
        return (
          <Space size="middle">
            {context.userProfile.permission !== "FD" && (
              <Tooltip title="Edit Product">
                <Typography.Link
                  onClick={() => {
                    InventoryServices.getInventoryById(record.id, (data) =>
                      setEditCreateObject({ isEdit: true, record: data }),
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
              <Tooltip title="Buy Product">
                <Typography.Link
                  onClick={() =>
                    window.open(
                      "https://sandbox.test.vetcove.com/react/search/?q=" +
                        record.product,
                      "_blank",
                      "noreferrer",
                    )
                  }
                >
                  <BuyIcon />
                </Typography.Link>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Card
        className="inventoryAlertsWidget"
        style={{ borderRadius: "16px", minHeight: "330px" }}
        title="Low Inventory"
        bordered={false}
      >
        <AdvancedTable
          id="low-alert-table-id"
          dataSource={props.data}
          columns={columns}
          className="lowInventoryTable"
          size="middle"
          pagination={{ defaultPageSize: 20 }}
          scroll={{ y: 200 }}
          locale={{ emptyText: HomePageEmptyBlock.displayEmptyLowInventory() }}
          rowKey="id"
        />
      </Card>
      {editCreateObject && (
        <InventoryCreateEditDrawer
          isEdit={editCreateObject.isEdit}
          inventoryData={editCreateObject.record}
          allSpecies={requiredInputData}
          onClose={() => setEditCreateObject(null)}
          onSuccessReturn={() => {
            setEditCreateObject(null);
            props.onCallBack();
          }}
        />
      )}
    </>
  );
};

export default LowInventory;
