import React, { useState } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import socket from '../socket';
import { CodeEditor } from "./CodeEditor";

const AddPageModal = ({ isOpen, toggle }) => {
  const [html, setHtml] = useState("");
  const [condition, setCondition] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [index, setIndex] = useState("");
  const [conditionEnabled, setConditionEnabled] = useState(false);
  const cleanState = () => {
    setHtml("");
    setCondition("");
    setName("");
    setUrl("");
    setDemoUrl("");
    setIndex("");
  }
  const toggleModal = () => {
    cleanState();
    toggle();
  }
  const savePage = () => {
    socket.emit("panel.pages.add", { html, condition, name, url, demoUrl, index })
    toggleModal();
  }
  return <Modal size="xl" isOpen={isOpen} toggle={toggleModal} className={'modal-primary'}>
    <ModalHeader toggle={toggleModal}>Add Page</ModalHeader>
    <ModalBody>
      <div className="inputs">
        <div className="text-input">
          <Input type="number" placeholder="index" onChange={e => setIndex(e.target.value)}></Input>
        </div>
        <div className="text-input">
          <Input type="text" placeholder="Name" onChange={e => setName(e.target.value)}></Input>
        </div>
        <div className="text-input">
          <Input type="text" placeholder="Url" onChange={e => setUrl(e.target.value)}></Input>
        </div>
        <div className="text-input">
          <Input type="text" placeholder="Demo Url" onChange={e => setDemoUrl(e.target.value)}></Input>
        </div>
      </div>
      <div className="page-add-modal-label">Html: </div>
      <CodeEditor code={html} setCode={(code) => setHtml(code)} />
      {conditionEnabled ? <>
        <div className="page-add-modal-label">Condition: </div>
        <div>
          <CodeEditor code={condition} setCode={(code) => setCondition(code)} />
        </div>
      </> : <>
          <span className="page-add-modal-label">Enable Condition: </span>
          <input type="checkbox" name="condition" onChange={(e) => setConditionEnabled(e.target.checked)} />
        </>}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={savePage}>Add</Button>{' '}
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
}

export { AddPageModal }
