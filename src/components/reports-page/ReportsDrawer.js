import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Drawer,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";
import ReportsFormConfig from "./ReportsFormConfig";
import FormComponents from "../generic-components/form-components/FormComponents";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import { TrashIcon } from "../util/SvgUtil";
import ReportServices from "../../services/ReportServices";
import CommonUtil from "../util/CommonUtil";
import { momentLocal } from "../util/TimeUtil";

const { RangePicker } = DatePicker;
const summaryValues = {
  Cash: { value: "cash", breakDown: ["Cashier", "Discount"] },
  Category: { value: "category", breakDown: ["Category"] },
  Check: { value: "check", breakDown: [] },
  "Item Sold": { value: "itemSold", breakDown: [] },
  Provider: { value: "provider", breakDown: ["Provider"] },
  Transactions: { value: "transactions", breakDown: ["Transactions"] },
  Tax: { value: "tax", breakDown: [] },
  "Provider Category": {
    value: "providerCategory",
    breakDown: ["Provider", "Category"],
  },
};

const ESsummaryValues = {
  Cash: { value: "cash", breakDown: [] },
  Check: { value: "check", breakDown: [] },
  Transactions: { value: "transactions", breakDown: [] },
};

const includeValues = {
  Inventory: { value: 1, breakDown: [] },
  Procedure: { value: 2, breakDown: [] },
  "External Labs": { value: 3, breakDown: [] },
  "Internal Labs": { value: 4, breakDown: [] },
  Package: { value: 5, breakDown: [] },
};

const ReportRange = ({ field }) => {
  return (
    <Col span={field.span}>
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
        name={field.name}
      >
        <RangePicker
          style={{ width: "100%" }}
          format="MM/DD/YYYY"
          allowClear={false}
          disabledDate={(date) => date.isAfter(momentLocal())}
        />
      </Form.Item>
    </Col>
  );
};

