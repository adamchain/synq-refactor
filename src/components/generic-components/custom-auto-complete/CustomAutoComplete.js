import React, { useEffect, useState, useRef } from "react";
import { Row, Col, AutoComplete, Input, Typography, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import PriceUtil from "../../util/PriceUtil";

const { Text } = Typography;
const labvendors = [" - Zoetis", " - Zoetis External", " - Idexx", " - Antech"];

const ItemRenderer = ({
  label,
  shortForm,
  labVendor,
  price,
  isExternal,
  isOOS,
  extraPrice,
}) => (
  <Row align="top" justify="space-between">
    <Col>
      <Row>
        <Col>
          <Text style={{ fontWeight: 400 }}>{label}</Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text
            type="secondary"
            style={{ fontSize: 12, textTransform: "uppercase" }}
            className="auto-complete-shortForm"
          >
            {shortForm} {labVendor ? labvendors[labVendor - 1] : ""}
          </Text>
        </Col>
      </Row>
    </Col>
    <Col>
      <Row align="top" justify="end">
        <Col>
          <Text
            style={{ fontWeight: 400, paddingRight: "5px" }}
          >{`$${price ? price?.toFixed(2) : "0.00"} ${extraPrice}`}</Text>
        </Col>
      </Row>
      {isOOS && (
        <Row>
          <Col>
            <Tag
              style={{
                margin: "0px",
                borderRadius: "1em",
                borderColor: "#E83151",
                borderStyle: "solid",
              }}
              color="#f4dedf"
            >
              <Text strong style={{ color: "#E83151" }}>
                OUT OF STOCK
              </Text>
            </Tag>
          </Col>
        </Row>
      )}
      {isExternal && (
        <Row>
          <Col>
            <Tag
              style={{
                margin: "0px",
                borderRadius: "1em",
                borderColor: "#F59A23",
                borderStyle: "solid",
              }}
              color="#FEF6ED"
            >
              <Text strong style={{ color: "#F59A23" }}>
                EXTERNAL
              </Text>
            </Tag>
          </Col>
        </Row>
      )}
    </Col>
  </Row>
);

const calcualteMinMaxPrice = (min, max) => {
  if (min || max) {
    let minprice = min ? PriceUtil.dollarValue(min) + " Min" : "";
    let maxprice = max ? " -" + PriceUtil.dollarValue(max) + " Max" : "";
    return "(" + minprice + maxprice + ")";
  } else {
    return "";
  }
};

const CustomAutoComplete = (props) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  const filterItems = () => {
    return searchText
      ? props.dropDownData
          .filter((k) => {
            let text = k[props.dataFields.description];
            if (props.dataFields.shortForm) {
              text = text + k[props.dataFields.shortForm];
            }
            if (props.dataFields.labVendor) {
              text = text + k[props.dataFields.labVendor];
            }
            return text.toLowerCase().includes(searchText.toLowerCase());
          })
          .map((k) => ({
            label: (
              <ItemRenderer
                key={k.id + k.type}
                label={k[props.dataFields.description]}
                shortForm={k[props.dataFields.shortForm]}
                labVendor={k[props.dataFields.labVendor]}
                price={
                  k.packageAdjustedPrice
                    ? k.packageAdjustedPrice
                    : k[props.dataFields.price]
                }
                isExternal={k.type === 4}
                extraPrice={calcualteMinMaxPrice(k.minPrice, k.maxPrice)}
                isOOS={k.type === 1 && k.onHand <= 0}
                TODO
                get
                on
                hands
              />
            ),
            //value:k[props.dataFields.id], dataObject:k,disabled:k.type===2})):[];
            value: k[props.dataFields.id] + " " + k.type,
            dataObject: k,
            disabled: k.type === 1 && k.onHand <= 0,
          }))
      : [];
  };

  return (
    <Row style={{ marginBottom: "24px", marginTop: "24px" }} gutter={[0, 24]}>
      <Col span={24}>
        <AutoComplete
          style={{ width: "100%" }}
          disabled={props.disabled}
          allowClear={true}
          value={searchText}
          options={filterItems(searchText)}
          onSearch={(value) => {
            setSearchText(value);
          }}
          onSelect={(value, option) => {
            setSearchText("");
            props.onSelect(option);
          }}
        >
          <Input
            ref={inputRef}
            size="large"
            prefix={<SearchOutlined />}
            placeholder={props.placeholder}
          />
        </AutoComplete>
      </Col>
    </Row>
  );
};

CustomAutoComplete.propTypes = {
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  dropDownData: PropTypes.array,
  dataFields: PropTypes.object, //description,shortForm,price,value,labvendor
};
export default CustomAutoComplete;
