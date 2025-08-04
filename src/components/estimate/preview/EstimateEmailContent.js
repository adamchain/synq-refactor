import { Col, Image, Row, Typography } from "antd";
import React from "react";
import AdvancedTable from "../../generic-components/advanced-table/AdvancedTable.js";
import EstimateEmailHtml from "../../static-files/EstimateEmailHtml.js";
import InvoiceEmailHtml from "../../static-files/InvoiceEmailHtml.js";
import PriceUtil from "../../util/PriceUtil.js";
import { momentLocal, utcToLocal } from "../../util/TimeUtil.js";
import BillingUtil from "../BillingUtil.js";

const { Text } = Typography;

const ExtraDetails = () => {
  return [
    "Service Fees",
    "Discounts",
    "Taxes",
    "Total",
    "Paid",
    "Remaining",
  ].map((val) => (
    <Row justify="end">
      <Col>{val}</Col>
    </Row>
  ));
};
const ExtraDetailsValues = ({ data }) => {
  return [
    "serviceFees",
    "discounts",
    "taxes",
    "total",
    "paid",
    "remaining",
  ].map((val) => (
    <Row justify="end">
      <Col>{data[val] ?? "-"}</Col>
    </Row>
  ));
};

const iterateItems = (name, qty) => {
  return `<tr style="border-bottom: 1px solid #e7eaef">
    <td width="90%">${name}</td>
    <td width="10%">${qty}</td></tr>`;
};

const iterateItemsNew = (name, qty, price, isDeclined) => {
  let textColor = isDeclined ? "#c60000" : "#012729";
  let extraDecoration = isDeclined ? "text-decoration: line-through;" : "";
  return `<div class="row" style="border-bottom: 1px solid #e7eaef; padding:12px; color: ${textColor};">
				<div class="nine columns" align="left" style="font-size: 13px; font-weight:400">${(isDeclined ? "(Declined) " : "") + name}</div> 
				<div class="one columns" align="right" style="font-size: 13px; ${extraDecoration} font-weight:400">${qty}</div> 
				<div class="two columns" align="right" style="font-size: 13px; ${extraDecoration} font-weight:400">${price}</div> 
			</div>`;
};