const RoundChecksItem = ({ value = [], onChange, formRequiredValue }) => {
  return (
    <Row gutter={[8, 8]}>
      {formRequiredValue.iteratableValues.map((k) => (
        <Col>
          <Button
            size="small"
            shape="round"
            type={value.includes(k) ? "primary" : "default"}
            onClick={(e) => {
              if (!value.includes(k)) {
                onChange([...value, k]);
              } else {
                onChange(value.filter((s) => s !== k));
              }
            }}
            value={k}
          >
            {k}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

const RoundChecks = ({ field }) => {
  return (
    <Col span={field.span}>
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
        shouldUpdate
      >
        {({ getFieldValue }) => {
          let iteratableValues = field.inputs;
          if (field.name === "includeBreakdown") {
            iteratableValues = [
              ...new Set(
                (getFieldValue("summary") ?? []).flatMap(
                  (k) => field.inputs[k].breakdown,
                ),
              ),
            ];
          } else if (field.name === "summary") {
            iteratableValues = Object.keys(field.inputs);
          }
          return (
            <Form.Item name={field.name}>
              <RoundChecksItem formRequiredValue={{ iteratableValues }} />
            </Form.Item>
          );
        }}
      </Form.Item>
    </Col>
  );
};

const VaccineItem = ({ value = [], onChange, formRequiredValue }) => {
  return (
    <>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={24}>
          <Select
            onChange={(val) => onChange([...value, val])}
            showSearch={true}
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            placeholder={"Select Vaccine"}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {formRequiredValue.inputs.map((option) => {
              return (
                <Select.Option value={option.id}>{option.name}</Select.Option>
              );
            })}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AdvancedTable
            rowKey={"id"}
            dataSource={formRequiredValue.inputs.filter((k) =>
              value.includes(k.id),
            )}
            columns={[
              { title: "Vaccine", dataIndex: "name" },
              {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                  <Typography.Link
                    onClick={() =>
                      onChange(value.filter((k) => k !== record.id))
                    }
                  >
                    <TrashIcon />
                  </Typography.Link>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

const VaccineFormItem = ({ field }) => {
  return (
    <Col span={field.span}>
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        rules={[
          {
            required: !!field.requiredMessage,
            message: field.requiredMessage,
          },
        ]}
        shouldUpdate
      >
        {({ getFieldValue }) => {
          return (
            <Form.Item name={field.name}>
              <VaccineItem formRequiredValue={{ inputs: field.inputs }} />
            </Form.Item>
          );
        }}
      </Form.Item>
    </Col>
  );
};
const ReportsDrawer = (props) => {
  const [reportForm] = Form.useForm();
  const [formRequiredData, setFormRequiredData] = useState({
    reportType: "AR",
    summaryPresent: false,
  });

  useEffect(() => {
    reportForm.setFieldsValue({
      reportType: "AR",
      reportDate: [momentLocal(), momentLocal()],
    });
    onFormValueChange({ reportType: "AR" });
  }, []);

  const onFinish = (values) => {
    let inputJson = {
      name: values.name,
      stDate: values.reportDate
        ? values.reportDate[0]?.format("YYYY-MM-DD")
        : "",
      endDate: values.reportDate
        ? values.reportDate[1]?.format("YYYY-MM-DD")
        : "",
    };

    if (values.reportType === "I") {
      delete inputJson.stDate;
      delete inputJson.endDate;
      inputJson[CommonUtil.REPORT_TYPES[values.reportType].value] = {
        inActive: (values.showMe ?? []).includes("Inactive"),
      };
      ReportServices.createInventoryReport(inputJson, props.onSuccess);
    }
    if (values.reportType === "AR") {
      ReportServices.createAccountReceivableReport(inputJson, props.onSuccess);
    }
    if (values.reportType === "U") {
      ReportServices.createInventoryUsageReport(inputJson, props.onSuccess);
    }
    if (values.reportType === "V") {
      ReportServices.createVaccineReport(inputJson, props.onSuccess);
    }
    if (values.reportType === "ST") {
      let formSummary = values.summary ?? [];
      inputJson.sales = Object.values(summaryValues)
        .map((k) => k.value)
        .reduce((a, c) => {
          a[c] = false;
          return a;
        }, {});
      formSummary.forEach((k) => {
        inputJson.sales[summaryValues[k].value] = true;
      });
      ReportServices.createSalesTaxReport(inputJson, props.onSuccess);
    }
    if (values.reportType === "ES") {
      // delete(inputJson.stDate);
      // delete(inputJson.endDate);
      let formSummary = values.summary ?? [];
      inputJson.endOfShift = Object.values(ESsummaryValues)
        .map((k) => k.value)
        .reduce((a, c) => {
          a[c] = false;
          return a;
        }, {});
      formSummary.forEach((k) => {
        inputJson.endOfShift[ESsummaryValues[k].value] = true;
      });
      ReportServices.createEndOfShiftReport(inputJson, props.onSuccess);
    }
    if (values.reportType === "BI") {
      delete inputJson.stDate;
      delete inputJson.endDate;
      inputJson.billableItem = {
        inActive: (values.showMe ?? []).includes("Inactive Inventory"),
        types: Object.keys(includeValues)
          .filter((k) => values.types.includes(k))
          .map((k) => includeValues[k].value),
      };

      ReportServices.createBillableItemReport(inputJson, props.onSuccess);
    }
  };

  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];
    switch (key) {
      case "reportType":
        reportForm.setFieldsValue({
          name:
            CommonUtil.REPORT_TYPES[formValue[key]].name +
            momentLocal().format("MMDDYY"),
        });
        setFormRequiredData((k) => ({ ...k, reportType: formValue[key] }));
        if (formValue[key] === "BI") {
          reportForm.setFieldsValue({ types: ["Inventory"] });
        }
        break;
      case "summary":
        setFormRequiredData((k) => ({
          ...k,
          summaryPresent: formValue[key]?.length > 0,
        }));
        break;
    }
  };
  return (
    <Drawer
      className="reports-drawer"
      title={"Create a Report"}
      width={473}
      onClose={props.onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <Row justify="center">
          <Col span={24}>
            <Button
              style={{ width: "100%" }}
              form="report-form-id"
              htmlType="submit"
              shape="round"
              disabled={
                ["ES", "ST"].includes(formRequiredData.reportType) &&
                !formRequiredData.summaryPresent
              }
              size="large"
              type="primary"
            >
              {"Run Report"}
            </Button>
          </Col>
        </Row>
      }
    >
      <Form
        form={reportForm}
        id="report-form-id"
        onValuesChange={(value) => onFormValueChange(value)}
        scrollToFirstError={true}
        onFinish={onFinish}
      >
        <Row gutter={[24, 0]}>
          {ReportsFormConfig(formRequiredData, summaryValues, ESsummaryValues)
            .filter((k) =>
              k.allowed
                ? k.allowed.includes(formRequiredData.reportType)
                : true,
            )
            .map((field, index) => {
              if (field.type === "date-range") {
                return <ReportRange field={field} />;
              } else if (field.type === "round-checks") {
                return <RoundChecks field={field} form={reportForm} />;
              } else if (field.type === "vaccine") {
                return <VaccineFormItem field={field} />;
              } else {
                return FormComponents.getFormItem(field);
              }
            })}
        </Row>
      </Form>
    </Drawer>
  );
};

export default ReportsDrawer;
