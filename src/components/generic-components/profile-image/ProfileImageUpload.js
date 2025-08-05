import React, { useEffect, useState } from "react";
import { Row, Col, Button, Typography, Upload, message } from "antd";
import CustomImage from "../custom-image/CustomImage";
import { OmitProps } from "antd/lib/transfer/ListBody";

const { Text } = Typography;

const ProfileImageUpload = (props) => {
  const [currentImage, setCurrentImage] = useState("");

  const checkFileProps = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isLt2M;
  };
  useEffect(() => {
    setCurrentImage(props.imageSrc);
  }, [props.imageSrc]);
  return (
    <Row align="middle" gutter={[32, 0]} style={{ marginBottom: "15px" }}>
      <Col>
        <CustomImage
          styling={{
            width: "100px",
            height: "100px",
            showOuterBorder: true,
            url: currentImage ? `url(` + currentImage + `)` : "",
            fullName: props.fullName ?? "", // pass dynamic full name
          }}
        />
      </Col>
      <Col>
        <Row style={{ marginBottom: "5px" }}>
          <Col>
            <Upload
              accept=".jpg,.png,.pdf,.JPEG,.jpeg,.JPG,.PNG"
              beforeUpload={checkFileProps}
              name="file"
              showUploadList={false}
              customRequest={({ file, onSuccess, onProgress }) => {
                props.onUpload(file);
                setCurrentImage(URL.createObjectURL(file));
                onSuccess("done");
              }}
            >
              <Button size="small" shape="round">
                Change Photo{" "}
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row style={{ marginBottom: "-5px", marginLeft: "5px" }}>
          <Col>
            <Text type="secondary" className="font-size-12">
              JPG or PNG.
            </Text>
          </Col>
        </Row>
        <Row style={{ marginLeft: "5px" }}>
          <Col>
            <Text type="secondary" className="font-size-12">
              Max size of 2MB
            </Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileImageUpload;
