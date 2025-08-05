import React, { useState } from "react";
import { Button, Modal, Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export const ExportButton = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("csv");

  const handleOk = () => {
    setIsModalVisible(false);
    props.handleExport(selectedOption); // Pass the selected format
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <Button
        type="primary"
        className="createNewBTN"
        shape="round"
        icon={<DownloadOutlined />}
        size="large"
        onClick={() => setIsModalVisible(true)}
      >
        Export
      </Button>
      <Modal
        title="Select Export Format"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Export"
        cancelText="Cancel"
      >
        <Radio.Group onChange={onOptionChange} value={selectedOption}>
          <Radio value="csv">Export as CSV</Radio>
          <Radio value="excel">Export as Excel</Radio>
        </Radio.Group>
      </Modal>
    </>
  );
};
