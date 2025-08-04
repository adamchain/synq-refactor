import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Dropdown,
  Menu,
  Button,
  Radio,
  DatePicker,
} from "antd";
import ThreeDotsMenu from "./ThreeDotsMenu";
import { momentLocal } from "../../../util/TimeUtil";
import moment from "moment";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = "MM/DD/YYYY";

export const CardHeader = (props) => {
  const { selectedFilter } = props;

  const [defaultOption, setDefaultOption] = useState();

  useEffect(() => {
    setDefaultOption(getDefaultValue(selectedFilter)); // Update default option when filter changes
    handleFilterChange(getDefaultValue(selectedFilter));
  }, [selectedFilter]);

  const getDefaultValue = (filter) => {
    const getCurrentWeekOfMonth = () => {
      const currentDate = new Date();
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const dayOfMonth = currentDate.getDate();
      const firstDayOfWeek = startOfMonth.getDay(); // Day of the week for the 1st of the month (0=Sunday, 1=Monday, etc.)

      // Calculate the current week number
      return Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
    };
    switch (filter) {
      case "Monthly":
        return new Date().getMonth();
      case "Yearly":
        return new Date().getFullYear();
      case "Weekly":
        return getCurrentWeekOfMonth();
      case "Daily":
        return new Date(); // Return the current date for Daily
      default:
        return new Date().getMonth();
    }
  };

  const renderMonthOptions = () => (
    <Menu className="dotSettings">
      <Menu.Item>
        <Radio.Group
          value={defaultOption}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two columns
            gap: "5px",
          }}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month, index) => (
            <Radio key={month} value={index} style={{ padding: "5px" }}>
              {month}
            </Radio>
          ))}
        </Radio.Group>
      </Menu.Item>
    </Menu>
  );

  const renderYearOptions = () => (
    <Menu className="dotSettings">
      <Menu.Item>
        <Radio.Group
          value={defaultOption}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two columns
            gap: "5px",
          }}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() - i,
          ).map((year) => (
            <Radio key={year} value={year} style={{ padding: "5px" }}>
              {year}
            </Radio>
          ))}
        </Radio.Group>
      </Menu.Item>
    </Menu>
  );

  const renderWeekOptions = () => {
    const getWeeksInMonth = (year, month) => {
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      return Math.ceil((firstDayOfMonth + daysInMonth) / 7); // Calculate total weeks
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January)
    const totalWeeks = getWeeksInMonth(currentYear, currentMonth);

    return (
      <Menu className="dotSettings">
        <Menu.Item>
          <Radio.Group
            value={defaultOption}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", // Two columns
              gap: "5px",
            }}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            {Array.from({ length: totalWeeks }, (_, index) => (
              <Radio
                key={`Week-${index + 1}`}
                value={index}
                style={{ padding: "5px" }}
              >
                {`Week ${index + 1}`}
              </Radio>
            ))}
          </Radio.Group>
        </Menu.Item>
      </Menu>
    );
  };

  const handleFilterChange = (value) => {
    console.log("value--", value);
    setDefaultOption(value);
    if (props.onFilterChange) {
      props.onFilterChange(value); // Notify the parent
    }
  };

  const renderDropdown = () => {
    switch (selectedFilter) {
      case "Monthly":
        return renderMonthOptions();
      case "Yearly":
        return renderYearOptions();
      case "Weekly":
        return renderWeekOptions(); // Render calendar for Daily
      default:
        return renderMonthOptions();
    }
  };

  return (
    <Row
      onClick={props.onClick}
      justify="space-between"
      align="start"
      className={props.className}
    >
      <Col sm={16} lg={16} md={16} xxl={18}>
        <Row className="InvFilterIconBox" gutter={[16, 0]} align="middle">
          <Col>
            <div>
              {props.icon && <props.icon customStyle={{ height: "34px" }} />}
            </div>
          </Col>
          <Col sm={24} md={17} lg={24} xl={24} xxl={17}>
            <Row className={props.title != "Total Revenue" && `cardTitle`}>
              <Col span={24}>
                {props.title && (
                  <Text className="font-size-16 InvFilterTitle">
                    {props.title}
                  </Text>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className="InvFilterCount hider" md={8} lg={8} xl={8} xxl={6}>
        <Row justify="end" className="dash-row InvFilterNumLabel">
          <Col>
            {selectedFilter == "Daily" && (
              <DatePicker
                defaultValue={moment(new Date(), "DD-MM-YYYY")} // Convert to Moment.js
                format="DD-MM-YYYY"
                onChange={(date, dateString) => {
                  console.log("Selected date: ", dateString);
                }}
              />
            )}
            {selectedFilter != "Daily" && selectedFilter != "Custom" && (
              <Dropdown overlay={renderDropdown()} trigger={["click"]}>
                <Button className="ant-btn-background-ghost">
                  <ThreeDotsMenu />
                </Button>
              </Dropdown>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
