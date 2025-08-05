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
  FileImageTwoTone,
} from "@ant-design/icons";
import { UploadIcon } from "../../util/SvgUtil";
import UploadFileServices from "../../../services/UploadFileServices";
const { Dragger } = Upload;
const { Text } = Typography;
const uploadProps = (
  onUpload,
  fileNameObject,
  setFileNameObject,
  setDataObject,
  patientId,
) => ({
  name: "file",
  multiple: true,
  customRequest: ({ file, onSuccess, onProgress }) => {
    let realName = file.name;
    setFileNameObject((k) => ({
      ...k,
      [realName]: {
        name: realName.substr(0, realName.lastIndexOf(".")) || realName,
        isEdit: false,
      },
    }));
    // setTimeout(() => {
    //   onProgress({
    //     percent: 25
    //   });
    // }, 1000);
    // setTimeout(() => {
    //   onProgress({
    //     percent: 50
    //   });
    // }, 2000);
    setTimeout(() => {
      onProgress({
        percent: 75,
      });
      UploadFileServices.uploadPatientFile(patientId, file, () => {
        onSuccess("done");
        onUpload(file, setDataObject);
      });
    }, 1000);
    // setTimeout(() => {
    //   onProgress({
    //     percent: 100
    //   });
    // }, 4000);
    // setTimeout(() => {
    //     onUpload(file,setDataObject);
    //   onSuccess("done");
    // }, 5000);
  },
  onChange(info) {
    // const { status } = info.file;
    // if (status !== "uploading") {
    //   console.log(info.file, info.fileList);
    // }
    // if (status === "done") {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === "error") {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
  itemRender: (originNode, file) => {
    let realNameObject = fileNameObject[file.name]
      ? fileNameObject[file.name]
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
                        [file.name]: { name, isEdit: false },
                      }));
                    }}
                    defaultValue={realNameObject.name}
                  />
                ) : (
                  <Text>{realNameObject.name}</Text>
                )}
              </Col>
            </Row>
            <Row>
              {" "}
              <Col span={24}>
                {file.status !== "done" ? (
                  <Progress
                    showInfo={false}
                    percent={file.percent}
                    strokeWidth={2}
                  />
                ) : (
                  <Text style={{ color: "green" }}>Uploaded Successfully</Text>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Row gutter={[16, 0]} justify="center" align="middle">
              {file.status !== "done" ? (
                <Col>
                  <CloseOutlined
                    onClick={
                      () => {}
                      // ()=>{UploadFileServices.deleteFilesForPatient()}
                    }
                    style={{ fontSize: "1.3em" }}
                  />
                </Col>
              ) : (
                <>
                  <Col>
                    <EditOutlined
                      onClick={() => {
                        setFileNameObject((k) => ({
                          ...k,
                          [file.name]: { ...k[file.name], isEdit: true },
                        }));
                      }}
                      style={{ fontSize: "1.3em" }}
                    />
                  </Col>
                  <Col>
                    <CheckCircleOutlined
                      style={{ fontSize: "1.3em", color: "green" }}
                    />
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    );
  },
  progress: { strokeWidth: 2, showInfo: false },
});

const UploadModal = (props) => {
  const [fileNameObject, setFileNameObject] = useState({});
  const [dataObject, setDataObject] = useState([]);
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
              onClick={() => props.onSuccess(fileNameObject, dataObject)}
              block
              disabled={dataObject.length === 0}
            >
              Save
            </Button>
          </Col>
        </Row>
      }
    >
      <Dragger
        {...uploadProps(
          props._url,
          fileNameObject,
          setFileNameObject,
          setDataObject,
          props.patientId,
        )}
        style={{ padding: "30px" }}
      >
        <UploadIcon style={{ fontSize: "4em" }} />
        <p className="ant-upload-text">Drop your files here, or browse</p>
        <p className="ant-upload-hint">Support JPG,PNG and PDF</p>
      </Dragger>
    </Modal>
  );
};

export default UploadModal;
