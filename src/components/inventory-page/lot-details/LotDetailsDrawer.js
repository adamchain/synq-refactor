import React, { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Popconfirm,
  Row,
  Space,
  Typography,
  Tooltip,
  Switch,
} from "antd";
import AdvancedTable from "../../generic-components/advanced-table/AdvancedTable";
import "./LotDetails.scss";
import { EditIcon, TrashIcon, AddLotIcon } from "../../util/SvgUtil";
import AddEditLotModel from "./AddEditLotModel";
import update from "immutability-helper";
import LotServices from "../../../services/LotServices";
import { momentLocal } from "../../util/TimeUtil";
import PriceUtil from "../../util/PriceUtil";

const { Title, Text, Link } = Typography;

//const data = [1,2,3,4,5].map(k=>({qty:k*3,manufacturer:"VetOne",lot:123*k,expires:"12/12/9999",cost:k*12.10,price:k*13}));

const LotDetailsDrawer = (props) => {
  const [lotModal, setLotModal] = useState(null);
  const [lotList, setLotList] = useState(
    props.lots.map((k, key) => ({ ...k, key })),
  );
  const onClose = () => {
    props.onClose();
  };

  const columns = [
    {
      title: "Active",
      dataIndex: "active",
      render: (text, record) => (
        <Switch
          style={text ? { pointerEvents: "none" } : {}}
          checked={text}
          onChange={(value) => {
            if (value) {
              lotList
                .filter((k) => k.key !== record.key && k.active)
                .map((k) => {
                  LotServices.updateLotStatusByLotId(
                    k.lotId,
                    false,
                    refreshLots,
                  );
                });
            }
            LotServices.updateLotStatusByLotId(
              record.lotId,
              value,
              refreshLots,
            );
          }}
        />
      ),
    },
    { title: "QTY", dataIndex: "qty" },
    { title: "Manufacturer", dataIndex: "manufacturer" },
    { title: "Lot#", dataIndex: "lotNumber" },
    {
      title: "Expires",
      dataIndex: "expiryDate",
      render: (text, record) => text?.format("MM/DD/YYYY"),
    },
    {
      title: "Cost",
      dataIndex: "cost",
      render: (text) => PriceUtil.dollarValue(text),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => PriceUtil.dollarValue(text),
    },
    {
      title: "Action",
      render: (text, record) => (
        <Row gutter={[8, 0]}>
          <Col>
            <Space size={[12, 16]}>
              <Tooltip title="Edit">
                <Link
                  onClick={() => {
                    setLotModal({ isEdit: true, data: record });
                  }}
                >
                  <EditIcon />
                </Link>
              </Tooltip>
              <Popconfirm
                title="Are you sure you want to delete this lot item?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  if (props.inventoryId) {
                    LotServices.deleteLotById(record.lotId, () =>
                      setLotList((k) => k.filter((v) => v.key !== record.key)),
                    );
                  } else {
                    setLotList((k) => k.filter((v) => v.key !== record.key));
                  }
                }}
              >
                <Tooltip title="Delete">
                  <Link>
                    <TrashIcon />
                  </Link>
                </Tooltip>
              </Popconfirm>
            </Space>
          </Col>
        </Row>
      ),
    },
  ];

  const refreshLots = () => {
    LotServices.getLotByInventoryId(props.inventoryId, (lots) =>
      setLotList(
        lots.map((k, key) => ({
          ...k,
          key,
          expiryDate: momentLocal(k.expiryDate, "YYYY-MM-DD"),
        })),
      ),
    );
  };
  const editLot = (data) => {
    //setLotList(k=>update(k,{[k.findIndex(i=>i.key===data.key)]:a=>({...a,...data??{}})}));
    refreshLots();
    setLotModal(false);
  };
  const addLot = (data) => {
    //setLotList(k=>([...k,{...data,key:k.length}]));
    refreshLots();
    setLotModal(false);
  };

  // const editLotActive = (data) => {
  //     LotServices.updateLotByInventoryID({...data,expiryDate:data.expiryDate.format("YYYY-MM-DD"),inventoryId:props.inventoryId},()=>editLot());

  // }

  return (
    <>
      <Drawer
        className="lot-details-drawer"
        title={"Lot Details"}
        width={800}
        onClose={() => {
          props.onChange(lotList);
          onClose();
        }}
        visible={true}
        bodyStyle={{ paddingBottom: 50 }}
        footer={
          <Row justify="end">
            <Col>
              <Button
                onClick={onClose}
                shape="round"
                onClick={() => {
                  props.onChange(lotList);
                }}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              {" "}
              <Button
                onClick={() => {
                  props.onChange(lotList);
                }}
                shape="round"
                type="primary"
              >
                {"Save"}
              </Button>
            </Col>
          </Row>
        }
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "24px" }}
          gutter={[0, 0]}
        >
          <Col>
            <Row align="middle" gutter={[16, 0]}>
              <Col>
                <div className="circleborder">
                  <div className="AddLotIconCont">
                    <AddLotIcon />
                  </div>
                </div>
              </Col>
              <Col>
                <Row style={{ marginBottom: "-3px" }}>
                  <Col>
                    <Text className="LotItemTitle">
                      {props.formRequiredValue.pName ?? ""}
                    </Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "-4px" }}>
                  <Col>
                    <Text className="AddLotVMC">
                      Vendor: {props.formRequiredValue.vendor ?? ""}
                    </Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "-4px" }}>
                  <Col>
                    <Text className="AddLotVMC">
                      Manufacturer: {props.formRequiredValue.mfr ?? ""}
                    </Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "-4px" }}>
                  <Col>
                    <Text className="AddLotVMC">
                      Code: {props.formRequiredValue.code ?? ""}
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="end">
              <Col>
                <Title style={{ margin: 0, lineHeight: "0.6em" }} level={3}>
                  {lotList.find((k) => k.active)?.qty}
                </Title>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <Text type="secondary">On Hand</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "24px" }}
          gutter={[0, 0]}
        >
          <Col>
            <Title level={5}>Lot Management</Title>
          </Col>
          <Col>
            <Button
              ghost
              shape="round"
              size="small"
              type="primary"
              style={{ minWidth: "130px" }}
              onClick={() => {
                setLotModal({ isEdit: false });
              }}
            >
              Add Lot
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <AdvancedTable
              columns={columns}
              dataSource={lotList}
              rowKey="key"
            />
          </Col>
        </Row>
      </Drawer>
      {lotModal && (
        <AddEditLotModel
          formData={lotModal.data}
          isEdit={lotModal.isEdit}
          onClose={() => setLotModal(null)}
          editLot={(data) => {
            if (props.inventoryId) {
              LotServices.updateLotByInventoryID(
                {
                  ...data,
                  expiryDate: data.expiryDate.format("YYYY-MM-DD"),
                  inventoryId: props.inventoryId,
                },
                () => editLot(data),
              );
            } else {
              setLotList((k) =>
                update(k, {
                  [k.findIndex((i) => i.key === data.key)]: (a) => ({
                    ...a,
                    ...(data ?? {}),
                  }),
                }),
              );
              setLotModal(false);
            }
          }}
          addLot={(data) => {
            if (props.inventoryId) {
              LotServices.createLotByInventoryID(
                {
                  ...data,
                  expiryDate: data.expiryDate.format("YYYY-MM-DD"),
                  inventoryId: props.inventoryId,
                },
                (newData) => addLot(newData),
              );
            } else {
              setLotList((k) => [...k, { ...data, key: k.length }]);
              setLotModal(false);
            }
          }}
        />
      )}
    </>
  );
};

export default LotDetailsDrawer;
