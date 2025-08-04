import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Slider,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import CustomImage from "../generic-components/custom-image/CustomImage";
import FormComponents from "../generic-components/form-components/FormComponents";
import StaffCreateEditFormConfig from "../staff-page/create-edit-staff-form/StaffCreateEditFormConfig";
import ReactAvatarEditor from "react-avatar-editor";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
const profile_config = StaffCreateEditFormConfig([])[0]
  .formFields.filter(
    (k) => !["Active", "Permissions", "Alt Phone"].includes(k.label),
  )
  .map((k) => ({ ...k, span: k.span ?? 12 }));

const UploadModal = ({ image, onClose }) => {
  const [cropState, setCropState] = useState({
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 100,
    preview: null,
  });

  return (
    <Modal visible={true} onCancel={onClose} title="Update Profile Photo">
      <Row justify="center" align="middle">
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col align="middle" span={24}>
              <ReactAvatarEditor
                image={image}
                {...cropState}
                onPositionChange={(position) => {
                  setCropState((k) => ({ ...k, position }));
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={12} offset={6}>
              <Row justify="center" align="middle">
                <Col span={2}>
                  <MinusOutlined
                    onClick={() =>
                      setCropState((k) => ({
                        ...k,
                        scale: k.scale - (k.scale === 1 ? 0 : 0.1),
                      }))
                    }
                  />
                </Col>
                <Col span={20}>
                  <Slider
                    onChange={(value) => {
                      setCropState((k) => ({ ...k, scale: value }));
                    }}
                    min={1}
                    max={2}
                    step={0.01}
                  />
                </Col>
                <Col span={2}>
                  <PlusOutlined
                    onClick={() =>
                      setCropState((k) => ({
                        ...k,
                        scale: k.scale + (k.scale === 2 ? 0 : 0.1),
                      }))
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
const LoginProfile = (props) => {
  const [uploadModal, setUploadModal] = useState(false);

  return (
    <>
      <Title level={3}>Your Profile</Title>

      <Form
        layout="vertical"
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={() => {}}
      >
        <Row align="middle" gutter={[32, 0]} style={{ marginBottom: "15px" }}>
          <Col>
            <CustomImage
              styling={{
                width: "100px",
                height: "100px",
                showOuterBorder: true,
                url: `url(http://${window.location.host}/whskrwoodhouse1.jpg)`,
                fullName: "Carla Politte", // pass dynamic full name
              }}
            />
          </Col>
          <Col>
            <Col>
              <Upload
                name="file"
                customRequest={({ file, onSuccess, onProgress }) => {
                  setUploadModal(file);
                  onSuccess("done");
                }}
              >
                <Button size="small" style={{ marginBottom: 12 }} shape="round">
                  Change Photo{" "}
                </Button>
              </Upload>
            </Col>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          {profile_config.map(FormComponents.getFormItem)}
        </Row>

        <Form.Item>
          <Row gutter={[24, 0]} style={{ marginTop: 32 }}>
            <Col span={12}>
              <Button type="default" shape="round" size="large" block>
                Cancel{" "}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                shape="round"
                type="primary"
                htmlType="submit"
                size="large"
                block
                onClick={() => props.setPageType("welcome")}
              >
                {`Save & Login`}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      {uploadModal && (
        <UploadModal
          onClose={() => setUploadModal(false)}
          image={uploadModal}
        />
      )}
    </>
  );
};

export default LoginProfile;