const EstimateEmailContent = (props) => {
  let obj = props.previewData;
  let displayData = {};
  displayData.branchName = obj.branchObject.branchName;
  displayData.id = obj.id;
  displayData.total = BillingUtil.priceVarianceTotal(
    obj.priceVariance,
    obj.total,
  );
  displayData.status =
    obj.statusId === 3
      ? "PAID"
      : obj.statusId === 2
        ? "PARTIAL"
        : obj.statusId === 1
          ? "UNPAID"
          : "UNKNOWN";
  displayData.scolor =
    obj.statusId === 3
      ? "#00a878"
      : obj.statusId === 2
        ? "#f59a23"
        : obj.statusId === 1
          ? "#c60000"
          : "#012729";
  displayData.isReciept = obj.statusId === 3 || obj.statusId === 2;
  displayData.uniqueId = obj.id;
  displayData.paymentMethod = obj.paymentMethod ?? "N/A";
  displayData.remaining = PriceUtil.dollarValue(obj.balance);
  displayData.remcolor = obj.balance > 0 ? "#c60000" : "#012729";
  displayData.paid = PriceUtil.dollarValue(obj.total - obj.balance ?? 0);
  displayData.invoiceDate =
    obj.statusId === 3 || obj.statusId === 2
      ? obj.invoiceDate
        ? utcToLocal(obj.invoiceDate, "YYYY-MM-DDTHH:mm:ss").format(
            "MM/DD/YYYY",
          )
        : ""
      : "N/A";
  displayData.createdDate = obj.createdDate ?? "";
  let items = [];

  obj.items.forEach((current) => {
    let isDeclined = current.declined;
    if (!current.hideOnInvoice) {
      items.push({
        name: current.name,
        qty: current.qty,
        price: PriceUtil.dollarValue(current.calPrice),
        isDeclined,
      });
    }
    if (current.packageItems) {
      current.packageItems.forEach((c) => {
        if (!c.hideOnInvoice) {
          items.push({
            name: c.name,
            qty: c.qty,
            price: PriceUtil.dollarValue(c.price),
            isDeclined,
          });
        }
      });
    }
  }, []);
  displayData.items = items;
  let isServiceFeeTaxed = props.previewData.branchObject.sTaxSFee === true;
  displayData.serviceFees = PriceUtil.dollarValue(
    BillingUtil.calculateServiceFee(obj.items),
  );
  displayData.taxes = PriceUtil.dollarValue(
    BillingUtil.calculateTax(obj.items, isServiceFeeTaxed, obj.tax),
  );
  let subTotal = BillingUtil.calculateSubTotal(obj.items);
  displayData.subTotal = PriceUtil.dollarValue(subTotal);
  displayData.total = BillingUtil.calculateTotal(
    props.isEstimate,
    subTotal,
    obj,
    isServiceFeeTaxed,
  );
  displayData.discounts =
    "-" +
    PriceUtil.dollarValue(
      BillingUtil.calculateRawTotal(subTotal, obj, isServiceFeeTaxed)
        .discountAmount,
    );
  // if(props.isEstimate){
  //      invoiceData [ "##date"] =obj.createdDate??"";
  // }else {
  //     invoiceData [ "##date"] =obj.invoiceDate?utcToLocal(obj.invoiceDate,"YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY"):"" ;
  // }
  const allReplace = (str, obj) => {
    let invoiceData = {
      "##branchName": obj.branchObject.branchName,
      "##branchName1": obj.branchObject.branchName,
      "##branchAddress": obj.branchObject.branchAddress,
      "##branchMobile": obj.branchObject.branchMobile,
      "##branchMobile1": obj.branchObject.branchMobile,
      "##branchEmail": obj.branchObject.branchEmail,
      "##branchEmail1": obj.branchObject.branchEmail,
      "##branchWebsite": obj.branchObject.branchWebsite,

      "##id": obj.id,
      "##total": BillingUtil.priceVarianceTotal(obj.priceVariance, obj.total),

      "##items": obj.items
        .filter((k) => !k.declined)
        .filter((k) => !k.hideOnInvoice)
        .reduce((total, current) => {
          let items = total + iterateItems(current.name, current.qty);
          if (current.packageItems) {
            items =
              items +
              current.packageItems
                .filter((k) => !k.hideOnInvoice)
                .reduce(
                  (t, c) => t + iterateItems(c.name, c.qty),

                  "",
                );
          }
          return items;
        }, ""),
    };

    if (props.isEstimate) {
      invoiceData["##date"] = obj.createdDate ?? "";
    } else {
      invoiceData["##date"] = obj.invoiceDate
        ? utcToLocal(obj.invoiceDate, "YYYY-MM-DDTHH:mm:ss").format(
            "MM/DD/YYYY",
          )
        : "";
    }
    for (let x in invoiceData) {
      str = str.replace(x, invoiceData[x]);
    }
    return str;
  };

  const invoiceReplaceAll = (str, obj) => {
    let invoiceData = {
      "##branchName": displayData.branchName,
      "##invoiceType": displayData.isReciept ? "Reciept" : "Invoice",
      "##invoiceId": displayData.id,
      "##status": displayData.status,
      "##scolor": displayData.scolor,
      "##total": displayData.total,
      "##invoiceDate": displayData.invoiceDate,
      "##paymentMethod": displayData.paymentMethod,
      "##serviceFees": displayData.serviceFees,
      "##discounts": displayData.discounts,
      "##taxes": displayData.taxes,
      "##paid": displayData.paid,
      "##remaining": displayData.remaining,
      "##remcolor": displayData.remcolor,
      "##items": displayData.items.reduce((total, current) => {
        let items =
          total +
          iterateItemsNew(
            current.name,
            current.qty,
            current.price,
            current.isDeclined,
          );
        return items;
      }, ""),
    };

    if (props.isEstimate) {
      invoiceData["##date"] = obj.createdDate ?? "";
    } else {
      invoiceData["##date"] = obj.invoiceDate
        ? utcToLocal(obj.invoiceDate, "YYYY-MM-DDTHH:mm:ss").format(
            "MM/DD/YYYY",
          )
        : "";
    }
    for (let x in invoiceData) {
      str = str.replaceAll(x, invoiceData[x]);
    }
    return str;
  };
  let tempHtml = "";
  if (props.isEstimate) {
    tempHtml = allReplace(EstimateEmailHtml.getHtml(), props.previewData);
  } else {
    tempHtml = invoiceReplaceAll(InvoiceEmailHtml.getHtml(), props.previewData);
  }

  const MiddleRowCol = (tempProps) => {
    let colProps = tempProps.span ? { span: tempProps.span } : {};
    return (
      <Row
        style={{
          marginBottom: tempProps.hasOwnProperty("noMarginBottom") ? 0 : "16px",
        }}
        justify="center"
        align="middle"
      >
        <Col {...colProps}>{tempProps.children}</Col>
      </Row>
    );
  };

  if (props.isEstimate) {
    return (
      <div
        className="estimate-preview"
        dangerouslySetInnerHTML={{ __html: tempHtml }}
      />
    );
  } else
    return (
      <div
        className="estimate-preview"
        dangerouslySetInnerHTML={{ __html: tempHtml }}
      />
    );

  return (
    <div>
      <MiddleRowCol>
        <MiddleRowCol>
          <Image src="../../images/DiagonalBKGEstimate3.png" />
        </MiddleRowCol>
        <MiddleRowCol noMarginBottom>
          <Text strong>
            {displayData.isReciept ? "Reciept" : "Invoice"} from{" "}
            {displayData.branchName}
          </Text>
        </MiddleRowCol>
        <MiddleRowCol>
          <Text type="secondary" strong>
            {displayData.isReciept ? "Reciept" : "Invoice"} #
            {displayData.uniqueId}
          </Text>
        </MiddleRowCol>
        <Row
          gutter={[58, 0]}
          style={{ marginBottom: "16px" }}
          align="middle"
          justify="center"
        >
          <Col>
            <MiddleRowCol noMarginBottom>
              <Text type="secondary" strong>
                TOTAL
              </Text>
            </MiddleRowCol>
            <MiddleRowCol>
              <Text strong>{displayData.total}</Text>
            </MiddleRowCol>
          </Col>
          <Col>
            <MiddleRowCol noMarginBottom>
              <Text type="secondary" strong>
                STATUS
              </Text>
            </MiddleRowCol>
            <MiddleRowCol>
              <Text strong>{displayData.status}</Text>
            </MiddleRowCol>
          </Col>
          <Col>
            <MiddleRowCol noMarginBottom>
              <Text type="secondary" strong>
                {props.isEstimate ? "CREATED DATE" : "DATE PAID"}
              </Text>
            </MiddleRowCol>
            <MiddleRowCol>
              <Text strong>
                {props.isEstimate
                  ? displayData.createdDate
                  : displayData.invoiceDate}
              </Text>
            </MiddleRowCol>
          </Col>
          <Col>
            <MiddleRowCol noMarginBottom>
              <Text type="secondary" strong>
                PAYMENT METHOD
              </Text>
            </MiddleRowCol>
            <MiddleRowCol>
              <Text strong>{displayData.paymentMethod}</Text>
            </MiddleRowCol>
          </Col>
        </Row>
        <Row style={{ marginBottom: "8px" }}>
          <Col>
            <Text type="secondary" strong>
              PAYMENT SUMMARY
            </Text>
          </Col>
        </Row>
        <AdvancedTable
          pagination={{ position: ["none"] }}
          dataSource={[
            ...displayData.items,
            {
              name: "",
              qty: <ExtraDetails />,
              price: <ExtraDetailsValues data={displayData} />,
            },
          ]}
          columns={[
            {
              title: "ITEM",
              dataIndex: "name",
              width: "60%",
              render: (k, rec) => (
                <Text
                  style={
                    rec.isDeclined
                      ? { color: "red", textDecoration: "line-through" }
                      : {}
                  }
                >
                  {k}
                </Text>
              ),
            },
            {
              title: "QTY",
              dataIndex: "qty",
              width: "10%",
              align: "right",
              render: (k, rec) => (
                <Text
                  style={
                    rec.isDeclined
                      ? { color: "red", textDecoration: "line-through" }
                      : {}
                  }
                >
                  {k}
                </Text>
              ),
            },
            {
              title: "PRICE",
              dataIndex: "price",
              width: "30%",
              align: "right",
              render: (k, rec) => (
                <Text
                  style={
                    rec.isDeclined
                      ? { color: "red", textDecoration: "line-through" }
                      : {}
                  }
                >
                  {k}
                </Text>
              ),
            },
          ]}
        />
      </MiddleRowCol>
    </div>
    // <div className="estimate-preview" dangerouslySetInnerHTML={{ __html: tempHtml}}/>
  );
};

export default EstimateEmailContent;
