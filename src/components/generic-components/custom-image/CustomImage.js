import { Badge, Col, Row, Tooltip } from "antd";
import React from "react";
import { BehaviorAlertIcon } from "../../util/SvgUtil";
import "./CustomImage.scss";

const getInitials = function (fullName) {
  if (!fullName) {
    return "";
  }
  let names = fullName.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const getImageStyleWithImage = (props) => {
  return (
    <Col
      className="with-image"
      style={{
        backgroundImage: props.styling.url,
        //  backgroundImage:'url(https://media.istockphoto.com/id/639454418/photo/close-up-of-beagle-against-gray-background.jpg?s=2048x2048&w=is&k=20&c=39O2iThrIQHx7puSDgfKo7obmeBTMb2_r8mdzv-5vL8=)',
        width: props.styling.width,
        height: props.styling.height,
      }}
    ></Col>
  );
};
const getImageStyleWithOutImage = (props) => {
  return (
    <Col
      className="without-image"
      style={{
        width: props.styling.width,
        height: props.styling.height,
      }}
    >
      <span className="client-initial">
        {getInitials(props.styling.fullName)}
      </span>
    </Col>
  );
};

const CustomImage = (props) => {
  return (
    <Row justify="center" className="custom-image">
      <Badge
        count={
          props.styling.showInfoIcon ? (
            <Tooltip title={props.styling.toolTip.title}>
              <BehaviorAlertIcon style={{ color: "#F5222D" }} />{" "}
            </Tooltip>
          ) : (
            0
          )
        }
      >
        <Col
          className={props.styling.showOuterBorder ? "circle-border" : ""}
          style={{ color: props.styling.ringColor ?? "#002729" }}
        >
          {props.styling.url
            ? getImageStyleWithImage(props)
            : getImageStyleWithOutImage(props)}
        </Col>
      </Badge>
    </Row>
  );
};
export default CustomImage;
