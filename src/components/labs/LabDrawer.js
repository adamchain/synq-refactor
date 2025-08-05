import {
  Button,
  Col,
  Drawer,
  Input,
  Modal,
  Popconfirm,
  Row,
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import InventoryServices from "../../services/InventoryServices";
import LabServices from "../../services/LabServices";
import BillingUtil from "../estimate/BillingUtil";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import CustomAutoComplete from "../generic-components/custom-auto-complete/CustomAutoComplete";
import CustomImage from "../generic-components/custom-image/CustomImage";
import { TrashIcon } from "../util/SvgUtil";
import PriceUtil from "./../util/PriceUtil";
import "./Labs.scss";
const { Text, Link, Title } = Typography;

const NoLabsAdded = () => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={24}>
          {" "}
          <Title style={{ color: "unset" }} level={4}>
            No Labs Added
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24}>Use the search to find the appropriate Lab</Col>
      </Row>
    </>
  );
};

const LabDrawer = (props) => {
  const commonContext = useContext(CommonContext);
  const [labListData, setLabListData] = useState({ tests: [] });
  const [labsInventoryData, setLabsInventoryData] = useState([]);
  useState(false);
  const [customLabInputProperties, setCustomLabInputProperties] = useState({});

  const [selectedTest, setSelectedTest] = useState({});

  useEffect(() => {
    InventoryServices.searchItemByType("L", setLabsInventoryData);
  }, []);

  const onClose = () => props.onClose();

  const onDeleteAction = (key) => {
    setLabListData((k) => ({
      ...k,
      tests: k.tests.filter((u) => !(u.key === key)),
    }));
  };

  const onCancelLabAdd = () => {
    setCustomLabInputProperties({});
    setSelectedTest({});
  };

  const handleInputChange = (value, propertyKey) => {
    const keys = propertyKey.split(".");

    setSelectedTest((prevState) => {
      let nestedState = { ...prevState };

      keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
          acc[key] = value;
        } else {
          acc[key] = acc[key] || {};
        }
        return acc[key];
      }, nestedState);

      return nestedState;
    });
  };

  const _renderProperty = (customLabInputProperty) => {
    return (
      <Input
        className="text-default-400"
        key={customLabInputProperty.key}
        type={customLabInputProperty.type}
        defaultValue={customLabInputProperty.defaultValue}
        required={customLabInputProperty.required}
        onChange={(e) =>
          handleInputChange(e.target.value, customLabInputProperty.key)
        }
      />
    );
  };

  const _renderAdditionalProperties = () => {
    return (
      <div>
        {Object.entries(customLabInputProperties).map(([key, property]) => (
          <div key={key}>
            <p>
              {property.name}
              {_renderProperty(property)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const onSelectAction = (option) => {
    if (option.dataObject.customLabInputProperties) {
      setSelectedTest({
        ...option.dataObject,
        name: option.dataObject.pName,
        isParent: true,
        key: option.dataObject.id,
      });
      setCustomLabInputProperties(option.dataObject.customLabInputProperties);
    } else {
      setLabListData((k) => ({
        ...k,
        tests: [
          ...k.tests,
          {
            ...option.dataObject,
            name: option.dataObject.pName,
            isParent: true,
            key: option.dataObject.id,
          },
        ],
      }));
    }
  };

  const onAddCustomFieldLab = () => {
    setLabListData((k) => ({
      ...k,
      tests: [...k.tests, { ...selectedTest }],
    }));
    onCancelLabAdd();
  };

  const onLabTestsAdd = () => {
    LabServices.createLabs(
      {
        ...props.inputIds,
        tests: labListData.tests.map((k) => {
          let temp = {
            ...k,
            itemPrice: k.originalPrice,
            inventoryId: k.id,
            declined: false,
            name: k.name,
            qty: 1,
            tax: k.sTax ? commonContext.defaultBranch.taxRate : 0.0,
            code: k.code,
            type: k.type,
            inventoryId: k.id,
            additionalMetadata: k.additionalMetadata,
          };
          temp.price = BillingUtil.calculateCalPriceForEachItem(temp);
          return temp;
        }),
      },
      () => props.onSuccess(),
    );
  };

  const columns = [
    { title: "Lab Name", dataIndex: "name", sorter: true },
    {
      title: "Price",
      dataIndex: "price",
      align: "right",
      render: (text) => PriceUtil.dollarValue(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "110px",
      render: (text, record) => (
        <Row justify="start" gutter={[8, 0]}>
          <Col>
            <Popconfirm
              title="Are you sure you want to delete this lab?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                onDeleteAction(record.key);
              }}
            >
              <Tooltip title="Delete Service">
                <Link>
                  <TrashIcon />
                </Link>
              </Tooltip>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <Modal
        visible={Object.keys(customLabInputProperties).length > 0}
        style={{ zIndex: 10001 }}
        title="The selected Lab requires additional information. Please fill out the below form."
        okText="Add Lab"
        onCancel={onCancelLabAdd}
        onClose={onCancelLabAdd}
        onOk={onAddCustomFieldLab}
      >
        {_renderAdditionalProperties()}
      </Modal>
      <Drawer
        className="lab-drawer"
        title={"Add New Labs"}
        width={800}
        onClose={onClose}
        visible={true}
        bodyStyle={{ paddingBottom: 50 }}
        style={{ zIndex: 10 }}
        footer={
          <Row justify="end">
            <Col>
              <Button
                onClick={onClose}
                shape="round"
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              {" "}
              <Button
                disabled={labListData.length === 0}
                onClick={onLabTestsAdd}
                shape="round"
                type="primary"
              >
                {"Add Lab"}
              </Button>
            </Col>
          </Row>
        }
      >
        <Row justify="start" align="middle" gutter={[16, 24]}>
          <Col>
            <CustomImage
              styling={{
                width: "65px",
                height: "65px",
                showOuterBorder: true,
                url: `url(` + props.inputIds?.image + `)`,
                fullName: "", // pass dynamic full name
              }}
            />
          </Col>
          <Col>
            <Row style={{ marginBottom: "-5px" }}>
              <Col>
                <Text className="labsDrawerName">{props.inputIds.name}</Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text type="secondary">{props.inputIds.type}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <CustomAutoComplete
          placeholder="Search and Find Labs"
          dropDownData={labsInventoryData}
          dataFields={{
            description: "pName",
            shortForm: "code",
            price: "price",
            id: "id",
            labVendor: "labVendor",
          }}
          onSelect={onSelectAction}
        />

        <AdvancedTable
          size="middle"
          id="lab-drawer-table"
          rowClassName={(record, index) =>
            record.type === 4 ? "is-external-lab" : ""
          }
          columns={columns}
          dataSource={labListData.tests}
          rowKey="id"
          locale={{ emptyText: <NoLabsAdded /> }}
        />
      </Drawer>
    </>
  );
};
export default LabDrawer;
