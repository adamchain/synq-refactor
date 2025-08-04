import {
  Button,
  Card,
  Col,
  Drawer,
  Input,
  Popconfirm,
  Row,
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import BillingUtil from "../estimate/BillingUtil";
import { TrashIcon } from "../util/SvgUtil";
import InventoryServices from "./../../services/InventoryServices";
import PackageServices from "./../../services/PackageServices";
import AdvancedTable from "./../generic-components/advanced-table/AdvancedTable";
import CustomAutoComplete from "./../generic-components/custom-auto-complete/CustomAutoComplete";
import PriceUtil from "./../util/PriceUtil";
import "./PackagesPage.scss";

const { Text, Link } = Typography;

const columns = (onDeleteAction, onUpdateQuantity) => [
  {
    title: "Item Name",
    dataIndex: "name",
    key: "name",
    className: "external-lab-column",
    render: (text, row) =>
      row.type === 4 ? (
        <Tooltip placement="topLeft" title="External Lab" arrowPointAtCenter>
          <Text>{text}</Text>
        </Tooltip>
      ) : (
        <Text>{text}</Text>
      ),
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
    render: (text, row) => (
      <Input
        onChange={(e) => {
          onUpdateQuantity(row.code, e.target.value);
        }}
        style={{ width: "50px" }}
        value={text}
      />
    ),
  },
  {
    title: "Price",
    dataIndex: "calPrice",
    key: "price",
    render: (text, row) => {
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
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    fixed: "right",
    width: 120,
    render: (text, row) => {
      return (
        <Row gutter={[16, 0]}>
          <Col>
            <Popconfirm
              title="Are you sure you want to delete this package?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDeleteAction(row.code)}
            >
              <Link>
                <TrashIcon />
              </Link>
            </Popconfirm>
          </Col>
        </Row>
      );
    },
  },
];

const packageTotalCalculate = (subTotal, adjustedPrice, total) => {
  let finalEstimateValue = "";
  let adjustedPriceAmount = PriceUtil.convertFloat(adjustedPrice);
  let estimateTotal = adjustedPriceAmount || total;

  finalEstimateValue = PriceUtil.dollarValue(estimateTotal);

  return finalEstimateValue;
};

const PackageCreateEditDrawer = (props) => {
  const [packageData, setPackageData] = useState({
    name: "",
    code: "",
    items: [],
  });
  const [itemData, setItemData] = useState([]);
  const commonContext = useContext(CommonContext);

  useEffect(() => {
    InventoryServices.searchAllItems(setItemData);
    if (props.data) {
      setPackageData(props.data);
    }
  }, [props.data]);

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = (total) => {
    let submitData = {
      name: packageData.name,
      code: packageData.code,
      total: total,
      adjustedPrice: packageData.adjustedPrice,
      discount: packageData.discount,
      items: packageData.items.map((k) => ({ id: k.id, qty: k.qty })),
    };
    //alert(JSON.stringify(submitData));
    if (props.isEdit) {
      submitData.id = props.data.id;
      PackageServices.updatePackage(submitData, props.onSuccess);
    } else {
      PackageServices.createPackage(submitData, props.onSuccess);
    }
  };

  const onUpdateQuantity = (code, value) => {
    let qty = value.match(/^[-+]?\d*\.?\d*$/);
    setPackageData((k) => ({
      ...k,
      items: [...k.items].map((u) => {
        let tempData = { ...u };
        if (u.code === code) {
          tempData = { ...tempData, qty: qty ? qty[0] : 1 };
        }

        return tempData;
      }),
    }));
  };

  const onDeleteAction = (code) => {
    setPackageData((k) => ({
      ...k,
      items: [...k.items].filter((u) => !(u.code === code)),
    }));
  };
  const onValueChange = (input, dataIndex) => {
    setPackageData((k) => ({ ...k, [dataIndex]: PriceUtil.allowfloat(input) }));
  };

  //      const packageTotalCalculate = () => {
  //         if(subTotal <=0){
  //             return PriceUtil.dollarValue(0);
  //         }
  //         let finalEstimateValue = "";
  //         let estimateTotal = packageData.adjustedPrice?PriceUtil.convertFloat(packageData.adjustedPrice): PriceUtil.convertFloat(subTotal);
  //         let discountValue = PriceUtil.convertFloat(packageData.discount);
  //         if(discountValue > 0){
  //             estimateTotal = estimateTotal - PriceUtil.discountCalculate(estimateTotal,discountValue);
  //         }
  //         finalEstimateValue = PriceUtil.dollarValue(estimateTotal);

  // return finalEstimateValue;

  //     }

  let updatedPackageData = JSON.parse(JSON.stringify(packageData));
  BillingUtil.frameInvoiceResponse(updatedPackageData);
  let { subTotal, total } = BillingUtil.submitTotal(
    updatedPackageData,
    commonContext.defaultBranch.sTaxSFee === true,
  );
  //packageData.items.reduce((total,current)=>total+Number.parseFloat(current.price)*Number(current.qty),0);

  return (
    <Drawer
      className="package-drawer"
      title={props.isEdit ? "Edit Package" : "Create Package"}
      width={800}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <div className="footer-button">
          <Button onClick={onClose} shape="round" style={{ marginRight: 16 }}>
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit(subTotal)}
            type="primary"
            size="large"
            shape="round"
          >
            {props.isEdit ? "Update" : "Save"} Package
          </Button>
        </div>
      }
    >
      <>
        <Row
          justify="space-between"
          style={{ marginTop: "20px", marginBottom: "12px" }}
          gutter={[16, 8]}
        >
          <Col span={12}>
            <Text>Package Name</Text>
          </Col>
          <Col span={12}>
            <Text>Package Code</Text>
          </Col>
        </Row>
        <Row
          style={{ marginBottom: "24px" }}
          justify="space-between"
          gutter={[16, 24]}
        >
          <Col span={12}>
            {" "}
            <Input
              value={packageData.name}
              onChange={(e) => {
                let name = e.target.value;
                setPackageData((k) => ({ ...k, name }));
              }}
              size="large"
              placeholder="Enter Package Name"
            />
          </Col>
          <Col span={12}>
            <Input
              value={packageData.code}
              onChange={(e) => {
                let code = e.target.value;
                setPackageData((k) => ({ ...k, code }));
              }}
              size="large"
              placeholder="Enter Package Code"
            />
          </Col>
        </Row>
      </>
      <CustomAutoComplete
        placeholder="Search Items or Codes"
        dropDownData={itemData}
        dataFields={{
          description: "pName",
          shortForm: "code",
          price: "price",
          id: "id",
          labVendor: "labVendor",
        }}
        onSelect={(option) => {
          if (option.dataObject.customLabInputProperties) {
            // Labs which require additional data cannot be added as packages as it requires additional information when submitting.
            alert(
              "This lab requires additional information and cannot be added to the package.",
            );
            return;
          }
          setPackageData((k) => {
            if (k.items.some((k) => k.code === option.dataObject.code)) {
              return {
                ...k,
                items: [...k.items].map((u) => {
                  let tempData = { ...u };
                  if (u.code === option.dataObject.code) {
                    tempData = { ...tempData, qty: tempData.qty + 1 };
                  }

                  return tempData;
                }),
              };
            } else {
              let itemData = {
                ...option.dataObject,
                name: option.dataObject.pName,
                qty: 1,
              };
              itemData.itemPrice = itemData.originalPrice;
              itemData.itemDiscountedPrice =
                BillingUtil.findDiscountedItemPrice(
                  itemData.originalPrice,
                  itemData.discount,
                  itemData.discountType,
                );
              itemData.calPrice = BillingUtil.formulateCalPrice(itemData);

              return { ...k, items: [...k.items, { ...itemData }] };
            }
          });
        }}
      />

      <Row style={{ marginBottom: "24px" }} gutter={[0, 24]}>
        <Col span={24}>
          <AdvancedTable
            id="package-detail-table"
            rowClassName={(record, index) =>
              record.type == "4" ? "is-external-lab" : ""
            }
            columns={columns(onDeleteAction, onUpdateQuantity)}
            pagination={false}
            size="middle"
            dataSource={updatedPackageData.items}
            rowKey={"code"}
          />
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Text className="packageSummaryHeader">Package Summary</Text>
          <Row className="package-subtotal" gutter={[0, 24]}>
            <Col>
              <Text>Finalize your Package</Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row
                className="package-subtotal"
                justify="space-between"
                gutter={[0, 16]}
              >
                <Col>
                  <Text>Subtotal</Text>
                </Col>
                <Col>
                  <Text>{PriceUtil.dollarValue(subTotal)}</Text>
                </Col>
              </Row>
              <Row
                className="package-subtotal"
                justify="space-between"
                gutter={[0, 16]}
              >
                <Col span={16}>
                  <Text>Price Override</Text>
                </Col>
                <Col span={8}>
                  <Input
                    value={packageData.adjustedPrice}
                    onChange={(e) =>
                      onValueChange(e.target.value, "adjustedPrice")
                    }
                    prefix="$"
                  />
                </Col>
              </Row>
              {/* <Row className="package-subtotal" justify="space-between" gutter={[0,16]} >
                    <Col span={16}><Text>Discount</Text></Col>
                    <Col span={8}><Input value={packageData.discount} onChange={(e)=>onValueChange(e.target.value,"discount")} suffix ="%"/></Col>
                </Row> */}
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Card className="package-total-card" bordered={false}>
            <Row
              style={{ textAlign: "center", paddingBottom: "12px" }}
              gutter={[0]}
            >
              <Col span={24}>
                <Text className="font-size-14">Package Total</Text>
              </Col>
              <Col span={24}>
                {" "}
                <Text strong className="package-total-text">
                  {packageTotalCalculate(
                    subTotal,
                    packageData.adjustedPrice,
                    subTotal,
                  )}
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Drawer>
  );
};

export default PackageCreateEditDrawer;
