import React from "react";
import "./RoundCheckbox.scss";

const RoundCheckbox = (props) => {
  return (
    <div class="custom-round-checkbox">
      <input type="checkbox" id="custom-round-checkbox-id" />
      <label for="custom-round-checkbox-id"></label>
    </div>
  );
};

export default RoundCheckbox;
