import React from "react";
import * as dates from "date-arithmetic";
import { Calendar, Views, Navigate } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";

class CustomDayView extends React.Component {
  render() {
    let { date } = this.props;
    let range = CustomDayView.range(date);

    return <TimeGrid {...this.props} range={range} eventOffset={110} />;
  }
}

CustomDayView.range = function (date) {
  return [dates.startOf(date, "day")];
};

CustomDayView.navigate = function (date, action) {
  switch (action) {
    case Navigate.PREVIOUS:
      return dates.add(date, -1, "day");

    case Navigate.NEXT:
      return dates.add(date, 1, "day");

    default:
      return date;
  }
};

CustomDayView.title = function (date, _ref) {
  var localizer = _ref.localizer;
  return localizer.format(date, "dayHeaderFormat");
};

export default CustomDayView;
