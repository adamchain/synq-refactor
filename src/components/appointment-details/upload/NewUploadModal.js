import React, { useState } from "react";
import {
  Upload,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Progress,
  Typography,
  Input,
} from "antd";
import {
  CloseOutlined,
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  FileImageTwoTone,
} from "@ant-design/icons";
import { TrashIcon, UploadIcon } from "../../util/SvgUtil";
import UploadFileServices from "../../../services/UploadFileServices";
const { Dragger } = Upload;
const { Text } = Typography;

const uploadProps = (fileNameObject, setFileNameObject) => ({
  name: "file",
  accept: ".jpg,.png,.pdf,.JPEG,.jpeg,.JPG,.PNG",
  multiple: true,
  customRequest: ({ file, onSuccess, onProgress }) => {
    let realName = file.name;
    setFileNameObject((k) => ({
      ...k,
      [file.uid]: {
        name: realName.substr(0, realName.lastIndexOf(".")) || realName,
        isEdit: false,
        file,
      },
    }));
  },

  itemRender: (originNode, file, fileList, actions) => {
    let realNameObject = fileNameObject[file.uid]
      ? fileNameObject[file.uid]
      : {
          isEdit: false,
          name: file.name.substr(0, file.name.lastIndexOf(".")) || file.name,
        };

    return (
      <Card bordered={false} bodyStyle={{ padding: 0, marginTop: "20px" }}>
        <Row align="middle" justify="space-between">
          <Col span={2}>
            <FileImageTwoTone style={{ fontSize: "1.6em" }} />
          </Col>
          <Col span={18}>
            <Row>
              <Col span={24}>
                {realNameObject.isEdit ? (
                  <Input
                    onBlur={(e) => {
                      let name = e.target.value;
                      setFileNameObject((k) => ({
                        ...k,
                        [file.uid]: { ...k[file.uid], name, isEdit: false },
                      }));
                    }}
                    defaultValue={realNameObject.name}
                  />
                ) : (
                  <Text>{realNameObject.name}</Text>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Row gutter={[16, 0]} justify="center" align="middle">
              {
                <>
                  <Col>
                    <EditOutlined
                      onClick={() => {
                        setFileNameObject((k) => ({
                          ...k,
                          [file.uid]: { ...k[file.uid], isEdit: true },
                        }));
                      }}
                      style={{ fontSize: "1.3em" }}
                    />
                  </Col>
                  <Col>
                    <DeleteOutlined
                      onClick={() => {
                        actions.remove();
                        let { [file.uid]: a, ...rest } = fileNameObject;
                        setFileNameObject(rest);
                      }}
                      style={{ fontSize: "1.3em" }}
                    />
                  </Col>{" "}
                </>
              }
            </Row>
          </Col>
        </Row>
      </Card>
    );
  },
  progress: { strokeWidth: 2, showInfo: false },
});

const NewUploadModal = (props) => {
  const [fileNameObject, setFileNameObject] = useState({});

  return (
    <Modal
      visible={true}
      width="537px"
      title="Upload"
      onCancel={props.onClose}
      footer={
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <Button shape="round" onClick={() => props.onClose()} block>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              shape="round"
              onClick={() => {
                Promise.all(
                  Object.values(fileNameObject).map(
                    (k) =>
                      new Promise((resolve, reject) => {
                        const myNewFile = new File(
                          [k.file],
                          k.name +
                            k.file.name.substr(k.file.name.lastIndexOf(".")),
                          { type: k.file.type },
                        );

                        UploadFileServices.uploadPatientFile(
                          props.patientId,
                          myNewFile,
                          (data) => {
                            resolve(data);
                          },
                        );
                      }),
                  ),
                ).then((k) => {
                  props.onSuccess();
                });
                props.onClose();
              }}
              block
              disabled={Object.keys(fileNameObject).length === 0}
            >
              Save
            </Button>
          </Col>
        </Row>
      }
    >
      <Dragger
        {...uploadProps(fileNameObject, setFileNameObject)}
        style={{ padding: "30px" }}
      >
        <UploadIcon style={{ fontSize: "4em" }} />
        <p className="ant-upload-text">Drop your files here, or browse</p>
        <p className="ant-upload-hint">Support JPG,PNG and PDF</p>
      </Dragger>
    </Modal>
  );
};

export default NewUploadModal;
