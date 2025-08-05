import React, { useState, useEffect } from "react";
import { Button, Input, Col, Row, Typography, Modal } from "antd";
import "./NotesModal.scss";

const { Text } = Typography;
const { TextArea } = Input;

const NotesModal = (props) => {
  const [notes, setNotes] = useState({ title: "", description: "" });

  useEffect(() => {
    if (props.inputdata) {
      setNotes(props.inputdata);
    }
  }, [props.inputdata]);

  return (
    <Modal
      className="notes-modal"
      title="Add Note"
      visible={true}
      onCancel={props.onClose}
      footer={[
        <Button size="large" shape="round" key="back" onClick={props.onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          size="large"
          shape="round"
          onClick={() => {
            if (props.inputdata) {
              props.editNotes(notes);
            } else {
              props.saveNotes(notes);
            }
            props.onClose();
          }}
        >
          Save
        </Button>,
      ]}
    >
      <>
        <Row className="time-range">
          <Col span={24}>
            <Text>Title</Text>
            <Input
              style={{ marginTop: 8 }}
              name="title"
              placeholder="Add title here"
              value={notes.title}
              onChange={(e) => {
                let title = e.target.value;
                setNotes((k) => ({ ...k, title }));
              }}
            />
          </Col>
        </Row>

        <Row className="time-range">
          <Col span={24}>
            <Text>Description</Text>
            <TextArea
              style={{ marginTop: 8 }}
              name="description"
              rows={5}
              placeholder="Add notes or details here"
              value={notes.description}
              onChange={(e) => {
                let description = e.target.value;
                setNotes((k) => ({ ...k, description }));
              }}
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default NotesModal;
